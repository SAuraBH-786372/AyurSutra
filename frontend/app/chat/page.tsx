'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import axios from 'axios'
import Cookies from 'js-cookie'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Chat() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! I'm your AI Ayurveda consultant. I can help you with questions about Ayurveda, Panchakarma treatments, diet recommendations, lifestyle advice, and general wellness tips. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const sendMessage = async () => {
    if (!inputMessage.trim() || !user) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)

    try {
      const token = Cookies.get('token')
      const response = await axios.post(
        `${API_URL}/chat`,
        { message: inputMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const aiMessage: Message = {
        id: messages.length + 2,
        text: response.data.response,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to use AI Chat</h2>
          <a href="/login" className="text-ayurveda-600 hover:text-ayurveda-500">
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 relative overflow-hidden py-8 pt-20 pb-12">
      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large organic shape - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M200,50 C300,50 350,100 350,200 C350,300 300,350 200,350 C100,350 50,300 50,200 C50,100 100,50 200,50 Z" 
                  fill="url(#greenGradient3)" />
            <defs>
              <linearGradient id="greenGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
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
                  fill="url(#blueGradient3)" />
            <defs>
              <linearGradient id="blueGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
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
              ✨ AI Powered Ayurveda Guidance
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="block text-saffron-600 mb-2">AI Ayurveda</span>
            <span className="block text-gray-900">Consultant</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get personalized advice based on your dosha: <span className="font-semibold text-saffron-600">{user.dosha.charAt(0).toUpperCase() + user.dosha.slice(1)}</span></p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-saffron-100 rounded-3xl shadow-xl overflow-hidden">
          {/* Chat messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-saffron-600 text-white shadow-lg'
                      : 'bg-saffron-50 text-gray-900 border border-saffron-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-saffron-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-saffron-50 text-gray-900 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl border border-saffron-200">
                  <div className="flex items-center space-x-3">
                    <LoadingSpinner size="sm" color="green" />
                    <span className="text-sm font-medium">🤖 AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message input */}
          <div className="border-t border-saffron-200 bg-saffron-50/50 p-6">
            <div className="flex space-x-4">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Ayurveda, diet, treatments, or wellness tips..."
                className="flex-1 border border-saffron-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-saffron-500 resize-none bg-white"
                rows={2}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || loading}
                className="bg-saffron-600 hover:bg-saffron-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>🚀</span>
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick questions */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Questions</h3>
            <p className="text-gray-600">Get instant answers to common Ayurveda questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: "What foods are good for my dosha?", icon: "🍽️" },
              { q: "How can I improve my digestion?", icon: "🌱" },
              { q: "What are the benefits of Panchakarma?", icon: "🧘‍♀️" },
              { q: "How to balance Vata dosha naturally?", icon: "⚖️" }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(item.q)}
                className="text-left p-4 bg-white/80 backdrop-blur-sm border border-[#C0855240] rounded-2xl hover:bg-[#C0855210] hover:border-[#C0855260] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#C0855220] rounded-full flex items-center justify-center">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.q}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
