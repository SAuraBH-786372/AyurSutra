'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isCollapsed?: boolean
  setIsCollapsed?: (collapsed: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen, isCollapsed: externalCollapsed, setIsCollapsed: externalSetCollapsed }: SidebarProps) {
  const { user } = useAuth()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  
  // Use external state if provided, otherwise use internal state
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed
  const setIsCollapsed = externalSetCollapsed || setInternalCollapsed

  const sidebarSections = [
    {
      id: 'therapy',
      title: 'Therapy Management',
      icon: '🏥',
      items: [
        { href: '/therapy-scheduler', label: 'Schedule Therapy', icon: '📅' },
        { href: '/therapy-tracking', label: 'Live Tracking', icon: '📊' },
        { href: '/progress-insights', label: 'Progress & Insights', icon: '📈' }
      ]
    },
    {
      id: 'wellness',
      title: 'Wellness & Lifestyle',
      icon: '🧘',
      items: [
        { href: '/diet-lifestyle', label: 'Daily Wellness', icon: '🌿' },
        { href: '/diet-plans', label: 'Diet & Recipes', icon: '🥗' },
        { href: '/prakriti-analysis', label: 'Dosha Analysis', icon: '⚖️' }
      ]
    },
    {
      id: 'bookings',
      title: 'Appointments',
      icon: '📋',
      items: [
        { href: '/slots', label: 'Book Slots', icon: '🕒' },
        { href: '/bookings', label: 'My Bookings', icon: '📝' }
      ]
    },
    {
      id: 'content',
      title: 'Ayurveda Content',
      icon: '📚',
      items: [
        { href: '/mantras', label: 'Mantras', icon: '🕉️' },
        { href: '/chat', label: 'AI Consultant', icon: '🤖' }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      icon: '👥',
      items: [
        { href: '/community', label: 'Community Hub', icon: '💬' }
      ]
    }
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  if (!user) return null

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] ${isCollapsed ? 'w-16' : 'w-80'} bg-white/95 backdrop-blur-md shadow-xl border-r border-[#C0855240] z-50 transform transition-all duration-500 ease-out overflow-y-auto ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      } lg:translate-x-0 lg:opacity-100`}>
        
        {/* Header */}
        <div className="p-6 border-b border-[#C0855240] animate-fade-in-down">
          <div className="flex items-center justify-between">
            {!isCollapsed && <h2 className="text-xl font-bold text-[#43170d] transition-colors duration-300">Dashboard</h2>}
            <div className="flex items-center space-x-2">
              {/* Collapse/Expand Button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:block p-2 text-[#C0855280] hover:text-[#C08552] rounded-lg hover:bg-[#C0855210] transition-all duration-300 transform hover:scale-110"
                title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                {isCollapsed ? '▶' : '◀'}
              </button>
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 text-[#C0855280] hover:text-[#C08552] rounded-lg hover:bg-[#C0855210] transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                ✕
              </button>
            </div>
          </div>
          {!isCollapsed && <p className="text-sm text-[#C0855280] mt-1 animate-fade-in-up" style={{animationDelay: '0.2s'}}>Welcome back, {user.username}!</p>}
        </div>

        {/* Navigation Sections */}
        <div className="p-4 space-y-2">
          {sidebarSections.map((section) => (
            <div key={section.id} className="mb-4">
              <button
                onClick={() => isCollapsed ? null : toggleSection(section.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 text-left rounded-xl hover:bg-[#C0855210] transition-all duration-300 group transform hover:scale-105 hover:shadow-md`}
                title={isCollapsed ? section.title : ''}
              >
                <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                  <span className="text-xl transition-transform duration-300 group-hover:scale-110">{section.icon}</span>
                  {!isCollapsed && (
                    <span className="font-semibold text-[#43170d] group-hover:text-[#C08552] transition-all duration-300">
                      {section.title}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className={`text-[#C0855260] transition-all duration-300 ${
                    expandedSection === section.id ? 'rotate-90 text-[#C08552]' : 'group-hover:text-[#C08552]'
                  }`}>
                    ▶
                  </span>
                )}
              </button>

              {/* Expanded Items - Only show when not collapsed */}
              {!isCollapsed && (
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  expandedSection === section.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="ml-6 mt-2 space-y-1">
                    {section.items.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-lg text-[#43170d] hover:bg-[#C0855210] hover:text-[#C08552] transition-all duration-300 group transform hover:translate-x-2 hover:scale-105 animate-slide-in-left"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <span className="text-lg transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-[#C0855240] mt-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="space-y-3">
            <Link
              href="/wallet"
              onClick={() => setIsOpen(false)}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 bg-gradient-to-r from-[#C0855210] to-[#C0855220] rounded-xl border border-[#C0855240] hover:from-[#C0855220] hover:to-[#C0855230] transition-all duration-300 group transform hover:scale-105 hover:shadow-lg`}
              title={isCollapsed ? `Wallet: ₹${user.wallet_balance}` : ''}
            >
              {isCollapsed ? (
                <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">💰</span>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">💰</span>
                    <span className="font-semibold text-[#C08552] transition-colors duration-300">Wallet</span>
                  </div>
                  <span className="bg-[#C08552] text-white px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 group-hover:bg-[#C08552]/90 group-hover:scale-110">
                    ₹{user.wallet_balance}
                  </span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
