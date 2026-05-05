import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set(name, value, options)
        },
        remove(name: string, options: any) {
          res.cookies.set(name, '', options)
        },
      },
    }
  )

  // 🔐 Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = req.nextUrl.clone()
  const pathname = url.pathname

  // ==============================
  // 🔒 NOT LOGGED IN
  // ==============================
  if (!user && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // ==============================
  // 🔒 ADMIN PROTECTION
  // ==============================
  if (user && pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    // ❌ Not admin → block
    if (profile?.role !== 'admin') {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  // ==============================
  // 🔁 BLOCK AUTH PAGES
  // ==============================
  if (user && (pathname === '/login' || pathname === '/signup')) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return res
}

// ==============================
// ⚡ PERFORMANCE CONFIG
// ==============================
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}