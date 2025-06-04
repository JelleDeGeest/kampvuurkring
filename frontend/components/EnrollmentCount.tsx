'use client'

import React, { useEffect, useState } from 'react'
import { useField, useForm } from '@payloadcms/ui'

export const EnrollmentCountField: React.FC = () => {
  const { value, path } = useField<string>({ path: 'enrollmentSettings.enrollmentCount' })
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  
  // Get the document data from the form
  const { getData } = useForm()
  const formData = getData()
  const docId = formData?.id
  const collection = window.location.pathname.split('/')[2] // Get collection name from URL
  
  useEffect(() => {
    const fetchEnrollmentCount = async () => {
      if (!docId || !collection) {
        setCount(0)
        setLoading(false)
        return
      }
      
      try {
        // Fetch enrollments for this target
        const response = await fetch(`/api/enrollments?targetType=${collection}&targetId=${docId}`)
        const data = await response.json()
        
        // Count total children enrolled
        let totalChildren = 0
        if (data.docs) {
          data.docs.forEach((enrollment: any) => {
            if (enrollment.status !== 'cancelled') {
              totalChildren += enrollment.numberOfChildren || 1
            }
          })
        }
        
        setCount(totalChildren)
      } catch (error) {
        console.error('Error fetching enrollment count:', error)
        setCount(0)
      } finally {
        setLoading(false)
      }
    }
    
    fetchEnrollmentCount()
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchEnrollmentCount, 30000)
    return () => clearInterval(interval)
  }, [docId, collection])
  
  if (loading) {
    return (
      <div className="field-type text">
        <div className="field-label">Aantal Inschrijvingen</div>
        <div className="field-description">Laden...</div>
      </div>
    )
  }
  
  return (
    <div className="field-type text">
      <div className="field-label">Aantal Inschrijvingen</div>
      <div style={{ 
        padding: '8px 12px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        {count} {count === 1 ? 'deelnemer' : 'deelnemers'}
      </div>
      <div className="field-description" style={{ marginTop: '4px', fontSize: '12px' }}>
        Totaal aantal ingeschreven kinderen
      </div>
    </div>
  )
}