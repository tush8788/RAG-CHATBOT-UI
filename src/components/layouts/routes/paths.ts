import SignIn from "../../../views/auth/signIn"
import ChatUi from "../../../views/chat"
import Temp from "../../../views/chat/Temp"
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
        component: Temp
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