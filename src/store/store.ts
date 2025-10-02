import { configureStore } from "@reduxjs/toolkit"
import userSlice, { type userTypes } from './slice/userSlice'
import utilsSlice, { type UtilsSliceType } from './slice/utilsSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        utils: utilsSlice
    }
})

export type RootState = {
    user: userTypes
    utils: UtilsSliceType
}

export type AppDispatch = typeof store.dispatch