'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface MealPlan {
  id: string
  time: string
  meal: string
  items: string[]
  calories: number
  dosha: 'vata' | 'pitta' | 'kapha' | 'tridoshic'
  benefits: string
}

interface LifestyleActivity {
  id: string
  category: 'exercise' | 'meditation' | 'routine' | 'self-care'
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  completed: boolean
}

interface MotivationalContent {
  id: string
  type: 'quote' | 'tip' | 'fact'
  content: string
  author?: string
}

export default function DietLifestyle() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'diet' | 'lifestyle' | 'motivation'>('diet')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [waterIntake, setWaterIntake] = useState(0)
  const [dailyGoal] = useState(8) // 8 glasses of water
  const [loading, setLoading] = useState(true)

  const todaysMealPlan: MealPlan[] = [
    {
      id: '1',
      time: '7:00 AM',
      meal: 'Early Morning',
      items: ['Warm water with lemon', 'Triphala churna'],
      calories: 25,
      dosha: 'tridoshic',
      benefits: 'Detoxification and digestive fire activation'
    },
    {
      id: '2',
      time: '8:00 AM',
      meal: 'Breakfast',
      items: ['Oats porridge with almonds', 'Herbal tea', 'Fresh fruits'],
      calories: 350,
      dosha: 'vata',
      benefits: 'Grounding and nourishing for Vata constitution'
    },
    {
      id: '3',
      time: '12:30 PM',
      meal: 'Lunch',
      items: ['Kitchari with ghee', 'Steamed vegetables', 'Buttermilk'],
      calories: 450,
      dosha: 'tridoshic',
      benefits: 'Complete nutrition and easy digestion'
    },
    {
      id: '4',
      time: '4:00 PM',
      meal: 'Evening Snack',
      items: ['Herbal tea', 'Dates and nuts'],
      calories: 150,
      dosha: 'vata',
      benefits: 'Sustained energy without heaviness'
    },
    {
      id: '5',
      time: '7:00 PM',
      meal: 'Dinner',
      items: ['Light vegetable soup', 'Chapati', 'Warm milk with turmeric'],
      calories: 300,
      dosha: 'kapha',
      benefits: 'Light and easily digestible for evening'
    }
  ]

  const lifestyleActivities: LifestyleActivity[] = [
    {
      id: '1',
      category: 'exercise',
      title: 'Morning Sun Salutation',
      description: 'Gentle yoga sequence to energize your body and mind',
      duration: '15 minutes',
      difficulty: 'beginner',
      completed: false
    },
    {
      id: '2',
      category: 'meditation',
      title: 'Pranayama Practice',
      description: 'Breathing exercises for mental clarity and stress relief',
      duration: '10 minutes',
      difficulty: 'beginner',
      completed: true
    },
    {
      id: '3',
      category: 'routine',
      title: 'Oil Pulling',
      description: 'Swish sesame oil for oral health and detoxification',
      duration: '5 minutes',
      difficulty: 'beginner',
      completed: true
    },
    {
      id: '4',
      category: 'self-care',
      title: 'Self Abhyanga',
      description: 'Self-massage with warm oil before shower',
      duration: '20 minutes',
      difficulty: 'intermediate',
      completed: false
    },
    {
      id: '5',
      category: 'meditation',
      title: 'Evening Meditation',
      description: 'Mindfulness practice for peaceful sleep',
      duration: '15 minutes',
      difficulty: 'intermediate',
      completed: false
    },
    {
      id: '6',
      category: 'exercise',
      title: 'Walking in Nature',
      description: 'Gentle walk in fresh air for grounding',
      duration: '30 minutes',
      difficulty: 'beginner',
      completed: false
    }
  ]

  const motivationalContent: MotivationalContent[] = [
    {
      id: '1',
      type: 'quote',
      content: 'When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.',
      author: 'Ancient Ayurvedic Proverb'
    },
    {
      id: '2',
      type: 'tip',
      content: 'Eat your largest meal when the sun is highest (12-1 PM) for optimal digestion according to Ayurveda.'
    },
    {
      id: '3',
      type: 'fact',
      content: 'Drinking warm water throughout the day helps balance all three doshas and aids in detoxification.'
    },
    {
      id: '4',
      type: 'quote',
      content: 'Health is not just the absence of disease, but a state of complete physical, mental and spiritual well-being.',
      author: 'Charaka Samhita'
    }
  ]

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'bg-[#FFC10720] text-[#43170d]'
      case 'pitta': return 'bg-[#ff634720] text-[#43170d]'
      case 'kapha': return 'bg-[#43170d20] text-[#43170d]'
      case 'tridoshic': return 'bg-[#eaba8620] text-[#43170d]'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exercise': return '🧘‍♀️'
      case 'meditation': return '🧘‍♂️'
      case 'routine': return '⏰'
      case 'self-care': return '💆‍♀️'
      default: return '✨'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-[#eaba8620] text-[#43170d]'
      case 'intermediate': return 'bg-[#FFC10720] text-[#43170d]'
      case 'advanced': return 'bg-[#ff634720] text-[#43170d]'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleActivityCompletion = (id: string) => {
    // In real app, this would update the backend
    console.log(`Toggled activity ${id}`)
  }

  const addWaterGlass = () => {
    if (waterIntake < dailyGoal) {
      setWaterIntake(prev => prev + 1)
    }
  }

  const resetWaterIntake = () => {
    setWaterIntake(0)
  }

  if (loading) {
    return <PageLoader text="Loading your personalized plan..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Diet & Lifestyle Management</h1>
          <p className="text-xl text-gray-600">Personalized wellness guidance for your Ayurvedic journey</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-white/20 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('diet')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'diet'
                  ? 'bg-[#C08552] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🥗 Diet Plan
            </button>
            <button
              onClick={() => setActiveTab('lifestyle')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'lifestyle'
                  ? 'bg-[#C08552] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🧘 Lifestyle
            </button>
            <button
              onClick={() => setActiveTab('motivation')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'motivation'
                  ? 'bg-[#C08552] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ✨ Motivation
            </button>
          </div>
        </div>

        {activeTab === 'diet' && (
          <div className="space-y-8">
            {/* Water Intake Tracker */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">💧 Daily Water Intake</h2>
                <button
                  onClick={resetWaterIntake}
                  className="px-4 py-2 bg-[#C0855220] text-[#C08552] rounded-xl hover:bg-[#C0855230] transition-colors duration-300 text-sm font-medium"
                >
                  Reset
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex space-x-2">
                  {Array.from({ length: dailyGoal }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-10 rounded-lg border-2 ${
                        i < waterIntake 
                          ? 'bg-[#C08552] border-[#C08552]' 
                          : 'bg-gray-100 border-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {waterIntake}/{dailyGoal} glasses
                </span>
              </div>
              
              <button
                onClick={addWaterGlass}
                disabled={waterIntake >= dailyGoal}
                className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:transform-none"
              >
                Add Glass 💧
              </button>
            </div>

            {/* Daily Meal Plan */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Meal Plan</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-saffron-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                />
              </div>

              <div className="space-y-4">
                {todaysMealPlan.map((meal) => (
                  <div key={meal.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{meal.time}</h3>
                          <span className="text-lg font-bold text-saffron-600">{meal.meal}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDoshaColor(meal.dosha)}`}>
                            {meal.dosha}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{meal.benefits}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{meal.calories} cal</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {meal.items.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-saffron-50 rounded-xl border border-saffron-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-saffron-800">Total Daily Calories</span>
                  <span className="text-xl font-bold text-saffron-600">
                    {todaysMealPlan.reduce((total, meal) => total + meal.calories, 0)} cal
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lifestyle' && (
          <div className="space-y-8">
            {/* Daily Activities */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Daily Lifestyle Activities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lifestyleActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      activity.completed 
                        ? 'bg-saffron-50 border-saffron-200' 
                        : 'bg-gray-50 border-gray-200 hover:border-saffron-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getCategoryIcon(activity.category)}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleActivityCompletion(activity.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          activity.completed
                            ? 'bg-saffron-500 border-saffron-500 text-white'
                            : 'border-gray-300 hover:border-saffron-500'
                        }`}
                      >
                        {activity.completed && '✓'}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">⏱️ {activity.duration}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Progress</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-saffron-600 text-2xl">✅</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Completed</h3>
                  <p className="text-2xl font-bold text-saffron-600">
                    {lifestyleActivities.filter(a => a.completed).length}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-warm-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-warm-yellow-600 text-2xl">⏳</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Remaining</h3>
                  <p className="text-2xl font-bold text-warm-yellow-600">
                    {lifestyleActivities.filter(a => !a.completed).length}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-clay-brown-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-clay-brown-600 text-2xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Progress</h3>
                  <p className="text-2xl font-bold text-clay-brown-600">
                    {Math.round((lifestyleActivities.filter(a => a.completed).length / lifestyleActivities.length) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'motivation' && (
          <div className="space-y-6">
            {motivationalContent.map((content) => (
              <div key={content.id} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    content.type === 'quote' ? 'bg-warm-yellow-100' :
                    content.type === 'tip' ? 'bg-clay-brown-100' :
                    'bg-saffron-100'
                  }`}>
                    <span className="text-2xl">
                      {content.type === 'quote' ? '💬' :
                       content.type === 'tip' ? '💡' :
                       '📚'}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                      content.type === 'quote' ? 'bg-warm-yellow-100 text-warm-yellow-800' :
                      content.type === 'tip' ? 'bg-clay-brown-100 text-clay-brown-800' :
                      'bg-saffron-100 text-saffron-800'
                    }`}>
                      {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                    </div>
                    
                    <p className="text-lg text-gray-800 leading-relaxed mb-3">
                      {content.content}
                    </p>
                    
                    {content.author && (
                      <p className="text-sm text-gray-600 italic">— {content.author}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Weekly Challenge */}
            <div className="bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-3xl p-8 shadow-xl text-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">This Week's Challenge</h2>
                <p className="text-lg mb-6">
                  Practice oil pulling every morning for 7 days straight. This ancient Ayurvedic practice helps detoxify your mouth and improve overall oral health.
                </p>
                <button className="bg-white text-saffron-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Accept Challenge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
