'use server'

import { createClient } from '@/lib/supabase/server'

export async function deleteTask(taskId: string, imageUrl: string | null) {
  try {
    const supabase = await createClient()
    
    // Get current user first
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'No autorizado' }
    }
    
    // 1. Delete image from storage if it exists
    if (imageUrl) {
      const pathParts = imageUrl.split('/task-images/')
      if (pathParts.length > 1) {
        const filePath = decodeURIComponent(pathParts[1])
        const { error: deleteError } = await supabase.storage
          .from('task-images')
          .remove([filePath])
        if (deleteError) {
          console.error('Error deleting task image from storage:', deleteError)
        }
      }
    }
    
    // 2. Delete task from database
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      
    if (error) {
      console.error('Error deleting task:', error)
      return { error: error.message }
    }
    
    return { success: true }
  } catch (error: any) {
    console.error('Error in deleteTask server action:', error)
    return { error: error.message || 'Error desconocido' }
  }
}
