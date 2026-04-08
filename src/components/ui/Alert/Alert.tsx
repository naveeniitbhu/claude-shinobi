interface AlertProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

function Alert({
  children,
  variant = 'primary',
  size = 'md',
  title,
  dismissible = false,
  onDismiss,
  className = ''
}: AlertProps) {
  const baseClasses = 'flex items-start rounded-lg border-l-4'

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-3 text-base gap-3',
    lg: 'px-5 py-4 text-lg gap-4'
  }

  const variantClasses = {
    primary: 'bg-primary/10 border-primary text-primary',
    secondary: 'bg-secondary/10 border-secondary text-secondary',
    success: 'bg-success/10 border-success text-success',
    danger: 'bg-danger/10 border-danger text-danger',
    warning: 'bg-warning/10 border-warning text-warning'
  }

  const alertClass = [baseClasses, sizeClasses[size], variantClasses[variant], className]
    .filter(Boolean)
    .join(' ')

  return (
    <div role="alert" className={alertClass}>
      <div style={{ flex: 1 }}>
        {title && <div className="font-bold mb-1">{title}</div>}
        <div>{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none p-0 text-current leading-none"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Alert
