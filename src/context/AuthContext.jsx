/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  )

  const login = () => {
    localStorage.setItem("auth", "true")
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("auth")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}   