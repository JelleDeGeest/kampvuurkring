'use client'

import React from 'react'
import { useConfig } from '@payloadcms/ui'

export const ActivitiesOverviewLinkField: React.FC = () => {
  const config = useConfig()
  const serverURL = config.serverURL || ''

  const handleClick = () => {
    window.open(`${serverURL}/admin/activiteiten-overzicht`, '_blank')
  }

  return (
    <div style={{ 
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <p style={{ 
        fontSize: '0.875rem', 
        color: '#6B7280',
        margin: 0
      }}>
        Bekijk een overzicht van alle geplande activiteiten per tak per week
      </p>
      <button
        type="button"
        onClick={handleClick}
        style={{
          backgroundColor: '#3B82F6',
          color: 'white',
          padding: '0.625rem 1.25rem',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#2563EB'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#3B82F6'
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Weekoverzicht Activiteiten
      </button>
    </div>
  )
}