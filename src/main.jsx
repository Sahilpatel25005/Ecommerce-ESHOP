import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
<<<<<<< HEAD
import Shop from "./components/Shop/Shop.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/Store.jsx";
import Layout from "./components/Layout/Layout.jsx";
=======
import Shop from './components/Shop/Shop.jsx';
>>>>>>> 077f7e739dd53eb72ca6588729f74e45a1dec425

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path="shop" element={<Shop />} />
    </Route>
  )
);

<<<<<<< HEAD
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes}></RouterProvider>
  </Provider>
);
=======
  ),
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} >
    </RouterProvider>
  </StrictMode>,
)
>>>>>>> 077f7e739dd53eb72ca6588729f74e45a1dec425
