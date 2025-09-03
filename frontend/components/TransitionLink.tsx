"use client"

import { useTransitionRouter } from "./TransitionProvider"

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  [key: string]: any
}

export default function TransitionLink({ 
  href, 
  children, 
  className, 
  onClick,
  ...props 
}: TransitionLinkProps) {
  const { navigate } = useTransitionRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Call original onClick if provided
    if (onClick) {
      onClick(e)
    }
    
    navigate(href)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}