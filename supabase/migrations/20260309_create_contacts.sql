CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  services TEXT,
  message TEXT,
  file_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_anonymous_inserts" ON public.contacts
  FOR INSERT
  WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public) VALUES ('contact-files', 'contact-files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "allow_anonymous_uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'contact-files');
