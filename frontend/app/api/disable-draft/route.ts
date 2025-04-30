import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
  const draft = await draftMode()
  draft.disable()

  // Redirect to the path specified in the 'path' query param, or '/' if not provided
  const path = request.nextUrl.searchParams.get('path') ?? '/'
  redirect(path)
} 