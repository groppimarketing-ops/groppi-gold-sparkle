import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation constants
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_PHONE_LENGTH = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Spam detection patterns
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|winner|prize|bitcoin|crypto)\b/i,
  /<script/i,
  /javascript:/i,
  /onclick=/i,
  /\[url=/i,
  /href=/i,
];

function validateInput(data: ContactRequest): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!data.name || typeof data.name !== "string") {
    errors.push("Name is required");
  } else if (data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (data.name.length > MAX_NAME_LENGTH) {
    errors.push(`Name must not exceed ${MAX_NAME_LENGTH} characters`);
  }

  // Email validation
  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required");
  } else if (data.email.length > MAX_EMAIL_LENGTH) {
    errors.push(`Email must not exceed ${MAX_EMAIL_LENGTH} characters`);
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push("Please provide a valid email address");
  }

  // Phone validation (optional)
  if (data.phone && typeof data.phone === "string") {
    if (data.phone.length > MAX_PHONE_LENGTH) {
      errors.push(`Phone must not exceed ${MAX_PHONE_LENGTH} characters`);
    }
  }

  // Subject validation (optional)
  if (data.subject && typeof data.subject === "string") {
    if (data.subject.length > MAX_SUBJECT_LENGTH) {
      errors.push(`Subject must not exceed ${MAX_SUBJECT_LENGTH} characters`);
    }
  }

  // Message validation
  if (!data.message || typeof data.message !== "string") {
    errors.push("Message is required");
  } else if (data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  } else if (data.message.length > MAX_MESSAGE_LENGTH) {
    errors.push(`Message must not exceed ${MAX_MESSAGE_LENGTH} characters`);
  }

  // Spam detection
  const fullText = `${data.name} ${data.subject || ""} ${data.message}`;
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(fullText)) {
      errors.push("Message contains prohibited content");
      break;
    }
  }

  return { valid: errors.length === 0, errors };
}

interface RateLimitRecord {
  id: string;
  request_count: number;
  ip_address: string;
  action_type: string;
  window_start: string;
}

async function checkRateLimit(
  supabase: any,
  ipAddress: string
): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  // Get current request count
  const { data: existing } = await supabase
    .from("rate_limits")
    .select("*")
    .eq("ip_address", ipAddress)
    .eq("action_type", "contact_form")
    .gte("window_start", windowStart)
    .single();

  const record = existing as RateLimitRecord | null;

  if (record) {
    if (record.request_count >= MAX_REQUESTS_PER_WINDOW) {
      return { allowed: false, remaining: 0 };
    }

    // Increment counter
    await supabase
      .from("rate_limits")
      .update({ request_count: record.request_count + 1 })
      .eq("id", record.id);

    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.request_count - 1 };
  }

  // Create new rate limit record
  await supabase.from("rate_limits").insert({
    ip_address: ipAddress,
    action_type: "contact_form",
    request_count: 1,
    window_start: new Date().toISOString(),
  });

  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP for rate limiting
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || req.headers.get("x-real-ip") 
      || "unknown";

    // Check rate limit
    const rateLimit = await checkRateLimit(supabase, ipAddress);
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${ipAddress}`);
      return new Response(
        JSON.stringify({ 
          error: "Too many requests. Please try again later.",
          retryAfter: "1 hour"
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": "3600"
          } 
        }
      );
    }

    // Parse and validate request body
    let data: ContactRequest;
    try {
      data = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      console.log(`Validation failed: ${validation.errors.join(", ")}`);
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validation.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize and insert message
    const { error: insertError } = await supabase.from("contact_messages").insert({
      name: data.name.trim().slice(0, MAX_NAME_LENGTH),
      email: data.email.trim().toLowerCase().slice(0, MAX_EMAIL_LENGTH),
      phone: data.phone?.trim().slice(0, MAX_PHONE_LENGTH) || null,
      subject: data.subject?.trim().slice(0, MAX_SUBJECT_LENGTH) || null,
      message: data.message.trim().slice(0, MAX_MESSAGE_LENGTH),
    });

    if (insertError) {
      console.error("Database error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit message. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Contact message submitted successfully from IP: ${ipAddress}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been sent successfully.",
        remaining: rateLimit.remaining
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
