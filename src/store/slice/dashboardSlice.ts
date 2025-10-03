import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllChats } from '../../services/AiService'

type ChatType = {
    chatId:string
    title:string
}

export type DashboardSliceType = {
    chatList: ChatType[]
}

export const getChatList = createAsyncThunk('getChatList', async (_, thunkApi) => {
    try {
        let resp: any = await fetchAllChats()
        return resp.data.results
    }
    catch (err: any) {
        thunkApi.rejectWithValue(err)
    }
})

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        chatList: []
    } as DashboardSliceType,
    reducers: {
        updateChatList: (state, action) => {
            state.chatList = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChatList.fulfilled, (state, action) => {
            state.chatList = action.payload
        }).addCase(getChatList.pending, (state, action) => {

        }).addCase(getChatList.rejected, (state, action) => {
            state.chatList = [];
        })
    }
})

export const { updateChatList } = dashboardSlice.actions;
export default dashboardSlice.reducer