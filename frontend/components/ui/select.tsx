"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [open, setOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const childrenArray = React.Children.toArray(children)
  const trigger = childrenArray.find(
    (child): child is React.ReactElement => 
      React.isValidElement(child) && child.type === SelectTrigger
  )
  const content = childrenArray.find(
    (child): child is React.ReactElement => 
      React.isValidElement(child) && child.type === SelectContent
  )

  return (
    <div ref={selectRef} className="relative">
      {trigger && React.cloneElement(trigger, {
        onClick: () => setOpen(!open),
        open,
      })}
      {content && open && (
        <div className="absolute top-full left-0 right-0 z-[9999] mt-1">
          {React.cloneElement(content, {
            onValueChange: (val: string) => {
              onValueChange(val)
              setOpen(false)
            },
            value,
          })}
        </div>
      )}
    </div>
  )
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  open?: boolean
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({ 
  children, 
  className,
  onClick,
  open
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 transition-all duration-200",
        className
      )}
    >
      {children}
      <ChevronDownIcon className={cn("h-4 w-4 opacity-50 transition-transform", open && "rotate-180")} />
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  return <span>{placeholder}</span>
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
  onValueChange?: (value: string) => void
  value?: string
}

const SelectContent: React.FC<SelectContentProps> = ({ 
  children, 
  className,
  onValueChange,
  value
}) => {
  return (
    <div
      className={cn(
        "min-w-[8rem] w-full rounded-md border bg-white text-foreground shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      <div className="p-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
              onSelect: onValueChange,
              isSelected: child.props.value === value,
            })
          }
          return child
        })}
      </div>
    </div>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
  onSelect?: (value: string) => void
  isSelected?: boolean
}

const SelectItem: React.FC<SelectItemProps> = ({ 
  value, 
  children, 
  className,
  onSelect,
  isSelected
}) => {
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

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
}