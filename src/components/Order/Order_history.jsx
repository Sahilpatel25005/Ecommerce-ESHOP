import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { list_order } from "../Slice/OrderHistorySlice";
import useApiCall from "../../APIcall/Hook";

function Order_history() {
  const apiCall = useApiCall();
  const orders = useSelector((state) => state.item?.order_items) || [];

  useEffect(() => {
    apiCall(list_order());
  }, []);

  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 py-10 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-700 dark:text-green-300 font-serif">
          Your Order History
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
                <div className="text-center text-gray-500 py-10">
                  No past orders found. Start shopping fresh veggies today! 🥬
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.orderid}
                    className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-800 transition-all duration-300 border border-green-100 dark:border-green-800 shadow-sm p-4 rounded-lg"
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
                        ? order.productname.map((name, index) => (
                            <div key={index}>{name}</div>
                          ))
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
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Packaging' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Decorative Footer Line */}
        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          🌱 Thank you for supporting local farmers and choosing fresh produce with{" "}
          <span className="text-green-700 dark:text-green-300 font-semibold">
            FreshHarvest
          </span>
          !
        </div>
      </div>
    </div>
  );
}

export default Order_history;
