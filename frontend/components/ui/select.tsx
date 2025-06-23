"use client"

import React, { useState, useRef, useEffect, createContext, useContext } from "react"
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import { cn } from "@/lib/utils"

interface SelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value?: string
  onValueChange?: (value: string) => void
}

const SelectContext = createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
})

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

interface SelectTriggerProps {
  children?: React.ReactNode
  className?: string
}

interface SelectContentProps {
  children?: React.ReactNode
  className?: string
}

interface SelectItemProps {
  value: string
  children?: React.ReactNode
  className?: string
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

  return (
    <SelectContext.Provider value={{ open, setOpen, value, onValueChange }}>
      <div ref={selectRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

function SelectTrigger({ children, className }: SelectTriggerProps) {
  const { open, setOpen } = useContext(SelectContext)
  
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
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
  const { open } = useContext(SelectContext)
  
  if (!open) return null
  
  return (
    <div className="absolute top-full left-0 right-0 z-[9999] mt-1">
      <div className="min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
        <div className={cn("p-1", className)}>
          {children}
        </div>
      </div>
    </div>
  )
}

function SelectItem({ value, children, className }: SelectItemProps) {
  const { value: selectedValue, onValueChange, setOpen } = useContext(SelectContext)
  const isSelected = selectedValue === value
  
  const handleClick = () => {
    onValueChange?.(value)
    setOpen(false)
  }
  
  return (
    <button
      type="button"
      onClick={handleClick}
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