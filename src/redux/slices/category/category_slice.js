import { createSlice } from '@reduxjs/toolkit'
import { fetch_categories_thunk, delete_category_thunk, create_category_thunk, update_category_thunk } from '../../thunks/category_thunk'

const initialState = {
    categories: [],
    is_loading_category: false,
    create_success: false,
    update_success: false,
    current_view: 'list',
    error: null,
    current_category: null,
    created_category: null
}

export const category_slice  = createSlice({
    name:'category_slice',
    initialState,
    reducers:{
        reset_create_category_success:(state)=>{
            state.create_success = false,
            state.created_category = null 
        }, 
        reset_update_category_success:(state)=>{
            state.update_success = false
        }, 
        set_current_category_view: (state, action)=>{
            state.current_view = action.payload
        },
        set_current_category: (state, action) => {
            state.current_category = action.payload
        },
        reset_current_category: (state) => {
            state.current_category = null
        },
    },
    extraReducers:(builder)=>{
        builder
            // Fetch categories
            .addCase(fetch_categories_thunk.pending, (state) => {
                state.is_loading_category = true
                state.error = null
            })
            .addCase(fetch_categories_thunk.fulfilled, (state, action) => {
                state.is_loading_category = false
                state.categories = action.payload
            })
            .addCase(fetch_categories_thunk.rejected, (state, action) => {
                state.is_loading_category = false
                state.error = action.payload
            })
            // Delete categories
            .addCase(delete_category_thunk.fulfilled, (state, action) =>{
                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload
                )
            })
            // Create categories
            .addCase(create_category_thunk.pending, (state) => {
                state.is_loading_category = true
                state.error = null
            })
            .addCase(create_category_thunk.fulfilled, (state, action) => {
                state.categories.push(action.payload)
                state.create_success = true,
                state.created_category = action.payload  // Guarda la categoría creada
            })
            .addCase(create_category_thunk.rejected, (state, action) => {
                state.error = action.payload
            })
             // Update categories
            .addCase(update_category_thunk.pending, (state) => {
                state.is_loading_category = true
                state.error = null
            })
            .addCase(update_category_thunk.fulfilled, (state, action) => {
                state.is_loading_category = false
                state.update_success = true
            })
            .addCase(update_category_thunk.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {
    reset_create_category_success,
    reset_update_category_success,
    set_current_category_view,
    set_current_category,
    reset_current_category
} = category_slice.actions