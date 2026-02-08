'use client'

import { useEffect } from 'react'
import { suppressNonCriticalErrors } from '@/lib/error-suppression'

/**
 * Client-side component to suppress non-critical errors
 * Prevents console spam from environment-specific issues
 */
export function ErrorSuppressor() {
  useEffect(() => {
    suppressNonCriticalErrors()
  }, [])

  return null
}
