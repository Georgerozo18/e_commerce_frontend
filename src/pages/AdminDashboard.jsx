import { useSelector } from "react-redux"
import { PageContainer } from "../components/PageContainer"
import { ProfileTitle } from "../components/profile"

export const AdminDashboard = () => {
    const {
        user,
        is_authenticated,
        is_loading
    } = useSelector(state => state.login_slice)

    if (is_loading) return <p>Verifying session...</p>
    return is_authenticated && user ? (
        <PageContainer
            className='page_container'
            background={'radial-gradient(circle, rgb(0 180 252) 30%, rgb(0 91 197) 100%)'}>
            <ProfileTitle user={user.fullname} />
        </PageContainer>
    ) : (
        <p>Could not load user information</p>
    )
}
