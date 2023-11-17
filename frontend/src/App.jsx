import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import AdminHome from './pages/AdminHome'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'

const App = () => {
  const auth = useAuth()

  return (
    <div id='app'>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              {auth.user?.is_admin ? <AdminHome /> : <Home />}
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
