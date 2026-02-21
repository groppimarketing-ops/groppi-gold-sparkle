import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface JobApplicationRequest {
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  linkedinUrl?: string;
  message?: string;
  cvPath: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Submit job application function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: JobApplicationRequest = await req.json();
    console.log("Received application for role:", body.role);

    // Validate required fields
    if (!body.fullName || body.fullName.trim().length < 2) {
      throw new Error("Full name is required (min 2 characters)");
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      throw new Error("Valid email is required");
    }
    if (!body.role || body.role.trim().length < 2) {
      throw new Error("Role selection is required");
    }
    if (!body.cvPath) {
      throw new Error("CV upload is required");
    }

    // Validate field lengths
    if (body.fullName.length > 100) {
      throw new Error("Name must be less than 100 characters");
    }
    if (body.email.length > 255) {
      throw new Error("Email must be less than 255 characters");
    }
    if (body.message && body.message.length > 500) {
      throw new Error("Message must be less than 500 characters");
    }

    // Store the storage path, NOT a public URL
    const { data: application, error: dbError } = await supabase
      .from("job_applications")
      .insert({
        full_name: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        role: body.role.trim(),
        linkedin_url: body.linkedinUrl?.trim() || null,
        message: body.message?.trim() || null,
        cv_url: body.cvPath,
        consent: true,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save application");
    }

    console.log("Application saved with ID:", application.id);

    // Generate a short-lived signed URL for the email notification
    let cvSignedUrl = "";
    try {
      const { data: signedData, error: signError } = await supabase.storage
        .from("cv-uploads")
        .createSignedUrl(body.cvPath, 7 * 24 * 60 * 60); // 7 days

      if (!signError && signedData) {
        cvSignedUrl = signedData.signedUrl;
      }
    } catch (e) {
      console.error("Failed to generate signed URL for email:", e);
    }

    // Send notification email
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        await resend.emails.send({
          from: "GROPPI Careers <onboarding@resend.dev>",
          to: ["info@groppi.be"],
          subject: `New Job Application: ${body.role} - ${body.fullName}`,
          html: `
            <h1>New Job Application Received</h1>
            <p><strong>Position:</strong> ${body.role}</p>
            <p><strong>Name:</strong> ${body.fullName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ""}
            ${body.linkedinUrl ? `<p><strong>LinkedIn/Portfolio:</strong> <a href="${body.linkedinUrl}">${body.linkedinUrl}</a></p>` : ""}
            ${body.message ? `<p><strong>Message:</strong></p><p>${body.message}</p>` : ""}
            ${cvSignedUrl ? `<p><strong>CV:</strong> <a href="${cvSignedUrl}">Download CV</a> (link expires in 7 days)</p>` : `<p><strong>CV Path:</strong> ${body.cvPath} (generate signed URL from admin panel)</p>`}
            <hr />
            <p><em>Application submitted on ${new Date().toLocaleString("nl-BE")}</em></p>
          `,
        });

        console.log("Notification email sent successfully");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    } else {
      console.log("RESEND_API_KEY not configured, skipping email notification");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Application submitted successfully",
        applicationId: application.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in submit-job-application:", errorMessage);
    
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);