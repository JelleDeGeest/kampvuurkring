'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { nl } from 'date-fns/locale'
import { Loader2, ChevronRight } from 'lucide-react'

import { categoryTabs, eventIcon } from '@/components/CategoryFilter'
import { useImportantDates, EventItem, PeriodItem } from '@/hooks/ImportantDatesContext'
import PayloadRichText from '@/components/PayloadRichText'

/* ---------- helpers ---------- */
const formatRange = (s: string, e?: string) => {
  const startDate = format(new Date(s), 'dd MMMM yyyy', { locale: nl })
  if (!e) return startDate

  const endDate = format(new Date(e), 'dd MMMM yyyy', { locale: nl })
  // If start and end are the same day, show just one date
  if (startDate === endDate) return startDate

  return `${startDate} – ${endDate}`
}

// Helper function to check if rich text content has meaningful text
const hasActualContent = (richTextContent: any): boolean => {
  if (!richTextContent || !richTextContent.root || !richTextContent.root.children) {
    return false;
  }

  const checkNode = (node: any): boolean => {
    // If it's a text node, check if it has non-whitespace content
    if (node.type === 'text' && typeof node.text === 'string') {
      return node.text.trim().length > 0;
    }

    // If it has children, recursively check them
    if (node.children && Array.isArray(node.children)) {
      return node.children.some((child: any) => checkNode(child));
    }

    // For other node types (images, etc.), consider them as content
    if (node.type && node.type !== 'paragraph' && node.type !== 'linebreak') {
      return true;
    }

    return false;
  };

  return richTextContent.root.children.some((child: any) => checkNode(child));
};

const Placeholder = ({ title }: { title: string }) => (
  <div className="border-l-4 pl-3 py-2 border-primary text-gray-500">
    <div>Hier worden binnenkort de {title.toLowerCase()} toegevoegd.</div>
  </div>
)

// Division sorting order
const divisionOrder = ['kapoenen', 'wouters', 'jonggivers', 'givers', 'jin'];

// Helper to get division value for sorting
const getDivisionForSorting = (division: string | string[]): string => {
  if (Array.isArray(division) && division.length > 0) {
    return division[0];
  }
  return division as string;
};

// Sort function for periods (weekends & camps)
const sortByDivisionAndDate = (a: PeriodItem, b: PeriodItem) => {
  // First sort by division order
  const divIndexA = divisionOrder.indexOf(getDivisionForSorting(a.division));
  const divIndexB = divisionOrder.indexOf(getDivisionForSorting(b.division));
  
  // If divisions are different, sort by division order
  if (divIndexA !== divIndexB) {
    return divIndexA - divIndexB;
  }
  
  // If same division, sort by date
  return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
};

/* =================================================================== */
export default function BelangrijkeDataBlock() {
  const { data, isLoading, error } = useImportantDates()
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null)

  const toggleExpanded = (itemId: string) => {
    setExpandedItemId(prev => prev === itemId ? null : itemId)
  }

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

  // Process weekends with multiple divisions to create separate items for each
  const processedWeekends = data.weekends.flatMap((weekend: PeriodItem) => {
    if (Array.isArray(weekend.division)) {
      // Create a separate item for each division
      return weekend.division.map((div, index) => ({
        ...weekend,
        originalId: weekend.id, // Keep the original database ID
        id: `${weekend.id}-${div}-${index}`, // Create unique ID for each
        division: div // Single division for this item
      }));
    }
    // If it's a single division, return as is
    return [{
      ...weekend,
      originalId: weekend.id // Keep the original database ID
    }];
  });

  // Process camps with multiple divisions to create separate items for each
  const processedCamps = data.camps.flatMap((camp: PeriodItem) => {
    if (Array.isArray(camp.division)) {
      // Create a separate item for each division
      return camp.division.map((div, index) => ({
        ...camp,
        originalId: camp.id, // Keep the original database ID
        id: `${camp.id}-${div}-${index}`, // Create unique ID for each
        division: div // Single division for this item
      }));
    }
    // If it's a single division, return as is
    return [{
      ...camp,
      originalId: camp.id // Keep the original database ID
    }];
  });

  // Sort weekends and camps by division and date
  const sortedWeekends = [...processedWeekends].sort(sortByDivisionAndDate);
  const sortedCamps = [...processedCamps].sort(sortByDivisionAndDate);
  
  // Events are still sorted by date only (as they don't have divisions)
  const events = data.events;

  return (
    <div className="p-4 pt-0 w-full">
      <h2 className="text-xl font-bold mb-4 text-primary">Belangrijke Data</h2>

      <Section title="Evenementen" items={events} kind="event" expandedItemId={expandedItemId} toggleExpanded={toggleExpanded} />
      <Section title="Weekends" items={sortedWeekends} kind="period" expandedItemId={expandedItemId} toggleExpanded={toggleExpanded} />
      <Section title="Kampen" items={sortedCamps} kind="period" expandedItemId={expandedItemId} toggleExpanded={toggleExpanded} />
    </div>
  )
}

/* ---------- subcomponent voor zowel events als periods ---------- */
function Section({
  title,
  items,
  kind,
  expandedItemId,
  toggleExpanded,
}: {
  title: string
  items: EventItem[] | PeriodItem[]
  kind: 'event' | 'period'
  expandedItemId: string | null
  toggleExpanded: (itemId: string) => void
}) {
  const periodType = title === 'Weekends' ? 'weekend' : title === 'Kampen' ? 'kamp' : null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <div className="space-y-3">
        {items.length ? (
          items.map((it: any) =>
            kind === 'event' ? (
              <div key={it.id} className="flex items-start gap-4 border-l-4 pl-3 py-2 border-primary">
                <div
                  className="p-0.5 border rounded flex items-center justify-center mt-4"
                  style={{
                    backgroundColor: `${eventIcon.color}20`,
                    borderColor: eventIcon.color,
                  }}
                >
                  <eventIcon.icon
                    className="h-7 w-7"
                    style={{ color: eventIcon.color }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-sm text-muted-foreground">
                    {formatRange(it.startDate, it.endDate)}
                  </div>
                  <div className="font-bold text-gray-700 font-heading text-lg">{it.title}</div>

                  {/* Show "Meer informatie" only if there's actual content */}
                  {hasActualContent(it.description) && (
                    <div className="mt-1">
                      <button
                        onClick={() => toggleExpanded(it.id)}
                        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors -ml-0.5 focus:outline-none"
                      >
                        <ChevronRight
                          className={`h-4 w-4 mr-1 transition-transform duration-200 ${
                            expandedItemId === it.id ? 'rotate-90' : 'rotate-0'
                          }`}
                        />
                        Meer informatie
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedItemId === it.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="text-sm text-muted-foreground mt-2">
                          <PayloadRichText content={it.description} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add enrollment button if enrollments are enabled and button not hidden */}
                  {it.enrollmentSettings?.enabled &&
                   it.enrollmentSettings?.enrollmentLink &&
                   !it.enrollmentSettings?.hideButton && (
                    <div className="mt-2">
                      <a
                        href={it.enrollmentSettings.enrollmentLink}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md shadow text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                      >
                        Info/Inschrijven
                      </a>
                    </div>
                  )}

                  {/* Add button if available (for other types of buttons) */}
                  {(it.button?.text && it.button?.url) && (
                    <div className="mt-2">
                      <a
                        href={it.button.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md shadow text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                      >
                        {it.button.text}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <PeriodRow key={it.id} item={it as PeriodItem} periodType={periodType} expandedItemId={expandedItemId} toggleExpanded={toggleExpanded} />
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
function PeriodRow({
  item,
  periodType,
  expandedItemId,
  toggleExpanded
}: {
  item: PeriodItem & { originalId?: string }
  periodType: 'weekend' | 'kamp' | null
  expandedItemId: string | null
  toggleExpanded: (itemId: string) => void
}) {
  // Now each item has a single division value
  const meta = categoryTabs.find((t) => t.value === item.division);

  // Generate enrollment link dynamically based on period type and item ID
  const getEnrollmentLink = () => {
    const itemId = item.originalId || item.id;
    if (periodType === 'weekend') {
      return `/inschrijven/weekends/${itemId}`;
    } else if (periodType === 'kamp') {
      return `/inschrijven/kampen/${itemId}`;
    }
    return item.enrollmentSettings?.enrollmentLink || '';
  };

  return (
    <div className="flex items-start gap-4 border-l-4 pl-3 py-2 border-primary">
      {meta?.isImage && (
        <div
          className="p-0.5 border rounded flex items-center justify-center mt-4"
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
        <div className="font-bold text-gray-700 font-heading text-lg">{item.title}</div>
        <div className="text-sm text-gray-500 capitalize">
          {meta?.name ?? item.division}
        </div>


        {/* Add enrollment button if enrollments are enabled and button not hidden */}
        {item.enrollmentSettings?.enabled &&
         !item.enrollmentSettings?.hideButton && (
          <div className="mt-2">
            <a
              href={getEnrollmentLink()}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md shadow text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              Info/Inschrijven
            </a>
          </div>
        )}

        {/* Add button if available (for other types of buttons) */}
        {(item.button?.text && item.button?.url) && (
          <div className="mt-2">
            <a
              href={item.button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md shadow text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              {item.button.text}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}