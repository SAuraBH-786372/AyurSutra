'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

export default function FloatingChatbot() {
  const { user } = useAuth()
  const [showTooltip, setShowTooltip] = useState(false)

  if (!user) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
            Chat with Panchabot
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}

        {/* Chatbot Button */}
        <Link
          href="/panchabot"
          className="group flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="relative">
            {/* Chat Icon */}
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            
            {/* Status indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFC107] rounded-full border-2 border-white"></div>
          </div>
        </Link>
      </div>
    </div>
  )
}
