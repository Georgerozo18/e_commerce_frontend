import { createSlice } from "@reduxjs/toolkit"
import { signup_user_thunk } from "../../thunks/signup/signup_thunk"

const initialState = {
    is_loading:false,
    signup_error: null,
    signup_success: false,
}

export const signup_slice = createSlice({
    name:'signup_slice', 
    initialState,
    reducers:{
        set_signup_success: (state)=>{
            state.signup_success = true
        }
    }, extraReducers:(builder)=>{
        builder
        .addCase(signup_user_thunk.pending, (state)=>{
            state.is_loading = true
            state.signup_error = null
            state.signup_success = false
        })
        .addCase(signup_user_thunk.fulfilled, (state)=>{
            state.is_loading = false
            state.signup_success = true
        })
        .addCase(signup_user_thunk.rejected, (state, action)=>{
            state.is_loading = false
            state.signup_error = action.payload
        })
    }
})

export const {
    set_signup_success 
} = signup_slice.actions