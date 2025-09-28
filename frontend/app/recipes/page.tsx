'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface Recipe {
  id: number
  title: string
  ingredients: string
  instructions: string
  dosha: string
  prep_time: string
  benefits: string
}

export default function Recipes() {
  const { user } = useAuth()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    fetchRecipes()
  }, [filter])

  const fetchRecipes = async () => {
    try {
      const url = filter === 'all' ? `${API_URL}/recipes` : `${API_URL}/recipes?dosha=${filter}`
      const response = await axios.get(url)
      setRecipes(response.data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <PageLoader text="Loading recipes..." />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Ayurvedic Recipes</h1>
          <p className="mt-2 text-gray-600">Nourish your body with dosha-specific healthy recipes</p>
          {user && (
            <p className="mt-2 text-sm text-ayurveda-600">Your dosha: {user.dosha.charAt(0).toUpperCase() + user.dosha.slice(1)}</p>
          )}
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {['all', 'vata', 'pitta', 'kapha'].map((doshaType) => (
              <button
                key={doshaType}
                onClick={() => setFilter(doshaType)}
                className={`px-4 py-2 text-sm font-medium border ${
                  filter === doshaType
                    ? 'bg-ayurveda-600 text-white border-ayurveda-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                } ${
                  doshaType === 'all' ? 'rounded-l-lg' : doshaType === 'kapha' ? 'rounded-r-lg' : ''
                }`}
              >
                {doshaType === 'all' ? 'All Doshas' : doshaType.charAt(0).toUpperCase() + doshaType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    recipe.dosha === 'vata' ? 'bg-clay-brown-100 text-clay-brown-800' :
                    recipe.dosha === 'pitta' ? 'bg-emergency-red-100 text-emergency-red-800' :
                    recipe.dosha === 'kapha' ? 'bg-saffron-100 text-saffron-800' :
                    'bg-warm-yellow-100 text-warm-yellow-800'
                  }`}>
                    {recipe.dosha === 'all' ? 'All Doshas' : recipe.dosha.charAt(0).toUpperCase() + recipe.dosha.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Prep Time:</span>
                    <span className="text-sm font-medium text-gray-700">{recipe.prep_time}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                  <p className="text-sm text-gray-600">{recipe.benefits}</p>
                </div>

                <button
                  onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
                  className="w-full bg-ayurveda-600 hover:bg-ayurveda-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  {expandedRecipe === recipe.id ? 'Hide Recipe' : 'View Recipe'}
                </button>

                {expandedRecipe === recipe.id && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{recipe.ingredients}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Instructions:</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{recipe.instructions}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg">No recipes found for the selected filter.</p>
            <p className="text-gray-400 mt-2">Try selecting a different dosha type.</p>
          </div>
        )}
      </div>
    </div>
  )
}
