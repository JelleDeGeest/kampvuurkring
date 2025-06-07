'use client'

import React, { createContext, useContext } from 'react'

interface DraftModeContextType {
  isDraftMode: boolean
}

const DraftModeContext = createContext<DraftModeContextType>({ isDraftMode: false })

export function DraftModeProvider({ 
  children, 
  isDraftMode 
}: { 
  children: React.ReactNode
  isDraftMode: boolean 
}) {
  return (
    <DraftModeContext.Provider value={{ isDraftMode }}>
      {children}
    </DraftModeContext.Provider>
  )
}

export function useDraftMode() {
  return useContext(DraftModeContext)
}