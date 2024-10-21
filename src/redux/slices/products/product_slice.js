import { createSlice } from '@reduxjs/toolkit'
import { fetch_products_thunk, delete_product_thunk, create_products_thunk, update_product_thunk, upload_image_thunk, upload_model_thunk  } from '../../thunks/product_thunk'

const initialState = {
    products: [],
    is_loading: false,
    products_loaded: false,
    create_success: false,
    update_success: false,
    upload_image_success: false, 
    upload_model_success: false, 
    current_view: 'list',
    error: null,
    current_product: null,
    created_product: null
}

export const product_slice = createSlice({
    name:'products_slice',
    initialState,
    reducers:{
        reset_create_success:(state)=>{
            state.create_success = false,
            state.created_product = null 
        }, 
        reset_update_success:(state)=>{
            state.update_success = false
        }, 
        reset_upload_image_success: (state) => {
            state.upload_image_success = false
        },
        reset_upload_model_success: (state) => {
            state.upload_model_success = false
        },
        set_current_view: (state, action)=>{
            state.current_view = action.payload
        },
        set_current_product: (state, action) => {
            state.current_product = action.payload
        },
        reset_current_product: (state) => {
            state.current_product = null
        },
        set_products_loaded: (state, action)=>{
            state.products_loaded = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            // Fecth products
            .addCase(fetch_products_thunk.pending, (state) => {
                state.is_loading = true
                state.error = null
            })
            .addCase(fetch_products_thunk.fulfilled, (state, action) => {
                state.is_loading = false
                state.products = action.payload
                state.products_loaded = true
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
                state.create_success = true,
                state.created_product = action.payload  // Guarda el producto creado
            })
            .addCase(create_products_thunk.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(upload_image_thunk.fulfilled, (state, action) => {
                state.upload_image_success = true
            })
            .addCase(upload_model_thunk.fulfilled, (state, action) => {
                state.upload_model_success = true
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
    reset_upload_image_success,
    reset_upload_model_success,
    set_current_view,
    set_current_product,
    reset_current_product,
    set_products_loaded
} = product_slice.actions