"use client"

import React, { useState, useRef, useEffect } from "react"
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import { cn } from "@/lib/utils"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

interface SelectTriggerProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  open?: boolean
}

interface SelectContentProps {
  children?: React.ReactNode
  className?: string
  onValueChange?: (value: string) => void
  value?: string
}

interface SelectItemProps {
  value: string
  children?: React.ReactNode
  className?: string
  onSelect?: (value: string) => void
  isSelected?: boolean
}

function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleValueChange = (val: string) => {
    onValueChange?.(val)
    setOpen(false)
  }

  return (
    <div ref={selectRef} className="relative">
      {/* Render trigger */}
      <div onClick={() => setOpen(!open)}>
        {children}
      </div>
      
      {/* Render content */}
      {open && (
        <div className="absolute top-full left-0 right-0 z-[9999] mt-1">
          <div className="min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
            <div className="p-1">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SelectTrigger({ children, className, open }: SelectTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all duration-200",
        className
      )}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")} />
    </button>
  )
}

function SelectContent({ children, className }: SelectContentProps) {
  return (
    <div className={cn("p-1", className)}>
      {children}
    </div>
  )
}

function SelectItem({ value, children, isSelected, onSelect, className }: SelectItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
        isSelected && "bg-primary/5 text-primary font-medium",
        className
      )}
    >
      {children}
    </button>
  )
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }