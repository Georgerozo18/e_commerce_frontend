import {configureStore} from "@reduxjs/toolkit"
import { page_one_slice } from './slices/page_one'
import { page_two_slice } from "./slices/page_two/page_two_slice"
import { page_three_slice } from "./slices/page_three/page_three_slice"

export const store = configureStore({
    reducer:{
        page_one_slice:page_one_slice.reducer,
        page_two_slice:page_two_slice.reducer,
        page_three_slice:page_three_slice.reducer
    }
})