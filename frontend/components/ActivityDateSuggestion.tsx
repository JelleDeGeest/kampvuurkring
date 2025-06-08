'use client'

import React from 'react'
import { useActivityDateSuggestion } from '@/hooks/useActivityDateSuggestion'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale/nl'

export const ActivityDateSuggestion: React.FC = () => {
  const { suggestion, loading, applySuggestion } = useActivityDateSuggestion()

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <p className="text-sm text-blue-700">Zoeken naar beschikbare datum...</p>
      </div>
    )
  }

  if (!suggestion.startDate || !suggestion.endDate) {
    return null
  }

  const formatDate = (date: Date) => {
    return format(date, "EEEE d MMMM 'om' HH:mm", {
      locale: nl,
    })
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-green-800 mb-1">
            Suggestie op basis van vorige activiteiten:
          </p>
          <p className="text-sm text-green-700">
            Van: {formatDate(suggestion.startDate)}
          </p>
          <p className="text-sm text-green-700">
            Tot: {formatDate(suggestion.endDate)}
          </p>
        </div>
        <Button
          type="button"
          onClick={applySuggestion}
          className="ml-4"
          size="sm"
        >
          Gebruik deze datum
        </Button>
      </div>
    </div>
  )
}