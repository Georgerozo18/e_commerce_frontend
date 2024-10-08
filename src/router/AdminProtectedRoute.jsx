import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const AdminProtectedRoute = ({ children }) => {
    const { user, is_authenticated } = useSelector((state) => state.login_slice)
    // Verificar si el usuario está autenticado y tiene rol de admin
    if (!is_authenticated || user?.role !== 'admin') {
        return <Navigate to="/" />
    }

    return children
}
