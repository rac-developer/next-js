'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '@/interfaces/user'
import { getUser } from '@/actions/auth/get-user';
import { createClient } from '@/lib/supabase/client';

export interface AuthContextType {
  user: User | null,
  isLoading: boolean,
  getUserData: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // En esta funcion hay que llamar a la funcion getUserData que hara
  // la consulta a la tabla profiles de supabase
  async function getUserData(){
    setIsLoading(true)
    try {
      const userData = await getUser()
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setIsLoading(false);
    }
  }


  //Funcion que detecta los cambios del estado
  const authState = async () => {
    const supabase = createClient();

    supabase.auth.onAuthStateChange((event, session) => {

      const eventTypes = [
        'INITIAL_SESSION',
        'USER_UPDATED',
        'TOKEN_REFRESHED',
        'PASSWORD_RECOVERY',
        'SIGNED_OUT'
      ]

      if(eventTypes.includes(event)){
        if(session) {
          getUserData();
        } else {
          setUser(null)
        }
      }

    })
  }

  useEffect(() => {
    authState();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, getUserData}}>
      {children}
    </AuthContext.Provider>
  )
  
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}