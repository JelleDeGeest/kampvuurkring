'use client'

import React, { useEffect, useState } from 'react'

interface ClientDateProps {
  dateString: string
  format?: 'date' | 'time' | 'datetime'
}

export const ClientDate: React.FC<ClientDateProps> = ({ dateString, format = 'datetime' }) => {
  const [formattedDate, setFormattedDate] = useState<string>('')

  useEffect(() => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    if (format === 'date') {
      setFormattedDate(`${day}/${month}/${year}`)
    } else if (format === 'time') {
      setFormattedDate(`${hours}:${minutes}`)
    } else {
      setFormattedDate(`${day}/${month}/${year} ${hours}:${minutes}`)
    }
  }, [dateString, format])

  // Return empty string during SSR to avoid hydration mismatch
  if (!formattedDate) {
    return <span>&nbsp;</span>
  }

  return <span>{formattedDate}</span>
}