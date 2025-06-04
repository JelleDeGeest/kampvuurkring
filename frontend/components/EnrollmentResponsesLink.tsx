'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from '@payloadcms/ui'

interface EnrollmentResponsesLinkProps {
  // Payload field props
  path?: string
  value?: any
  // Custom props
  targetType?: 'activiteiten' | 'weekends' | 'camps'
  targetId?: string
  enabled?: boolean
}

export const EnrollmentResponsesLinkField: React.FC<any> = (props: any) => {
  // Get the document data from the form (same as EnrollmentCount)
  const { getData } = useForm()
  const formData = getData()
  
  // Try multiple ways to get the document ID
  let docId = formData?.id
  
  // If formData.id is not available, try to extract from URL
  if (!docId) {
    const pathParts = window.location.pathname.split('/')
    // URL pattern: /admin/collections/{collection}/{id}
    if (pathParts.length >= 5 && pathParts[1] === 'admin' && pathParts[2] === 'collections') {
      docId = pathParts[4]
    }
  }
  
  const collection = window.location.pathname.split('/')[3] // Get collection name from URL (adjusted index)
  
  // Debug logging
  console.log('EnrollmentResponsesLink - props:', props)
  console.log('EnrollmentResponsesLink - formData:', formData)
  console.log('collection from URL:', collection)
  console.log('enrollmentSettings:', formData?.enrollmentSettings)
  console.log('window.location.pathname:', window.location.pathname)
  console.log('URL path parts:', window.location.pathname.split('/'))
  
  // Map collection to route type
  const typeMap: Record<string, string> = {
    'activiteiten': 'activiteiten',
    'weekends': 'weekends', 
    'camps': 'camps'
  }
  
  const targetType = typeMap[collection] || 'activiteiten'
  const enabled = formData?.enrollmentSettings?.enabled

  console.log('targetType:', targetType, 'docId:', docId, 'enabled:', enabled)

  // Don't show button if we can't get the document ID
  if (!docId) {
    console.log('No docId available, not showing button')
    return (
      <div className="pt-2">
        <div className="text-xs text-red-500">
          Kan document ID niet ophalen. Sla eerst het document op.
        </div>
      </div>
    )
  }

  const handleClick = () => {
    const url = `/admin/inschrijvingen/${targetType}/${docId}`
    console.log('Opening URL:', url)
    window.open(url, '_blank')
  }

  return (
    <div className="pt-2">
      <Button 
        onClick={handleClick}
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white"
        type="button"
      >
        📊 Bekijk Inschrijvingen
      </Button>
      <div className="text-xs text-gray-500 mt-1">
        Component loaded: {targetType}/{docId}
      </div>
    </div>
  )
}

// Also export as default for importMap compatibility
export default EnrollmentResponsesLinkField