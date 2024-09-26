import { createSlice } from "@reduxjs/toolkit"
import { signin_user_thunk, check_user_session } from "../../thunks/login/login_thunk"

const initialState = {
    is_flipped: false,
    sign_in_username:'',
    sign_in_password:'',
    is_loading:false,
    signin_error:null,
    user:null
}

export const login_slice = createSlice({
    name:'login_slice',
    initialState,
    reducers:{
        set_is_flipped:(state)=>{
            state.is_flipped = !state.is_flipped
        }, 
        set_sign_in_username:(state, action)=>{
            state.sign_in_username = action.payload
        }, 
        set_sign_in_password:(state, action)=>{
            state.sign_in_password = action.payload
        }, 
        set_logout: (state)=>{
            state.user = null
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(signin_user_thunk.pending, (state)=>{
                state.is_loading = true
                state.signin_error = null
            })
            .addCase(signin_user_thunk.fulfilled, (state, action)=>{
                state.is_loading = false
                state.user = action.payload.user
            })
            .addCase(signin_user_thunk.rejected, (state, action)=>{
                state.is_loading = false
                state.signin_error = action.payload
            })
            .addCase(check_user_session.pending, (state) => {
                state.is_loading = true
                state.signin_error = null
            })
            .addCase(check_user_session.fulfilled, (state, action) => {
                state.is_loading = false
                state.user = action.payload.user
            })
            .addCase(check_user_session.rejected, (state, action) => {
                state.is_loading = false
                state.signin_error = action.payload
            })
    }
})

export const {
    set_is_flipped,
    set_sign_in_username,
    set_sign_in_password,
    set_logout
} = login_slice.actions