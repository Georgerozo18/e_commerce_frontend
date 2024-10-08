import { useDispatch, useSelector } from 'react-redux'
import {
    set_is_flipped,
    set_sign_in_username,
    set_sign_in_password
} from '../../redux/slices'
import { signin_user_thunk } from '../../redux/thunks/login_thunk'
import {
    FormContainer,
    TitleContainer,
    FormTitle,
    FormInput,
    FormSpan,
    FormButton,
    FormImage,
} from '.'
import icon from '../../assets/images/form_icon.png'

export const FormSignIn = ({ showCreateAccount = true, title = 'Welcome back', subtitle = 'Please enter your details to sign in.', error_position = 'normal_error_position', authRoute = '/auth/login' }) => {
    const dispatch = useDispatch()

    const {
        sign_in_username,
        sign_in_password,
        is_loading,
        signin_error
    } = useSelector(state => state.login_slice)

    const toggleSign = () => {
        dispatch(set_is_flipped())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(signin_user_thunk({
            username: sign_in_username,
            password: sign_in_password,
            authRoute
        }))
    }

    return (
        <FormContainer handleSubmit={handleSubmit}>
            <FormImage icon_url={icon} />
            <TitleContainer>
                <FormTitle title={title} className='form_title' />
                <FormTitle title={subtitle} className='form_subtitle' />
            </TitleContainer>
            <FormInput
                label='Username'
                type='text'
                placeholder='Enter your username'
                value={sign_in_username}
                onChange={event => dispatch(set_sign_in_username(event.target.value))} />
            <FormInput
                label='Password'
                type='password'
                placeholder='Enter your password'
                value={sign_in_password}
                onChange={event => dispatch(set_sign_in_password(event.target.value))} />
            <FormButton type='submit' textValue={is_loading ? 'Signing in...' : 'Sign in'} />
            {signin_error && <p className={`error_message ${error_position}`}>{signin_error}</p>}
            {showCreateAccount && (
                <FormSpan
                    text="don't have an account? "
                    strong_text='Create account'
                    handleClick={toggleSign} />
            )}
        </FormContainer>
    )
}
