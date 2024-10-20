import { createAsyncThunk } from '@reduxjs/toolkit'
const apiUrl = import.meta.env.VITE_API_URL

// Fetch all sales
export const fetch_sales_thunk = createAsyncThunk(
    'sales/fetch_sales',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/sales/`, {
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to fetch sales')
            }

            return data  
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

// Create a new sale
export const create_sale_thunk = createAsyncThunk(
    'sales/create_sale',
    async (saleData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleData),
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to create sale')
            }

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

// Update a sale
export const update_sale_thunk = createAsyncThunk(
    'sales/update_sale',
    async (saleData, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/sales/${saleData._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleData),
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to update sale')
            }

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)

// Delete a sale
export const delete_sale_thunk = createAsyncThunk(
    'sales/delete_sale',
    async (saleId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/sales/${saleId}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to delete sale')
            }

            return saleId
        } catch (error) {
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)
