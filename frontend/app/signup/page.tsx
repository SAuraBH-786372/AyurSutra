'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { InlineLoader } from '../components/ui/LoadingSpinner'
import PageWrapper from '../components/ui/PageWrapper'

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    dosha: 'vata'
  })
  const [loading, setLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { signup } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (formData.username.length < 3) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Username must be at least 3 characters long'
      })
      return
    }
    if (formData.password.length < 6) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Password must be at least 6 characters long'
      })
      return
    }

    setLoading(true)

    try {
      await signup(formData.username, formData.email, formData.password, formData.dosha)
      showToast({
        type: 'success',
        title: 'Account Created!',
        message: 'Welcome to AyurSutra! You received ₹1000 bonus.'
      })
      router.push('/')
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Signup Failed',
        message: err.message || 'Unable to create account. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const doshaInfo = {
    vata: { emoji: '💨', color: 'bg-clay-brown-50 border-clay-brown-200', description: 'Air & Space - Creative, energetic, quick-thinking' },
    pitta: { emoji: '🔥', color: 'bg-emergency-red-50 border-emergency-red-200', description: 'Fire & Water - Focused, determined, goal-oriented' },
    kapha: { emoji: '🌍', color: 'bg-saffron-50 border-saffron-200', description: 'Earth & Water - Calm, stable, nurturing' }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 relative overflow-hidden">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 opacity-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                  fill="url(#purpleGradient)" />
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="absolute -bottom-40 -right-40 w-80 h-80 opacity-15">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,80 C280,80 320,120 320,200 C320,280 280,320 200,320 C120,320 80,280 80,200 C80,120 120,80 200,80 Z" 
                  fill="url(#ayurvedaGradient)" />
            <defs>
              <linearGradient id="ayurvedaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#43170d" />
                <stop offset="100%" stopColor="#5a2515" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-20 w-4 h-4 bg-[#eaba86] rounded-full opacity-60 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 left-32 w-3 h-3 bg-[#0d3018] rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-32 w-5 h-5 bg-[#0d3018] rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-[#43170d] rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Marketing Content */}
        <div className={`hidden lg:flex lg:w-1/2 flex-col justify-center px-12 ${isLoaded ? 'animate-slide-in-left' : 'opacity-0'}`}>
          <div className="max-w-lg">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#eaba8640] text-[#43170d] text-sm font-medium mb-6">
                🎉 Join 10,000+ Happy Users
              </div>
              <h1 className="text-5xl font-bold mb-6">
                <span className="block text-[#43170d] mb-2">Discover</span>
                <span className="block text-[#0d3018]">Ayurvedic Wellness</span>
              </h1>
              <p className="text-xl text-[#43170d80] mb-8 leading-relaxed">
                Discover personalized wellness solutions with ancient Ayurveda wisdom 
                and modern technology. Get ₹1000 bonus to begin your wellness transformation.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#0d301810] rounded-full flex items-center justify-center">
                  <span className="text-[#0d3018] text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#43170d]">Personalized Dosha Analysis</h3>
                  <p className="text-[#43170d80] text-sm">Discover your unique body constitution</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#eaba8640] rounded-full flex items-center justify-center">
                  <span className="text-[#43170d] text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Consultations</h3>
                  <p className="text-gray-600 text-sm">Connect with certified Ayurveda doctors</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warm-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-warm-yellow-600 text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered Guidance</h3>
                  <p className="text-gray-600 text-sm">24/7 personalized health recommendations</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warm-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-warm-yellow-600 text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure Digital Wallet</h3>
                  <p className="text-gray-600 text-sm">Easy payments with instant refunds</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-saffron-400 to-clay-brown-500 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-600">Verified User</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"AyurSutra transformed my health with personalized Ayurveda treatments. The AI consultant is incredibly helpful!"</p>
              <div className="flex text-warm-yellow-400 mt-2">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 ${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
          <div className="max-w-lg w-full">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🕉️</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Join AyurSutra
                </h2>
                <p className="text-gray-600 mb-4">
                  Begin your wellness transformation today
                </p>
                <div className="inline-flex items-center space-x-2 bg-saffron-50 text-saffron-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <span>🎉</span>
                  <span>Get ₹1000 Signup Bonus</span>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="Choose a username"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="Create a password (min 6 chars)"
                    />
                  </div>

                  <div>
                    <label htmlFor="dosha" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Dosha (Body Constitution)
                    </label>
                    <select
                      id="dosha"
                      name="dosha"
                      value={formData.dosha}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="vata">💨 Vata (Air & Space)</option>
                      <option value="pitta">🔥 Pitta (Fire & Water)</option>
                      <option value="kapha">🌍 Kapha (Earth & Water)</option>
                    </select>
                    <div className={`mt-3 p-3 rounded-2xl border-2 ${doshaInfo[formData.dosha as keyof typeof doshaInfo].color}`}>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">{doshaInfo[formData.dosha as keyof typeof doshaInfo].emoji} {formData.dosha.charAt(0).toUpperCase() + formData.dosha.slice(1)}:</span> {doshaInfo[formData.dosha as keyof typeof doshaInfo].description}
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Don't know your dosha? You can change this later in your profile.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-warm-yellow-500 to-warm-yellow-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-warm-yellow-600 hover:to-warm-yellow-700 focus:ring-4 focus:ring-purple-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <InlineLoader size="sm" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Create Account</span>
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-warm-yellow-600 hover:text-warm-yellow-700 transition-colors duration-300">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
