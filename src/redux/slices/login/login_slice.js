import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    is_flipped: false
}

export const login_slice = createSlice({
    name:'login_slice',
    initialState,
    reducers:{
        set_is_flipped:(state)=>{
            state.is_flipped = !state.is_flipped
        }
    }
})

export const {
    set_is_flipped
} = login_slice.actions