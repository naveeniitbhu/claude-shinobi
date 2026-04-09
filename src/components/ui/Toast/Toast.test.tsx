import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import Toast from './Toast'

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    cleanup()
  })

  it('renders with a message', () => {
    render(<Toast message="Hello World" duration={0} />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders with a title', () => {
    render(<Toast message="Description text" title="Toast Title" duration={0} />)
    expect(screen.getByText('Toast Title')).toBeInTheDocument()
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('has role="alert" for accessibility', () => {
    render(<Toast message="Alert message" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders a dismiss button', () => {
    render(<Toast message="Test" duration={0} />)
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const handleDismiss = vi.fn()
    render(<Toast message="Test" onDismiss={handleDismiss} duration={0} />)

    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('auto-dismisses after duration', () => {
    const handleDismiss = vi.fn()
    render(<Toast message="Auto dismiss" onDismiss={handleDismiss} duration={3000} />)

    act(() => {
      vi.advanceTimersByTime(3000 + 300)
    })

    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not auto-dismiss when duration is 0', () => {
    const handleDismiss = vi.fn()
    render(<Toast message="Persistent" onDismiss={handleDismiss} duration={0} />)

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(handleDismiss).not.toHaveBeenCalled()
  })

  it('renders primary variant', () => {
    render(<Toast message="Primary" variant="primary" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders secondary variant', () => {
    render(<Toast message="Secondary" variant="secondary" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders success variant', () => {
    render(<Toast message="Success!" variant="success" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders danger variant', () => {
    render(<Toast message="Error!" variant="danger" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders warning variant', () => {
    render(<Toast message="Warning!" variant="warning" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders sm size', () => {
    render(<Toast message="Small toast" size="sm" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders md size by default', () => {
    render(<Toast message="Medium toast" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders lg size', () => {
    render(<Toast message="Large toast" size="lg" duration={0} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('does not call onDismiss twice when button clicked rapidly', () => {
    const handleDismiss = vi.fn()
    render(<Toast message="Test" onDismiss={handleDismiss} duration={0} />)

    const btn = screen.getByRole('button', { name: /dismiss/i })
    fireEvent.click(btn)
    fireEvent.click(btn)

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })
})
