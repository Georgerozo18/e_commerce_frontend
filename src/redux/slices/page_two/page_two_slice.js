import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    color_page_two:'#0fb9b1'
}

export const page_two_slice = createSlice({
    name:'page_two_slice',
    initialState,
    reducers:{
        set_color_page_two:(state, action)=>{
            state.color_page_two = action.payload
        }
    }
})

export const {
    set_color_page_two
} = page_two_slice.actions