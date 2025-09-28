'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function NotificationBell() {
  const { user } = useAuth()
  const [unreadCount, setUnreadCount] = useState(3) // Mock unread count
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Animate bell periodically if there are unread notifications
    if (unreadCount > 0) {
      const interval = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 800)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [unreadCount])

  if (!user) return null

  return (
    <Link href="/notifications" className="relative">
      <div className="relative p-3 hover:bg-gradient-to-r hover:from-[#C08552]/20 hover:to-[#a06a3e]/20 rounded-xl transition-all duration-300 group transform hover:scale-105">
        {/* Bell Icon */}
        <div className={`text-[#43170d] group-hover:text-[#C08552] transition-all duration-300 ${
          isAnimating ? 'animate-bounce' : ''
        }`}>
          <svg 
            className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
            />
          </svg>
        </div>

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
            <span className="animate-pulse">{unreadCount > 9 ? '9+' : unreadCount}</span>
          </div>
        )}

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          {unreadCount > 0 ? `${unreadCount} new notifications` : 'Notifications'}
        </div>
      </div>
    </Link>
  )
}
