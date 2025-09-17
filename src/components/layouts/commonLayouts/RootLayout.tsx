import ConditionalRender from "../../shared/ConditionalRender"
import useAuth from "../../../utils/hooks/useAuth"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
    const [loading, setLoading] = useState(true)

    const { checkAuthentication } = useAuth()

    useEffect(() => {
        checkAuthentication();
        setLoading(false)
    }, [])
    return (
        <>
            <ConditionalRender condition={() => !loading}>
                <Outlet />
            </ConditionalRender>
            <ConditionalRender condition={() => loading}>
                <div className="h-[90vh] w-full flex justify-center items-center">
                    <div>
                        Loading ....
                    </div>
                </div>
            </ConditionalRender>
        </>
    )
}

export default RootLayout