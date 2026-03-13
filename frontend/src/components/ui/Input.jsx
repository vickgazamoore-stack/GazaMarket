import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  className = '',
  ...props
}, ref) => {
  const inputClasses = [
    'block w-full rounded-xl shadow-sm',
    'focus:outline-none',
    'transition-colors duration-200',
    error && 'border-red-300 focus:ring-red-300',
    startIcon && 'pl-10',
    endIcon && 'pr-10',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />

        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
