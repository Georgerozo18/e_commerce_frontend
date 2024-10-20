// category_thunk.js
import { createAsyncThunk } from '@reduxjs/toolkit'
const apiUrl = import.meta.env.VITE_API_URL

// Fetch all categories
export const fetch_categories_thunk = createAsyncThunk(
    'categories/fetch_categories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/categories/`)
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch categories')
            }

            return data  
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

// Create a new category
export const create_category_thunk = createAsyncThunk(
    'categories/create_category',
    async (categoryData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryData),
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to create category')
            }

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

// Update a category
export const update_category_thunk = createAsyncThunk(
    'categories/update_category',
    async (categoryData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/categories/${categoryData._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoryData),
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to update category')
            }

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

// Delete a category
export const delete_category_thunk = createAsyncThunk(
    'categories/delete_category',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/categories/${categoryId}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to delete category')
            }

            return categoryId
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)
