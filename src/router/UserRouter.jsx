import { Route, Routes, Navigate } from 'react-router-dom'
import { Home, Login, Profile, Shop, AdminLogin } from '../pages'
import { ProtectedRoute } from './'

export const UserRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/admin_login' element={<AdminLogin />} />
            {/* <Route path='/profile' element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>}
            /> */}
            {/* Si el usuario intenta acceder a una ruta inválida, redirigir al home */}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}