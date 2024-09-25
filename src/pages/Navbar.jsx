import { NavLink } from 'react-router-dom'
import '../styles/pages/Navbar.css'
const navItems = [
    { title: 'Home', navigateTo: '/' },
    { title: 'Shop', navigateTo: '/shop' },
    { title: 'Sign up for free', navigateTo: '/login' },
]

export const Navbar = () => {
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