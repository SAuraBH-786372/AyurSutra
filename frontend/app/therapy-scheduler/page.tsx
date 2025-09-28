'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface TherapySession {
  id: string
  therapyName: string
  date: string
  time: string
  practitioner: string
  status: 'Confirmed' | 'Pending' | 'Cancelled'
  duration: number
  precautions: string[]
}

export default function TherapyScheduler() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sessions, setSessions] = useState<TherapySession[]>([])
  const [showPrecautions, setShowPrecautions] = useState(false)
  const [selectedSession, setSelectedSession] = useState<TherapySession | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data for therapy sessions
  useEffect(() => {
    const mockSessions: TherapySession[] = [
      {
        id: '1',
        therapyName: 'Abhyanga (Full Body Oil Massage)',
        date: '2025-01-15',
        time: '10:00 AM',
        practitioner: 'Dr. Priya Sharma',
        status: 'Confirmed',
        duration: 60,
        precautions: [
          'Avoid heavy meals 2 hours before session',
          'Drink warm water post-therapy',
          'Wear comfortable, loose clothing',
          'Inform about any allergies beforehand'
        ]
      },
      {
        id: '2',
        therapyName: 'Shirodhara (Oil Pouring Therapy)',
        date: '2025-01-17',
        time: '2:00 PM',
        practitioner: 'Dr. Rajesh Kumar',
        status: 'Pending',
        duration: 45,
        precautions: [
          'Empty stomach preferred',
          'Avoid caffeine 4 hours before',
          'Rest for 30 minutes post-therapy',
          'Keep head covered after session'
        ]
      },
      {
        id: '3',
        therapyName: 'Panchakarma Detox Program',
        date: '2025-01-20',
        time: '9:00 AM',
        practitioner: 'Dr. Meera Patel',
        status: 'Confirmed',
        duration: 120,
        precautions: [
          'Follow pre-detox diet for 3 days',
          'Stay hydrated with warm water',
          'Avoid strenuous activities',
          'Complete rest recommended post-session'
        ]
      }
    ]
    
    setTimeout(() => {
      setSessions(mockSessions)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-saffron-100 text-saffron-800'
      case 'Pending': return 'bg-warm-yellow-100 text-warm-yellow-800'
      case 'Cancelled': return 'bg-emergency-red-100 text-emergency-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSessionAction = (action: string, sessionId: string) => {
    if (action === 'precautions') {
      const session = sessions.find(s => s.id === sessionId)
      setSelectedSession(session || null)
      setShowPrecautions(true)
    }
    // Handle other actions like modify, cancel, etc.
  }

  if (loading) {
    return <PageLoader text="Loading therapy scheduler..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Therapy Schedule</h1>
          <p className="text-xl text-gray-600">Manage your Panchakarma therapy sessions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Calendar View</h2>
              
              {/* Simple Calendar */}
              <div className="space-y-4">
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#C08552] focus:ring-4 focus:ring-[#C0855220] transition-all duration-300 outline-none"
                />
                
                {/* Available Slots */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700">Available Slots</h3>
                  {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
                    <button
                      key={time}
                      className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 hover:border-[#C08552] hover:bg-[#C0855210] transition-all duration-300"
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Schedule New Button */}
                <button className="w-full bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#8d5c36] text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Schedule New Session
                </button>
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h2>
              
              {sessions.map((session) => (
                <div key={session.id} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{session.therapyName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <span className="text-[#C08552]">📅</span>
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[#a06a3e]">🕐</span>
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[#C08552]">👨‍⚕️</span>
                          <span>{session.practitioner}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => handleSessionAction('precautions', session.id)}
                        className="px-4 py-2 bg-clay-brown-100 text-clay-brown-700 rounded-lg hover:bg-clay-brown-200 transition-colors duration-300 text-sm font-medium"
                      >
                        View Precautions
                      </button>
                      <button className="px-4 py-2 bg-warm-yellow-100 text-warm-yellow-700 rounded-lg hover:bg-warm-yellow-200 transition-colors duration-300 text-sm font-medium">
                        Modify
                      </button>
                      <button className="px-4 py-2 bg-emergency-red-100 text-emergency-red-700 rounded-lg hover:bg-emergency-red-200 transition-colors duration-300 text-sm font-medium">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Precautions Modal */}
        {showPrecautions && selectedSession && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Session Precautions</h3>
                <p className="text-gray-600">{selectedSession.therapyName}</p>
              </div>

              <div className="space-y-3 mb-6">
                {selectedSession.precautions.map((precaution, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-saffron-50 rounded-xl">
                    <span className="text-saffron-500 mt-0.5">•</span>
                    <span className="text-gray-700">{precaution}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPrecautions(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium"
                >
                  Close
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:from-saffron-700 hover:to-saffron-800 transition-all duration-300 font-medium">
                  I Understand
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
