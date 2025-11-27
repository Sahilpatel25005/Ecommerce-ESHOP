import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"   // ⬅️ added
import apiCall from "../../APIcall/APIcall";

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)

  const navigate = useNavigate(); // ⬅️ added

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const res = await apiCall('/admin/get_all_orders', 'GET')
      if (res.cartitem) setOrders(res.cartitem)
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      alert('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    if (!window.confirm(`Change status of order ${orderId} to ${newStatus}?`)) return
    try {
      setSavingId(orderId)

      await apiCall('/admin/update_order_status', 'PUT', {
        orderid: orderId,
        status: newStatus
      })

      setOrders(prev =>
        prev.map(o => (o.orderid === orderId ? { ...o, status: newStatus } : o))
      )
    } catch (err) {
      console.error('Failed to update status:', err)
      alert('Failed to update status')
    } finally {
      setSavingId(null)
    }
  }

  const statuses = ['Pending', 'Packaging', 'Shipped', 'Delivered', 'Cancelled']

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/productmanagement")}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
        >
          ⬅ Back to Home
        </button>

        <h1 className="text-2xl font-semibold mb-4 text-slate-800">All Orders</h1>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
              <tr>
                <th className="text-left p-4">Order ID</th>
                <th className="text-left p-4">Order Date</th>
                <th className="text-left p-4">Products</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center">No orders found.</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order.orderid} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="p-4">#{order.orderid}</td>
                    <td className="p-4">{new Date(order.orderdate).toLocaleString()}</td>
                    <td className="p-4 max-w-xs truncate">
                      {Array.isArray(order.productname) ? order.productname.join(', ') : order.productname}
                    </td>
                    <td className="p-4">₹{order.amount}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Packaging' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>{order.status}</span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-block relative">
                        <select
                          aria-label={`Change status for ${order.orderid}`}
                          className="block appearance-none bg-white border border-slate-300 px-3 py-2 pr-8 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.orderid, e.target.value)}
                          disabled={savingId === order.orderid}
                        >
                          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
