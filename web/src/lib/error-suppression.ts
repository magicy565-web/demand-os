/**
 * Error suppression utilities for non-critical runtime errors
 * These errors occur in specific environments and don't affect functionality
 */

export function suppressNonCriticalErrors() {
  if (typeof window === 'undefined') return

  // Store original console methods
  const originalError = console.error
  const originalWarn = console.warn

  // Regex patterns for errors to suppress
  const SUPPRESS_PATTERNS = [
    /Vercel Web Analytics/i,
    /_vercel\/insights/i,
    /Failed to load script from .*insights/i,
    /Failed to load resource.*_vercel/i,
    /404.*_vercel/i,
    /lebombo_1k\.hdr/i,
    /Failed to fetch.*hdri/i,
    /THREE\.WebGLRenderer.*Context Lost/i,
    /net::ERR_CONNECTION_CLOSED/i,
  ]

  // Check if error message matches suppression patterns
  const shouldSuppress = (message: string | any): boolean => {
    const messageStr = String(message)
    return SUPPRESS_PATTERNS.some(pattern => pattern.test(messageStr))
  }

  // Override console.error
  console.error = (...args: any[]) => {
    if (!args.some(arg => shouldSuppress(arg))) {
      originalError.apply(console, args)
    }
  }

  // Override console.warn
  console.warn = (...args: any[]) => {
    if (!args.some(arg => shouldSuppress(arg))) {
      originalWarn.apply(console, args)
    }
  }

  // Suppress unhandled rejection events for specific errors
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (shouldSuppress(event.reason) || 
       shouldSuppress(event.reason?.message) ||
       shouldSuppress(event.reason?.toString?.()))
    ) {
      event.preventDefault()
    }
  })

  // Suppress error events
  window.addEventListener('error', (event) => {
    if (shouldSuppress(event.message)) {
      event.preventDefault()
    }
  })
}
