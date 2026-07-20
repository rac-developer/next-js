'use server'
import { createClient } from '@/lib/supabase/server'

export async function updateAvatar(formData: FormData) {
  const supabase = await createClient()

  const file = formData.get('file') as File;
  const userId = formData.get('userId') as string;

  //1. Subir imagen al bucket de avatares
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}-${Date.now()}.${fileExt}`
  
  const { error:uploadError } = await supabase.storage
  .from('avatars')
  .upload(filePath, file, {
    upsert: true,
    contentType: file.type
  })

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    return { error: 'Error al subir la imagen' };
  }

  //2. Obtener URL de la imagen
  const { data: publicUrlData } = supabase.storage
  .from('avatars')
  .getPublicUrl(filePath);

  if (!publicUrlData) {
    return { error: 'Error al obtener la URL de la imagen' };
  }

  //3. Actualizar la tabla profiles
  const { data, error: updateError } = await supabase
  .from('profiles')
  .update({ avatar_url: publicUrlData.publicUrl, updated_at: new Date().toISOString() })
  .eq('id', userId)
  .select();

  console.log("Update profile result:", { data, updateError, userId });

  if (updateError) {
    console.error('Error al actualizar el perfil:', updateError);
    throw new Error(`Error al actualizar el perfil: ${updateError.message}`);
  }

  if (!data || data.length === 0) {
    console.warn('Advertencia: Ninguna fila fue actualizada en la tabla profiles. ¿Problema con RLS o userId incorrecto?');
  }

  return { success: publicUrlData.publicUrl };
}