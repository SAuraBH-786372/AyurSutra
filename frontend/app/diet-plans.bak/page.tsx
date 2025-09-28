'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PageLoader } from '../components/ui/LoadingSpinner'
import RecipesSection from '../components/RecipesSection'
import axios from 'axios'

interface DietPlan {
  id: number
  title: string
  description: string
  dosha: string
  meal_plan: string
  duration: string
}

export default function DietPlans() {
  const { user } = useAuth()
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'diet-plans' | 'recipes'>('diet-plans')

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    fetchDietPlans()
  }, [filter])

  const fetchDietPlans = async () => {
    try {
      const url = filter === 'all' ? `${API_URL}/diet-plans` : `${API_URL}/diet-plans?dosha=${filter}`
      const response = await axios.get(url)
      setDietPlans(response.data)
    } catch (error) {
      console.error('Error fetching diet plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const parseMealPlan = (mealPlanString: string) => {
    try {
      return JSON.parse(mealPlanString)
    } catch {
      return {}
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader text="Loading diet plans..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diet Plans & Recipes
          </h1>
          <p className="text-xl text-gray-600">
            Personalized nutrition and traditional recipes for your wellness journey
          </p>
          {user && (
            <p className="mt-2 text-sm text-[#C08552] font-medium">Your dosha: {user.dosha.charAt(0).toUpperCase() + user.dosha.slice(1)}</p>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-white/20 mb-8 max-w-md mx-auto">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('diet-plans')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'diet-plans'
                  ? 'bg-[#C08552] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🥗 Diet Plans
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'recipes'
                  ? 'bg-saffron-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              👨‍🍳 Recipes
            </button>
          </div>
        </div>
        {activeTab === 'diet-plans' ? (
          <>
            {/* Filter buttons */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                {['all', 'vata', 'pitta', 'kapha'].map((doshaType) => (
                  <button
                    key={doshaType}
                    onClick={() => setFilter(doshaType)}
                    className={`px-4 py-2 text-sm font-medium border ${
                      filter === doshaType
                        ? 'bg-[#C08552] text-white border-[#C08552]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    } ${
                      doshaType === 'all' ? 'rounded-l-lg' : doshaType === 'kapha' ? 'rounded-r-lg' : ''
                    }`}
                  >
                    {doshaType.charAt(0).toUpperCase() + doshaType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Diet Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietPlans.map((plan) => (
                  <div key={plan.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          plan.dosha === 'vata' ? 'bg-warm-yellow-100 text-warm-yellow-800' :
                          plan.dosha === 'pitta' ? 'bg-emergency-red-100 text-emergency-red-800' :
                          plan.dosha === 'kapha' ? 'bg-clay-brown-100 text-clay-brown-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {plan.dosha.charAt(0).toUpperCase() + plan.dosha.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">Duration: {plan.duration}</span>
                      </div>
                      <button
                        onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                        className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white py-3 px-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        {expandedPlan === plan.id ? 'Hide Details' : 'View Meal Plan'}
                      </button>
                      {expandedPlan === plan.id && (
                        <div className="mt-4 p-4 bg-saffron-50 rounded-xl border border-saffron-200">
                          <h4 className="font-semibold mb-2 text-saffron-800">Meal Plan:</h4>
                          <div className="space-y-2">
                            {Object.entries(parseMealPlan(plan.meal_plan)).map(([meal, details]) => (
                              <div key={meal} className="text-sm">
                                <span className="font-medium text-saffron-700">{meal}:</span> <span className="text-gray-700">{String(details)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            
            {dietPlans.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-gray-500 text-lg">No diet plans found for the selected filter.</p>
                <p className="text-gray-400 mt-2">Try selecting a different dosha type.</p>
              </div>
            )}
          </>
        ) : (
          <RecipesSection filter={filter} setFilter={setFilter} />
        )}
      </div>
    </div>
  )
}
