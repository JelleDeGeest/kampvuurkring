import { draftMode } from 'next/headers'
import { cookies }  from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  // 1 — turn on Next.js Draft Mode (sets a secure cookie)
  const draft = await draftMode()
  draft.enable()

  // 2 — forward Payload's auth header so we can read drafts
  const token = request.headers.get('payload-token')
  if (token) {
    const cookieStore = await cookies()
    cookieStore.set('payload-token', token, { httpOnly: true })
  }

  // 3 — send the browser to the actual page
  redirect('/info')
}