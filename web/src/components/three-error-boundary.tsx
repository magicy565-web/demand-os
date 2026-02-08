'use client'

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ThreeErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('3D Component Error:', error.message)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            minHeight: '400px'
          }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <p>3D View Unavailable</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                {this.state.error?.message || 'Failed to load 3D component'}
              </p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
