'use client'

import { useState, useEffect } from 'react'
import { PageLoader } from './ui/LoadingSpinner'
import axios from 'axios'

interface Recipe {
  id: number
  title: string
  ingredients: string
  instructions: string
  dosha: string
  prep_time: string
  benefits: string
}

interface RecipesSectionProps {
  filter: string
  setFilter: (filter: string) => void
}

export default function RecipesSection({ filter, setFilter }: RecipesSectionProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
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

  const parseIngredients = (ingredientsString: string) => {
    try {
      return JSON.parse(ingredientsString)
    } catch {
      return ingredientsString.split(',').map(item => item.trim())
    }
  }

  return (
    <div>
      {loading ? (
        <PageLoader text="Loading recipes..." />
      ) : (
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
                      ? 'bg-saffron-600 text-white border-saffron-600'
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      recipe.dosha === 'vata' ? 'bg-warm-yellow-100 text-warm-yellow-800' :
                      recipe.dosha === 'pitta' ? 'bg-emergency-red-100 text-emergency-red-800' :
                      recipe.dosha === 'kapha' ? 'bg-clay-brown-100 text-clay-brown-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {recipe.dosha.charAt(0).toUpperCase() + recipe.dosha.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{recipe.benefits}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Prep time: {recipe.prep_time}</span>
                  </div>
                  <button
                    onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 px-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {expandedRecipe === recipe.id ? 'Hide Recipe' : 'View Recipe'}
                  </button>
                  {expandedRecipe === recipe.id && (
                    <div className="mt-4 p-4 bg-saffron-50 rounded-xl border border-orange-200">
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-saffron-800">Ingredients:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {parseIngredients(recipe.ingredients).map((ingredient: string, index: number) => (
                            <li key={index} className="text-sm text-gray-700">{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-saffron-800">Instructions:</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {recipes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍳</div>
              <p className="text-gray-500 text-lg">No recipes found for the selected filter.</p>
              <p className="text-gray-400 mt-2">Try selecting a different dosha type.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
