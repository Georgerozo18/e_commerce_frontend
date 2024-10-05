import { createSlice } from '@reduxjs/toolkit'
import { fetch_products_thunk } from '../../thunks/product_thunk'

const initialState = {
    products: [],
    is_loading: false,
    error: null
}

export const product_slice = createSlice({
    name:'products_slice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetch_products_thunk.pending, (state) => {
                state.is_loading = true
                state.error = null
            })
            .addCase(fetch_products_thunk.fulfilled, (state, action) => {
                state.is_loading = false
                state.products = action.payload
            })
            .addCase(fetch_products_thunk.rejected, (state, action) => {
                state.is_loading = false
                state.error = action.payload
            })
    }
})

export const {} = product_slice.actions