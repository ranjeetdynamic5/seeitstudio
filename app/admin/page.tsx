import UserManager from '@/components/UserManager'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'


export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            Admin Panel
          </h1>

          {/* 👉 Email + Logout */}
          <div className="flex items-center gap-4">
            <p className="text-sm">{user.email}</p>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">

      {/* 👇 userManager */}
      <UserManager />

    </div>
      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-medium mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Manage users, services, and content.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          
          <div className="bg-white p-5 rounded-xl border">
            <h3 className="font-medium mb-2">Users</h3>
            <p className="text-sm text-gray-500">
              Manage user roles
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <h3 className="font-medium mb-2">Services</h3>
            <p className="text-sm text-gray-500">
              Manage services
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <h3 className="font-medium mb-2">Products</h3>
            <p className="text-sm text-gray-500">
              Manage products
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}