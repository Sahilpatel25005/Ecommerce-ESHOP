import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { list_order } from "../Slice/OrderHistorySlice";
import useApiCall from "../../APIcall/Hook";

function Order_history() {
  const apiCall = useApiCall();

  useEffect(() => {
    apiCall(list_order());
  }, []);

  const orders = useSelector((state) => state.item?.order_items) || [];

  return (
    <>
      <div className="container min-h-[100vh]">
        <div className=" mx-auto px-4 py-8 dark:text-white">
          <h1 className="text-3xl font-bold mb-6">Your Orders History</h1>

          <div className="shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="hidden md:flex justify-between font-bold dark:text-white bg-gray-100 dark:bg-gray-700 p-4 rounded-t-lg">
                <div className="w-1/6">Order ID</div>
                <div className="w-1/6">Date</div>
                <div className="w-1/3">Items</div>
                <div className="w-1/6">Total</div>
                <div className="w-1/6">Status</div>
              </div>

              <div className="space-y-4">
                {orders.length === 0 ? (
                  <p>No orders found.</p>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.orderid}
                      className="flex flex-col md:flex-row justify-between items-center p-4 border-b"
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
                              : "bg-blue-100 text-blue-700"
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
        </div>
      </div>
    </>
  );
}

export default Order_history;
