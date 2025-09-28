import React from 'react'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  loading?: boolean
  children: React.ReactNode
  as?: 'button' | 'a'
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, loading, children, className = '', disabled, as = 'button', href, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
    
    const variants = {
      primary: 'bg-gradient-to-r from-[#C08552] to-[#C08552]/90 hover:from-[#C08552]/90 hover:to-[#C08552] text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-[#eaba86]',
      secondary: 'bg-gradient-to-r from-[#eaba86] to-[#f0e0d0] hover:from-[#f0e0d0] hover:to-[#eaba86] text-[#43170d] shadow-md hover:shadow-lg hover:scale-105 focus:ring-[#C08552]',
      outline: 'border-2 border-[#C08552] text-[#C08552] hover:bg-[#C08552]/10 hover:border-[#C08552] hover:scale-105 focus:ring-[#eaba86]',
      ghost: 'text-[#C08552] hover:text-[#C08552] hover:bg-[#C08552]/10 hover:scale-105 focus:ring-[#eaba86]',
      danger: 'bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] hover:from-[#B71C1C] hover:to-[#D32F2F] text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-red-200'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
    
    const content = loading ? (
      <>
        <LoadingSpinner size="sm" className="mr-2" />
        <span>Loading...</span>
      </>
    ) : (
      <>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </>
    )
    
    if (as === 'a' && href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      )
    }
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button