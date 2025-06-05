'use client'

import React, { useState } from 'react'
import { UsersIcon } from 'lucide-react'
import { StatusSelector } from './StatusSelector'
import { ClientDate } from './ClientDate'

interface EnrollmentTableProps {
  enrollments: any[]
  totalResponses: number
  customQuestionsArray: string[]
  activityTitle?: string
  activityType?: string
  activityStartDate?: string
  activityEndDate?: string
  activityDivision?: string | string[]
  onStatusUpdate?: (enrollmentId: string, newStatus: string) => void
}

export const EnrollmentTable: React.FC<EnrollmentTableProps> = ({ 
  enrollments, 
  totalResponses, 
  customQuestionsArray,
  activityTitle,
  activityType,
  activityStartDate,
  activityEndDate,
  activityDivision,
  onStatusUpdate
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [enrollmentStatuses, setEnrollmentStatuses] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    enrollments.forEach(e => {
      initial[e.id] = e.status
    })
    return initial
  })

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

  // Handle status update
  const handleStatusUpdate = (enrollmentId: string, newStatus: string) => {
    setEnrollmentStatuses(prev => ({
      ...prev,
      [enrollmentId]: newStatus
    }))
    // Also notify parent if callback provided
    if (onStatusUpdate) {
      onStatusUpdate(enrollmentId, newStatus)
    }
  }

  const exportToCSV = () => {
    try {
      // Create title row with activity name
      const titleRow = activityTitle ? [`Inschrijvingen - ${activityTitle}`] : ['Inschrijvingen Export']
      
      // Create CSV headers
      const headers = [
        '#',
        'Status', 
        'Email',
        'Voornaam',
        'Achternaam',
        'Datum',
        'Tijd',
        'Opmerkingen',
        ...customQuestionsArray
      ]
      
      // Create CSV rows - one row per child
      const csvData: string[][] = []
      let rowNumber = 1
      
      filteredEnrollments.forEach((enrollment) => {
        if (enrollment.children && enrollment.children.length > 0) {
          // Create a row for each child
          enrollment.children.forEach((child: any) => {
            const row = [
              rowNumber++,
              (enrollmentStatuses[enrollment.id] || enrollment.status) === 'paid' ? 'Betaald' : 'Niet Betaald',
              enrollment.participantEmail,
              child.participantInfo.firstName || '',
              child.participantInfo.lastName || '',
              (() => {
                const date = new Date(enrollment.createdAt)
                const day = date.getDate().toString().padStart(2, '0')
                const month = (date.getMonth() + 1).toString().padStart(2, '0')
                const year = date.getFullYear()
                return `${day}/${month}/${year}`
              })(),
              (() => {
                const date = new Date(enrollment.createdAt)
                const hours = date.getHours().toString().padStart(2, '0')
                const minutes = date.getMinutes().toString().padStart(2, '0')
                return `${hours}:${minutes}`
              })(),
              enrollment.additionalOptions?.comments || '',
              ...customQuestionsArray.map(question => 
                enrollment.additionalOptions?.customAnswers?.[question] || ''
              )
            ]
            
            // Escape commas and quotes in CSV
            csvData.push(row.map(cell => {
              const cellStr = String(cell || '')
              if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                return `"${cellStr.replace(/"/g, '""')}"`
              }
              return cellStr
            }))
          })
        } else {
          // If no children, still create one row with empty name fields
          const row = [
            rowNumber++,
            (enrollmentStatuses[enrollment.id] || enrollment.status) === 'paid' ? 'Betaald' : 'Niet Betaald',
            enrollment.participantEmail,
            '',
            '',
            (() => {
              const date = new Date(enrollment.createdAt)
              const day = date.getDate().toString().padStart(2, '0')
              const month = (date.getMonth() + 1).toString().padStart(2, '0')
              const year = date.getFullYear()
              return `${day}/${month}/${year}`
            })(),
            (() => {
              const date = new Date(enrollment.createdAt)
              const hours = date.getHours().toString().padStart(2, '0')
              const minutes = date.getMinutes().toString().padStart(2, '0')
              return `${hours}:${minutes}`
            })(),
            enrollment.additionalOptions?.comments || '',
            ...customQuestionsArray.map(question => 
              enrollment.additionalOptions?.customAnswers?.[question] || ''
            )
          ]
          
          // Escape commas and quotes in CSV
          csvData.push(row.map(cell => {
            const cellStr = String(cell || '')
            if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
              return `"${cellStr.replace(/"/g, '""')}"`
            }
            return cellStr
          }))
        }
      })
      
      // Combine title, empty row, headers and data
      const csvContent = [titleRow, [], headers, ...csvData]
        .map(row => row.join(','))
        .join('\n')
      
      // Create and download file with BOM for Excel compatibility
      const BOM = '\uFEFF'
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        
        // Generate filename with activity name and date
        const date = new Date().toLocaleDateString('nl-BE').replace(/\//g, '-')
        const safeName = activityTitle ? activityTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 30) : 'export'
        link.setAttribute('download', `inschrijvingen-${safeName}-${date}.csv`)
        
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
      backgroundColor: 'hsl(90, 6%, 97%)', // --card
      border: '1px solid hsl(108, 35%, 73%)', // --border
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(82, 123, 61, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '24px',
        borderBottom: '1px solid hsl(108, 35%, 73%)' // --border
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
            color: 'hsl(120, 5%, 3%)', // --foreground
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0',
            fontFamily: 'var(--font-heading)'
          }}>
            <UsersIcon style={{ height: '20px', width: '20px', color: 'hsl(108, 35%, 36%)' }} />
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
                border: '1px solid hsl(108, 35%, 73%)', // --border
                borderRadius: '6px',
                fontSize: '0.875rem',
                minWidth: '250px',
                backgroundColor: 'hsl(90, 6%, 97%)', // --background
                color: 'hsl(120, 5%, 3%)', // --foreground
                outline: 'none'
              }}
            />
            <button
              onClick={exportToCSV}
              style={{
                backgroundColor: 'hsl(108, 35%, 36%)', // --primary (scout green)
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'hsl(108, 35%, 32%)'} // darker on hover
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'hsl(108, 35%, 36%)'}
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
              <tr style={{ backgroundColor: 'hsl(108, 35%, 73%)' }}>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'hsl(120, 5%, 3%)', // --foreground
                  borderBottom: '1px solid hsl(108, 35%, 73%)',
                  fontFamily: 'var(--font-heading)'
                }}>#</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'hsl(120, 5%, 3%)', // --foreground
                  borderBottom: '1px solid hsl(108, 35%, 73%)',
                  fontFamily: 'var(--font-heading)'
                }}>Status</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'hsl(120, 5%, 3%)', // --foreground
                  borderBottom: '1px solid hsl(108, 35%, 73%)',
                  fontFamily: 'var(--font-heading)'
                }}>Email</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'hsl(120, 5%, 3%)', // --foreground
                  borderBottom: '1px solid hsl(108, 35%, 73%)',
                  fontFamily: 'var(--font-heading)'
                }}>Kinderen</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'hsl(120, 5%, 3%)', // --foreground
                  borderBottom: '1px solid hsl(108, 35%, 73%)',
                  fontFamily: 'var(--font-heading)'
                }}>Namen</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'hsl(120, 5%, 3%)', // --foreground
                  borderBottom: '1px solid hsl(108, 35%, 73%)',
                  fontFamily: 'var(--font-heading)'
                }}>Datum</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'hsl(120, 5%, 3%)', // --foreground
                  borderBottom: '1px solid hsl(108, 35%, 73%)',
                  fontFamily: 'var(--font-heading)'
                }}>Opmerkingen</th>
                {customQuestionsArray.map((question) => (
                  <th key={question} style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'hsl(120, 5%, 3%)', // --foreground
                    borderBottom: '1px solid hsl(108, 35%, 73%)',
                    minWidth: '120px',
                    maxWidth: '180px',
                    fontFamily: 'var(--font-heading)'
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
                      currentStatus={enrollmentStatuses[enrollment.id] || enrollment.status}
                      onStatusUpdate={handleStatusUpdate}
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
                    <ClientDate dateString={enrollment.createdAt} format="date" />
                    <br />
                    <ClientDate dateString={enrollment.createdAt} format="time" />
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