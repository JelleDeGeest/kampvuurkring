'use client'

import React, { useState } from 'react'

interface StatusSelectorProps {
  enrollmentId: string
  currentStatus: string
  onStatusUpdate?: (enrollmentId: string, newStatus: string) => void
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({ 
  enrollmentId, 
  currentStatus,
  onStatusUpdate 
}) => {
  const [status, setStatus] = useState(currentStatus)

  const handleStatusChange = async (newStatus: string) => {
    // Optimistic update
    const previousStatus = status
    setStatus(newStatus)
    
    // Notify parent component immediately
    if (onStatusUpdate) {
      onStatusUpdate(enrollmentId, newStatus)
    }

    try {
      const response = await fetch(`/api/enrollments/${enrollmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        // Revert on error
        setStatus(previousStatus)
        if (onStatusUpdate) {
          onStatusUpdate(enrollmentId, previousStatus)
        }
        console.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert on error
      setStatus(previousStatus)
      if (onStatusUpdate) {
        onStatusUpdate(enrollmentId, previousStatus)
      }
    }
  }

  return (
    <select 
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      style={{
        fontSize: '0.675rem',
        fontWeight: '500',
        padding: '2px 6px',
        borderRadius: '3px',
        border: '1px solid hsl(108, 35%, 73%)', // --border
        backgroundColor: status === 'paid' ? 'hsl(108, 41%, 65%)' : 'hsl(33, 97%, 50%)', // --accent or --jonggivers
        color: 'white',
        cursor: 'pointer',
        minWidth: '90px',
        transition: 'background-color 0.15s ease'
      }}
    >
      <option value="pending" style={{ backgroundColor: 'white', color: 'black' }}>
        Niet Betaald
      </option>
      <option value="paid" style={{ backgroundColor: 'white', color: 'black' }}>
        Betaald
      </option>
    </select>
  )
}