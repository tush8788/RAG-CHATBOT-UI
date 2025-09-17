import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { updateUser } from "../../store/slice/userSlice"
import { isEmpty } from "lodash"
const LOCALSTOREAGEKEY = 'userInfo';

const useAuth = () => {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector((status) => status.user)
    const checkAuthentication = () => {
        if (!isEmpty(token)) return
        let resp: string = localStorage.getItem(LOCALSTOREAGEKEY) || '';
        if (isEmpty(resp)) return
        signIn(JSON.parse(resp))
    }

    const signIn = (payload: { name: string, email: string, profileImage: string, token: string }) => {
        dispatch(updateUser(payload));
        localStorage.setItem(LOCALSTOREAGEKEY, JSON.stringify(payload));
    }

    const signOut = () => {
        dispatch(updateUser({ name: '', email: '', token: '', profileImage: '' }))
        localStorage.removeItem(LOCALSTOREAGEKEY);
    }

    return {
        isAuthenticated: !!token,
        token,
        signIn,
        signOut,
        checkAuthentication
    }

}

export default useAuth