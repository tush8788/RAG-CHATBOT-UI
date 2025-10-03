import fetchData from './ApiService'

const verifyGoogleToken = async (data:any) => {
    return fetchData({
        url:'user/verify-google-token',
        method:'post',
        data
    })
}

export {
    verifyGoogleToken
}