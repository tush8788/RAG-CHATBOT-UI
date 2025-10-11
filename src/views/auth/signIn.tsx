import { GoogleLogin } from "@react-oauth/google"
import useAuth from "../../utils/hooks/useAuth"
import { useMemo, useState } from "react"
import ConditionalRender from "../../components/shared/ConditionalRender"
import LoadingUi from "../../components/shared/LoadingUi"
import { verifyGoogleToken } from "../../services/AuthService"
import { useAppSelector } from "../../store/hooks"

const SignIn = () => {
    const { signIn } = useAuth()
    const [loading, setLoading] = useState(false)
    const {mode} = useAppSelector((state)=>state.utils.theme)
    const isDark = useMemo(()=>mode == 'dark',[mode])
    const resMessage = async (response: any) => {
        try {
            try {
                setLoading(true)
                let resp = await verifyGoogleToken({token: response.credential})
                if (!resp?.data?.success) {
                    throw new Error(`Error in google auth ${resp}`);
                }
                signIn(resp?.data?.results)
                setLoading(false)
            }
            catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        catch (err) {
            setLoading(false);
            console.log("err", err);
        }
    }

    const errorMessage = () => {
        console.log("Error in google login")
    }

    return (
        <>
            <div className={`flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col gap-2 ${isDark && 'bg-black'}`}>
                <ConditionalRender condition={() => loading}>
                    <p className={`"text-sm text-gray-600 ${isDark && 'text-white'} text-center`}>
                        Backend is hosted on Render (free tier), so it may take a moment. Thanks for your patience 🙏
                    </p>
                    <LoadingUi/>
                </ConditionalRender>
                <ConditionalRender condition={() => !loading}>
                    <div className="w-full max-w-sm">
                        <GoogleLogin onSuccess={resMessage} onError={errorMessage} useOneTap />
                    </div>
                </ConditionalRender>


            </div>
        </>
    )
}

export default SignIn