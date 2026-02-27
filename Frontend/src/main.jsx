import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Dashboard, Roastresult } from './components/index.js'
import { Provider } from 'react-redux'
import store from './store/store.js'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path = '/' element = {<App />}>
    <Route path = 'dashboard' element = {<Dashboard />} />
    <Route path = 'roastresult' element = {<Roastresult />} />
    </Route>


</>
  

    

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
