import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    color_page_three:'#3867d6'
}

export const page_three_slice = createSlice({
    name:'page_three_slice',
    initialState,
    reducers:{
        set_color_page_three:(state, action)=>{
            state.color_page_three = action.payload
        }
    }
})

export const {
    set_color_page_three
} = page_three_slice.actions