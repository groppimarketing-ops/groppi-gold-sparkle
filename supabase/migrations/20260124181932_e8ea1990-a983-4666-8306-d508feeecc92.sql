-- 1. Add DELETE policy for contact_messages (admin only)
CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Add CHECK constraints for contact_messages input validation
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_name_length CHECK (length(name) <= 100),
  ADD CONSTRAINT contact_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT contact_subject_length CHECK (subject IS NULL OR length(subject) <= 200),
  ADD CONSTRAINT contact_message_length CHECK (length(message) <= 1000),
  ADD CONSTRAINT contact_phone_length CHECK (phone IS NULL OR length(phone) <= 30);

-- 3. Add CHECK constraints for articles to prevent abuse
ALTER TABLE public.articles
  ADD CONSTRAINT article_title_en_length CHECK (length(title_en) <= 500),
  ADD CONSTRAINT article_title_ar_length CHECK (length(title_ar) <= 500),
  ADD CONSTRAINT article_slug_length CHECK (length(slug) <= 200);

-- 4. Add CHECK constraints for services
ALTER TABLE public.services
  ADD CONSTRAINT service_title_en_length CHECK (length(title_en) <= 200),
  ADD CONSTRAINT service_title_ar_length CHECK (length(title_ar) <= 200),
  ADD CONSTRAINT service_slug_length CHECK (length(slug) <= 100);

-- 5. Add CHECK constraints for media
ALTER TABLE public.media
  ADD CONSTRAINT media_title_length CHECK (length(title) <= 200),
  ADD CONSTRAINT media_file_url_length CHECK (length(file_url) <= 500);

-- 6. Add CHECK constraints for profiles
ALTER TABLE public.profiles
  ADD CONSTRAINT profile_full_name_length CHECK (full_name IS NULL OR length(full_name) <= 100),
  ADD CONSTRAINT profile_avatar_url_length CHECK (avatar_url IS NULL OR length(avatar_url) <= 500);