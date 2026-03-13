import { createContext, useContext, useState, useEffect } from 'react'
import { authApi, clearAuthToken, getAuthToken, setAuthToken } from '../services/api.js'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const normalizeUser = (apiUser) => ({
    ...apiUser,
    userType: apiUser.role || apiUser.userType,
  })

  useEffect(() => {
    const restoreSession = async () => {
      const token = getAuthToken()

      if (!token) {
        localStorage.removeItem('user')
        setLoading(false)
        return
      }

      try {
        const response = await authApi.me()
        const nextUser = normalizeUser(response.user)
        setUser(nextUser)
        localStorage.setItem('user', JSON.stringify(nextUser))
      } catch (_error) {
        clearAuthToken()
        localStorage.removeItem('user')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    restoreSession()
  }, [])

  const login = async (email, password, _userType) => {
    try {
      const response = await authApi.login({ email, password })
      const nextUser = normalizeUser(response.user)

      setAuthToken(response.token)
      setUser(nextUser)
      localStorage.setItem('user', JSON.stringify(nextUser))

      return { success: true, user: nextUser }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' }
    }
  }

  const register = async (userData) => {
    try {
      const response = await authApi.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.userType,
      })
      const nextUser = normalizeUser(response.user)

      setAuthToken(response.token)
      setUser(nextUser)
      localStorage.setItem('user', JSON.stringify(nextUser))

      return { success: true, user: nextUser }
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' }
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (_error) {
      // Best effort logout.
    }

    clearAuthToken()
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
