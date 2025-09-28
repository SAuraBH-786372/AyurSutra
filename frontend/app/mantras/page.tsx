'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface Mantra {
  id: number
  title: string
  content: string
  dosha: string
  benefits: string
  duration: string
}

export default function Mantras() {
  const { user } = useAuth()
  const [mantras, setMantras] = useState<Mantra[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    fetchMantras()
  }, [filter])

  const fetchMantras = async () => {
    try {
      const url = filter === 'all' ? `${API_URL}/mantras` : `${API_URL}/mantras?dosha=${filter}`
      const response = await axios.get(url)
      setMantras(response.data)
    } catch (error) {
      console.error('Error fetching mantras:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <PageLoader text="Loading mantras..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaba8620] via-[#FFC10720] to-[#C0855220] relative overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#eaba8640] text-[#43170d] mb-4">
              🕉️ Sacred Mantras
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="block text-[#C08552] mb-2">Healing Mantras</span>
            <span className="block text-gray-800">for Your Soul</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">Discover powerful mantras for meditation and spiritual wellness</p>
          {user && (
            <p className="mt-4 text-lg text-[#C08552] font-semibold">Your dosha: {user.dosha.charAt(0).toUpperCase() + user.dosha.slice(1)}</p>
          )}
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm border border-[#C0855240] p-2" role="group">
            {['all', 'vata', 'pitta', 'kapha'].map((doshaType) => (
              <button
                key={doshaType}
                onClick={() => setFilter(doshaType)}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  filter === doshaType
                    ? 'bg-[#C08552] text-white shadow-lg transform scale-105'
                    : 'text-[#C08552] hover:bg-[#C0855210] hover:scale-105'
                }`}
              >
                {doshaType === 'all' ? 'All Doshas' : doshaType.charAt(0).toUpperCase() + doshaType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mantras.map((mantra) => (
            <div key={mantra.id} className="bg-white/90 backdrop-blur-sm border border-[#C0855240] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#C08552]">{mantra.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    mantra.dosha === 'vata' ? 'bg-purple-100 text-purple-800' :
                    mantra.dosha === 'pitta' ? 'bg-red-100 text-red-800' :
                    mantra.dosha === 'kapha' ? 'bg-blue-100 text-blue-800' :
                    'bg-[#eaba8640] text-[#C08552]'
                  }`}>
                    {mantra.dosha === 'all' ? 'All Doshas' : mantra.dosha.charAt(0).toUpperCase() + mantra.dosha.slice(1)}
                  </span>
                </div>
                
                <div className="mb-6 p-6 bg-gradient-to-r from-[#C0855210] to-[#eaba8620] rounded-2xl border border-[#C0855240]">
                  <p className="text-center text-xl font-semibold text-[#C08552] leading-relaxed">{mantra.content}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#C08552] mb-2 flex items-center">
                      <span className="mr-2">🌟</span>
                      Benefits:
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{mantra.benefits}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#C0855220]">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm font-semibold text-[#C08552] bg-[#C0855210] px-2 py-1 rounded-lg">{mantra.duration}</span>
                    </div>
                    <div className="text-3xl">🧘‍♀️</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mantras.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm border border-[#C0855240] rounded-3xl p-12 shadow-xl max-w-md mx-auto">
              <div className="text-8xl mb-6">🕉️</div>
              <p className="text-[#C08552] text-xl font-semibold mb-2">No mantras found</p>
              <p className="text-gray-600">Try selecting a different dosha type to discover more sacred mantras.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
