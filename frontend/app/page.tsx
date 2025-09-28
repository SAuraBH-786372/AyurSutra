'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from './contexts/AuthContext'
import { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'

export default function Home() {
  const { user } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Show different content for logged-in users vs visitors
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eaba8620] via-[#FFC10720] to-[#C0855220] relative overflow-hidden pt-20">
        {/* User Dashboard */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Dashboard with Charts */}
          <Dashboard user={user} />
        </div>
      </div>
    )
  }

  // Public landing page for visitors
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaba8620] via-[#FFC10720] to-[#43170d20] relative overflow-hidden">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic shape - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 opacity-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                  fill="url(#brownGradient)" />
            <defs>
              <linearGradient id="brownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#43170d" />
                <stop offset="100%" stopColor="#5a2515" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Medium organic shape - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-80 h-80 opacity-15">
          <svg viewBox="0 0 320 320" className="w-full h-full">
            <path d="M160,40 C240,40 280,80 280,160 C280,240 240,280 160,280 C80,280 40,240 40,160 C40,80 80,40 160,40 Z" 
                  fill="url(#greenGradient)" />
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d3018" />
                <stop offset="100%" stopColor="#164a24" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Small floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#0d3018] rounded-full opacity-60 animate-bounce-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#eaba86] rounded-full opacity-60 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-[#FFC107] rounded-full opacity-60 animate-bounce-slow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-5rem)] py-12">
            
            {/* Left Content */}
            <div className={`lg:w-1/2 text-left ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#eaba8640] text-[#C08552] mb-6">
                  ✨ Ancient Wisdom Holistic Healing
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block text-[#C08552] mb-2">Ayurvedic</span>
                <span className="block text-[#C08552] mb-2">Complete Wellness</span>
                <span className="block bg-gradient-to-r from-[#C08552] to-[#a06a3e] text-transparent bg-clip-text">Holistic Healing</span>
              </h1>
              
              <p className="text-lg text-[#C08552] mb-8 leading-relaxed max-w-xl">
                Experience the ancient wisdom of Ayurveda with our comprehensive wellness programs. Discover personalized treatments, herbal remedies, and lifestyle practices tailored to your unique constitution for optimal health and balance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white font-medium rounded-full inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <span>🌿</span>
                  <span>Get Started</span>
                </Link>
                <Link href="/login" className="bg-white text-[#C08552] border-2 border-[#C08552] hover:bg-[#eaba8620] font-medium rounded-full inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <span>🔐</span>
                  <span>Login</span>
                </Link>
              </div>
            </div>

            {/* Right Visual - Enhanced with Image */}
            <div className={`lg:w-1/2 mt-12 lg:mt-0 flex justify-center ${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative">
                {/* Enhanced visual with actual image */}
                <div className="relative w-[450px] h-[450px]">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#eaba8620] via-[#FFC10720] to-[#0d301820] opacity-10 animate-pulse"></div>
                  
                  {/* Hero Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[420px] h-[420px] rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                      <Image
                        src="/images/ayurveda-hero.jpg"
                        alt="Ayurvedic Healing"
                        width={420}
                        height={420}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 text-2xl animate-bounce-slow opacity-70">🌿</div>
                  <div className="absolute bottom-12 left-8 text-2xl animate-bounce-slow opacity-70" style={{animationDelay: '1s'}}>🌱</div>
                  <div className="absolute top-1/2 -right-4 text-xl animate-bounce-slow opacity-70" style={{animationDelay: '2s'}}>🍃</div>
                  <div className="absolute top-1/4 -left-4 text-lg animate-bounce-slow opacity-60" style={{animationDelay: '3s'}}>✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="py-20 bg-gradient-to-br from-[#eaba8620] via-[#FFC10720] to-[#43170d20] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-[#C08552] text-lg font-semibold mb-4 tracking-wider">EXPERIENCE THE POWER OF AYURVEDIC WISDOM</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#C08552] mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] text-transparent bg-clip-text">TRANSFORM YOUR HEALTH TODAY</span>
            </h3>
            <p className="text-xl text-[#C08552] max-w-3xl mx-auto leading-relaxed">
              Discover the ancient secrets of Ayurveda: Holistic healing, personalized treatments, and natural remedies for a balanced and energized life
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#C0855220] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#FFC10720] opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[#eaba8620] opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Enhanced with Image */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="aspect-video rounded-2xl overflow-hidden relative">
                  <img
                    src="https://i.postimg.cc/hGHK1T3n/1f434959e13ac00bc4413f5ac7c2fecc.jpg"
                    alt="Ayurvedic Wellness and Meditation"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#C08552]/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold text-lg drop-shadow-lg">Ayurvedic Wellness</p>
                    <p className="text-sm opacity-90 drop-shadow-lg">Holistic Healing Journey</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Personalized Assessment</h4>
                    <p className="text-gray-600">Complete dosha analysis and health evaluation to create your custom healing plan.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#C08552] to-[#a06a3e] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Natural Detox Protocol</h4>
                    <p className="text-gray-600">Evidence-based Ayurvedic treatments and natural remedies for liver cleansing.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Lifestyle Integration</h4>
                    <p className="text-gray-600">Sustainable dietary changes and daily practices for long-term liver health.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/signup" className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg">
                  <span>Begin Transformation</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coaching Plan Section */}
      <div className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[#C08552] text-lg font-semibold mb-4 tracking-wider">OUR HOLISTIC PROGRAMS</h2>
          <h3 className="text-4xl font-bold text-[#C08552] mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] text-transparent bg-clip-text">Ayurvedic Wellness Programs</span>
          </h3>
          <p className="text-xl text-[#C08552] max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover our specialized treatments designed to restore balance and promote natural healing
          </p>
          
          <div className="bg-gradient-to-br from-[#eaba8620] to-[#0d301820] rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left - Enhanced Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden relative">
                  <img
                    src="https://i.postimg.cc/QM7TrFzp/c37779bbaca4dfa0ce7eb20e7f32ec85.jpg"
                    alt="Panchakarma Wellness Program"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#C08552]/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-lg drop-shadow-lg">🕉️ Panchakarma</p>
                    <p className="text-sm opacity-90 drop-shadow-lg">Complete Wellness</p>
                  </div>
                </div>
              </div>
              
              {/* Right - Content */}
              <div className="text-left">
                <h4 className="text-2xl font-bold text-[#C08552] mb-4">Panchakarma Detoxification</h4>
                <p className="text-[#C08552] mb-6 leading-relaxed">
                  Our signature 21-day intensive program combines traditional Panchakarma practices with modern wellness approaches. 
                  Experience deep cleansing, rejuvenation, and restoration of your body's natural balance through authentic Ayurvedic treatments.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#C08552] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-[#C08552]">Personalized dosha assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#C08552] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-[#C08552]">Customized herbal formulations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#C08552] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-[#C08552]">Therapeutic oil treatments</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#C08552] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-[#C08552]">Daily meditation & yoga sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-[#C08552] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-[#C08552]">24/7 Ayurvedic practitioner support</span>
                  </div>
                </div>
                
                <Link href="/slots" className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#C08552] hover:to-[#C08552] text-white font-medium rounded-full inline-flex items-center justify-center space-x-2 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <span>Book Consultation</span>
                  <span>🌿</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#eaba8640] text-[#43170d] rounded-full text-sm font-medium mb-6">ABOUT AYURSUTRA</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#C08552] mb-6 leading-tight">
              Your Complete Ayurvedic Wellness Platform
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              AyurSutra bridges ancient Ayurvedic wisdom with modern technology to provide personalized healthcare solutions. 
              Our platform offers comprehensive wellness programs, expert consultations, and AI-powered guidance for your holistic health journey.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#C0855210] to-[#eaba8620] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#C08552] rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🧘‍♀️</span>
              </div>
              <h3 className="text-xl font-bold text-[#C08552] mb-4">Personalized Dosha Analysis</h3>
              <p className="text-gray-700 leading-relaxed">
                Comprehensive assessment of your unique constitution (Vata, Pitta, Kapha) with personalized treatment recommendations tailored to your body type and health needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#eaba8620] to-[#FFC10720] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#eaba86] rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold text-[#C08552] mb-4">Expert Panchakarma Treatments</h3>
              <p className="text-gray-700 leading-relaxed">
                Authentic Panchakarma detoxification programs led by certified Ayurvedic practitioners. Experience deep cleansing and rejuvenation through traditional therapies.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFC10720] to-[#C0855220] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center mb-6">
                <span className="text-[#43170d] text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-[#C08552] mb-4">AI-Powered Wellness Coach</h3>
              <p className="text-gray-700 leading-relaxed">
                24/7 AI consultant powered by advanced algorithms and Ayurvedic knowledge base. Get instant guidance on diet, lifestyle, and wellness practices.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#C0855220] to-[#a06a3e20] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#a06a3e] rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-[#C08552] mb-4">Real-Time Health Tracking</h3>
              <p className="text-gray-700 leading-relaxed">
                Monitor your wellness journey with comprehensive dashboards, progress tracking, and personalized insights to optimize your health outcomes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#eaba8620] to-[#C0855220] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-[#C08552] mb-4">Herbal Medicine & Nutrition</h3>
              <p className="text-gray-700 leading-relaxed">
                Access to authentic Ayurvedic herbs, personalized diet plans, and nutritional guidance based on your dosha and current health status.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#FFC10720] to-[#eaba8620] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-[#C08552] mb-4">Community & Support</h3>
              <p className="text-gray-700 leading-relaxed">
                Connect with like-minded wellness enthusiasts, share experiences, and get support from our community of Ayurveda practitioners and users.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-[#C0855210] to-[#eaba8620] rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-[#C08552] mb-4">Why Choose AyurSutra?</h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Experience the perfect blend of ancient wisdom and modern convenience with our comprehensive wellness platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">Certified Ayurvedic Practitioners</h4>
                    <p className="text-gray-700">All our treatments are supervised by qualified and experienced Ayurvedic doctors with years of practice.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">Personalized Treatment Plans</h4>
                    <p className="text-gray-700">Every treatment is customized based on your unique dosha, health history, and wellness goals.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">Digital Wallet & Easy Booking</h4>
                    <p className="text-gray-700">Seamless appointment booking with digital wallet system and instant refunds for cancelled sessions.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">Comprehensive Progress Tracking</h4>
                    <p className="text-gray-700">Monitor your wellness journey with detailed analytics, progress reports, and health insights.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">24/7 AI Wellness Support</h4>
                    <p className="text-gray-700">Get instant answers to your wellness questions with our AI-powered Ayurvedic consultant available round the clock.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">Authentic Ayurvedic Medicines</h4>
                    <p className="text-gray-700">Access to pure, laboratory-tested herbal formulations prepared according to traditional Ayurvedic methods.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">Holistic Lifestyle Guidance</h4>
                    <p className="text-gray-700">Complete lifestyle recommendations including diet, exercise, meditation, and daily routines for optimal health.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C08552] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#C08552] mb-2">Secure & Private Platform</h4>
                    <p className="text-gray-700">Your health data is protected with enterprise-grade security and complete privacy compliance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h4 className="text-2xl font-bold text-[#C08552] mb-4">Ready to Transform Your Health?</h4>
                <p className="text-gray-700 mb-6 text-lg">
                  Join thousands of satisfied users who have experienced the power of authentic Ayurvedic healing.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/signup" className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white font-semibold rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Join Now - Free ₹1000 Bonus
                  </Link>
                  <Link href="/prakriti-analysis" className="bg-white border-2 border-[#C08552] text-[#C08552] hover:bg-[#C0855210] font-semibold rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Take Free Dosha Quiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimized Footer Section */}
      <div className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">🕉️</div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="text-4xl mb-4">🌿</div>
          <blockquote className="text-xl md:text-2xl font-light text-white/95 italic leading-relaxed mb-4">
            "Health is a state of complete harmony of body, mind and spirit."
          </blockquote>
          <cite className="text-white/80 text-sm font-medium mb-6">— Ancient Ayurvedic Wisdom</cite>
          
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/90 text-lg mb-2">
              AyurSutra - Ancient Wisdom, Modern Wellness
            </p>
            <p className="text-white/70 text-sm">
              © 2024 AyurSutra. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
