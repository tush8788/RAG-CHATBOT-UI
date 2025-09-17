import { Provider } from "react-redux"
import Navigation from "./components/layouts/routes/navigation"
import { BrowserRouter } from 'react-router-dom'
import { store } from "./store/store"

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  )
}

export default App
