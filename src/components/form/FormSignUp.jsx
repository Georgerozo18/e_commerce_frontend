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

export const FormSignUp = () => {
    const dispatch = useDispatch()

    const toggleSign = () => {
        dispatch(set_is_flipped())
    }

    return (
        <FormContainer>
            <TitleContainer>
                <FormTitle title='Create an account' className='form_title' />
            </TitleContainer>
            <FormInput label='Full name' type='text' placeholder='Enter your full name' />
            <FormInput label='Username' type='text' placeholder='Enter your username' />
            <FormInput label='Password' type='password' placeholder='Enter your password' />
            <FormButton type='submit' textValue='Sign up' />
            <FormSpan
                text="have already an account? "
                strong_text='Enter here'
                handleClick={toggleSign} />
        </FormContainer>
    )
}
