import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '../components/PageContainer'
import { FormCard, FormSignUp, FormSignIn } from '../components/login'

export const Login = () => {
    const { is_authenticated } = useSelector(state => state.login_slice)
    const navigate = useNavigate()

    useEffect(() => {
        if (is_authenticated) {
            navigate('/profile')
        }
    }, [is_authenticated, navigate])

    return (
        <PageContainer
            appTitle={'Login'}
            background={'radial-gradient(circle, rgb(250, 188, 46) 50%, rgb(204, 139, 30) 100%)'}>
            {
                is_authenticated ? (
                    <p>Redirecting to profile...</p>
                ) : (
                    <FormCard
                        front_children={<FormSignIn />}
                        back_children={<FormSignUp />} />
                )
            }
        </PageContainer>
    )
}