import { createContext, useContext, useEffect, useState } from 'react'
import useAuth from '../hooks/use-auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const { user, loading: userLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  const sharedState = {
    loading,
    loggedIn,
    user,
    setLoading,
    setLoggedIn,
  }

  useEffect(() => {
    if (userLoading) setLoading(true)
  }, [userLoading])

  useEffect(() => {
    if (user && !loggedIn) setLoggedIn(true)
    if (user !== undefined && loading) setLoading(false)
  }, [user, loggedIn])

  return (
    <AuthContext.Provider value={sharedState}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
