import { createSlice } from '@reduxjs/toolkit'
import { fetch_sales_thunk, delete_sale_thunk, create_sale_thunk, update_sale_thunk } from '../../thunks/sale_thunk'

const initialState = {
    sales: [],
    is_loading_sale: false,
    sales_loaded: false,
    create_success: false,
    update_success: false,
    current_view: 'list',
    error: null,
    current_sale: null,
    created_sale: null
}

export const sale_slice  = createSlice({
    name:'sale_slice',
    initialState,
    reducers:{
        reset_create_sale_success:(state)=>{
            state.create_success = false,
            state.created_sale = null 
        }, 
        reset_update_sale_success:(state)=>{
            state.update_success = false
        }, 
        set_current_sale_view: (state, action)=>{
            state.current_view = action.payload
        },
        set_current_sale: (state, action) => {
            state.current_sale = action.payload
        },
        reset_current_sale: (state) => {
            state.current_sale = null
        },
        set_sales_loaded: (state, action)=>{
            state.sales_loaded = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            // Fetch sales
            .addCase(fetch_sales_thunk.pending, (state) => {
                state.is_loading_sale = true
                state.error = null
            })
            .addCase(fetch_sales_thunk.fulfilled, (state, action) => {
                state.is_loading_sale = false
                state.sales = action.payload
                state.sales_loaded = true
            })
            .addCase(fetch_sales_thunk.rejected, (state, action) => {
                state.is_loading_sale = false
                state.error = action.payload
            })
            // Delete sale
            .addCase(delete_sale_thunk.fulfilled, (state, action) =>{
                state.sales = state.sales.filter(
                    (sale) => sale._id !== action.payload
                )
            })
            // Create sale
            .addCase(create_sale_thunk.pending, (state) => {
                state.is_loading_sale = true
                state.error = null
            })
            .addCase(create_sale_thunk.fulfilled, (state, action) => {
                state.sales.push(action.payload)
                state.create_success = true,
                state.created_sale = action.payload
            })
            .addCase(create_sale_thunk.rejected, (state, action) => {
                state.error = action.payload
            })
             // Update sale
            .addCase(update_sale_thunk.pending, (state) => {
                state.is_loading_sale = true
                state.error = null
            })
            .addCase(update_sale_thunk.fulfilled, (state, action) => {
                state.is_loading_sale = false
                state.update_success = true
            })
            .addCase(update_sale_thunk.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {
    reset_create_sale_success,
    reset_update_sale_success,
    set_current_sale_view,
    set_current_sale,
    reset_current_sale,
    set_sales_loaded
} = sale_slice.actions
