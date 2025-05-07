'use client'

import { usePathname } from 'next/navigation'
import Link            from 'next/link'
import { Button }      from '@/components/ui/button'

export default function ExitPreviewClient() {
  // Bepaal huidige Pad in de browser
  const pathname = usePathname() || '/'

  return (
    <div className="bg-primary text-primary-foreground p-3 text-center w-full">
      <span className="mr-3 font-medium">Preview Mode Active</span>
      <Link href={`/api/disable-draft?path=${pathname}`} prefetch={false}>
        <Button variant="secondary" size="sm">Exit Preview</Button>
      </Link>
    </div>
  )
}