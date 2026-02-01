'use client'

import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'
  showText?: boolean
}

export function LogoSVG({ size = 'md', variant = 'light', showText = false }: LogoProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  }

  const dimension = sizeMap[size]
  const strokeColor = variant === 'dark' ? '#FFFFFF' : '#0F1729'
  const accentColor = variant === 'dark' ? '#0EA5E9' : '#2563EB'

  return (
    <svg viewBox="0 0 100 100" width={dimension} height={dimension} xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <defs>
        <linearGradient id={`grad-${variant}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0F1729', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0EA5E9', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="shadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="0" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.15" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="white" stroke={`url(#grad-${variant}-${size})`} strokeWidth="2" filter="url(#shadow)" />

      {/* D shape - left side */}
      <g stroke={strokeColor} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="28" y1="32" x2="28" y2="68" />
        <path d="M 28 32 Q 42 32 42 50 Q 42 68 28 68" />
      </g>

      {/* O shape - right side */}
      <circle cx="63" cy="50" r="14" fill="none" stroke={accentColor} strokeWidth="2.5" />

      {/* Center accent line */}
      <line x1="35" y1="50" x2="50" y2="50" stroke={accentColor} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

      {/* Top-right accent dot */}
      <circle cx="75" cy="35" r="1.5" fill={accentColor} opacity="0.7" />

      {/* Bottom-left accent dot */}
      <circle cx="25" cy="72" r="1.5" fill={strokeColor} opacity="0.5" />
    </svg>
  )
}

export function LogoText({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#0F1729'
  
  return (
    <span className="font-semibold tracking-tight" style={{ color: textColor }}>
      Demand-OS
    </span>
  )
}
