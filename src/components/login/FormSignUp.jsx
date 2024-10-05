import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set_is_flipped } from '../../redux/slices'
import {
    FormContainer,
    TitleContainer,
    FormTitle,
    FormInput,
    FormSpan,
    FormButton,
} from '.'

import { signup_user_thunk } from '../../redux/thunks/signup_thunk'

export const FormSignUp = () => {
    const dispatch = useDispatch()
    const {
        is_loading,
        signup_error,
        signup_success
    } = useSelector(state => state.signup_slice)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullname] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(signup_user_thunk({ username, password, fullname }))
    }

    const toggleSign = () => {
        dispatch(set_is_flipped())
    }

    return (
        <FormContainer handleSubmit={handleSubmit}>
            <TitleContainer>
                <FormTitle title='Create an account' className='form_title' />
            </TitleContainer>
            <FormInput
                label='Full name'
                type='text'
                placeholder='Enter your full name'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)} />
            <FormInput
                label='Username'
                type='text'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            <FormInput
                label='Password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <FormButton
                type='submit'
                textValue={is_loading ? 'Signing up...' : 'Sign Up'}
                disabled={is_loading} />
            {signup_error && <p className="error_message">{signup_error}</p>}
            {signup_success && <p className="success_message">Signup successful!</p>}
            <FormSpan
                text="have already an account? "
                strong_text='Enter here'
                handleClick={toggleSign} />
        </FormContainer>
    )
}
