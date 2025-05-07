import { draftMode } from 'next/headers'
import { cookies }    from 'next/headers'
import { redirect }   from 'next/navigation'

export async function GET(request: Request) {
  // 1 — zet Next.js Draft Mode aan
  (await draftMode()).enable()

  // 2 — zet het Payload‑token cookie zodat we drafts kunnen lezen
  const token = request.headers.get('payload-token')
  if (token) {
    (await cookies()).set('payload-token', token, { httpOnly: true })
  }

  // 3 — stuur door naar de echte homepage
  redirect('/')
}