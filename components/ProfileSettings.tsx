'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Props = {
  userId: string
  currentFullName: string
  currentEmail: string
}

function EyeIcon({ show }: { show: boolean }) {
  return show ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function ProfileSettings({ userId, currentFullName, currentEmail }: Props) {
  const [fullName, setFullName] = useState(currentFullName)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [nameLoading, setNameLoading] = useState(false)
  const [passLoading, setPassLoading] = useState(false)
  const [nameMsg, setNameMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [passMsg, setPassMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const supabase = createClient()

  const updateName = async () => {
    if (!fullName.trim()) return
    setNameLoading(true)
    setNameMsg(null)
    const { error } = await supabase.from('profiles').update({ full_name: fullName.trim() }).eq('id', userId)
    setNameLoading(false)
    setNameMsg(error
      ? { type: 'error', text: 'Failed to update name.' }
      : { type: 'success', text: 'Name updated!' }
    )
  }

  const updatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setPassMsg({ type: 'error', text: 'Please fill in all fields.' })
      return
    }
    if (newPassword !== confirmPassword) {
      setPassMsg({ type: 'error', text: 'Passwords do not match.' })
      return
    }
    if (newPassword.length < 6) {
      setPassMsg({ type: 'error', text: 'Password must be at least 6 characters.' })
      return
    }
    setPassLoading(true)
    setPassMsg(null)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPassLoading(false)
    if (error) {
      setPassMsg({ type: 'error', text: error.message })
    } else {
      setPassMsg({ type: 'success', text: 'Password updated!' })
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-base font-semibold text-[#0B0F19]">Profile Settings</h3>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left — Name & Email */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Account Info</h4>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                className="flex-1 border px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#D9534F] focus:ring-1 focus:ring-rose-100"
              />
              <button onClick={updateName} disabled={nameLoading}
                className="px-3 py-2 text-xs font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-50 transition-colors whitespace-nowrap">
                {nameLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
            {nameMsg && (
              <p className={`mt-1.5 text-xs ${nameMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                {nameMsg.text}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={currentEmail}
              disabled
              className="w-full border px-3 py-2 rounded-lg text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-400">Contact support to change email.</p>
          </div>
        </div>

        {/* Right — Password */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Change Password</h4>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full border px-3 py-2 pr-10 rounded-lg text-sm focus:outline-none focus:border-[#D9534F] focus:ring-1 focus:ring-rose-100"
              />
              <button type="button" onClick={() => setShowNew(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <EyeIcon show={showNew} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full border px-3 py-2 pr-10 rounded-lg text-sm focus:outline-none focus:border-[#D9534F] focus:ring-1 focus:ring-rose-100"
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <EyeIcon show={showConfirm} />
              </button>
            </div>
          </div>

          <button onClick={updatePassword} disabled={passLoading}
            className="w-full py-2 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-50 transition-colors">
            {passLoading ? 'Updating...' : 'Update Password'}
          </button>

          {passMsg && (
            <p className={`text-xs ${passMsg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {passMsg.text}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}