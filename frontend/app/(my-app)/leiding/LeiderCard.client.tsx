"use client"

import { ResponsiveImage, type PayloadImage } from "@/components/ResponsiveImage"
import TransitionLink from "@/components/TransitionLink"

interface Leider {
  id: string
  name: string
  totem: string
  kapoenenNaam?: string
  wouterNaam?: string
  image?: PayloadImage
}

interface LeiderCardProps {
  leider: Leider
  tak: string
}

function LeiderNameDisplay({ leider, tak }: { leider: Leider; tak: string }) {
  const displayName = tak === 'kapoenen' && leider.kapoenenNaam
    ? leider.kapoenenNaam
    : tak === 'wouters' && leider.wouterNaam
    ? leider.wouterNaam
    : null;

  if (displayName) {
    return (
      <>
        <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-200">{displayName}</h3>
        <p className="text-sm text-gray-600">{leider.name}</p>
        <p className="text-xs text-gray-500">{leider.totem}</p>
      </>
    );
  }

  return (
    <>
      <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">{leider.name}</h3>
      <p className="text-sm text-gray-600">{leider.totem}</p>
    </>
  );
}

export default function LeiderCard({ leider, tak }: LeiderCardProps) {
  return (
    <TransitionLink
      href={`/leiding/${leider.id}`}
      className="group flex flex-col hover:transform hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <div className="aspect-square w-full bg-gray-200 relative overflow-hidden rounded-lg max-w-[160px] mx-auto shadow-md group-hover:shadow-xl transition-shadow duration-200">
        {leider.image?.url ? (
          <ResponsiveImage
            media={leider.image}
            alt={leider.name}
            width={160}
            height={160}
            sizes="(max-width: 768px) 45vw, 160px"
            className="object-cover group-hover:brightness-110 transition-all duration-200"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
      </div>
      <div className="mt-2 text-center">
        <LeiderNameDisplay leider={leider} tak={tak} />
      </div>
    </TransitionLink>
  )
}
