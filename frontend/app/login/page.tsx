'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      showToast({
        type: 'success',
        title: 'Login Successful!',
        message: 'Welcome back to AyurSutra'
      })
      router.push('/')
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Login Failed',
        message: err.message || 'Please check your credentials and try again'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 relative overflow-hidden">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 opacity-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                  fill="url(#greenGradient)" />
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#65a30d" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="absolute -bottom-40 -left-40 w-80 h-80 opacity-15">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,80 C280,80 320,120 320,200 C320,280 280,320 200,320 C120,320 80,280 80,200 C80,120 120,80 200,80 Z" 
                  fill="url(#blueGradient)" />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#0d3018] rounded-full opacity-60 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-[#43170d] rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-[#eaba86] rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-[#0d3018] rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen w-full flex pt-16">
        {/* Left Side - Marketing Content */}
        <div className={`hidden lg:flex lg:w-1/2 flex-col justify-center px-4 lg:px-6 xl:px-8 2xl:px-12 py-8 min-h-[calc(100vh-4rem)] ${isLoaded ? 'animate-slide-in-left' : 'opacity-0'}`}>
          <div className="max-w-full lg:max-w-lg xl:max-w-xl">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#0d301810] text-[#0d3018] text-sm font-medium mb-6 whitespace-nowrap">
                🌿 Trusted by 10,000+ Users
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
                <span className="block text-[#0d3018] mb-2">Welcome Back to</span>
                <span className="block text-[#43170d]">AyurSutra</span>
              </h1>
              <p className="text-lg xl:text-xl text-[#43170d80] mb-8 leading-relaxed">
                Continue your personalized Ayurveda journey with expert consultations, 
                dosha-based treatments, and holistic wellness solutions.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-saffron-100">
                <div className="text-2xl mb-2">🏥</div>
                <h3 className="font-semibold text-gray-900 mb-1">Expert Doctors</h3>
                <p className="text-sm text-gray-600">Certified Ayurveda practitioners</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-clay-brown-100">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-semibold text-gray-900 mb-1">AI Consultant</h3>
                <p className="text-sm text-gray-600">24/7 personalized guidance</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-warm-yellow-100">
                <div className="text-2xl mb-2">🧘‍♀️</div>
                <h3 className="font-semibold text-gray-900 mb-1">Dosha Analysis</h3>
                <p className="text-sm text-gray-600">Personalized treatments</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-yellow-100">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-semibold text-gray-900 mb-1">Digital Wallet</h3>
                <p className="text-sm text-gray-600">Secure payments & refunds</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <div className="text-center flex-shrink-0">
                <div className="text-2xl font-bold text-saffron-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-2xl font-bold text-clay-brown-600">500+</div>
                <div className="text-sm text-gray-600">Doctors</div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-2xl font-bold text-warm-yellow-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-4 xl:px-8 py-8 min-h-[calc(100vh-4rem)] ${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
          <div className="max-w-md w-full my-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              {/* Mobile Trust Indicator - Only show on smaller screens */}
              <div className="lg:hidden flex justify-center mb-4">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-saffron-100 text-saffron-800 text-xs font-medium whitespace-nowrap">
                  🌿 Trusted by 10,000+ Users
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-600 to-saffron-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-xl font-bold">SS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Sign in to continue your wellness journey
                </p>
              </div>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-3 sm:space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    icon="📧"
                  />

                  <Input
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    icon="🔒"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  icon="🚀"
                  className="w-full"
                >
                  Sign In
                </Button>

                <div className="text-center">
                  <p className="text-[#43170d80]">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-semibold text-[#0d3018] hover:text-[#0d3018]/80 transition-colors duration-300">
                      Sign up for free
                    </Link>
                  </p>
                </div>

                <div className="text-center pt-3 sm:pt-4 border-t border-[#eaba8640]">
                  <p className="text-xs sm:text-sm text-[#43170d60] mb-2 sm:mb-3">New users get</p>
                  <div className="inline-flex items-center space-x-2 bg-[#0d301810] text-[#0d3018] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    <span className="text-[#0d3018]">₹</span>
                    <span>₹1000 Signup Bonus</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
