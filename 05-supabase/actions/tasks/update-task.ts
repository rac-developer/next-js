'use server'

import { createClient } from '@/lib/supabase/server'

export async function updateTask(taskId: string, formData: FormData) {
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
    const removeImage = formData.get('removeImage') === 'true'
    const existingImage = formData.get('existingImage') as string | null
    
    if (!title) {
      return { error: 'El título es requerido' }
    }
    
    let imageUrl = existingImage
    
    // If the image is removed, delete it from storage first
    if (removeImage && existingImage) {
      imageUrl = null
      const pathParts = existingImage.split('/task-images/')
      if (pathParts.length > 1) {
        const filePath = decodeURIComponent(pathParts[1])
        const { error: deleteError } = await supabase.storage
          .from('task-images')
          .remove([filePath])
        if (deleteError) {
          console.error('Error deleting old image from storage:', deleteError)
        }
      }
    }
    
    // If a new image file is uploaded
    if (imageFile && imageFile.size > 0) {
      // If there was an existing image and we didn't remove it yet, delete it
      if (existingImage && !removeImage) {
        const pathParts = existingImage.split('/task-images/')
        if (pathParts.length > 1) {
          const filePath = decodeURIComponent(pathParts[1])
          await supabase.storage.from('task-images').remove([filePath])
        }
      }
      
      const fileExt = imageFile.name.split('.').pop()
      const filePath = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('task-images')
        .upload(filePath, imageFile, {
          upsert: true,
          contentType: imageFile.type,
        })
        
      if (uploadError) {
        console.error('Error uploading new image:', uploadError)
        return { error: 'Error al subir la imagen' }
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('task-images')
        .getPublicUrl(filePath)
        
      if (publicUrlData) {
        imageUrl = publicUrlData.publicUrl
      }
    }
    
    // Update the database
    const { data, error } = await supabase
      .from('tasks')
      .update({
        title,
        description,
        status,
        priority,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
      .select()
      .single()
      
    if (error) {
      console.error('Error updating task:', error)
      return { error: error.message }
    }
    
    return { success: true, task: data }
  } catch (error: any) {
    console.error('Error in updateTask server action:', error)
    return { error: error.message || 'Error desconocido' }
  }
}
