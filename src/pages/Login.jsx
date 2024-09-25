import { PageContainer } from '../components/PageContainer'
import { FormCard, FormSignUp, FormSignIn } from '../components/form'

export const Login = () => {

    return (
        <PageContainer
            appTitle={'Login'}
            background={'radial-gradient(circle, rgb(250, 188, 46) 50%, rgb(204, 139, 30) 100%)'}>
            <FormCard
                front_children={<FormSignIn />}
                back_children={<FormSignUp />} />
        </PageContainer>
    )
}