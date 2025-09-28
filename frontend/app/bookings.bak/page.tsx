'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Cookies from 'js-cookie'
import { PageLoader, InlineLoader } from '../components/ui/LoadingSpinner'

interface Booking {
  id: number
  slot_id: number
  status: string
  booking_date: string
  slot: {
    doctor_name: string
    specialty: string
    date: string
    time: string
    price: number
    hospital_name: string
  }
}

export default function Bookings() {
  const { user, refreshUser } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelLoading, setCancelLoading] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  const fetchBookings = async () => {
    try {
      const token = Cookies.get('token')
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBookings(response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const cancelBooking = async (bookingId: number) => {
    setCancelLoading(bookingId)
    try {
      const token = Cookies.get('token')
      await axios.put(`${API_URL}/bookings/${bookingId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMessage('Booking cancelled successfully!')
      await refreshUser()
      await fetchBookings()
    } catch (error) {
      setMessage('Failed to cancel booking. Please try again.')
    } finally {
      setCancelLoading(null)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view bookings</h2>
          <a href="/login" className="text-ayurveda-600 hover:text-ayurveda-500">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  if (loading) {
    return <PageLoader text="Loading your bookings..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 relative overflow-hidden py-8 pt-20 pb-12">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic shape - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                  fill="url(#greenGradient2)" />
            <defs>
              <linearGradient id="greenGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  fill="url(#blueGradient2)" />
            <defs>
              <linearGradient id="blueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Small floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-saffron-400 rounded-full opacity-40 animate-bounce-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-clay-brown-400 rounded-full opacity-40 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-warm-yellow-400 rounded-full opacity-40 animate-bounce-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-saffron-100 text-saffron-800 mb-4">
              ✨ Your Healing Journey
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="block text-saffron-600 mb-2">My</span>
            <span className="block text-gray-900">Bookings</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage your Ayurveda and Panchakarma appointments with certified practitioners</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl animate-fade-in-up ${message.includes('successfully') ? 'bg-saffron-50 border-l-4 border-saffron-400 text-saffron-700' : 'bg-emergency-red-50 border-l-4 border-emergency-red-400 text-emergency-red-700'}`}>
            <div className="flex items-center">
              <span className="mr-2">{message.includes('successfully') ? '✅' : '⚠️'}</span>
              {message}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div key={booking.id} className="bg-white/90 backdrop-blur-sm border border-saffron-100 rounded-3xl shadow-xl hover:shadow-2xl hover:border-saffron-200 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 ${
                      booking.status === 'confirmed' 
                        ? 'bg-saffron-100 text-saffron-800 border border-saffron-200' 
                        : 'bg-emergency-red-100 text-emergency-red-800 border border-emergency-red-200'
                    }`}>
                      <span>{booking.status === 'confirmed' ? '✅' : '❌'}</span>
                      <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <span className="text-sm">📅</span>
                      <span className="text-sm font-medium">
                        Booked on {new Date(booking.booking_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      disabled={cancelLoading === booking.id}
                      className="px-6 py-3 bg-emergency-red-600 hover:bg-emergency-red-700 text-white font-semibold rounded-full disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {cancelLoading === booking.id ? (
                        <div className="flex items-center space-x-2">
                          <InlineLoader size="sm" />
                          <span>Cancelling...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>❌</span>
                          <span>Cancel</span>
                        </div>
                      )}
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-saffron-50/50 rounded-2xl p-6 border border-saffron-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-saffron-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">🏥</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Appointment Details</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <span className="mr-2">🏥</span>
                          Hospital:
                        </span>
                        <span className="font-semibold text-gray-900">{booking.slot.hospital_name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <span className="mr-2">👨‍⚕️</span>
                          Doctor:
                        </span>
                        <span className="font-semibold text-gray-900">{booking.slot.doctor_name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <span className="mr-2">🎯</span>
                          Specialty:
                        </span>
                        <span className="font-semibold text-gray-900">{booking.slot.specialty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-clay-brown-50/50 rounded-2xl p-6 border border-clay-brown-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-clay-brown-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">📅</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Schedule & Payment</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <span className="mr-2">📅</span>
                          Date:
                        </span>
                        <span className="font-semibold text-gray-900">{booking.slot.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <span className="mr-2">⏰</span>
                          Time:
                        </span>
                        <span className="font-semibold text-gray-900">{booking.slot.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <span className="mr-2">💰</span>
                          Amount Paid:
                        </span>
                        <span className="font-bold text-saffron-600 text-lg">₹{booking.slot.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-6xl">📅</div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No bookings found</h3>
            <p className="text-gray-600 text-lg mb-6">Start your healing journey by booking your first appointment</p>
            <a href="/slots" className="inline-flex items-center space-x-2 bg-saffron-600 hover:bg-saffron-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span>🚀</span>
              <span>Book Your First Appointment</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
