import { PageContainer } from '../components/PageContainer'
import {
    FormContainer,
    TitleContainer,
    FormTitle,
    FormInput,
    FormSpan,
    FormButton,
    FormImage,
} from '../components/form'
import icon from '../assets/images/form_icon.png'

export const Login = () => {
    return (
        <PageContainer
            appTitle={'Login'}
            background={'radial-gradient(circle, rgb(250, 188, 46) 50%, rgb(204, 139, 30) 100%)'}>
            <FormContainer>
                <FormImage icon_url={icon} />
                <TitleContainer>
                    <FormTitle title='Welcome back' className='form_title' />
                    <FormTitle title='Please enter your details to sign in.' className='form_subtitle' />
                </TitleContainer>
                <FormInput label='Username' type='text' placeholder='Enter your username' />
                <FormInput label='Password' type='password' placeholder='Enter your password' />
                <FormButton type='submit' textValue='Sign in' />
                <FormSpan text="don't have an account? " strong_text='Create account' />
            </FormContainer>
        </PageContainer>
    )
}