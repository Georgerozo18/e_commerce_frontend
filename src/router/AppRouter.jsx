import { Route, Routes, Navigate } from 'react-router-dom'
import { Login, AdminLogin, Home, Shop, Profile, Dashboard } from '../pages'
import { ProtectedRoute } from './ProtectedRoute'
import { SecretSequence } from '../components/SecretSequence'

export const AppRouter = () => {

    const secretSequence = import.meta.env.VITE_SECRET_SEQUENCE.split('')
    return (
        <>
            <SecretSequence sequence={secretSequence} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/login_admin' element={<AdminLogin />} />
                <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path='/shop' element={<Shop />} />
                <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>
        </>
    )
}