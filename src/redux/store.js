import {configureStore} from "@reduxjs/toolkit"
import { 
    login_slice, 
    signup_slice, 
    product_slice,
    checkout_slice,
    category_slice,
    sale_slice,
} from './slices'


export const store = configureStore({
    reducer:{
        login_slice:login_slice.reducer,
        signup_slice:signup_slice.reducer,
        checkout_slice:checkout_slice.reducer,
        product_slice:product_slice.reducer,
        category_slice:category_slice.reducer,
        sale_slice:sale_slice.reducer
    }
})