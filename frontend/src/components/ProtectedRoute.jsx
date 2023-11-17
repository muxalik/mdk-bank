import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const { user } = useAuth()
  console.log(user);

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
