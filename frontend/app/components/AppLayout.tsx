'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from './Sidebar'
import FloatingChatbot from './FloatingChatbot'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen">
      {user && (
        <>
          <Sidebar 
            isOpen={sidebarOpen} 
            setIsOpen={setSidebarOpen}
            isCollapsed={sidebarCollapsed}
            setIsCollapsed={setSidebarCollapsed}
          />
          <FloatingChatbot />
        </>
      )}
      
      <div className={`transition-all duration-500 ${user ? (sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80') : ''}`}>
        {children}
      </div>
    </div>
  )
}
