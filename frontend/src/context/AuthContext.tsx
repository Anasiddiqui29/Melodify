import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  _id?: string
  username?: string
  email: string
  role: 'user' | 'artist'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    const storedUser = localStorage.getItem('user')

    if (storedUser) {

      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('user')
      }

    }

    setIsLoading(false)

  }, [])


  const login = (user: User) => {

    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)

  }


  const logout = () => {

    localStorage.removeItem('user')
    setUser(null)

  }


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}