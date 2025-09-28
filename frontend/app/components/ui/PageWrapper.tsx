import React from 'react'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  withBackgroundShapes?: boolean
}

const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  className = '', 
  withBackgroundShapes = true 
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 relative overflow-hidden ${className}`}>
      {withBackgroundShapes && (
        <>
          {/* Organic Background Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large organic shape - top right */}
            <div className="absolute -top-40 -right-40 w-96 h-96 opacity-10">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                      fill="url(#greenGradient)" />
                <defs>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="100%" stopColor="#65a30d" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Medium organic shape - bottom left */}
            <div className="absolute -bottom-32 -left-32 w-80 h-80 opacity-8">
              <svg viewBox="0 0 320 320" className="w-full h-full">
                <path d="M160,40 C240,40 280,80 280,160 C280,240 240,280 160,280 C80,280 40,240 40,160 C40,80 80,40 160,40 Z" 
                      fill="url(#greenGradient)" />
                <defs>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d3018" />
                    <stop offset="100%" stopColor="#164a24" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Small floating elements */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#0d3018] rounded-full opacity-40 animate-bounce-slow"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#43170d] rounded-full opacity-40 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-[#eaba86] rounded-full opacity-40 animate-bounce-slow" style={{animationDelay: '2s'}}></div>
          </div>
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default PageWrapper