import useAuth from "../../../utils/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
    let { isAuthenticated } = useAuth()

    return isAuthenticated ? <Outlet /> : <Navigate to={'/signin'} />
}

export default ProtectedLayout