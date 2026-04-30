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
        get(name) {
          return req.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set(name, value, options)
        },
        remove(name, options) {
          res.cookies.set(name, '', options)
        },
      },
    }
  )

  // 🔥 MUST: refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = req.nextUrl.clone()
  const pathname = url.pathname

  // 🔐 Protected routes
  if (!user && pathname.startsWith('/dashboard')) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 🔐 Future admin routes (ready)
  if (!user && pathname.startsWith('/admin')) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 🔁 Block auth pages if logged in
  if (
    user &&
    (pathname === '/login' || pathname === '/signup')
  ) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return res
}

// ⚡ PERFORMANCE BOOST (VERY IMPORTANT)
export const config = {
  matcher: [
    /*
     * Exclude:
     * - _next (static files)
     * - images
     * - favicon
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}