import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Alert from './Alert'

describe('Alert', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with default props', () => {
    render(<Alert>Test message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass('border-primary')
  })

  it('renders with different variants', () => {
    render(<Alert variant="danger">Danger message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-danger')
  })

  it('renders a title when provided', () => {
    render(<Alert title="Alert Title">Message</Alert>)
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Message')).toBeInTheDocument()
  })

  it('does not render a title element when not provided', () => {
    render(<Alert>No title alert</Alert>)
    expect(screen.queryByText('Alert Title')).not.toBeInTheDocument()
  })

  it('renders dismiss button when dismissible', () => {
    render(<Alert dismissible onDismiss={() => {}}>Dismissible alert</Alert>)
    expect(screen.getByRole('button', { name: /dismiss alert/i })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const handleDismiss = vi.fn()
    render(<Alert dismissible onDismiss={handleDismiss}>Dismissible alert</Alert>)

    fireEvent.click(screen.getByRole('button', { name: /dismiss alert/i }))
    expect(handleDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not render a dismiss button when not dismissible', () => {
    render(<Alert>Non-dismissible alert</Alert>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('applies size classes', () => {
    render(<Alert size="lg">Large alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('text-lg')
  })

  it('defaults to medium size', () => {
    render(<Alert>Default size alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('text-base')
  })

  it('applies custom className', () => {
    render(<Alert className="custom-class">Custom Alert</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('custom-class')
  })
})
