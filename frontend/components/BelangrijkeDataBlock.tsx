'use client'

import React from 'react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { Loader2 } from 'lucide-react'

import { categoryTabs } from '@/components/CategoryFilter'
import { useImportantDates, EventItem, PeriodItem } from '@/hooks/useImportantDates'

/* ---------- helpers ---------- */
const formatRange = (s: string, e?: string) =>
  e
    ? `${format(new Date(s), 'dd MMMM yyyy', { locale: nl })} – ${format(new Date(e), 'dd MMMM yyyy', { locale: nl })}`
    : format(new Date(s), 'dd MMMM yyyy', { locale: nl })

const Placeholder = ({ title }: { title: string }) => (
  <div className="border-l-4 pl-3 py-2 border-primary text-gray-500">
    <div>Hier worden binnenkort de {title.toLowerCase()} toegevoegd.</div>
    
  </div>
)

/* =================================================================== */
export default function BelangrijkeDataBlock() {
  const { data, isLoading, error } = useImportantDates()

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center text-muted-foreground">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Laden…
      </div>
    )
  }
  if (error || !data) {
    return <p className="text-red-500 text-center py-8">Fout bij laden.</p>
  }

  const { events, weekends, camps } = data

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4 text-primary">Belangrijke Data</h2>

      <Section title="Evenementen" items={events} kind="event" />
      <Section title="Weekends" items={weekends} kind="period" />
      <Section title="Kampen" items={camps} kind="period" />
    </div>
  )
}

/* ---------- subcomponent voor zowel events als periods ---------- */
function Section({
  title,
  items,
  kind,
}: {
  title: string
  items: EventItem[] | PeriodItem[]
  kind: 'event' | 'period'
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <div className="space-y-3">
        {items.length ? (
          items.map((it: any) =>
            kind === 'event' ? (
              <div key={it.id} className="border-l-4 pl-3 py-2 border-primary">
                <div className="text-sm text-muted-foreground">
                  {formatRange(it.startDate, it.endDate)}
                </div>
                <div className="font-medium">{it.title}</div>
              </div>
            ) : (
              <PeriodRow key={it.id} item={it as PeriodItem} />
            ),
          )
        ) : (
          <Placeholder title={title} />
        )}
      </div>
    </div>
  )
}

/* ---------- row met icoon voor weekends & kampen ---------- */
function PeriodRow({ item }: { item: PeriodItem }) {
  const meta = categoryTabs.find((t) => t.value === item.division)

  return (
    <div className="flex items-center gap-4 border-l-4 pl-3 py-2 border-primary">
      {meta?.isImage && (
        <div
          className="p-0.5 border rounded flex items-center justify-center"
          style={{
            backgroundColor: `${meta.color}20`,
            borderColor: meta.color,
          }}
        >
          <meta.icon
            className="h-7 w-7"
            style={{ color: meta.color }}
          />
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="text-sm text-muted-foreground">
          {formatRange(item.startDate, item.endDate)}
        </div>
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-gray-500 capitalize">
          {meta?.name ?? item.division}
        </div>
      </div>
    </div>
  )
}