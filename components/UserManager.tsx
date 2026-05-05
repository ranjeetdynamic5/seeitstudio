'use client'

import { useEffect, useState } from 'react'

type User = {
  id: string
  email: string
  role: string
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (!res.ok) return
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const updateRole = async (userId: string, role: string) => {
    try {
      await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role }),
      })
      fetchUsers()
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  if (loading) return <p>Loading users...</p>
  if (!users.length) return <p className="mt-6">No users found</p>

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-3 border text-sm">
                {user.email ?? '-'}
              </td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {user.role || 'user'}
                </span>
              </td>
              <td className="p-3 border">
                <select
                  value={user.role || 'user'}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  className="border px-2 py-1 rounded text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}