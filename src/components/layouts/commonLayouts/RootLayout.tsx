import useAuth from "../../../utils/hooks/useAuth"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
    const { checkAuthentication } = useAuth()
    checkAuthentication();
    return (
        <>
          <Outlet />
        </>
    )
}

export default RootLayout