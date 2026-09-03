import { useState, useEffect } from 'react'
import supabase from '../lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!supabase) {
          setLoading(false)
          return
        }

        // Check current session
        const { data } = await supabase.auth.getSession()
        if (data?.session?.user) {
          const currentUser = data.session.user
          setUser(currentUser)

          // Check if user is admin
          const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('user_id')
            .eq('user_id', currentUser.id)
            .single()

          if (adminError && adminError.code !== 'PGRST116') {
            console.error('Error checking admin status:', adminError)
          } else {
            setIsAdmin(!!adminData)
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            setUser(session.user)

            // Check admin status when user changes
            const { data: adminData, error: adminError } = await supabase
              .from('admin_users')
              .select('user_id')
              .eq('user_id', session.user.id)
              .single()

            if (adminError && adminError.code !== 'PGRST116') {
              console.error('Error checking admin status:', adminError)
            } else {
              setIsAdmin(!!adminData)
            }
          } else {
            setUser(null)
            setIsAdmin(false)
          }
        }
      )

      return () => {
        authListener?.unsubscribe()
      }
    }
  }, [])

  const login = async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase is not configured')
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  const logout = async () => {
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return { user, isAdmin, loading, error, login, logout }
}
