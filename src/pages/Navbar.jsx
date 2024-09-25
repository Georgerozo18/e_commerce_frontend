import { NavLink } from 'react-router-dom'
import '../styles/pages/Navbar.css'
const navItems = [
    { title: 'Page One', navigateTo: '/' },
    { title: 'Page Two', navigateTo: '/page_two' },
    { title: 'Page Three', navigateTo: '/page_three' },
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