import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import ProductsManager from '@/components/ProductsManager'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [{ data: products }, { data: categories }] = await Promise.all([
    serviceClient.from('products').select('*').order('id'),
    serviceClient.from('product_categories').select('*').order('id'),
  ])

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Products Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage 3D software subscriptions and plugins</p>
      </div>
      <ProductsManager products={products ?? []} categories={categories ?? []} />
    </main>
  )
}