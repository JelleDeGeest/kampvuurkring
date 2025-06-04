'use client'

import React from 'react'

interface StatusSelectorProps {
  enrollmentId: string
  currentStatus: string
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({ enrollmentId, currentStatus }) => {
  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/enrollments/${enrollmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        // Refresh the page to show updated status
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  return (
    <select 
      value={currentStatus}
      onChange={(e) => handleStatusChange(e.target.value)}
      style={{
        fontSize: '0.675rem',
        fontWeight: '500',
        padding: '2px 6px',
        borderRadius: '3px',
        border: '1px solid #d1d5db',
        backgroundColor: currentStatus === 'paid' ? '#dcfce7' : '#fef3c7',
        color: currentStatus === 'paid' ? '#166534' : '#92400e',
        cursor: 'pointer',
        minWidth: '90px'
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