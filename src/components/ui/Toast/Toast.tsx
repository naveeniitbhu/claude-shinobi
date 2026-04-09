"use client"
import { useEffect, useRef, useState } from 'react'
import { X, CheckCircle, AlertTriangle, XCircle, Info, Bell } from 'lucide-react'

export type ToastVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
export type ToastSize = 'sm' | 'md' | 'lg'

export interface ToastProps {
  message: string
  title?: string
  variant?: ToastVariant
  size?: ToastSize
  duration?: number
  onDismiss?: () => void
}

const variantIcons = {
  primary: Info,
  secondary: Bell,
  success: CheckCircle,
  danger: XCircle,
  warning: AlertTriangle,
}

const variantColors: Record<ToastVariant, string> = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  success: 'var(--success)',
  danger: 'var(--danger)',
  warning: 'var(--warning)',
}

const sizeConfig: Record<ToastSize, { padding: string; fontSize: string; iconSize: number; minWidth: string; maxWidth: string }> = {
  sm: { padding: '0.5rem 0.75rem', fontSize: '0.8rem', iconSize: 14, minWidth: '200px', maxWidth: 'min(300px, 100%)' },
  md: { padding: '0.75rem 1rem', fontSize: '0.9rem', iconSize: 18, minWidth: '240px', maxWidth: 'min(360px, 100%)' },
  lg: { padding: '1rem 1.25rem', fontSize: '1rem', iconSize: 22, minWidth: '280px', maxWidth: 'min(440px, 100%)' },
}

function Toast({
  message,
  title,
  variant = 'primary',
  size = 'md',
  duration = 4000,
  onDismiss,
}: ToastProps) {
  const [mounted, setMounted] = useState(false)
  const [exiting, setExiting] = useState(false)
  const dismissingRef = useRef(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleDismiss = () => {
    if (dismissingRef.current) return
    dismissingRef.current = true
    setExiting(true)
    setTimeout(() => onDismiss?.(), 250)
  }

  useEffect(() => {
    setMounted(true)

    if (duration > 0) {
      const timer = setTimeout(handleDismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [])

  const color = variantColors[variant]
  const config = sizeConfig[size]
  const Icon = variantIcons[variant]
  const isVisible = mounted && !exiting
  const ariaLive = variant === 'danger' || variant === 'warning' ? 'assertive' : 'polite'

  return (
    <div
      role="alert"
      aria-live={ariaLive}
      aria-atomic="true"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: config.padding,
        minWidth: config.minWidth,
        maxWidth: config.maxWidth,
        width: '100%',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: `4px solid ${color}`,
        borderRadius: '0.5rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        fontSize: config.fontSize,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0) scale(1)'
          : prefersReducedMotion ? 'none' : 'translateX(40px) scale(0.96)',
        transition: prefersReducedMotion
          ? 'opacity 0.1s ease'
          : 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      <div style={{ color, flexShrink: 0, marginTop: '1px', display: 'flex' }}>
        <Icon size={config.iconSize} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontWeight: 600, color: 'var(--foreground)', marginBottom: '0.2rem' }}>
            {title}
          </div>
        )}
        <div style={{ color: 'var(--foreground)', lineHeight: 1.45 }}>{message}</div>
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        className="toast-dismiss-btn"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--muted)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.25rem',
          lineHeight: 0,
          minWidth: '32px',
          minHeight: '32px',
        }}
      >
        <X size={Math.max(config.iconSize - 4, 12)} />
      </button>
    </div>
  )
}

export default Toast
