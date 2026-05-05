'use client'

import React, { useState } from 'react'

type Lead = {
  id: number
  full_name: string
  email: string
  phone: string | null
  company: string | null
  message: string | null
  service: string | null
  inquiry_type: string | null
  status: string
  created_at: string
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  converted: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-600',
}

export default function LeadsManager({ leads }: { leads: Lead[] }) {
  const [data, setData] = useState<Lead[]>(leads ?? [])
  const [filter, setFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState<number | null>(null)

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setData(prev => prev.map(l => l.id === id ? { ...l, status } : l))
  }

  const filtered = filter === 'all' ? data : data.filter(l => l.status === filter)

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-2">
        {['all', 'new', 'contacted', 'converted', 'closed'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === s
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            {s === 'all' && ` (${data.length})`}
            {s !== 'all' && ` (${data.filter(l => l.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">No leads found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(lead => (
                <React.Fragment key={lead.id}>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  >
                    <td className="px-6 py-3">
                      <div className="font-medium">{lead.full_name}</div>
                      {lead.company && <div className="text-xs text-gray-400">{lead.company}</div>}
                    </td>
                    <td className="px-6 py-3">
                      <div>{lead.email}</div>
                      {lead.phone && <div className="text-xs text-gray-400">{lead.phone}</div>}
                    </td>
                    <td className="px-6 py-3">
                      <div>{lead.service ?? '-'}</div>
                      {lead.inquiry_type && (
                        <div className="text-xs text-gray-400">{lead.inquiry_type}</div>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] ?? 'bg-gray-100'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => { e.stopPropagation(); updateStatus(lead.id, e.target.value) }}
                        onClick={e => e.stopPropagation()}
                        className="border px-2 py-1 rounded text-xs"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">Message:</p>
                          <p className="text-gray-600">{lead.message ?? 'No message provided.'}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}