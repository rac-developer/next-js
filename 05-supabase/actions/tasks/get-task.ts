'use server'

import { createClient } from '@/lib/supabase/server'

export async function getTasks({
  page = 0,
  limit = 10,
  status = 'all',
  priority = 'all',
  search = '',
}: {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
} = {}) {
  try {
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return { error: 'No autorizado', tasks: [], hasMore: false }
    }
    
    let query = supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    if (priority && priority !== 'all') {
      query = query.eq('priority', priority)
    }
    
    if (search && search.trim() !== '') {
      const escapedSearch = search.trim()
      query = query.or(`title.ilike.%${escapedSearch}%,description.ilike.%${escapedSearch}%`)
    }
    
    const from = page * limit
    const to = (page + 1) * limit - 1
    
    query = query.range(from, to + 1)
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching tasks:', error)
      return { error: error.message, tasks: [], hasMore: false }
    }
    
    const hasMore = data.length > limit
    const pageTasks = hasMore ? data.slice(0, limit) : data
    
    const formattedTasks = pageTasks.map((task: any) => ({
      id: task.id,
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      created_at: task.created_at ? new Date(task.created_at).getTime() : Date.now(),
      image: task.image || null,
    }))
    
    return { tasks: formattedTasks, hasMore }
  } catch (error: any) {
    console.error('Error in getTasks server action:', error)
    return { error: error.message || 'Error desconocido', tasks: [], hasMore: false }
  }
}

export async function getTask(id: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single()
      
    if (error) throw error
    
    return {
      task: {
        id: data.id,
        title: data.title,
        description: data.description || '',
        status: data.status,
        priority: data.priority,
        created_at: data.created_at ? new Date(data.created_at).getTime() : Date.now(),
        image: data.image || null,
      }
    }
  } catch (error: any) {
    console.error('Error fetching single task:', error)
    return { error: error.message }
  }
}
