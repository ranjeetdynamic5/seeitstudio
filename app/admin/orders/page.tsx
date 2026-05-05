import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import OrdersTable from '@/components/admin/OrdersTable'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: orders, error } = await serviceClient
    .from('orders')
    .select('id, order_id, customer_name, customer_email, total_amount, status, created_at')
    .order('created_at', { ascending: false })

  console.log('Orders:', orders, 'Error:', error)

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Orders</h1>
        {orders && (
          <p className="text-sm text-gray-500 mt-1">
            {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <OrdersTable orders={orders ?? []} />
    </main>
  )
}