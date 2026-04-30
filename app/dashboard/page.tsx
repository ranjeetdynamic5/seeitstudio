import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
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

  const role = profile?.role || 'user'

  // ✅ RETURN FUNCTION KE ANDAR HONA CHAHIYE
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Client Dashboard</h1>

          <div className="flex items-center gap-4">
            <p className="text-sm">{user.email}</p>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <h2 className="text-lg font-medium mb-2">
            Welcome back 👋
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-2">
            Role: {role}
          </p>
        </div>
      </div>
    </div>
  )
}