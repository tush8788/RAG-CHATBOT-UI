import SignIn from "../../../views/auth/signIn"
import ChatUi from "../../../views/chat"
import CreateNewChat from "../../../views/chat/CreateNewChat"
import MindMap from "../../../views/mindMap"
export const unAuthticatedPaths = [
    {
        path:'signIn',
        component:SignIn
    }
]

export const AuthenticatedPaths = [
    {
        path:'/',
        component: CreateNewChat
    },
    {
        path:'/chat/:chatId',
        component:ChatUi 
    },
    {
        path:'/mindmap/:chatId',
        component:MindMap 
    }
]