import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const { is_authenticated } = useSelector(state => state.login_slice)

    if (!is_authenticated) {
        // Si el usuario no está autenticado, redirige al login
        return <Navigate to="/login" replace />
    }
    // Si está autenticado, renderiza el componente hijo
    return children
}
