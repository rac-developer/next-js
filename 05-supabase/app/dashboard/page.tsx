'use client'
import { AvatarBadge } from '@/components/AvatarBadge'
import { useAuth } from '@/context/AuthContext'
import { LayoutGrid } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {

  const { user } = useAuth()

  return (
    <>
      <nav className='px-6 py-4 flex justify-between items-center'>
        <div className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <LayoutGrid size={32}/>
          <p>Sistema de Gestión de Contenidos</p>
        </div>

        {user && (
          <Link href="/profile">
            <AvatarBadge
              name={user.name}
              avatar_url={user.avatar_url}
            />
          </Link>
        )}

      </nav>
    </>
  )
}
