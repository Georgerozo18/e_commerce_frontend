import { createSlice } from '@reduxjs/toolkit'
import { fetch_products_thunk, delete_product_thunk, create_products_thunk, update_product_thunk  } from '../../thunks/product_thunk'

const initialState = {
    products: [],
    is_loading: false,
    create_success: false,
    update_success: false,
    current_view: 'list',
    error: null,
    current_product: null
}

export const product_slice = createSlice({
    name:'products_slice',
    initialState,
    reducers:{
        reset_create_success:(state)=>{
            state.create_success = false
        }, 
        reset_update_success:(state)=>{
            state.update_success = false
        }, 
        set_current_view: (state, action)=>{
            state.current_view = action.payload
        },
        set_current_product: (state, action) => {
            state.current_product = action.payload
        },
        reset_current_product: (state) => {
            state.current_product = null
        }
    },
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
            .addCase(delete_product_thunk.fulfilled, (state, action) =>{
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                )
            })
            .addCase(create_products_thunk.pending, (state) => {
                state.is_loading = true
                state.error = null
            })
            .addCase(create_products_thunk.fulfilled, (state, action) => {
                state.products.push(action.payload)
                state.create_success = true
            })
            .addCase(create_products_thunk.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(update_product_thunk.pending, (state) => {
                state.is_loading = true
                state.error = null
            })
            .addCase(update_product_thunk.fulfilled, (state, action) => {
                state.is_loading = false
                state.update_success = true
            })
            .addCase(update_product_thunk.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {
    reset_create_success,
    reset_update_success,
    set_current_view,
    set_current_product,
    reset_current_product
} = product_slice.actions