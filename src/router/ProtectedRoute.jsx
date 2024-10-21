import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const { is_authenticated } = useSelector(state => state.login_slice)

    if (!is_authenticated) {
        return <Navigate to="/" replace />
    }
    return children
}
