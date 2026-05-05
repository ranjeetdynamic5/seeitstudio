import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    // ==============================
    // 🔐 ADMIN CHECK (CRITICAL)
    // ==============================
    await requireAdmin()

    // ==============================
    // 📥 GET DATA FROM REQUEST
    // ==============================
    const { userId, role } = await req.json()

    // Basic validation
    if (!userId || !role) {
      return NextResponse.json(
        { error: 'Missing userId or role' },
        { status: 400 }
      )
    }

    if (!['admin', 'user'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role value' },
        { status: 400 }
      )
    }

    // ==============================
    // 🔗 SUPABASE CLIENT
    // ==============================
    const supabase = await createClient()

    // ==============================
    // 🔄 UPDATE ROLE
    // ==============================
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)

    if (error) {
      console.error('Update role error:', error)

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // ==============================
    // ✅ SUCCESS RESPONSE
    // ==============================
    return NextResponse.json({
      success: true,
      message: 'Role updated successfully',
    })

  } catch (err: any) {
    console.error('API Error:', err.message)

    // ==============================
    // ❌ AUTH / ROLE ERRORS
    // ==============================
    if (err.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (err.message === 'Forbidden') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // ==============================
    // ❌ GENERIC ERROR
    // ==============================
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}