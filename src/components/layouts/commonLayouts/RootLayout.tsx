import useAuth from "../../../utils/hooks/useAuth"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
    const { checkAuthentication } = useAuth()
    useEffect(() => {
        checkAuthentication();
    }, [])
    return (
        <>
          <Outlet />
        </>
    )
}

export default RootLayout