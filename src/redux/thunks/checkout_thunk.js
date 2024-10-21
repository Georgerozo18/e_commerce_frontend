import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetch_products_thunk } from './product_thunk'
import toastr from 'toastr'
import { reset_cart } from '../slices/checkout/checkout_slice'

const apiUrl = import.meta.env.VITE_API_URL

export const checkout_thunk = createAsyncThunk(
    'checkout/checkout',
    async ({cart,navigate }, { rejectWithValue, fulfillWithValue, dispatch }) => {
        try {
            const response = await fetch(`${apiUrl}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products: cart }),
                credentials: 'include',
            })
            const data = await response.json()

            if (!response.ok) {
                // Si el token es inválido o falta, mostrar un mensaje de error con Toastr y redirigir
                if (data.message === "Access token missing or invalid") {
                    toastr.info('Please login to complete the purchase', 'Authentication Required')
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000) 
                } else {
                    toastr.error(data.message || 'Checkout failed')
                    dispatch(reset_cart())
                }
                return rejectWithValue(data.message || 'Checkout failed')
            }
            // Despachar acción para obtener productos nuevamente
            dispatch(fetch_products_thunk())
            toastr.success('Checkout successful!')

            return fulfillWithValue(data)
        } catch (error) {
            toastr.error(error.message || 'An error occurred')
            return rejectWithValue(error.message || 'An error occurred')
        }
    }
)