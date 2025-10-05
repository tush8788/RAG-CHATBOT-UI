import { createSlice } from '@reduxjs/toolkit'

export type UtilsSliceType = {
    theme: {
        mode: 'dark' | 'light',
    }
    sidebarCollapsed: boolean
}

const utilsSlice = createSlice({
    name: 'utils',
    initialState: {
        theme: {
            mode:  localStorage.getItem('theme') || 'light'
        },
        sidebarCollapsed: false
    } as UtilsSliceType,
    reducers: {
        updateThemeMode: (state, action) => {
            localStorage.setItem('theme',action.payload)
            state.theme.mode = action.payload
        },
        updateSidebarCollapsed: (state, action) => {
            state.sidebarCollapsed = action.payload
        }
    }
})


export const { updateSidebarCollapsed, updateThemeMode } = utilsSlice.actions;
export default utilsSlice.reducer