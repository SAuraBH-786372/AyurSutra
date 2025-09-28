'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import { useRouter } from 'next/navigation'
import PageWrapper from '../components/ui/PageWrapper'
import { Card, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { PageLoader, InlineLoader } from '../components/ui/LoadingSpinner'

interface Slot {
  id: number
  hospital_name: string
  doctor_name: string
  specialization: string
  date: string
  time: string
  price: number
  available: boolean
}

export default function Slots() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingSlot, setBookingSlot] = useState<number | null>(null)
  const [filter, setFilter] = useState('all')
  const { user } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    fetchSlots()
  }, [user, router])

  const fetchSlots = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slots`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSlots(data)
      }
    } catch (error) {
      console.error('Error fetching slots:', error)
    } finally {
      setLoading(false)
    }
  }

  const bookSlot = async (slotId: number, price: number) => {
    if (!user) return

    if (user.wallet_balance < price) {
      showToast({
        type: 'warning',
        title: 'Insufficient Balance',
        message: 'Please add funds to your wallet before booking.'
      })
      return
    }

    setBookingSlot(slotId)
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ slot_id: slotId })
      })

      if (response.ok) {
        showToast({
          type: 'success',
          title: 'Booking Successful!',
          message: 'Your appointment has been confirmed. Check your bookings page.'
        })
        await fetchSlots()
        // Refresh user data
        window.location.reload()
      } else {
        showToast({
          type: 'error',
          title: 'Booking Failed',
          message: 'Unable to complete booking. Please try again.'
        })
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Booking Failed',
        message: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setBookingSlot(null)
    }
  }

  const filteredSlots = slots.filter(slot => {
    if (filter === 'all') return slot.available
    if (filter === 'affordable') return slot.available && user && slot.price <= user.wallet_balance
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0]
      return slot.available && slot.date === today
    }
    return slot.available
  })

  if (!user) {
    return (
      <PageWrapper className="pt-20">
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <Card className="p-8 max-w-md mx-auto" glass>
            <div className="text-center">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to book slots</h2>
              <Button as="a" href="/login" variant="primary" icon="🚀">
                Go to Login
              </Button>
            </div>
          </Card>
        </div>
      </PageWrapper>
    )
  }

  if (loading) {
    return <PageLoader text="Loading available slots..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 relative overflow-hidden py-8 pt-20 pb-12">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic shape - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                  fill="url(#greenGradient1)" />
            <defs>
              <linearGradient id="greenGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  fill="url(#blueGradient1)" />
            <defs>
              <linearGradient id="blueGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-saffron-100 text-saffron-800 mb-4">
              ✨ Book Your Healing Session
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="block text-saffron-600 mb-2">Available</span>
            <span className="block text-gray-900">Ayurveda Slots</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">Book your personalized Ayurveda and Panchakarma appointments with certified practitioners</p>
          
          {/* Wallet Balance Card */}
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-saffron-200 px-6 py-4 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600 font-medium">Available Balance</p>
              <p className="text-2xl font-bold text-saffron-600">₹{user.wallet_balance}</p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          {[
            { key: 'all', label: 'All Slots', icon: '🏥' },
            { key: 'affordable', label: 'Affordable', icon: '💰' },
            { key: 'today', label: 'Today', icon: '📅' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                filter === filterOption.key
                  ? 'bg-saffron-600 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-saffron-50 hover:text-saffron-600 border border-gray-200'
              }`}
            >
              <span>{filterOption.icon}</span>
              <span>{filterOption.label}</span>
            </button>
          ))}
        </div>



        {/* Slots Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSlots.map((slot, index) => (
            <div 
              key={slot.id} 
              className="card-hover bg-white/90 backdrop-blur-sm border border-saffron-100 rounded-3xl p-6 shadow-xl animate-fade-in-up hover:shadow-2xl hover:border-saffron-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hospital Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🏥</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{slot.hospital_name}</h3>
                    <p className="text-sm text-gray-600">Certified Ayurveda Center</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-saffron-50 px-3 py-2 rounded-full border border-saffron-200">
                  <span className="text-saffron-500">⭐</span>
                  <span className="text-sm font-semibold text-saffron-700">4.8</span>
                </div>
              </div>
              
              {/* Slot Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <span className="mr-2">👨‍⚕️</span>
                    Doctor:
                  </span>
                  <span className="font-semibold text-gray-900">{slot.doctor_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <span className="mr-2">🎯</span>
                    Specialty:
                  </span>
                  <span className="font-semibold text-gray-900">{slot.specialization}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <span className="mr-2">📅</span>
                    Date:
                  </span>
                  <span className="font-semibold text-gray-900">{slot.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-gray-600">
                    <span className="mr-2">⏰</span>
                    Time:
                  </span>
                  <span className="font-semibold text-gray-900">{slot.time}</span>
                </div>
              </div>

              {/* Price and Book Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Consultation Fee</p>
                  <p className="text-2xl font-bold text-saffron-600">₹{slot.price}</p>
                </div>
                <button
                  onClick={() => bookSlot(slot.id, slot.price)}
                  disabled={bookingSlot === slot.id || user.wallet_balance < slot.price}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    user.wallet_balance < slot.price
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : bookingSlot === slot.id
                      ? 'bg-saffron-400 text-white cursor-not-allowed'
                      : 'bg-saffron-600 hover:bg-saffron-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {bookingSlot === slot.id ? (
                    <div className="flex items-center space-x-2">
                      <InlineLoader size="sm" />
                      <span>Booking...</span>
                    </div>
                  ) : user.wallet_balance < slot.price ? (
                    'Insufficient Balance'
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>🚀</span>
                      <span>Book Now</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSlots.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-6xl">🏥</div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No slots available</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'affordable' 
                ? 'No slots within your wallet balance. Consider adding funds.'
                : filter === 'today'
                ? 'No slots available for today. Try checking other dates.'
                : 'No available slots at the moment. Please check back later.'
              }
            </p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="btn-secondary"
              >
                View All Slots
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
