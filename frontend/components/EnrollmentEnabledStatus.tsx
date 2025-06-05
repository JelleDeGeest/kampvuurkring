'use client'

import React from 'react'

export const EnrollmentEnabledStatusField: React.FC = () => {
  return (
    <div style={{ 
      padding: '0.75rem', 
      backgroundColor: '#10b981', 
      color: 'white', 
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Inschrijvingen zijn ingeschakeld
    </div>
  )
}

export default EnrollmentEnabledStatusField