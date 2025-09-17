export type AppConfig = {
    apiUrl: string
    googleClientId: string
}

const appConfig: AppConfig = {
    apiUrl: 'http://localhost:4000/api',
    //@ts-ignore
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
}

export default appConfig