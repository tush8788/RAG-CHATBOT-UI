import { Provider } from "react-redux"
import Navigation from "./components/layouts/routes/navigation"
import { BrowserRouter } from 'react-router-dom'
import { store } from "./store/store"
import { GoogleOAuthProvider } from "@react-oauth/google"
import appConfig from "./utils/app.config"

function App() {

  return (
    <GoogleOAuthProvider clientId={appConfig.googleClientId}>
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>

  )
}

export default App
