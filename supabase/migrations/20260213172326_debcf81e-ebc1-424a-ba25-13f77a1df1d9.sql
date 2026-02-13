
-- Remove the overly permissive INSERT policy on contact_messages
-- Edge functions use service role key which bypasses RLS
DROP POLICY IF EXISTS "Anyone can create contact messages" ON public.contact_messages;

-- Remove the overly permissive INSERT policy on job_applications
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
