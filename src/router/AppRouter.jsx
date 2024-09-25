import { Route, Routes, Navigate } from 'react-router-dom'
import { Login, Home, Shop } from '../pages'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    )
}