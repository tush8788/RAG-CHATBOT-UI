import { configureStore } from "@reduxjs/toolkit"
import userSlice, { type userTypes } from './slice/userSlice'

export const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export type RootState = {
    user: userTypes
}

export type AppDispatch = typeof store.dispatch