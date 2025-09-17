import { GoogleLogin } from "@react-oauth/google"

const SignIn = () => {

    const resMessage = async (response: any) => {
        try {
            try {
                const resp: any = await verifyGoogleToken({ token: response.credential })
                if (!resp?.data?.success) {
                    console
                    throw new Error(`Error in google auth ${resp}`);
                }
                // signIn(resp?.data?.results)

            }
            catch (err) {
                console.log(err);
            }
        }
        catch (err) {
            console.log("err", err);
        }
    }

    const errorMessage = () => {
        console.log("Error in google login")
    }

    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <GoogleLogin onSuccess={resMessage} onError={errorMessage} useOneTap />
                </div>
            </div>
        </>
    )
}

export default SignIn