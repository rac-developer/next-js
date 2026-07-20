'use server'
import { createClient } from '@/lib/supabase/server'

export async function updateProfile(values: {
  id: string,
  name: string,
  phone?: string | null,
  avatar_url?: string
  country_code: string | null
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.from('profiles').upsert({
    id: values.id,
    name: values.name,
    phone: values.phone,
    avatar_url: values.avatar_url,
    country_code: values.country_code,
    updated_at: new Date().toISOString()
  })

  if(error) {
    console.error("Error updating profile:", error);
    throw new Error(error.message);
  }
  return { success:true };
}