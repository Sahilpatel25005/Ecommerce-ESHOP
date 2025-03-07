import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiCall from "../../APIcall/Hook";
import { list_pending_order } from "../Slice/PendingOrderSlice";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { clearOrderId } from "../Slice/OrderPlaceSlice";

function Current_order() {
  const dispatch = useDispatch();
  const orders =
    useSelector((state) => state.pendingItem.pending_order_items) || [];
  const apiCall = useApiCall();
  const [newOrderId, setNewOrderId] = useState(null);

  const msg = useSelector((state) => state.orderPlaced.placeOrder);

  const [toastShown, setToastShown] = useState(false);

  const handleaToast = () => {
    if (msg.message === undefined) {
      return;
    } else if (msg.message) {
      toast.success(` ${msg.message}`);
    } else if (msg.error) {
      toast.error(` ${msg.error}`);
    }
    setToastShown(true);
  };

  useEffect(() => {
    if (!toastShown) {
      handleaToast();
    }
  }, [msg, toastShown]);

  useEffect(() => {
    apiCall(list_pending_order());
  }, []);

  useEffect(() => {
    setNewOrderId(msg.orderid);

    // Reset the new order ID after 3 seconds
    const timer = setTimeout(() => {
      setNewOrderId(null);
      dispatch(clearOrderId());
    }, 2000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [orders]);

  return (
    <div className="container mx-auto  min-h-[100vh] px-4 py-8 dark:text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {/* <!-- Order List --> */}
      <div className="shadow-md rounded-lg overflow-hidden">
        {/* <!-- Order Table --> */}
        <div className="p-6">
          {/* <!-- Table Header --> */}
          <div className="hidden md:flex justify-between font-bold dark:text-white bg-gray-100 dark:bg-gray-700 p-4 rounded-t-lg">
            <div className="w-1/6">Order ID</div>
            <div className="w-1/6">Date</div>
            <div className="w-1/3">Items</div>
            <div className="w-1/6">Total</div>
            <div className="w-1/6">Status</div>
          </div>

          {/* <!-- Order Items --> */}
          <div className="space-y-4">
            {orders.map((order, index) => {
              const isNewOrder = order.orderid === newOrderId;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row justify-between items-center p-4 border-b duration-500 ${
                    isNewOrder ? "bg-purple-400 dark:bg-blue-900 " : ""
                  }`}
                >
                  <div className="w-full md:w-1/6 font-semibold">
                    {order.orderid}
                  </div>
                  <div className="w-full md:w-1/6">
                    {new Date(order.orderdate).toLocaleDateString()}
                  </div>
                  <div className="w-full md:w-1/3">
                    {Array.isArray(order.productname)
                      ? order.productname.map((name, index) => (
                          <div key={index}>{name},</div>
                        ))
                      : "No items"}
                  </div>
                  <div className="w-full md:w-1/6 font-semibold">
                    ${order.amount}
                  </div>
                  <div className="w-full md:w-1/6">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Pending"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Current_order;
