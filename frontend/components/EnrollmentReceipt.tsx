'use client'

import React from 'react'
import { LexicalRenderer } from '@/components/LexicalRenderer'
import { getContactEmails } from '@/lib/email-utils'
import { primaryFont, secondaryFont, headingFont } from '@/fonts'

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
    <div className="relative w-full h-[120px] rounded-xl overflow-hidden mb-5 shadow-sm">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute bottom-4 left-6">
        <h1 className="text-2xl font-bold text-white drop-shadow-md font-heading">
          {title}
        </h1>
      </div>
    </div>
  )
}



export function EnrollmentReceipt({ data }: { data: ReceiptData }) {
  const hasBanner = (data.targetType === 'weekends' || data.targetType === 'camps') && data.bannerImage;

  return (
    <div className={`bg-white mx-auto p-8 text-foreground font-sans print:p-0 print:w-full w-[210mm] min-h-[297mm] ${primaryFont.variable} ${secondaryFont.variable} ${headingFont.variable}`}>
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          {/* Inlined SVG to ensure rendering in html2canvas */}
          <svg width="56" height="56" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <g transform="matrix(1,0,0,1,-346.684,0)">
              <g id="Home" transform="matrix(1,0,0,1,346.684,0)">
                <rect x="0" y="0" width="100" height="100" style={{ fill: 'none' }} />
                <g transform="matrix(1.09444,0,0,1.09444,50,57.3043)">
                  <g transform="matrix(1,0,0,1,-55,-67.5)">
                    <g transform="matrix(1,0,0,1,5,10)">
                      <path d="M69.793,28.133L51.727,14.692C50.688,13.919 49.313,13.919 48.274,14.692L8.122,44.559C5.993,46.141 5.552,49.149 7.134,51.274C8.716,53.403 11.723,53.84 13.848,52.258L48.27,26.653C49.31,25.88 50.685,25.88 51.724,26.653L86.15,52.262C88.278,53.844 91.282,53.403 92.864,51.278C94.446,49.149 94.005,46.145 91.876,44.563L79.126,35.079L79.13,22.806C79.13,21.212 77.829,19.911 76.235,19.911L72.685,19.911C71.091,19.911 69.79,21.212 69.79,22.806L69.793,28.133ZM80.906,53.27L80.906,82.813C80.906,84.504 79.523,85.887 77.832,85.887L62.496,85.891L62.496,69.145C62.496,65.669 59.652,62.821 56.172,62.821L43.828,62.821C40.351,62.821 37.503,65.669 37.503,69.145L37.503,85.891L22.167,85.891C20.476,85.891 19.093,84.508 19.093,82.817L19.093,53.27L49.999,30.282L80.906,53.27Z" fill="currentColor" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div>
            <h1 className="text-xl font-bold font-heading text-primary">Scouts Sint-Johannes</h1>
            <p className="text-xs text-muted-foreground">Bevestiging van inschrijving</p>
          </div>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>Referentie: <span className="font-mono text-foreground">{data.enrollmentId}</span></p>
          {data.createdAt && (
            <p>{new Date(data.createdAt).toLocaleDateString('nl-BE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          )}
        </div>
      </div>

      {/* Banner Display for weekends/camps */}
      {hasBanner ? (
        <EnrollmentBanner bannerImage={data.bannerImage} title={data.targetTitle} />
      ) : (
        <h1 className="text-2xl font-bold text-primary mb-5 font-heading">{data.targetTitle}</h1>
      )}

      {/* Key Info Details */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-8 mb-6 text-sm">
        {data.division && (
          <div>
            <span className="block text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-0.5">Tak(ken)</span>
            <span className="font-medium text-base">{Array.isArray(data.division) ? data.division.join(', ') : data.division}</span>
          </div>
        )}
        {(data.startDate || data.endDate) && (
          <div>
            <span className="block text-muted-foreground text-[10px] uppercase tracking-wider font-semibold mb-0.5">Periode</span>
            <span className="font-medium text-base">
              {data.startDate && new Date(data.startDate).toLocaleDateString('nl-BE')}
              {data.endDate && data.endDate !== data.startDate && ` - ${new Date(data.endDate).toLocaleDateString('nl-BE')}`}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {data.description && (
        <div className="mb-6 prose prose-sm max-w-none text-muted-foreground bg-muted/30 p-3 rounded-lg text-xs leading-relaxed">
          <LexicalRenderer content={data.description} />
        </div>
      )}

      {/* Participants Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold font-heading text-primary mb-3 border-b border-primary/20 pb-1">Deelnemers</h2>
        <div className="space-y-2">
          {data.children.map((child, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-muted/20 rounded-md">
              <div className="flex-shrink-0 w-6 h-6">
                <svg width="24" height="24" viewBox="0 0 24 24" className="w-full h-full">
                  <circle cx="12" cy="12" r="12" className="fill-primary/10" />
                  <text
                    x="50%"
                    y="50%"
                    dy=".1em"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-primary font-bold text-[12px] font-heading"
                  >
                    {index + 1}
                  </text>
                </svg>
              </div>
              <div className="font-medium text-base">
                {child.participantInfo.firstName} {child.participantInfo.lastName}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Answers */}
      {data.customAnswers && Object.keys(data.customAnswers).length > 0 && (
        <div className="mb-6 break-inside-avoid">
          <h2 className="text-lg font-bold font-heading text-primary mb-3 border-b border-primary/20 pb-1">Extra Informatie</h2>
          <dl className="grid grid-cols-1 gap-2">
            {Object.entries(data.customAnswers).map(([question, answer]) => (
              <div key={question} className="bg-muted/10 p-3 rounded-lg">
                <dt className="text-xs font-semibold text-muted-foreground mb-0.5">{question}</dt>
                <dd className="text-sm text-foreground font-medium">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Comments */}
      {data.comments && data.comments.trim() && (
        <div className="mb-6 break-inside-avoid">
          <h2 className="text-lg font-bold font-heading text-primary mb-3 border-b border-primary/20 pb-1">Opmerkingen</h2>
          <div className="bg-muted/10 p-3 rounded-lg italic text-muted-foreground whitespace-pre-wrap text-sm">
            "{data.comments}"
          </div>
        </div>
      )}

      {/* Payment Section */}
      {data.isPaid && data.totalPrice !== undefined && data.totalPrice > 0 && (
        <div className="mb-6 break-inside-avoid">
          <h2 className="text-lg font-bold font-heading text-primary mb-3 border-b border-primary/20 pb-1">Betaling</h2>
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3 text-primary">
              <span className="font-medium text-sm">Totaal te betalen</span>
              <span className="text-xl font-bold">€{data.totalPrice.toFixed(2)}</span>
            </div>

            <div className="text-xs text-foreground space-y-0.5 mb-3">
              <p>Prijs per kind: €{(data.totalPrice / data.children.length).toFixed(2)}</p>
              <p>Aantal kinderen: {data.children.length}</p>
            </div>

            {data.paymentInstructions && (
              <div className="mt-3 pt-3 border-t border-primary/10">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Betaalinstructies</p>
                <p className="whitespace-pre-wrap text-sm leading-snug">{data.paymentInstructions}</p>
              </div>
            )}

            <div className="mt-3 flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              Inschrijving is definitief na ontvangst van betaling.
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t text-center text-xs text-muted-foreground">
        <p className="font-bold text-primary mb-0.5">Scouts Sint-Johannes</p>
        <p>en bij vragen neem gerust contact op met : {getContactEmails(data.division).contacts.map(c => c.email).join(', ')}</p>
      </div>
    </div>
  )
}