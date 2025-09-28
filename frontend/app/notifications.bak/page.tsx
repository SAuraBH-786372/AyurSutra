'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface Notification {
  id: string
  type: 'appointment' | 'reminder' | 'alert' | 'milestone' | 'emergency'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  actionRequired?: boolean
}

interface NotificationSettings {
  email: boolean
  sms: boolean
  push: boolean
  inApp: boolean
}

export default function Notifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'settings'>('all')
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [emergencyType, setEmergencyType] = useState('')

  const [notificationSettings, setNotificationSettings] = useState<{
    appointments: NotificationSettings
    reminders: NotificationSettings
    milestones: NotificationSettings
    emergencies: NotificationSettings
  }>({
    appointments: { email: true, sms: true, push: true, inApp: true },
    reminders: { email: true, sms: false, push: true, inApp: true },
    milestones: { email: true, sms: false, push: true, inApp: true },
    emergencies: { email: true, sms: true, push: true, inApp: true }
  })

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Abhyanga Session',
      message: 'Your Abhyanga therapy is scheduled for tomorrow at 10:00 AM with Dr. Sharma',
      timestamp: '2025-01-15T14:30:00Z',
      read: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Pre-therapy Preparation',
      message: 'Remember to avoid heavy meals 2 hours before your session',
      timestamp: '2025-01-15T12:00:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'milestone',
      title: 'Milestone Achieved!',
      message: 'Congratulations! You have completed 50% of your Panchakarma program',
      timestamp: '2025-01-14T16:45:00Z',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Session Rescheduled',
      message: 'Your Shirodhara session has been moved from 2:00 PM to 3:00 PM today',
      timestamp: '2025-01-14T09:15:00Z',
      read: true,
      priority: 'high',
      actionRequired: true
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Medication Reminder',
      message: 'Time to take your prescribed Ayurvedic herbs - Triphala churna',
      timestamp: '2025-01-13T20:00:00Z',
      read: true,
      priority: 'medium'
    }
  ]

  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return '📅'
      case 'reminder': return '⏰'
      case 'alert': return '⚠️'
      case 'milestone': return '🎉'
      case 'emergency': return '🚨'
      default: return '📢'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-emergency-red-50'
      case 'high': return 'border-l-orange-500 bg-saffron-50'
      case 'medium': return 'border-l-yellow-500 bg-warm-yellow-50'
      case 'low': return 'border-l-green-500 bg-saffron-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const handleEmergencyAlert = (type: string) => {
    setEmergencyType(type)
    setShowEmergencyModal(true)
    // In real implementation, this would trigger actual emergency protocols
  }

  const updateNotificationSetting = (category: keyof typeof notificationSettings, channel: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: value
      }
    }))
  }

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'unread') return !notif.read
    return true
  })

  const unreadCount = notifications.filter(notif => !notif.read).length

  if (loading) {
    return <PageLoader text="Loading notifications..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notifications & Alerts</h1>
          <p className="text-xl text-gray-600">Stay updated with your therapy journey</p>
        </div>

        {/* Emergency Alert Buttons */}
        <div className="bg-[#D32F2F20] border border-[#D32F2F40] rounded-3xl p-6 mb-8">
          <h2 className="text-xl font-bold text-[#D32F2F] mb-4 text-center">Emergency Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleEmergencyAlert('medical')}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-6 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🚨 Medical Emergency
            </button>
            <button
              onClick={() => handleEmergencyAlert('reaction')}
              className="bg-[#43170d] hover:bg-[#5a2515] text-white px-6 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              ⚠️ Adverse Reaction
            </button>
            <button
              onClick={() => handleEmergencyAlert('urgent')}
              className="bg-[#FFC107] hover:bg-[#FFA000] text-[#43170d] px-6 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              📞 Urgent Consultation
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-white/20 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-[#43170d] text-white shadow-lg'
                  : 'text-[#43170d] hover:bg-[#eaba8640]'
              }`}
            >
              All Notifications
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                activeTab === 'unread'
                  ? 'bg-[#43170d] text-white shadow-lg'
                  : 'text-[#43170d] hover:bg-[#eaba8640]'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'settings'
                  ? 'bg-[#43170d] text-white shadow-lg'
                  : 'text-[#43170d] hover:bg-[#eaba8640]'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === 'settings' ? (
          /* Settings Tab */
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            
            {Object.entries(notificationSettings).map(([category, settings]) => (
              <div key={category} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                  {category} Notifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(settings).map(([channel, enabled]) => (
                    <label key={channel} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => updateNotificationSetting(
                          category as keyof typeof notificationSettings,
                          channel as keyof NotificationSettings,
                          e.target.checked
                        )}
                        className="w-5 h-5 text-saffron-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {channel === 'inApp' ? 'In-App' : channel}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-6 border-t border-gray-200">
              <button className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
                Save Preferences
              </button>
            </div>
          </div>
        ) : (
          /* Notifications List */
          <div className="space-y-4">
            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {activeTab === 'unread' ? 'Unread Notifications' : 'All Notifications'}
              </h2>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-clay-brown-100 text-clay-brown-700 rounded-xl hover:bg-clay-brown-200 transition-colors duration-300 font-medium"
                >
                  Mark All as Read
                </button>
              )}
            </div>

            {filteredNotifications.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📭</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Notifications</h3>
                <p className="text-gray-600">
                  {activeTab === 'unread' ? 'All caught up! No unread notifications.' : 'No notifications to display.'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'border-r-4 border-r-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-clay-brown-500 rounded-full"></span>
                          )}
                          {notification.actionRequired && (
                            <span className="px-2 py-1 bg-emergency-red-100 text-emergency-red-800 text-xs rounded-full font-medium">
                              Action Required
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-sm text-gray-500">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="px-3 py-1 bg-clay-brown-100 text-clay-brown-700 rounded-lg hover:bg-clay-brown-200 transition-colors duration-300 text-sm font-medium"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-emergency-red-500 transition-colors duration-300"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Emergency Modal */}
        {showEmergencyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency Alert Sent</h3>
                <p className="text-gray-600">
                  Your {emergencyType} alert has been sent to our medical team. 
                  Someone will contact you within 5 minutes.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3 bg-saffron-50 rounded-xl border border-saffron-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-saffron-600">✓</span>
                    <span className="text-saffron-800 font-medium">Medical team notified</span>
                  </div>
                </div>
                <div className="p-3 bg-clay-brown-50 rounded-xl border border-clay-brown-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-clay-brown-600">📞</span>
                    <span className="text-clay-brown-800 font-medium">Emergency contact called</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
