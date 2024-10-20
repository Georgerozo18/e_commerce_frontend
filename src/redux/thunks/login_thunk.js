import {createAsyncThunk} from '@reduxjs/toolkit'
import { set_logout } from '../slices/login/login_slice'
import { fetch_sales_thunk } from './sale_thunk'
const apiUrl = import.meta.env.VITE_API_URL

export const signin_user_thunk = createAsyncThunk(
    'login_slice/login_user',
    async(credentials, {rejectWithValue, dispatch})=>{
        const { username, password, authRoute } = credentials
        try{
            const response = await fetch(`${apiUrl}${authRoute}`,{
                method:'POST',
                headers:{ 'Content-Type':'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })

            const contentType = response.headers.get('content-type')
            // Si la respuesta no es JSON, lanzar un error
            if (!contentType || !contentType.includes('application/json')) {
                const errorText = await response.text() 
                throw new Error(`Unexpected response: ${errorText}`)
            }

            const data = await response.json()

            if(!response.ok){
                return rejectWithValue(data.message || 'Login failed')
            }

            // Verificar si el usuario es admin y despachar fetch_sales_thunk
            if (data.user?.role === 'admin') {
                dispatch(fetch_sales_thunk())
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
            const response = await fetch(`${apiUrl}/auth/validate/`, {
            method: "GET",
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error("Your session has expired, please log in again")
        }

        const data = await response.json()
        return { user: data } // Retornar los datos del usuario
        } catch (error) {
        return rejectWithValue(error.message)
        }
    }
)

export const signout_user_thunk = createAsyncThunk(
    'login_slice/logout_user',
    async(_, { rejectWithValue, dispatch })=>{
        try {
            const response = await fetch(`${apiUrl}/auth/logout`,{
                method:'POST',
                credentials:'include'
            })
            if (!response.ok) {
                const data = await response.json()
                return rejectWithValue(data.message || 'Logout failed')
            }
            // Limpiar el estado de usuario en el frontend
            dispatch(set_logout())
        } catch (error) {
        return rejectWithValue(error.message || 'An error occurred during logout')
        }
    }
)