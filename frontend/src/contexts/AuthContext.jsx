import { createContext, useContext } from 'react'
import useLocalUser from '../hooks/useLocalUser'
import api from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalUser()

  const login = (user) => {
    api.defaults.headers['Authorization'] = `Bearer ${user.token}`
    setUser(user)
  }

  const logout = () => {
    api.defaults.headers['Authorization'] = ''
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
