import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import TrainingManager from '@/components/admin/TrainingManager'

export const dynamic = 'force-dynamic'

export default async function AdminTrainingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  const sc = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: courses } = await sc
    .from('training_courses')
    .select('*')
    .order('id')

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Training Courses Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage SketchUp, rendering and AI training courses</p>
      </div>
      <TrainingManager courses={courses ?? []} />
    </main>
  )
}