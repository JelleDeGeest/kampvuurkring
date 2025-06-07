import { draftMode } from 'next/headers'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string; id: string } }
): Promise<Response> {
  const { type, id } = params

  // Validate the type parameter
  const validTypes = ['activiteiten', 'weekends', 'kampen']
  if (!validTypes.includes(type)) {
    return new Response('Invalid enrollment type', { status: 400 })
  }

  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const payloadToken = searchParams.get('payloadToken')

  // For live preview (no secret), just enable draft mode with existing auth
  if (!secret) {
    // Enable Draft Mode
    (await draftMode()).enable()

    // Try to get token from headers first, then from query params
    let token = request.headers.get('payload-token')
    
    if (!token) {
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

    // Get view parameter to maintain it
    const view = searchParams.get('view')
    
    // Redirect to the enrollment page with view param if provided
    const redirectUrl = view ? `/inschrijven/${type}/${id}?view=${view}` : `/inschrijven/${type}/${id}`
    return redirect(redirectUrl)
  }

  // For external preview (with secret), validate the secret
  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  (await draftMode()).enable()

  // If we have a payload token, set it as a cookie for authentication
  const response = redirect(`/inschrijven/${type}/${id}`)
  
  if (payloadToken) {
    response.cookies.set('payload-token', payloadToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  }

  return response
}