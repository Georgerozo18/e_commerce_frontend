import { useDispatch } from 'react-redux'
import { set_is_flipped } from '../../redux/slices'
import {
    FormContainer,
    TitleContainer,
    FormTitle,
    FormInput,
    FormSpan,
    FormButton,
    FormImage,
} from '../form'
import icon from '../../assets/images/form_icon.png'

export const FormSignIn = () => {
    const dispatch = useDispatch()

    const toggleSign = () => {
        dispatch(set_is_flipped())
    }

    return (
        <FormContainer>
            <FormImage icon_url={icon} />
            <TitleContainer>
                <FormTitle title='Welcome back' className='form_title' />
                <FormTitle title='Please enter your details to sign in.' className='form_subtitle' />
            </TitleContainer>
            <FormInput label='Username' type='text' placeholder='Enter your username' />
            <FormInput label='Password' type='password' placeholder='Enter your password' />
            <FormButton type='submit' textValue='Sign in' />
            <FormSpan
                text="don't have an account? "
                strong_text='Create account'
                handleClick={toggleSign} />
        </FormContainer>
    )
}
