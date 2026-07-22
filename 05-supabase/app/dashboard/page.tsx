'use client'

import { useState, useEffect, useRef } from 'react'
import { AvatarBadge } from '@/components/AvatarBadge'
import { useAuth } from '@/context/AuthContext'
import { LayoutGrid, Plus, Trash2, Loader2, ListTodo, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { getTasks } from '@/actions/tasks/get-task'
import { deleteTask } from '@/actions/tasks/delete-task'
import { TaskCard } from './components/TaskCard'
import { TaskFilters } from './components/TaskFilters'
import { TaskForm } from './components/TaskForm'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high';
    created_at: number;
    image: string | null;
}

export default function DashboardPage() {
  const { user } = useAuth()
  
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  
  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
  })
  
  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  
  // Delete confirm state
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const observerTarget = useRef<HTMLDivElement>(null)

  // Load tasks
  useEffect(() => {
    let active = true
    
    async function fetchTasks() {
      if (page === 0) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }
      
      const res = await getTasks({
        page,
        limit: 10,
        status: filters.status,
        priority: filters.priority,
        search: filters.search,
      })
      
      if (!active) return
      
      if (res.error) {
        toast.error(`Error al cargar tareas: ${res.error}`)
      } else {
        setTasks((prev) => (page === 0 ? res.tasks : [...prev, ...res.tasks]))
        setHasMore(res.hasMore)
      }
      
      setLoading(false)
      setLoadingMore(false)
    }
    
    fetchTasks()
    
    return () => {
      active = false
    }
  }, [page, filters])

  // Infinite Scroll Observer
  useEffect(() => {
    if (loading || loadingMore || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 0.1 }
    )

    const target = observerTarget.current
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [loading, loadingMore, hasMore])

  // Handlers for filters
  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
    setPage(0)
  }

  const handleStatusChange = (status: string) => {
    setFilters((prev) => ({ ...prev, status }))
    setPage(0)
  }

  const handlePriorityChange = (priority: string) => {
    setFilters((prev) => ({ ...prev, priority }))
    setPage(0)
  }

  // Reload handler
  const handleRefresh = () => {
    setPage(0)
    // Force recalculating tasks if page was already 0
    if (page === 0) {
      setFilters((prev) => ({ ...prev }))
    }
  }

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return
    
    setIsDeleting(true)
    try {
      const res = await deleteTask(taskToDelete.id, taskToDelete.image)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success('Tarea eliminada con éxito')
        setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id))
        setTaskToDelete(null)
      }
    } catch (err: any) {
      console.error(err)
      toast.error('Error al intentar eliminar la tarea')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <nav className="border-b border-border/40 bg-card/30 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <LayoutGrid className="text-primary" size={28}/>
          <span className="bg-white from-primary to-primary-foreground bg-clip-text text-transparent font-bold">
            Gestor de Tareas
          </span>
        </div>

        {user && (
          <Link href="/profile" className="hover:opacity-85 transition-opacity">
            <AvatarBadge
              name={user.name}
              avatar_url={user.avatar_url}
            />
          </Link>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Mis Tareas</h1>
            <p className="text-sm text-muted-foreground mt-1">Organiza, filtra y completa tus actividades diarias.</p>
          </div>
          <Button 
            onClick={() => {
              setEditingTask(null)
              setIsFormOpen(true)
            }}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 rounded-xl shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Plus size={18} />
            Nueva Tarea
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-card/20 border border-border/40 rounded-2xl p-6 backdrop-blur-sm">
          <TaskFilters
            currentFilters={filters}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[210px] w-full rounded-2xl border border-border/30 bg-card/20 animate-pulse p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="h-5 w-20 bg-muted rounded-full" />
                  <div className="h-5 w-16 bg-muted rounded-full" />
                </div>
                <div className="h-6 w-3/4 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="mt-auto pt-3 border-t border-border/20 flex justify-between">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="flex gap-2">
                    <div className="h-7 w-7 bg-muted rounded-full" />
                    <div className="h-7 w-7 bg-muted rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card/10 border border-border/30 rounded-3xl gap-4">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <ListTodo size={40} />
            </div>
            <div>
              <h3 className="text-lg font-bold">No se encontraron tareas</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                No hay tareas que coincidan con los filtros actuales o aún no has creado ninguna. ¡Comienza agregando una!
              </p>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
              variant="outline"
              className="mt-2 rounded-xl"
            >
              Crear mi primera tarea
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div key={task.id} className="h-full">
                  <TaskCard
                    task={task}
                    onEdit={(t) => {
                      setEditingTask(t)
                      setIsFormOpen(true)
                    }}
                    onDelete={(t) => setTaskToDelete(t)}
                  />
                </div>
              ))}
            </div>

            {/* Load More Indicator / Observer target */}
            <div ref={observerTarget} className="flex justify-center py-6 min-h-[60px]">
              {loadingMore && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                  <Loader2 size={18} className="animate-spin text-primary" />
                  Cargando más tareas...
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingTask(null)
        }}
        task={editingTask}
        onSuccess={handleRefresh}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={taskToDelete !== null} onOpenChange={(open) => { if (!open) setTaskToDelete(null) }}>
        <DialogContent className="max-w-md w-[95vw] rounded-2xl bg-card border-border/50 text-foreground">
          <DialogHeader className="flex flex-col items-center text-center gap-2 pt-2">
            <div className="p-3 bg-destructive/10 text-destructive rounded-full">
              <AlertTriangle size={28} />
            </div>
            <DialogTitle className="text-xl font-bold">¿Eliminar Tarea?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              ¿Estás seguro de que deseas eliminar la tarea <span className="font-semibold text-foreground">"{taskToDelete?.title}"</span>? Esta acción no se puede deshacer y eliminará cualquier imagen adjunta permanentemente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-center gap-3 pt-4 border-t border-border/10">
            <Button
              variant="outline"
              onClick={() => setTaskToDelete(null)}
              disabled={isDeleting}
              className="rounded-xl flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="rounded-xl flex-1 sm:flex-none font-semibold flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Eliminando...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Eliminar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
