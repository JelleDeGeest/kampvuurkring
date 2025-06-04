'use client'

import React, { useState } from 'react'
import { UsersIcon } from 'lucide-react'
import { StatusSelector } from './StatusSelector'

interface EnrollmentTableProps {
  enrollments: any[]
  totalResponses: number
  customQuestionsArray: string[]
}

export const EnrollmentTable: React.FC<EnrollmentTableProps> = ({ 
  enrollments, 
  totalResponses, 
  customQuestionsArray 
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter enrollments based on search term
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const searchLower = searchTerm.toLowerCase()
    
    // Search in email
    if (enrollment.participantEmail.toLowerCase().includes(searchLower)) return true
    
    // Search in children names
    if (enrollment.children?.some((child: any) => 
      `${child.participantInfo.firstName} ${child.participantInfo.lastName}`.toLowerCase().includes(searchLower)
    )) return true
    
    // Search in comments
    if (enrollment.additionalOptions?.comments?.toLowerCase().includes(searchLower)) return true
    
    // Search in custom answers
    if (enrollment.additionalOptions?.customAnswers) {
      const answers = Object.values(enrollment.additionalOptions.customAnswers).join(' ')
      if (answers.toLowerCase().includes(searchLower)) return true
    }
    
    return false
  })

  const exportToCSV = () => {
    try {
      // Create CSV headers
      const headers = [
        '#',
        'Status', 
        'Email',
        'Aantal Kinderen',
        'Namen',
        'Datum',
        'Tijd',
        'Opmerkingen',
        ...customQuestionsArray
      ]
      
      // Create CSV rows
      const csvData = filteredEnrollments.map((enrollment, index) => {
        const row = [
          index + 1,
          enrollment.status === 'paid' ? 'Betaald' : 'Niet Betaald',
          enrollment.participantEmail,
          enrollment.numberOfChildren,
          enrollment.children?.map((child: any) => 
            `${child.participantInfo.firstName} ${child.participantInfo.lastName}`
          ).join(', ') || '',
          new Date(enrollment.createdAt).toLocaleDateString('nl-BE'),
          new Date(enrollment.createdAt).toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' }),
          enrollment.additionalOptions?.comments || '',
          ...customQuestionsArray.map(question => 
            enrollment.additionalOptions?.customAnswers?.[question] || ''
          )
        ]
        
        // Escape commas and quotes in CSV
        return row.map(cell => {
          const cellStr = String(cell || '')
          if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`
          }
          return cellStr
        })
      })
      
      // Combine headers and data
      const csvContent = [headers, ...csvData]
        .map(row => row.join(','))
        .join('\n')
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        
        // Generate filename with current date
        const date = new Date().toLocaleDateString('nl-BE').replace(/\//g, '-')
        link.setAttribute('download', `inschrijvingen-${date}.csv`)
        
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error)
      alert('Er is een fout opgetreden bij het exporteren.')
    }
  }

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0'
          }}>
            <UsersIcon style={{ height: '20px', width: '20px', color: '#4b5563' }} />
            Inschrijvingen Overzicht ({filteredEnrollments.length} van {totalResponses})
          </h3>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Zoek op naam, email, opmerkingen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.875rem',
                minWidth: '250px'
              }}
            />
            <button
              onClick={exportToCSV}
              style={{
                backgroundColor: '#059669',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              📊 Export CSV
            </button>
          </div>
        </div>
      </div>
      
      {filteredEnrollments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          {searchTerm ? (
            <>
              <div style={{ fontSize: '2rem', color: '#9ca3af', marginBottom: '16px' }}>🔍</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>Geen resultaten gevonden</h3>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Probeer een andere zoekterm.
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: '4rem', color: '#9ca3af', marginBottom: '16px' }}>📝</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>Nog geen inschrijvingen</h3>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Er zijn nog geen inschrijvingen ontvangen.
              </p>
            </>
          )}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>#</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Status</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Email</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Kinderen</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Namen</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Datum</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Opmerkingen</th>
                {customQuestionsArray.map((question) => (
                  <th key={question} style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '1px solid #e5e7eb',
                    minWidth: '120px',
                    maxWidth: '180px'
                  }}>
                    {question}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment: any, index: number) => (
                <tr key={enrollment.id} style={{
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    color: '#374151',
                    verticalAlign: 'top'
                  }}>
                    <span style={{
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      fontSize: '0.625rem',
                      fontWeight: '500',
                      padding: '1px 6px',
                      borderRadius: '3px'
                    }}>
                      #{index + 1}
                    </span>
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    verticalAlign: 'top'
                  }}>
                    <StatusSelector 
                      enrollmentId={enrollment.id}
                      currentStatus={enrollment.status}
                    />
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    color: '#111827',
                    fontWeight: '500',
                    verticalAlign: 'top'
                  }}>
                    {enrollment.participantEmail}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    color: '#374151',
                    textAlign: 'center',
                    verticalAlign: 'top'
                  }}>
                    <span style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}>
                      {enrollment.numberOfChildren}
                    </span>
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    color: '#374151',
                    verticalAlign: 'top',
                    maxWidth: '180px'
                  }}>
                    {enrollment.children?.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {enrollment.children.map((child: any, childIndex: number) => (
                          <div key={childIndex} style={{
                            fontSize: '0.75rem',
                            color: '#374151'
                          }}>
                            {child.participantInfo.firstName} {child.participantInfo.lastName}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: '0.75rem' }}>
                        Geen kinderen
                      </span>
                    )}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    verticalAlign: 'top'
                  }}>
                    {new Date(enrollment.createdAt).toLocaleDateString('nl-BE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                    <br />
                    {new Date(enrollment.createdAt).toLocaleTimeString('nl-BE', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    color: '#374151',
                    verticalAlign: 'top',
                    maxWidth: '180px'
                  }}>
                    {enrollment.additionalOptions?.comments ? (
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#374151',
                        maxHeight: '60px',
                        overflowY: 'auto'
                      }}>
                        {enrollment.additionalOptions.comments}
                      </div>
                    ) : (
                      <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>-</span>
                    )}
                  </td>
                  {customQuestionsArray.map((question) => (
                    <td key={question} style={{
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      color: '#374151',
                      verticalAlign: 'top',
                      maxWidth: '180px'
                    }}>
                      {enrollment.additionalOptions?.customAnswers?.[question] ? (
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#374151'
                        }}>
                          {enrollment.additionalOptions.customAnswers[question]}
                        </div>
                      ) : (
                        <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>-</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}