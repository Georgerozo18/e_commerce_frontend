import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    color_page_one:'#a55eea'
}

export const page_one_slice = createSlice({
    name:'page_one_slice',
    initialState,
    reducers:{
        set_color_page_one:(state, action)=>{
            state.color_page_one = action.payload
        }
    }
})

export const {
    set_color_page_one
} = page_one_slice.actions