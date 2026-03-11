import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // ─── Auth: require valid session + admin role ─────────────────────────────
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const userId = claimsData.claims.sub;
  const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: roleData } = await serviceClient
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (!roleData) {
    return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  // ─────────────────────────────────────────────────────────────────────────

  try {
    const { topic } = await req.json();

    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // ─── Step 1: Generate Article Text ───────────────────────────────────────
    const systemPrompt = `You are an expert SEO content writer and digital marketing specialist for GROPPI, a premium digital marketing agency. You write high-quality, SEO-optimized articles in multiple languages.

IMPORTANT RULES:
- Write exactly ~800 words of rich HTML content per language
- Use proper HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Include at least 2 H2 headings and 2-3 H3 subheadings per language
- Write naturally for humans while optimizing for search engines
- Keep the GROPPI brand name in English (uppercase) when mentioned
- Keep technical terms like SEO, CMS, API, CRO in English across all languages
- Make content unique per language (not just translated, but culturally adapted)
- Return ONLY valid JSON, no markdown code blocks`;

    const userPrompt = `Write a complete SEO-optimized blog article about this topic: "${topic}"

Return a JSON object with EXACTLY this structure (no extra keys, no markdown):
{
  "en": {
    "title": "English SEO title (60 chars max)",
    "excerpt": "English meta description (155 chars max)",
    "content": "<h2>...</h2><p>...</p>... (full HTML ~800 words)"
  },
  "ar": {
    "title": "Arabic title",
    "excerpt": "Arabic excerpt",
    "content": "<h2>...</h2><p>...</p>... (full HTML ~800 words in Arabic, RTL-friendly)"
  },
  "fr": {
    "title": "French title",
    "excerpt": "French excerpt",
    "content": "<h2>...</h2><p>...</p>... (full HTML ~800 words in French)"
  },
  "nl": {
    "title": "Dutch title",
    "excerpt": "Dutch excerpt",
    "content": "<h2>...</h2><p>...</p>... (full HTML ~800 words in Dutch)"
  }
}`;

    const textResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          stream: false,
        }),
      }
    );

    if (!textResponse.ok) {
      if (textResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (textResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage credits exhausted. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await textResponse.text();
      console.error("AI gateway error (text):", textResponse.status, errText);
      throw new Error("AI gateway error during text generation");
    }

    const aiTextData = await textResponse.json();
    const rawContent = aiTextData.choices?.[0]?.message?.content ?? "";

    const cleaned = rawContent
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let article: Record<string, unknown>;
    try {
      article = JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON parse error:", e, "Raw:", cleaned.slice(0, 500));
      return new Response(
        JSON.stringify({ error: "AI returned invalid JSON. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── Step 2: Generate Branded Cover Image ─────────────────────────────────
    let imageUrl: string | null = null;

    try {
      const englishTitle = (article as Record<string, { title?: string }>).en?.title || topic;

      const imagePrompt = `Create a professional blog cover image for a premium digital marketing agency article.
Topic: "${topic}"
Article title: "${englishTitle}"

DESIGN REQUIREMENTS:
- Landscape format, widescreen (16:9 ratio)
- Dark luxury background: deep black or very dark charcoal (#050505)
- Abstract digital/marketing visual elements: glowing network nodes, geometric gold lines, subtle data visualization shapes
- Elegant gold color accents (#D4AF37) throughout
- Professional and editorial — like a high-end agency publication
- CRITICAL: In the lower-left corner, render the word "GROPPI" in bold uppercase serif or modern sans-serif font, in solid gold color (#D4AF37), clearly legible against the dark background. This is a brand watermark and must be visible.
- No people, no faces
- Cinematic lighting, depth, premium feel`;

      const imageResponse = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3.1-flash-image-preview",
            messages: [{ role: "user", content: imagePrompt }],
            modalities: ["image", "text"],
          }),
        }
      );

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const base64Image = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (base64Image) {
          // base64Image is "data:image/png;base64,..."
          const base64Data = base64Image.split(",")[1];
          const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

          // Upload to Supabase Storage
          const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
          const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
          const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

          const slug = (englishTitle as string)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .slice(0, 50);

          const fileName = `ai-cover-${slug}-${Date.now()}.png`;

          const { error: uploadError } = await supabase.storage
            .from("media")
            .upload(fileName, imageBytes, {
              contentType: "image/png",
              upsert: false,
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from("media")
              .getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;

            // Register in media table
            await supabase.from("media").insert({
              title: `AI Cover — ${englishTitle}`,
              file_url: imageUrl,
              file_type: "image/png",
              description: `AI-generated branded cover image for article: ${topic}`,
            });
          } else {
            console.error("Storage upload error:", uploadError);
          }
        }
      } else {
        console.error("Image generation failed:", imageResponse.status, await imageResponse.text());
      }
    } catch (imgErr) {
      // Image generation is non-blocking — article text is still returned
      console.error("Image generation error (non-fatal):", imgErr);
    }

    return new Response(JSON.stringify({ article, imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-article error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
