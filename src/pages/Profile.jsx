import { useSelector, useDispatch } from 'react-redux'
import { PageContainer } from '../components/PageContainer'
import { ProfileButton, ProfileTitle } from '../components/profile/'

import '../styles/pages/Profile.css'

export const Profile = () => {
    const {
        user,
        is_authenticated,
        is_loading
    } = useSelector(state => state.login_slice)


    if (is_loading) return <p>Verifying session...</p>

    return is_authenticated && user ? (
        <PageContainer
            className='profile_page_container'
            background={'radial-gradient(circle, rgb(94 43 125) 30%, rgb(61 36 92) 100%)'}>
            <ProfileTitle user={user.fullname} />
        </PageContainer>
    ) : (
        <p>Could not load user information</p>
    )
}
