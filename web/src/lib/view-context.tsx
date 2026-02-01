'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ViewContextType {
  viewMode: 'enterprise' | 'government'
  toggleViewMode: () => void
}

const ViewContext = createContext<ViewContextType | undefined>(undefined)

export function ViewProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<'enterprise' | 'government'>('enterprise')

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'enterprise' ? 'government' : 'enterprise')
  }

  return (
    <ViewContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </ViewContext.Provider>
  )
}

export function useView() {
  const context = useContext(ViewContext)
  if (!context) {
    throw new Error('useView must be used within ViewProvider')
  }
  return context
}
