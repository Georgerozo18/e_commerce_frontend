import { createAsyncThunk } from '@reduxjs/toolkit'

const apiUrl = import.meta.env.VITE_API_URL

export const signup_user_thunk = createAsyncThunk(
    'signup_slice/signup_user',
    async(userData, { rejectWithValue })=>{
        try{
            const response = await fetch(`${apiUrl}/auth/sign_up/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })

            const contentType = response.headers.get('content-type')
            // Verificar si la respuesta es JSON
            if (!contentType || !contentType.includes('application/json')) {
                const errorText = await response.text()
                throw new Error(`Unexpected response: ${errorText}`)
            }

            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Signup failed')
            }

            return data
        } catch(error){
            return rejectWithValue(error.message || 'An error occurred during signup')
        }
    }
)