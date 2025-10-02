import SignIn from "../../../views/auth/signIn"
// import ChatUi from "../../../views/chat"
import Dashboard from "../../../views/dashbaord"
export const unAuthticatedPaths = [
    {
        path:'signIn',
        component:SignIn
    }
]

export const AuthenticatedPaths = [
    {
        path:'/',
        component:Dashboard   
    }
]