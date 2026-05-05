import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { full_name, email, phone, company, message, service } = body

    if (!full_name || !email || !phone || !message || !service) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              try { cookieStore.set(name, value, options) } catch {}
            })
          },
        },
      }
    )

    const { error } = await supabase.from('leads').insert({
      full_name,
      email,
      phone,
      company: company || null,
      message,
      service,
      inquiry_type: 'service',
    })

    if (error) {
      console.error('Leads insert error:', error)
      return NextResponse.json({ error: 'Failed to save enquiry' }, { status: 500 })
    }

    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'SeeIt Studio <noreply@seeitstudio.co.uk>',
          to: 'jamesogston@seeit3d.co.uk',
          subject: `New Service Enquiry — ${service}`,
          html: `
            <h2>New Service Enquiry</h2>
            <p><b>Service:</b> ${service}</p>
            <p><b>Name:</b> ${full_name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            ${company ? `<p><b>Company:</b> ${company}</p>` : ''}
            <p><b>Message:</b><br>${String(message).replace(/\n/g, '<br>')}</p>
          `,
        }),
      }).catch((err) => console.error('Resend error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Enquiry route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
