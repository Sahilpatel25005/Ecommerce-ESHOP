import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ClipboardList } from "lucide-react";
import apiCall from "../../APIcall/APIcall";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await apiCall("/admin/get_all_orders", "GET");
      if (res.cartitem) setOrders(res.cartitem);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!window.confirm(`Change status of order ${orderId} to ${newStatus}?`)) return;
    try {
      setSavingId(orderId);
      await apiCall("/admin/update_order_status", "PUT", { orderid: orderId, status: newStatus });
      setOrders((prev) => prev.map((o) => (o.orderid === orderId ? { ...o, status: newStatus } : o)));
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setSavingId(null);
    }
  };

  const statuses = ["Pending", "Packaging", "Shipped", "Delivered", "Cancelled"];

  const statusColors = {
    Pending: { bg: "rgba(253,198,46,0.15)", text: "#fdc62e" },
    Packaging: { bg: "rgba(19,118,244,0.15)", text: "#1376f4" },
    Shipped: { bg: "rgba(124,58,237,0.15)", text: "#7c3aed" },
    Delivered: { bg: "rgba(45,204,111,0.15)", text: "#2dcc6f" },
    Cancelled: { bg: "rgba(244,44,55,0.15)", text: "#f42c37" },
  };

  return (
    <div className="min-h-screen bg-[#050810] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate("/productmanagement")}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "rgba(255,255,255,0.4)" }}
            whileHover={{ x: -3, color: "rgba(255,255,255,0.7)" }}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ClipboardList size={24} className="text-[#1376f4]" />
            All Orders
          </h1>
          <div className="w-16" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "rgba(19,118,244,0.1)" }}>
                  {["Order ID", "Order Date", "Products", "Amount", "Status", "Action"].map((h) => (
                    <th key={h} className="text-left p-4 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="p-8 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Loading...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>No orders found.</td></tr>
                ) : (
                  orders.map((order, i) => (
                    <motion.tr
                      key={order.orderid}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="border-t"
                      style={{ borderColor: "rgba(255,255,255,0.04)" }}
                      whileHover={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <td className="p-4 text-sm text-white">#{order.orderid}</td>
                      <td className="p-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{new Date(order.orderdate).toLocaleString()}</td>
                      <td className="p-4 text-sm max-w-xs truncate" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {Array.isArray(order.productname) ? order.productname.join(", ") : order.productname}
                      </td>
                      <td className="p-4 text-sm text-white font-semibold">₹{order.amount}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: (statusColors[order.status] || { bg: "rgba(255,255,255,0.1)" }).bg,
                            color: (statusColors[order.status] || { text: "rgba(255,255,255,0.5)" }).text,
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.orderid, e.target.value)}
                          disabled={savingId === order.orderid}
                          className="px-3 py-2 rounded-xl text-sm outline-none cursor-pointer"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                          }}
                        >
                          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
