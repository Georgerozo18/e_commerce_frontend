import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout_user_thunk } from '../redux/thunks/login_thunk'
import '../styles/pages/Navbar.css'
import {
    reset_current_product,
    set_current_view,
    reset_current_category,
    set_current_category_view
} from '../redux/slices'

export const Navbar = () => {
    const { is_authenticated, user } = useSelector(state => state.login_slice)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(signout_user_thunk())
    }

    // Si el usuario es un administrador, mostrar solo las rutas de admin
    const adminNavItems = [
        { title: 'Dashboard', navigateTo: '/admin/dashboard' },
        {
            title: 'Products',
            navigateTo: '/admin/products',
            onClick: () =>
                dispatch(set_current_view('list'),
                    dispatch(reset_current_product())
                )
        },
        {
            title: 'Categories',
            navigateTo: 'admin/categories',
            onClick: () =>
                dispatch(set_current_category_view('list'),
                    dispatch(reset_current_category())
                )
        }
    ]

    // Si el usuario es normal o no está autenticado, mostrar rutas estándar
    const userNavItems = [
        { title: 'Home', navigateTo: '/' },
        { title: 'Shop', navigateTo: '/shop' },
        is_authenticated
            ? {} //{ title: 'Profile', navigateTo: '/profile' }
            : { title: 'Sign up for free', navigateTo: '/login' },
    ]

    const navItems = user?.role === 'admin' ? adminNavItems : userNavItems

    return (
        <nav className='navbar'>
            <ul className='navbar_list'>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.navigateTo}
                            replace
                            onClick={item.onClick ? item.onClick : null}>
                            {item.title}
                        </NavLink>
                    </li>
                ))}
                {is_authenticated && (
                    <li className='navbar_logout_button' onClick={handleLogout}>
                        Logout
                    </li>
                )}
            </ul>
        </nav>
    )
}