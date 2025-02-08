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
import Shop from "./components/Shop/Shop.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/Store.jsx";
import Layout from "./components/Layout/Layout.jsx";
import About from "./components/About/About.jsx";
import ProductDetails from "./components/Shop/ProductDetails.jsx";
import MBlog from "./components/MainBlog/MBlog.jsx";
import Login from "./components/Login/Login.jsx";
import ForgotPassword from "./components/Login/Forgetpass.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />

      <Route path="/" element={<App />} />
      <Route path="shop" element={<Shop />} />
      <Route path="about" element={<About />} />
      <Route path="shop/product/:id" element={<ProductDetails />} />
      <Route path="MBlog" element={<MBlog />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes}></RouterProvider>
  </Provider>
);
