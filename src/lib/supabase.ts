import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/**
 * Save a contact form submission to Supabase
 */
export async function saveContactSubmission(data: {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  services: string[];
  message: string;
  fileName?: string;
}) {
  if (!supabase) {
    console.warn('Supabase not configured — form submission logged to console');
    console.log('Contact submission:', data);
    return { success: true, data: null };
  }

  const { data: result, error } = await supabase
    .from('contacts')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: `${data.countryCode}${data.phone}`,
        services: data.services.join(', '),
        message: data.message,
        file_name: data.fileName,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) throw new Error(error.message);
  return { success: true, data: result };
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadContactFile(file: File, contactId: string) {
  if (!supabase) {
    console.warn('Supabase not configured — file upload skipped');
    return { success: true, data: null };
  }

  const fileName = `contacts/${contactId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from('contact-files')
    .upload(fileName, file);

  if (error) throw new Error(error.message);
  return { success: true, data };
}
