import { createSlice } from "@reduxjs/toolkit"
import { checkout_thunk } from "../../thunks/checkout_thunk"

const initialState = {
    cart: [],
    is_loading: false,
    checkout_success: false,
    error: null,
}

export const checkout_slice  = createSlice({
    name:'checkout_slice',
    initialState,
    reducers:{
        add_to_cart: (state, action) => {
            const product = action.payload
            const existingProduct = state.cart.find((item) => item.product._id === product._id)

            if (existingProduct) {
                existingProduct.quantity += product.quantity
            } else {
                state.cart.push({ product, quantity: product.quantity })
            }
        },
        remove_from_cart: (state, action) => {
            const productId = action.payload
            state.cart = state.cart.filter((item) => item.product._id !== productId)
        },
        reset_cart: (state) => {
            state.cart = []
            state.checkout_success = false
        },
    }, 
    extraReducers: (builder)=>{
        builder
            .addCase(checkout_thunk.pending, (state) => {
                state.is_loading = true
                state.error = null
            })
            .addCase(checkout_thunk.fulfilled, (state, action) => {
                state.is_loading = false
                state.checkout_success = true
                state.cart = []
            })
            .addCase(checkout_thunk.rejected, (state, action) => {
                state.is_loading = false
                state.error = action.payload
            })
    }
})

export const {
    add_to_cart, 
    remove_from_cart,
    reset_cart
} = checkout_slice .actions