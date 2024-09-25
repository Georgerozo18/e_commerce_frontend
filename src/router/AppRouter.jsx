import { Route, Routes, Navigate } from 'react-router-dom'
import { PageOne, PageTwo, PageThree } from '../pages'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<PageOne />} />
            <Route path='/page_two' element={<PageTwo />} />
            <Route path='/page_three' element={<PageThree />} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    )
}