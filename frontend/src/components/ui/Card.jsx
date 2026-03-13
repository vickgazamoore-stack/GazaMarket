import { forwardRef } from 'react'

const Card = forwardRef(({
  children,
  title,
  subtitle,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={`gm-card ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className={`px-6 py-4 border-b ${headerClassName}`} style={{ borderColor: "var(--border)" }}>
          {title && (
            <h3 className="text-lg font-medium" style={{ color: "var(--ink)" }}>{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{subtitle}</p>
          )}
        </div>
      )}

      <div className={`px-6 py-4 ${bodyClassName}`}>
        {children}
      </div>

      {footer && (
        <div
          className={`px-6 py-4 border-t ${footerClassName}`}
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          {footer}
        </div>
      )}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
