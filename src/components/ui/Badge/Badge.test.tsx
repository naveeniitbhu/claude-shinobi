import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import Badge from './Badge'

describe('Badge', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders with a count', () => {
    render(<Badge count={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders with primary variant by default', () => {
    render(<Badge count={3} />)
    expect(screen.getByText('3')).toHaveClass('bg-primary')
  })

  it('renders with danger variant', () => {
    render(<Badge count={7} variant="danger" />)
    expect(screen.getByText('7')).toHaveClass('bg-danger')
  })

  it('renders with success variant', () => {
    render(<Badge count={2} variant="success" />)
    expect(screen.getByText('2')).toHaveClass('bg-success')
  })

  it('renders with warning variant', () => {
    render(<Badge count={1} variant="warning" />)
    expect(screen.getByText('1')).toHaveClass('bg-warning')
  })

  it('renders with secondary variant', () => {
    render(<Badge count={4} variant="secondary" />)
    expect(screen.getByText('4')).toHaveClass('bg-secondary')
  })

  it('caps count at max and shows max+ label', () => {
    render(<Badge count={150} max={99} />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('uses custom max value', () => {
    render(<Badge count={20} max={9} />)
    expect(screen.getByText('9+')).toBeInTheDocument()
  })

  it('shows exact count when at or below max', () => {
    render(<Badge count={99} max={99} />)
    expect(screen.getByText('99')).toBeInTheDocument()
  })

  it('applies disabled styles', () => {
    render(<Badge count={5} disabled />)
    expect(screen.getByText('5')).toHaveClass('opacity-50')
  })

  it('applies custom className', () => {
    render(<Badge count={3} className="custom-class" />)
    expect(screen.getByText('3')).toHaveClass('custom-class')
  })

  it('renders with sm size', () => {
    render(<Badge count={1} size="sm" />)
    expect(screen.getByText('1')).toHaveClass('h-5')
  })

  it('renders with lg size', () => {
    render(<Badge count={1} size="lg" />)
    expect(screen.getByText('1')).toHaveClass('h-7')
  })
})
