'use client'

import { useEffect, useState } from 'react'

type User = {
  id: string
  role: string
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch users (FIXED)
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')

      if (!res.ok) {
        const error = await res.json()
        console.error('API Error:', error)
        setUsers([])
        return
      }

      const data = await res.json()

      console.log('API DATA:', data) // debug

      // ✅ Ensure array
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data)
        setUsers([])
        return
      }

      setUsers(data)
    } catch (err) {
      console.error('Fetch failed:', err)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Update role (FIXED)
  const updateRole = async (userId: string, role: string) => {
    try {
      const res = await fetch('/api/admin/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role }),
      })

      if (!res.ok) {
        const error = await res.json()
        console.error('Update failed:', error)
        return
      }

      // Refresh users after update
      fetchUsers()
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  // Loading state
  if (loading) return <p>Loading users...</p>

  // Empty state
  if (users.length === 0)
    return <p className="mt-6 text-gray-500">No users found</p>

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>

      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">User ID</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Change Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-3 border text-xs">{user.id}</td>

              <td className="p-3 border capitalize">{user.role}</td>

              <td className="p-3 border">
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(user.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
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