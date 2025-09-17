import { createSlice } from '@reduxjs/toolkit'

export type userTypes = {
    name: string
    email: string
    token: string,
    profileImage: string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        profileImage:'',
        token: '',
    } as userTypes,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, token , profileImage} = action.payload
            state.name = name
            state.email = email
            state.profileImage = profileImage
            state.token = token
        }
    }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer