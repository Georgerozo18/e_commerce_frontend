import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    is_flipped: false,
    sign_in_username:'',
    sign_in_password:''
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
    }
})

export const {
    set_is_flipped,
    set_sign_in_username,
    set_sign_in_password
} = login_slice.actions