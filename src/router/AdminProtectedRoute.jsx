import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const AdminProtectedRoute = () => {
    const { user, is_authenticated } = useSelector((state) => state.login_slice)

    if (!is_authenticated || user?.role !== 'admin') {
        return <Navigate to="/" />
    }
    return <Outlet />
}
