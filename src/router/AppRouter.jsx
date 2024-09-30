import { Route, Routes, Navigate } from 'react-router-dom'
import { Login, Home, Shop, Profile } from '../pages'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    )
}