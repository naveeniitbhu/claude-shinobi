interface BadgeProps {
  count: number
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  max?: number
  className?: string
}

function Badge({
  count,
  variant = 'primary',
  size = 'md',
  disabled = false,
  max = 99,
  className = '',
}: BadgeProps) {
  const displayCount = count > max ? `${max}+` : count

  const sizeClasses = {
    sm: 'min-w-[1.25rem] h-5 text-xs px-1',
    md: 'min-w-[1.5rem] h-6 text-sm px-1.5',
    lg: 'min-w-[1.75rem] h-7 text-base px-2',
  }

  const variantClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white dark:text-black',
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white',
  }

  const badgeClass = [
    'inline-flex items-center justify-center rounded-full font-bold leading-none select-none transition-opacity duration-200',
    sizeClasses[size],
    variantClasses[variant],
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={badgeClass}>{displayCount}</span>
}

export default Badge
