import {configureStore} from "@reduxjs/toolkit"
import { login_slice, signup_slice } from './slices'
import { page_two_slice } from "./slices/page_two/page_two_slice"
import { page_three_slice } from "./slices/page_three/page_three_slice"

export const store = configureStore({
    reducer:{
        login_slice:login_slice.reducer,
        signup_slice:signup_slice.reducer,
        page_two_slice:page_two_slice.reducer,
        page_three_slice:page_three_slice.reducer
    }
})