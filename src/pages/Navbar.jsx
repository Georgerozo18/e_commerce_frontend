import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/pages/Navbar.css'


export const Navbar = () => {
    const { is_authenticated } = useSelector(state => state.login_slice)

    const navItems = [
        { title: 'Home', navigateTo: '/' },
        { title: 'Shop', navigateTo: '/shop' },
        is_authenticated
            ? { title: 'Profile', navigateTo: '/profile' }
            : { title: 'Sign up for free', navigateTo: '/login' },
    ]
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