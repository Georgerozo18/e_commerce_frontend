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

export const create_products_thunk = createAsyncThunk(
    'products/create_product',
    async (productData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to create product')
            }

            return fulfillWithValue(data)  // Devuelve el producto creado
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

export const delete_product_thunk = createAsyncThunk(
    'products/delete_product',
    async(productId, {rejectWithValue})=>{
        try {
            const response = await fetch(`${apiUrl}/products/${productId}`, {
                method: 'DELETE',
                credentials:'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to delete product')
            }

            return productId
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)