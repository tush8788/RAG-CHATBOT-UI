import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllChats } from '../../services/AiService'

type ChatType = {
    chatId:string
    title:string
}

export type DashboardSliceType = {
    chatList: ChatType[]
    chatListFetching:boolean
    createNewChat:boolean
    creatingMindMap:boolean
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
        chatList: [],
        chatListFetching:false,
        createNewChat:false,
        creatingMindMap:false
    } as DashboardSliceType,
    reducers: {
        updateChatList: (state, action) => {
            state.chatList = action.payload
        },
        updateCreateNewChat:(state,action) => {
            state.createNewChat = action.payload
        },
        updateCreateMindmap:(state,action) => {
            state.creatingMindMap = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChatList.fulfilled, (state, action) => {
            state.chatList = action.payload
            state.chatListFetching = false
        }).addCase(getChatList.pending, (state) => {
            state.chatListFetching = true 
        }).addCase(getChatList.rejected, (state) => {
            state.chatList = [];
            state.chatListFetching = false 
        })
    }
})

export const { updateChatList,updateCreateNewChat,updateCreateMindmap } = dashboardSlice.actions;
export default dashboardSlice.reducer