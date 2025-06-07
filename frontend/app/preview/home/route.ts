import { draftMode } from 'next/headers'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // Enable Next.js Draft Mode
  (await draftMode()).enable()

  // Try to get token from headers first, then from query params
  let token = request.headers.get('payload-token')
  
  const { searchParams } = new URL(request.url)
  if (!token) {
    token = searchParams.get('token')
  }
  
  // Check if this is a new preview session (clear storage)
  const clearSession = searchParams.get('clearSession')
  if (clearSession === 'true') {
    // This will be handled client-side
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

  // Get parameters to maintain
  const view = searchParams.get('view')
  const noEnrollment = searchParams.get('noEnrollment')
  
  // Build redirect URL with parameters
  const params = new URLSearchParams()
  if (view) params.set('view', view)
  if (noEnrollment) params.set('noEnrollment', noEnrollment)
  
  const redirectUrl = params.toString() ? `/?${params.toString()}` : '/'
  redirect(redirectUrl)
}