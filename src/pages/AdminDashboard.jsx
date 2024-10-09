import { useDispatch, useSelector } from "react-redux"
import { PageContainer } from "../components/PageContainer"
import { signout_user_thunk } from '../redux/thunks/login_thunk'
import { ProfileButton, ProfileTitle } from "../components/profile"

export const AdminDashboard = () => {
    const {
        user,
        is_authenticated,
        is_loading
    } = useSelector(state => state.login_slice)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(signout_user_thunk())
    }

    if (is_loading) return <p>Verifying session...</p>
    return is_authenticated && user ? (
        <PageContainer
            className='profile_page_container'
            background={'radial-gradient(circle, rgb(94 43 125) 30%, rgb(61 36 92) 100%)'}>
            <ProfileTitle user={user.fullname} />
            <ProfileButton handleLogout={handleLogout} />
        </PageContainer>
    ) : (
        <p>Could not load user information</p>
    )
}
