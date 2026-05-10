import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'
import ProfileSettings from '@/components/ProfileSettings'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .maybeSingle()

  if (profile?.role === 'admin') redirect('/admin')

  const sc = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: orders } = await sc
    .from('orders')
    .select('id, order_id, total_amount, status, created_at')
    .eq('customer_email', user.email)
    .order('created_at', { ascending: false })

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-blue-100 text-blue-800',
    fulfilled: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#0B0F19]">Seeit Studio</Link>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">{user.email}</p>
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT COLUMN */}
          <div className="flex-1 space-y-6">

            {/* Welcome */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0066FF] text-white font-bold text-lg flex items-center justify-center shrink-0">
                  {(profile?.full_name?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#0B0F19]">
                    Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''} 👋
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-xl border shadow-sm">
              <div className="px-6 py-4 border-b">
                <h3 className="text-base font-semibold text-[#0B0F19]">My Orders</h3>
              </div>
              {!orders || orders.length === 0 ? (
                <div className="px-6 py-10 text-center">
                  <p className="text-sm text-gray-500 mb-4">No orders yet.</p>
                  <Link href="/products"
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors">
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 font-mono font-medium">{order.order_id}</td>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Profile Settings */}
            <ProfileSettings
              userId={user.id}
              currentFullName={profile?.full_name ?? ''}
              currentEmail={user.email ?? ''}
            />

          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-72 shrink-0 space-y-4">

            {/* Stats */}
            <div className="bg-white rounded-xl border shadow-sm p-5">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Account Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Orders</span>
                  <span className="text-lg font-bold text-[#0B0F19]">{orders?.length ?? 0}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-sm text-gray-500">Total Spent</span>
                  <span className="text-lg font-bold text-[#0B0F19]">
                    £{orders?.reduce((sum, o) => sum + Number(o.total_amount), 0).toFixed(2) ?? '0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-sm text-gray-500">Active Orders</span>
                  <span className="text-lg font-bold text-[#0B0F19]">
                    {orders?.filter(o => o.status === 'paid' || o.status === 'pending').length ?? 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl border shadow-sm p-5">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/products"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <span className="text-sm font-medium text-[#0B0F19]">Browse Products</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
                <Link href="/training"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <span className="text-sm font-medium text-[#0B0F19]">Training Courses</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
                <Link href="/contact"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <span className="text-sm font-medium text-[#0B0F19]">Contact Support</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}