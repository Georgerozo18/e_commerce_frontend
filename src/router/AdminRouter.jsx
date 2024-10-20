import { Route, Routes, Navigate } from 'react-router-dom'
import { AdminDashboard, AdminProducts, AdminCategories } from '../pages'
import { AdminProtectedRoute } from './'


export const AdminRouter = () => {
    return (
        <Routes>
            <Route element={<AdminProtectedRoute />}>
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/products' element={<AdminProducts />} />
                <Route path='/admin/categories' element={<AdminCategories />} />
            </Route>
            <Route path='*' element={<Navigate to='/admin/dashboard' />} />
        </Routes>
    );
}