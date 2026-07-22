'use server'

import { createClient } from '@/lib/supabase/server'

export async function createTask(formData: FormData) {
  try {
    const supabase = await createClient()
    
    // Get current user first
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'No autorizado' }
    }
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string
    const priority = formData.get('priority') as string
    const imageFile = formData.get('image') as File | null
    
    if (!title) {
      return { error: 'El título es requerido' }
    }
    
    let imageUrl = null
    
    if (imageFile && imageFile.size > 0) {
      // 1. Upload image to 'task-images' bucket under folder userId
      const fileExt = imageFile.name.split('.').pop()
      const filePath = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('task-images')
        .upload(filePath, imageFile, {
          upsert: true,
          contentType: imageFile.type,
        })
        
      if (uploadError) {
        console.error('Error uploading task image:', uploadError)
        return { error: 'Error al subir la imagen' }
      }
      
      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('task-images')
        .getPublicUrl(filePath)
        
      if (publicUrlData) {
        imageUrl = publicUrlData.publicUrl
      }
    }
    
    // 3. Insert into database
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title,
        description,
        status,
        priority,
        image: imageUrl,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()
      
    if (error) {
      console.error('Error inserting task:', error)
      return { error: error.message }
    }
    
    return { success: true, task: data }
  } catch (error: any) {
    console.error('Error in createTask server action:', error)
    return { error: error.message || 'Error desconocido' }
  }
}
