import {createAsyncThunk} from '@reduxjs/toolkit'

export const signin_user_thunk = createAsyncThunk(
    'login_slice/login_user',
    async(credentials, {rejectWithValue})=>{
        try{
            const response = await fetch('http://localhost:3001/api/v1/auth/login',{
                method:'POST',
                headers:{ 'Content-Type':'application/json' },
                body: JSON.stringify(credentials),
                credentials: 'include'
            })

            const data = await response.json()
            if(!response.ok){
                return rejectWithValue(data.message || 'Login failed')
            }

            return data
        } catch(error){
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

export const check_user_session = createAsyncThunk(
    'login_slice/check_user_session',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/auth/validate", {
            method: "GET",
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("User session not found")
        }

        const data = await response.json()
        return { user: data } // Retornar los datos del usuario
        } catch (error) {
        return rejectWithValue(error.message)
        }
    }
)