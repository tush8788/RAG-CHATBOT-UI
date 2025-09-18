export type AppConfig = {
    apiUrl: string
    googleClientId: string
}

const appConfig: AppConfig = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
    //@ts-ignore
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
}

export default appConfig