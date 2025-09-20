import useAuth from "../../../utils/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../shared/Navbar";

const UnProtectedLayout = () => {
    let { isAuthenticated } = useAuth()

    return (
        !isAuthenticated ? <><Navbar/> <Outlet /></> : <Navigate to={'/'} />
    )
}

export default UnProtectedLayout