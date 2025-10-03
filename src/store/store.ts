import { configureStore } from "@reduxjs/toolkit"
import userSlice, { type userTypes } from './slice/userSlice'
import utilsSlice, { type UtilsSliceType } from './slice/utilsSlice'
import dashboardSlice, {type DashboardSliceType} from "./slice/dashboardSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        utils: utilsSlice,
        dashboard: dashboardSlice
    }
})

export type RootState = {
    user: userTypes
    utils: UtilsSliceType
    dashboard: DashboardSliceType
}

export type AppDispatch = typeof store.dispatch