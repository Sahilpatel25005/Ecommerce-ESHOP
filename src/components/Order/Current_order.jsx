import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiCall from "../../APIcall/Hook";
import { list_pending_order } from "../Slice/PendingOrderSlice";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { clearOrderId } from "../Slice/OrderPlaceSlice";

function Current_order() {
  const dispatch = useDispatch();
  const apiCall = useApiCall();

  // Redux data
  const orders = useSelector((state) => state.pendingItem.pending_order_items) || [];
  const msg = useSelector((state) => state.orderPlaced.placeOrder);

  // Local states
  const [newOrderId, setNewOrderId] = useState(null);
  const [toastShown, setToastShown] = useState(false);

  // ✅ Show toast message when order is placed
  const handleToast = () => {
    if (!msg) return;
    if (msg.message) toast.success(`${msg.message}`);
    else if (msg.error) toast.error(`${msg.error}`);
    setToastShown(true);
  };

  useEffect(() => {
    if (!toastShown && (msg.message || msg.error)) {
      handleToast();
    }
  }, [msg, toastShown]);

  // ✅ Fetch pending orders on mount
  useEffect(() => {
    apiCall(list_pending_order());
  }, []);

  // ✅ Highlight new order for a few seconds
  useEffect(() => {
    if (msg?.orderid) {
      setNewOrderId(msg.orderid);
      const timer = setTimeout(() => {
        setNewOrderId(null);
        dispatch(clearOrderId());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [msg?.orderid]);

  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 py-10 transition-colors duration-500">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-5xl mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-700 dark:text-green-300 font-serif">
          Your Current Orders
        </h1>

        <div className="shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700">
          <div className="p-6">
            {/* Table Header */}
            <div className="hidden md:flex justify-between font-bold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-t-lg">
              <div className="w-1/6">Order ID</div>
              <div className="w-1/6">Date</div>
              <div className="w-1/3">Items</div>
              <div className="w-1/6">Total</div>
              <div className="w-1/6">Status</div>
            </div>

            {/* Orders List */}
            <div className="space-y-3 mt-4">
              {orders.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                  No current orders yet. Place one and watch it grow fresh! 🥦
                </div>
              ) : (
                orders.map((order) => {
                  const isNewOrder = order.orderid === newOrderId;

                  return (
                    <div
                      key={order.orderid}
                      className={`flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg transition-all duration-500 shadow-sm ${
                        isNewOrder
                          ? "bg-green-200 dark:bg-green-700 scale-[1.02]"
                          : "bg-white dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-800"
                      } border-green-100 dark:border-green-800`}
                    >
                      {/* Order ID */}
                      <div className="w-full md:w-1/6 font-semibold text-green-700 dark:text-green-300">
                        #{order.orderid}
                      </div>

                      {/* Date */}
                      <div className="w-full md:w-1/6 text-gray-700 dark:text-gray-300">
                        {new Date(order.orderdate).toLocaleDateString()}
                      </div>

                      {/* Items */}
                      <div className="w-full md:w-1/3 text-gray-700 dark:text-gray-300">
                        {Array.isArray(order.productname)
                          ? order.productname.map((name, i) => <div key={i}>{name}</div>)
                          : "No items"}
                      </div>

                      {/* Total */}
                      <div className="w-full md:w-1/6 font-semibold text-green-700 dark:text-green-300">
                        ₹{order.amount}
                      </div>

                      {/* Status */}
                      <div className="w-full md:w-1/6">
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                              : order.status === "Shipped"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                              : order.status === "Pending"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Decorative Footer */}
        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          🌿 Your fresh order journey continues with{" "}
          <span className="text-green-700 dark:text-green-300 font-semibold">
            FreshHarvest
          </span>
          !
        </div>
      </div>
    </div>
  );
}

export default Current_order;
