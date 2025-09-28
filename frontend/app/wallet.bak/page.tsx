'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Cookies from 'js-cookie'
import { PageLoader } from '../components/ui/LoadingSpinner'

export default function Wallet() {
  const { user, refreshUser } = useAuth()
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    if (user) {
      fetchWalletBalance()
    }
  }, [user])

  const fetchWalletBalance = async () => {
    try {
      const token = Cookies.get('token')
      const response = await axios.get(`${API_URL}/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setWalletBalance(response.data.balance)
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view wallet</h2>
          <a href="/login" className="text-ayurveda-600 hover:text-ayurveda-500">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  if (loading) {
    return <PageLoader text="Loading wallet..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 relative overflow-hidden py-8 pt-20 pb-12">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic shape - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                  fill="url(#greenGradient4)" />
            <defs>
              <linearGradient id="greenGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  fill="url(#blueGradient4)" />
            <defs>
              <linearGradient id="blueGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-saffron-100 text-saffron-800 mb-4">
              ✨ Digital Wallet Management
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="block text-saffron-600 mb-2">My</span>
            <span className="block text-gray-900">Wallet</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage your AyurSutra wallet balance for seamless Ayurveda appointments</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-saffron-100 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-saffron-100 rounded-full mb-6 shadow-lg">
                <span className="text-4xl">💰</span>
              </div>
              <h2 className="text-5xl font-bold text-saffron-600 mb-3">₹{walletBalance.toFixed(2)}</h2>
              <p className="text-xl text-gray-600 font-medium">Available Balance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-saffron-50/80 rounded-2xl border border-saffron-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🎉</span>
                </div>
                <h3 className="font-bold text-saffron-800 mb-2">Signup Bonus</h3>
                <p className="text-sm text-saffron-600">₹1000 credited on registration</p>
              </div>
              <div className="text-center p-6 bg-clay-brown-50/80 rounded-2xl border border-clay-brown-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-clay-brown-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🏥</span>
                </div>
                <h3 className="font-bold text-clay-brown-800 mb-2">Book Appointments</h3>
                <p className="text-sm text-clay-brown-600">Use wallet for seamless bookings</p>
              </div>
              <div className="text-center p-6 bg-warm-yellow-50/80 rounded-2xl border border-warm-yellow-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-warm-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <h3 className="font-bold text-warm-yellow-800 mb-2">Instant Refunds</h3>
                <p className="text-sm text-warm-yellow-600">Cancel bookings for full refund</p>
              </div>
            </div>

            <div className="border-t border-saffron-200 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Use Your Wallet</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-saffron-50/50 rounded-2xl border border-saffron-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-saffron-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  <p className="text-gray-700 font-medium">Browse available slots from certified Ayurveda practitioners</p>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-clay-brown-50/50 rounded-2xl border border-clay-brown-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-clay-brown-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  <p className="text-gray-700 font-medium">Select your preferred appointment slot and confirm booking</p>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-warm-yellow-50/50 rounded-2xl border border-yellow-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-warm-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                  <p className="text-gray-700 font-medium">Payment is automatically deducted from your wallet balance</p>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-warm-yellow-50/50 rounded-2xl border border-warm-yellow-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-warm-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                  <p className="text-gray-700 font-medium">Cancel anytime for instant refund to your wallet</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="/slots"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-saffron-600 hover:bg-saffron-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>🚀</span>
                <span>Book Appointment</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-saffron-50/80 backdrop-blur-sm border border-saffron-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">💳</span>
            </div>
            <h3 className="text-2xl font-bold text-saffron-800">Need More Balance?</h3>
          </div>
          <p className="text-saffron-700 leading-relaxed">
            Currently, wallet top-up is not available. Your signup bonus should cover several appointments. 
            For additional funding options, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}
