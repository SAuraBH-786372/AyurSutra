import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = '', ...props }, ref) => {
    const inputClasses = `w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
      error 
        ? 'border-emergency-red-300 focus:border-emergency-red-500 focus:ring-4 focus:ring-red-100' 
        : 'border-gray-200 focus:border-saffron-500 focus:ring-4 focus:ring-green-100'
    } ${icon ? 'pl-12' : ''} ${className}`

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-emergency-red-600 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input