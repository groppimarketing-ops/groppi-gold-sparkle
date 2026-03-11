import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

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

    const response = await fetch(
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

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again in a moment.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error:
              "AI usage credits exhausted. Please add credits to your workspace.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const rawContent =
      aiData.choices?.[0]?.message?.content ?? "";

    // Strip potential markdown code fences
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
        JSON.stringify({
          error: "AI returned invalid JSON. Please try again.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ article }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-article error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
