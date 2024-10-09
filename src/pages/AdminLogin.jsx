import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { FormCard, FormSignIn } from '../components/login'

export const AdminLogin = () => {
    const { is_authenticated } = useSelector(state => state.login_slice)
    const navigate = useNavigate()

    useEffect(() => {
        if (is_authenticated) {
            navigate('/admin/dashboard')
        }
    }, [is_authenticated, navigate])

    return (
        <PageContainer
            appTitle={'Login'}
            background={'radial-gradient(circle, rgb(255 137 0) 50%, rgb(181 62 17) 100%)'}>
            {
                is_authenticated ? (
                    <p>Redirecting to profile...</p>
                ) : (
                    <FormCard front_children={
                        <FormSignIn
                            authRoute='/auth_admin/login'
                            title='Admin Access'
                            subtitle='Please enter your admin credentials.'
                            showCreateAccount={false}
                            error_position='altered_error_position'
                        />
                    } />
                )
            }
        </PageContainer>
    )
}