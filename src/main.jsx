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
import ProtectedRout from "./components/Protected_route/Protected_route.jsx"
import Order from "./components/Order_placed/Order.jsx";
import Current_order from "./components/Order/Current_order.jsx";
import Order_history from "./components/Order/Order_history.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path="shop" element={<Shop />} />
      <Route path="about" element={<About />} />
      <Route
            path="/order"
            element={<ProtectedRout element={<Order />} />}
          />
      <Route path="current_order" element={<Current_order />} />
      <Route path="order_history" element={<Order_history />} />

    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes}></RouterProvider>
  </Provider>
);
