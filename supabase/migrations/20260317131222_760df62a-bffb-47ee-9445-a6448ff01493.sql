
-- Drop the overly permissive "Anyone can upload CVs" policy
DROP POLICY IF EXISTS "Anyone can upload CVs" ON storage.objects;

-- Replace with a policy that requires the request to carry an anon or authenticated JWT
-- This adds friction against unauthenticated direct uploads while still allowing
-- the frontend (which always sends the anon key) to upload CVs before form submission
CREATE POLICY "JWT required to upload CVs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'cv-uploads');
