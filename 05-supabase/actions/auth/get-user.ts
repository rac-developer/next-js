import { createClient } from '@/lib/supabase/server'

export async function getUser() {

  try {
    const supabase = await createClient()
    const { data: { user:seccion } } = await supabase.auth.getUser()
  
    if (!seccion) {
      return null
    }

    const userId = seccion.id;

    const  { data:userData, error: userError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

    if(userError) {
      console.error('Error al obtener el usuario:', userError);
      return null;
    }

    return userData;
  
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
}