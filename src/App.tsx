import { Provider } from "react-redux"
import Navigation from "./components/layouts/routes/navigation"
import { BrowserRouter } from 'react-router-dom'
import { store } from "./store/store"
import { GoogleOAuthProvider } from "@react-oauth/google"
import appConfig from "./utils/app.config"
import ThemeProviderLayout from "./components/layouts/commonLayouts/ThemeProviderLayout"

function App() {

  return (

    <GoogleOAuthProvider clientId={appConfig.googleClientId}>
      <Provider store={store}>
        <ThemeProviderLayout>
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
        </ThemeProviderLayout>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default App
