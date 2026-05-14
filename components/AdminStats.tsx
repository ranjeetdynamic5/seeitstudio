'use client'

import { useEffect, useState } from 'react'

export default function AdminStats() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      setStats(data)
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) return <p>Loading stats...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <h3 className="text-sm text-gray-500">Total Users</h3>
        <p className="text-2xl font-semibold">{stats.users}</p>
      </div>

      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <h3 className="text-sm text-gray-500">Products</h3>
        <p className="text-2xl font-semibold">{stats.products}</p>
      </div>
    </div>
  )
}