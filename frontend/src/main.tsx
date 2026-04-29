import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppInitializer } from './components/AppInitializer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppInitializer>
          <App />
        </AppInitializer>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
