'use client'

import { useState } from 'react'

type Order = {
  id: number
  order_id: string
  customer_name: string
  customer_email: string
  total_amount: number
  status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  fulfilled: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const [data, setData] = useState<Order[]>(orders ?? [])

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: id, status }),
    })
    setData(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  if (!data.length) return (
    <div className="bg-white border rounded-xl px-6 py-10 text-center">
      <p className="text-sm text-gray-500">No orders yet.</p>
    </div>
  )

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Change Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-mono font-medium">{order.order_id}</td>
                <td className="px-6 py-3">
                  <span className="block">{order.customer_name}</span>
                  <span className="text-xs text-gray-400">{order.customer_email}</span>
                </td>
                <td className="px-6 py-3">£{Number(order.total_amount).toFixed(2)}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] ?? 'bg-gray-100'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border px-2 py-1 rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}