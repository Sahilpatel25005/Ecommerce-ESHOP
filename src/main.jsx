import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Shop from './components/Shop/Shop.jsx';




const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />} >
      <Route path="" element={<App />} />
      <Route path="shop" element={<Shop />} />
      </Route>

  ),
)




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} >
    </RouterProvider>
  </StrictMode>,
)
