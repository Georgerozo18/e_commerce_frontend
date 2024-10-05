import { createAsyncThunk } from '@reduxjs/toolkit'
const apiUrl = import.meta.env.VITE_API_URL

export const fetch_products_thunk = createAsyncThunk(
    'products/fetch_products',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/products/`)
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch products')
            }

            return data  
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)