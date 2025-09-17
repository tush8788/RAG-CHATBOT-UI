import SignIn from "../../../views/auth/signIn"
import ChatUi from "../../../views/chat"
export const unAuthticatedPaths = [
    {
        path:'signIn',
        component:SignIn
    }
]

export const AuthenticatedPaths = [
    {
        path:'/',
        component:ChatUi   
    }
]