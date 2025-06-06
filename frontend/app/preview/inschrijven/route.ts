import { draftMode } from 'next/headers'
import { cookies }    from 'next/headers'
import { redirect }   from 'next/navigation'

export async function GET(request: Request) {
  // 1 — Enable Next.js Draft Mode
  (await draftMode()).enable()

  // 2 — Set the Payload token cookie so we can read drafts
  // Try to get token from headers first, then from query params
  let token = request.headers.get('payload-token')
  
  if (!token) {
    const { searchParams } = new URL(request.url)
    token = searchParams.get('token')
  }
  
  if (token) {
    (await cookies()).set('payload-token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  } else {
    // If no token, check if user already has a valid cookie
    const existingToken = (await cookies()).get('payload-token')
    if (!existingToken) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  // 3 — Redirect to the actual inschrijven page
  redirect('/inschrijven')
}