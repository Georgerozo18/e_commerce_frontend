import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/pages/Navbar.css'


export const Navbar = () => {
    const { is_authenticated, user } = useSelector(state => state.login_slice)

    // Si el usuario es un administrador, mostrar solo las rutas de admin
    const adminNavItems = [
        { title: 'Dashboard', navigateTo: '/admin/dashboard' },
        { title: 'Products', navigateTo: '/admin/products' },
    ]

    // Si el usuario es normal o no está autenticado, mostrar rutas estándar
    const userNavItems = [
        { title: 'Home', navigateTo: '/' },
        { title: 'Shop', navigateTo: '/shop' },
        is_authenticated
            ? { title: 'Profile', navigateTo: '/profile' }
            : { title: 'Sign up for free', navigateTo: '/login' },
    ]

    const navItems = user?.role === 'admin' ? adminNavItems : userNavItems

    return (
        <nav className='navbar'>
            <ul className='navbar_list'>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink to={item.navigateTo} replace>
                            {item.title}
                        </NavLink>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}