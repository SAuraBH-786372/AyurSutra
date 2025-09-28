import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'green' | 'white' | 'gray'
  text?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary', 
  text,
  className = ''
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  }
  
  if (text) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        {/* Enhanced Professional Spinner */}
        <div className={`${sizes[size]} relative flex items-center justify-center`}>
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#C08552]/20"></div>
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C08552] border-r-[#C08552] animate-spin" style={{animationDuration: '1s'}}></div>
          {/* Inner lotus symbol */}
          <div className="text-[#C08552] text-lg font-bold">🕉️</div>
        </div>
        <div className="text-center max-w-xs">
          <p className="text-[#C08552] font-semibold text-base">{text}</p>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-[#C08552] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-[#C08552] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-[#C08552] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    )
  }
  
  // Simple spinner without text
  return (
    <div className={`relative ${sizes[size]} flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full border-4 border-[#C08552]/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C08552] border-r-[#C08552] animate-spin" style={{animationDuration: '1s'}}></div>
      <div className="text-[#C08552] text-sm">🕉️</div>
    </div>
  )
}

export const PageLoader: React.FC<{ text?: string }> = ({ text = "Loading your wellness journey..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eaba86]/10 via-[#C08552]/5 to-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#C08552]/30 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[#C08552]/30 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-[#C08552]/20 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-[#C08552]/40 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1.5s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#C08552]/40 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2.5s', animationDuration: '3s'}}></div>
      </div>
      
      <div className="relative z-10 text-center p-8">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-12 shadow-2xl border border-[#C08552]/20">
          <LoadingSpinner size="xl" text={text} />
          <div className="mt-6 text-xs text-[#43170d]/70 font-medium tracking-wide uppercase">
            AyurSutra
          </div>
        </div>
      </div>
    </div>
  )
}

export const InlineLoader: React.FC<{ text?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  text = "Loading...", 
  size = 'md' 
}) => {
  return (
    <div className="flex items-center justify-center space-x-3 py-2">
      <LoadingSpinner size={size} />
      <span className="text-[#43170d]/80 font-medium animate-pulse" style={{animationDuration: '2s'}}>{text}</span>
    </div>
  )
}

export default LoadingSpinner