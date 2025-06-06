'use client'

import React, { useState, useEffect } from 'react'
import { EnrollmentTable } from './EnrollmentTable'

interface EnrollmentPageClientProps {
  enrollments: any[]
  target: any
  resolvedParams: {
    type: 'activiteiten' | 'weekends' | 'camps'
    id: string
  }
  customQuestionsArray: string[]
}

const typeLabels = {
  activiteiten: 'Activiteit',
  weekends: 'Weekend',
  camps: 'Kamp'
}

export const EnrollmentPageClient: React.FC<EnrollmentPageClientProps> = ({
  enrollments,
  target,
  resolvedParams,
  customQuestionsArray
}) => {
  const [enrollmentStatuses, setEnrollmentStatuses] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    enrollments.forEach(e => {
      initial[e.id] = e.status
    })
    return initial
  })

  // Calculate statistics based on current statuses
  const totalResponses = enrollments.length
  const totalChildren = enrollments.reduce((sum: number, enrollment: any) => 
    sum + (enrollment.numberOfChildren || 0), 0
  )
  
  // Count children instead of enrollments for payment status
  const paidChildrenCount = enrollments.reduce((sum: number, enrollment: any) => {
    if ((enrollmentStatuses[enrollment.id] || enrollment.status) === 'paid') {
      return sum + (enrollment.numberOfChildren || 0)
    }
    return sum
  }, 0)
  
  const pendingChildrenCount = enrollments.reduce((sum: number, enrollment: any) => {
    if ((enrollmentStatuses[enrollment.id] || enrollment.status) === 'pending') {
      return sum + (enrollment.numberOfChildren || 0)
    }
    return sum
  }, 0)

  return (
    <>
      {/* Compact Header */}
      <div style={{
        backgroundColor: 'hsl(90, 6%, 97%)',
        border: '1px solid hsl(108, 35%, 73%)',
        borderRadius: '6px',
        padding: '12px 16px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: 'hsl(108, 35%, 36%)',
            margin: '0',
            fontFamily: 'var(--font-heading)'
          }}>
            {target.title}
          </h1>
          <span style={{ 
            color: 'hsl(120, 5%, 3%)', 
            fontSize: '0.75rem',
            opacity: '0.6'
          }}>
            {typeLabels[resolvedParams.type]}
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          fontSize: '0.75rem',
          flexWrap: 'wrap'
        }}>
          {target.startDate && (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontWeight: '500', color: 'hsl(108, 35%, 36%)' }}>Start:</span>
              <span style={{ color: 'hsl(120, 5%, 3%)' }}>
                {new Date(target.startDate).toLocaleDateString('nl-BE', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
          {target.endDate && target.endDate !== target.startDate && (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontWeight: '500', color: 'hsl(108, 35%, 36%)' }}>Einde:</span>
              <span style={{ color: 'hsl(120, 5%, 3%)' }}>
                {new Date(target.endDate).toLocaleDateString('nl-BE', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
          {target.division && (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontWeight: '500', color: 'hsl(108, 35%, 36%)' }}>Tak:</span>
              <span style={{ 
                color: 'hsl(120, 5%, 3%)',
                textTransform: 'capitalize'
              }}>
                {Array.isArray(target.division) ? target.division.join(', ') : target.division}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Statistics - Compact inline */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        marginBottom: '12px',
        fontSize: '0.75rem',
        color: 'hsl(120, 5%, 3%)'
      }}>
        <span style={{ fontWeight: '600' }}>Samenvatting:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'hsl(108, 35%, 36%)' }}>{totalChildren}</span>
          <span>deelnemers</span>
        </div>
        <div style={{ width: '1px', height: '16px', backgroundColor: 'hsl(108, 35%, 73%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'hsl(33, 97%, 50%)' }}>{pendingChildrenCount}</span>
          <span>kinderen niet betaald</span>
        </div>
        <div style={{ width: '1px', height: '16px', backgroundColor: 'hsl(108, 35%, 73%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'hsl(108, 41%, 65%)' }}>{paidChildrenCount}</span>
          <span>kinderen betaald</span>
        </div>
      </div>

      {/* Enrollments Table */}
      <EnrollmentTable 
        enrollments={enrollments}
        totalResponses={totalResponses}
        customQuestionsArray={customQuestionsArray}
        activityTitle={target.title}
        activityType={resolvedParams.type}
        activityStartDate={target.startDate}
        activityEndDate={target.endDate}
        activityDivision={target.division}
        onStatusUpdate={(enrollmentId, newStatus) => {
          setEnrollmentStatuses(prev => ({
            ...prev,
            [enrollmentId]: newStatus
          }))
        }}
      />
    </>
  )
}