// components/PreviewControls.tsx
import { draftMode, cookies } from 'next/headers'
import RefreshOnSave          from '@/components/RefreshOnSave'
import ExitPreviewClient      from './_preview/ExitPreviewClient'  

export default async function PreviewControls() {
  // Is Draft‑Mode actief?
  const { isEnabled } = await draftMode()

  // Heeft de browser het Payload‑token?  ➜ nodig voor live‑reload
  const hasPreviewCookie = Boolean((await cookies()).get('payload-token'))

  if (!isEnabled && !hasPreviewCookie) return null

  return (
    <>
      {hasPreviewCookie && <RefreshOnSave />}
      {isEnabled && <ExitPreviewClient />}
    </>
  )
}