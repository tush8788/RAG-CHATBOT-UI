import useAuth from "../../../utils/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const UnProtectedLayout = () => {
    let { isAuthenticated } = useAuth()

    return(
        !isAuthenticated ? <Outlet/> : <Navigate to={'/'}/>
    )
}

export default UnProtectedLayout