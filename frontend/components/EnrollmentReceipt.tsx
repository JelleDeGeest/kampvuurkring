'use client'

import React from 'react'
import { LexicalRenderer } from '@/components/LexicalRenderer'

interface ReceiptData {
  enrollmentId: string;
  targetTitle: string;
  targetType: string;
  children: Array<{
    participantInfo: {
      firstName: string;
      lastName: string;
    };
  }>;
  customAnswers?: Record<string, string>;
  comments?: string;
  totalPrice?: number;
  paymentInstructions?: string;
  isPaid?: boolean;
  startDate?: string;
  endDate?: string;
  division?: string | string[];
  createdAt?: string;
  bannerImage?: {
    url?: string;
  } | string;
  description?: any; // Lexical content
}

// Banner component matching the enrollment page
function EnrollmentBanner({ bannerImage, title }: { bannerImage: any, title: string }) {
  const imageUrl = typeof bannerImage === 'object' && bannerImage?.url 
    ? bannerImage.url 
    : typeof bannerImage === 'string' 
    ? bannerImage 
    : null;

  if (!imageUrl) return null;

  return (
    <div className="relative w-full h-[140px] rounded-lg overflow-hidden mb-2">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute bottom-3 left-4">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  )
}

export function EnrollmentReceipt({ data }: { data: ReceiptData }) {
  const typeLabels = {
    activiteiten: 'Activiteit',
    weekends: 'Weekend',
    camps: 'Kamp'
  }

  const hasBanner = (data.targetType === 'weekends' || data.targetType === 'camps') && data.bannerImage;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-3 py-2 max-w-4xl">
        {/* Banner Display for weekends/camps */}
        {hasBanner && (
          <EnrollmentBanner bannerImage={data.bannerImage} title={data.targetTitle} />
        )}
        
        <div className="text-center mb-3">
          {/* Only show title if no banner */}
          {!hasBanner && (
            <h1 className="text-xl font-bold text-primary mb-2">Inschrijving {data.targetTitle}</h1>
          )}
          
          {/* Target Information - more prominent display */}
          <div className="inline-block bg-gray-100 rounded" style={{ padding: '12px 20px' }}>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {data.division && (
                <div className="text-base">
                  <span className="text-gray-600 font-medium">Tak(ken):</span> <span className="text-gray-900 font-semibold">{Array.isArray(data.division) ? data.division.join(', ') : data.division}</span>
                </div>
              )}
              {data.startDate && (
                <div className="text-base">
                  <span className="text-gray-600 font-medium">Start:</span> <span className="text-gray-900 font-semibold">{new Date(data.startDate).toLocaleDateString('nl-BE')}</span>
                </div>
              )}
              {data.endDate && data.endDate !== data.startDate && (
                <div className="text-base">
                  <span className="text-gray-600 font-medium">Eind:</span> <span className="text-gray-900 font-semibold">{new Date(data.endDate).toLocaleDateString('nl-BE')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description if available */}
        {data.description && (
          <div className="prose prose-sm max-w-none mb-2 text-center">
            <div className="max-w-3xl mx-auto text-xs">
              <LexicalRenderer content={data.description} />
            </div>
          </div>
        )}

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded mb-2 break-inside-avoid" style={{ padding: '4px 8px' }}>
          <h2 className="text-sm font-bold text-green-800">✓ Inschrijving succesvol verzonden!</h2>
        </div>
        
        {/* Payment Warning - Always show if payment is required */}
        {data.isPaid && data.totalPrice !== undefined && data.totalPrice > 0 && (
          <div className="p-2 bg-red-50 border border-red-200 rounded mb-2" style={{ padding: '6px 12px' }}>
            <p className="text-red-800 text-xs font-semibold">
              Let op: Inschrijving is pas definitief als de betaling is ontvangen.
            </p>
          </div>
        )}

        {/* Enrollment Form Data */}
        <div className="mt-3">
          <h2 className="text-lg font-bold mb-2 text-center">Inschrijfgegevens</h2>
          
          {/* Participants */}
          <div className="bg-gray-50 rounded p-2 mb-2 break-inside-avoid">
            <h3 className="text-sm font-semibold mb-1">Deelnemers</h3>
            <div className="space-y-0.5">
              {data.children.map((child, index) => (
                <div key={index} className="text-xs">
                  {data.children.length > 1 && <span className="font-medium">{index + 1}. </span>}
                  {child.participantInfo.firstName} {child.participantInfo.lastName}
                </div>
              ))}
            </div>
          </div>

          {/* Custom Answers */}
          {data.customAnswers && Object.keys(data.customAnswers).length > 0 && (
            <div className="bg-gray-50 rounded p-2 mb-2 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm font-semibold mb-1">Extra informatie</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {Object.entries(data.customAnswers).map(([question, answer]) => (
                  <div key={question} style={{ marginBottom: '2px', pageBreakInside: 'avoid' }}>
                    <p className="text-gray-600 text-xs" style={{ marginBottom: '0px', lineHeight: '1.1' }}>{question}</p>
                    <p className="text-xs" style={{ marginTop: '0px', marginBottom: '0px', lineHeight: '1.2' }}>{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          {data.comments && data.comments.trim() && (
            <div className="bg-gray-50 rounded p-2 mb-2 break-inside-avoid">
              <h3 className="text-sm font-semibold mb-1">Opmerkingen</h3>
              <p className="text-xs whitespace-pre-wrap" style={{ lineHeight: '1.3', marginTop: '0px' }}>{data.comments}</p>
            </div>
          )}

          {/* Payment Information - Always show if payment is required */}
          {data.isPaid && data.totalPrice !== undefined && data.totalPrice > 0 && (
            <div className="bg-gray-50 rounded p-2 mb-2 break-inside-avoid" data-payment-section style={{ pageBreakInside: 'avoid', minHeight: '100px' }}>
              <h3 className="text-sm font-semibold" style={{ marginBottom: '8px' }}>Betalingsinformatie</h3>
              
              <div className="bg-white border border-gray-200 p-2 rounded" style={{ marginBottom: '8px' }}>
                <p className="text-xs text-gray-600" style={{ marginBottom: '2px' }}>Prijs per kind: €{(data.totalPrice / data.children.length).toFixed(2)}</p>
                <p className="text-base font-bold">Totaal ({data.children.length} {data.children.length === 1 ? 'kind' : 'kinderen'}): €{data.totalPrice}</p>
              </div>
              
              {data.paymentInstructions && (
                <div className="border-l-4 border-gray-300 bg-gray-50 p-2 rounded-r" style={{ marginTop: '8px' }}>
                  <p className="font-semibold text-gray-700 text-xs" style={{ marginBottom: '4px' }}>Betaalinstructies:</p>
                  <p className="text-gray-600 whitespace-pre-wrap text-xs" style={{ lineHeight: '1.3' }}>{data.paymentInstructions}</p>
                </div>
              )}
            </div>
          )}

          {/* Footer Information */}
          <div className="border-t pt-2 mt-3 text-center text-gray-500 text-xs">
            <p className="mb-0.5">Referentie: {data.enrollmentId}</p>
            {data.createdAt && (
              <p className="mb-1">
                Ingeschreven op: {new Date(data.createdAt).toLocaleString('nl-BE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
            <p className="font-semibold">Scouts Sint-Johannes • Automatisch gegenereerd document</p>
            <p>Bewaar dit document als bevestiging van je inschrijving</p>
          </div>
        </div>
      </div>
    </div>
  )
}