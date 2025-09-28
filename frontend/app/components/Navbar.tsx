'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { InlineLoader } from './ui/LoadingSpinner'
import NotificationBell from './NotificationBell'

export default function Navbar() {
  const { user, logout, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showUserElements, setShowUserElements] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Show user elements after a brief delay to ensure smooth loading
    if (!loading) {
      const timer = setTimeout(() => {
        setShowUserElements(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <nav className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#C08552]/20' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#C08552] to-[#a06a3e] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-white text-sm font-bold">🌿</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#C08552] to-[#a06a3e] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  AyurSutra
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                <Link href="/" className="text-[#43170d] hover:text-white hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Home
                </Link>
                <Link href="/bookings" className="text-[#43170d] hover:text-white hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Bookings
                </Link>
                <Link href="/panchabot" className="text-[#43170d] hover:text-white hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  AI Chat
                </Link>
                <Link href="/community" className="text-[#43170d] hover:text-white hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Community
                </Link>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-[#C08552] to-[#C08552]/80 hover:from-[#C08552]/90 hover:to-[#C08552] text-white px-6 py-2 rounded-xl text-sm font-semibold transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[#43170d] hover:text-white hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  About
                </a>
                <Link href="/community" className="text-[#43170d] hover:text-white hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Community
                </Link>
                <Link href="/signup" className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white font-medium rounded-full px-6 py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Join Now
                </Link>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center">
            {!user && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-[#43170d] hover:text-[#C08552] focus:outline-none p-2 rounded-md transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
            {user && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-[#43170d] hover:text-[#C08552] rounded-xl hover:bg-[#C0855210] transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-[#C08552]/30 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {loading ? (
              <div className="px-4 py-2">
                <InlineLoader text="Loading..." size="sm" />
              </div>
            ) : user && showUserElements ? (
              <>
                <Link href="/" className="block px-4 py-3 text-[#43170d] hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] hover:text-white font-medium transition-all duration-300 rounded-lg transform hover:scale-105">
                  Home
                </Link>
                <Link href="/bookings" className="block px-4 py-3 text-[#43170d] hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] hover:text-white font-medium transition-all duration-300 rounded-lg transform hover:scale-105">
                  Bookings
                </Link>
                <Link href="/panchabot" className="block px-4 py-3 text-[#43170d] hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] hover:text-white font-medium transition-all duration-300 rounded-lg transform hover:scale-105">
                  AI Chat
                </Link>
                <Link href="/community" className="block px-4 py-3 text-[#43170d] hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] hover:text-white font-medium transition-all duration-300 rounded-lg transform hover:scale-105">
                  Community
                </Link>
              </>
            ) : showUserElements ? (
              <>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                  className="block px-4 py-3 text-[#43170d] hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] hover:text-white font-medium transition-all duration-300 rounded-lg transform hover:scale-105 cursor-pointer"
                >
                  About
                </a>
                <Link href="/community" className="block px-4 py-3 text-[#43170d] hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] hover:text-white font-medium transition-all duration-300 rounded-lg transform hover:scale-105">
                  Community
                </Link>
                <Link href="/signup" className="block px-4 py-3 text-[#43170d] hover:bg-gradient-to-r hover:from-[#C08552] hover:to-[#a06a3e] hover:text-white font-medium transition-all duration-300 rounded-lg transform hover:scale-105">
                  Join Now
                </Link>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  )
}
