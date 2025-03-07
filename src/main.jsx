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
import store from "./Store/Store.jsx";
import Layout from "./components/Layout/Layout.jsx";
import About from "./components/About/About.jsx";
import Current_order from "./components/Order/Current_order.jsx";
import Order_history from "./components/Order/Order_history.jsx";
import Login from "./components/Login/Login.jsx";
import ForgotPassword from "./components/Login/Forgetpass.jsx";
import Registration from "./components/Login/Registration.jsx";
import PrivateRoute from "./components/Privateroute/Private.jsx";
import ProductDetails from "./components/Shop/ProductDetails.jsx";
import Cheakout from "./components/Cheakout/Cheakout.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Registration />} />
      <Route element={<PrivateRoute />}>
        <Route path="/Home" element={<App />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        {/* <Route path="/order" element={<ProtectedRout element={<Order />} />} /> */}
        <Route path="current_order" element={<Current_order />} />
        <Route path="order_history" element={<Order_history />} />
        <Route path="shop/product/:id" element={<ProductDetails />} />
        <Route path="cheakout" element={<Cheakout />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes}></RouterProvider>
  </Provider>
);
