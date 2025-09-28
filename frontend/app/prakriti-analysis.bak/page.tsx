'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface Question {
  id: number
  category: 'physical' | 'mental' | 'behavioral'
  question: string
  options: {
    vata: string
    pitta: string
    kapha: string
  }
}

interface DoshaScore {
  vata: number
  pitta: number
  kapha: number
}

interface AnalysisResult {
  primaryDosha: 'vata' | 'pitta' | 'kapha'
  secondaryDosha: 'vata' | 'pitta' | 'kapha' | null
  scores: DoshaScore
  constitution: string
  recommendations: {
    diet: string[]
    lifestyle: string[]
    therapies: string[]
    precautions: string[]
  }
}

export default function PrakritiAnalysis() {
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'vata' | 'pitta' | 'kapha'>>({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const questions: Question[] = [
    {
      id: 1,
      category: 'physical',
      question: 'What is your body frame like?',
      options: {
        vata: 'Thin, light, small-boned',
        pitta: 'Medium build, moderate weight',
        kapha: 'Large frame, heavy, well-built'
      }
    },
    {
      id: 2,
      category: 'physical',
      question: 'How is your skin texture?',
      options: {
        vata: 'Dry, rough, thin, cool',
        pitta: 'Soft, warm, oily, sensitive',
        kapha: 'Thick, moist, cool, smooth'
      }
    },
    {
      id: 3,
      category: 'physical',
      question: 'What is your hair like?',
      options: {
        vata: 'Dry, brittle, thin, curly',
        pitta: 'Fine, soft, early graying/balding',
        kapha: 'Thick, oily, wavy, lustrous'
      }
    },
    {
      id: 4,
      category: 'physical',
      question: 'How is your appetite?',
      options: {
        vata: 'Variable, irregular, light',
        pitta: 'Strong, sharp, cannot skip meals',
        kapha: 'Steady, low, can skip meals easily'
      }
    },
    {
      id: 5,
      category: 'physical',
      question: 'How is your digestion?',
      options: {
        vata: 'Irregular, gas, bloating',
        pitta: 'Quick, strong, sometimes acidic',
        kapha: 'Slow, heavy, mucus formation'
      }
    },
    {
      id: 6,
      category: 'physical',
      question: 'What is your sleep pattern like?',
      options: {
        vata: 'Light, interrupted, 5-7 hours',
        pitta: 'Sound, moderate, 6-8 hours',
        kapha: 'Deep, long, 8+ hours, hard to wake'
      }
    },
    {
      id: 7,
      category: 'mental',
      question: 'How is your memory?',
      options: {
        vata: 'Quick to learn, quick to forget',
        pitta: 'Sharp, clear, good retention',
        kapha: 'Slow to learn, never forgets'
      }
    },
    {
      id: 8,
      category: 'mental',
      question: 'What is your mental nature?',
      options: {
        vata: 'Creative, restless, anxious',
        pitta: 'Intelligent, focused, ambitious',
        kapha: 'Calm, steady, content'
      }
    },
    {
      id: 9,
      category: 'behavioral',
      question: 'How do you handle stress?',
      options: {
        vata: 'Worry, anxiety, panic',
        pitta: 'Anger, irritation, criticism',
        kapha: 'Withdrawal, depression, attachment'
      }
    },
    {
      id: 10,
      category: 'behavioral',
      question: 'What is your activity level?',
      options: {
        vata: 'Very active, restless, quick movements',
        pitta: 'Moderate, purposeful, goal-oriented',
        kapha: 'Slow, steady, methodical'
      }
    },
    {
      id: 11,
      category: 'behavioral',
      question: 'How do you spend money?',
      options: {
        vata: 'Impulsively, on small things',
        pitta: 'On luxury items, planned purchases',
        kapha: 'Carefully, saves money, practical'
      }
    },
    {
      id: 12,
      category: 'physical',
      question: 'What is your body temperature preference?',
      options: {
        vata: 'Prefer warmth, dislike cold/wind',
        pitta: 'Prefer cool, dislike heat',
        kapha: 'Adapt well, dislike damp/cold'
      }
    }
  ]

  const calculateResults = (): AnalysisResult => {
    const scores: DoshaScore = { vata: 0, pitta: 0, kapha: 0 }
    
    Object.values(answers).forEach(answer => {
      scores[answer]++
    })

    const totalQuestions = Object.keys(answers).length
    const percentages = {
      vata: Math.round((scores.vata / totalQuestions) * 100),
      pitta: Math.round((scores.pitta / totalQuestions) * 100),
      kapha: Math.round((scores.kapha / totalQuestions) * 100)
    }

    const sortedDoshas = Object.entries(percentages)
      .sort(([,a], [,b]) => b - a)
      .map(([dosha]) => dosha as 'vata' | 'pitta' | 'kapha')

    const primaryDosha = sortedDoshas[0]
    const secondaryDosha = percentages[sortedDoshas[1]] >= 25 ? sortedDoshas[1] : null

    let constitution = ''
    if (secondaryDosha && Math.abs(percentages[primaryDosha] - percentages[secondaryDosha]) <= 10) {
      constitution = `${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}-${secondaryDosha.charAt(0).toUpperCase() + secondaryDosha.slice(1)} (Dual Constitution)`
    } else {
      constitution = `${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)} Dominant`
    }

    const getRecommendations = (dosha: 'vata' | 'pitta' | 'kapha') => {
      switch (dosha) {
        case 'vata':
          return {
            diet: [
              'Warm, cooked, moist foods',
              'Sweet, sour, and salty tastes',
              'Regular meal times',
              'Avoid cold, dry, raw foods',
              'Ghee, oils, and healthy fats'
            ],
            lifestyle: [
              'Regular daily routine',
              'Adequate rest and sleep',
              'Gentle, grounding exercises',
              'Warm oil massages',
              'Meditation and breathing practices'
            ],
            therapies: [
              'Abhyanga (oil massage)',
              'Shirodhara (oil pouring)',
              'Basti (medicated enemas)',
              'Nasya (nasal treatments)',
              'Steam therapy'
            ],
            precautions: [
              'Avoid excessive travel',
              'Limit stimulants like caffeine',
              'Avoid skipping meals',
              'Protect from cold and wind',
              'Manage stress and anxiety'
            ]
          }
        case 'pitta':
          return {
            diet: [
              'Cool, refreshing foods',
              'Sweet, bitter, and astringent tastes',
              'Fresh fruits and vegetables',
              'Avoid spicy, oily, acidic foods',
              'Coconut water and cooling drinks'
            ],
            lifestyle: [
              'Moderate exercise, avoid overheating',
              'Cool environment',
              'Relaxation and leisure time',
              'Avoid excessive competition',
              'Practice patience and compassion'
            ],
            therapies: [
              'Shirodhara with cooling oils',
              'Pizhichil (oil bath)',
              'Virechana (purgation)',
              'Cooling herbal treatments',
              'Moonlight meditation'
            ],
            precautions: [
              'Avoid excessive heat and sun',
              'Limit anger and criticism',
              'Avoid skipping meals',
              'Moderate alcohol consumption',
              'Manage perfectionist tendencies'
            ]
          }
        case 'kapha':
          return {
            diet: [
              'Light, warm, spicy foods',
              'Pungent, bitter, and astringent tastes',
              'Reduce dairy and sweet foods',
              'Increase vegetables and legumes',
              'Warm teas and spices'
            ],
            lifestyle: [
              'Regular vigorous exercise',
              'Early rising (before 6 AM)',
              'Stimulating activities',
              'Dry brushing and massage',
              'Social interaction and variety'
            ],
            therapies: [
              'Udvartana (powder massage)',
              'Vamana (therapeutic vomiting)',
              'Steam therapy',
              'Dry heat treatments',
              'Energizing herbal treatments'
            ],
            precautions: [
              'Avoid oversleeping',
              'Limit heavy, oily foods',
              'Avoid excessive sitting',
              'Manage attachment and possessiveness',
              'Stay active and motivated'
            ]
          }
      }
    }

    return {
      primaryDosha,
      secondaryDosha,
      scores: percentages,
      constitution,
      recommendations: getRecommendations(primaryDosha)
    }
  }

  const handleAnswer = (dosha: 'vata' | 'pitta' | 'kapha') => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: dosha
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Quiz completed
      setLoading(true)
      setTimeout(() => {
        const result = calculateResults()
        setAnalysisResult(result)
        setShowResults(true)
        setLoading(false)
      }, 2000)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setAnalysisResult(null)
  }

  const getDoshaColor = (dosha: 'vata' | 'pitta' | 'kapha') => {
    switch (dosha) {
      case 'vata': return 'from-[#eaba86] to-[#d9a978]'
      case 'pitta': return 'from-[#C08552] to-[#a06a3e]'
      case 'kapha': return 'from-[#a06a3e] to-[#8d5c36]'
    }
  }

  const getDoshaIcon = (dosha: 'vata' | 'pitta' | 'kapha') => {
    switch (dosha) {
      case 'vata': return '🌪️'
      case 'pitta': return '🔥'
      case 'kapha': return '🌍'
    }
  }

  if (loading) {
    return <PageLoader text="Analyzing your Prakriti constitution..." />
  }

  if (showResults && analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">⚖️</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Prakriti Analysis</h1>
            <p className="text-xl text-gray-600">Personalized Ayurvedic Constitution Report</p>
          </div>

          {/* Constitution Result */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 bg-gradient-to-br ${getDoshaColor(analysisResult.primaryDosha)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white text-3xl">{getDoshaIcon(analysisResult.primaryDosha)}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{analysisResult.constitution}</h2>
              <p className="text-gray-600">Your dominant dosha influences your physical and mental characteristics</p>
            </div>

            {/* Dosha Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(analysisResult.scores).map(([dosha, score]) => (
                <div key={dosha} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getDoshaColor(dosha as any)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-white text-xl">{getDoshaIcon(dosha as any)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 capitalize mb-2">{dosha}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className={`bg-gradient-to-r ${getDoshaColor(dosha as any)} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Diet Recommendations */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🥗</span>
                <h3 className="text-xl font-bold text-gray-900">Diet Recommendations</h3>
              </div>
              <ul className="space-y-2">
                {analysisResult.recommendations.diet.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-saffron-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lifestyle Recommendations */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🧘</span>
                <h3 className="text-xl font-bold text-gray-900">Lifestyle Guidelines</h3>
              </div>
              <ul className="space-y-2">
                {analysisResult.recommendations.lifestyle.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-clay-brown-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Therapy Recommendations */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">💆</span>
                <h3 className="text-xl font-bold text-gray-900">Recommended Therapies</h3>
              </div>
              <ul className="space-y-2">
                {analysisResult.recommendations.therapies.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-warm-yellow-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precautions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-xl font-bold text-gray-900">Precautions</h3>
              </div>
              <ul className="space-y-2">
                {analysisResult.recommendations.precautions.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-saffron-500 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restartQuiz}
              className="px-8 py-3 bg-gradient-to-r from-clay-brown-600 to-clay-brown-700 hover:from-clay-brown-700 hover:to-clay-brown-800 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Save Report
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚖️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prakriti-Vikriti Analysis</h1>
          <p className="text-xl text-gray-600">Discover your unique Ayurvedic constitution</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-saffron-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-saffron-500 to-saffron-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                questions[currentQuestion].category === 'physical' ? 'bg-clay-brown-100 text-clay-brown-800' :
                questions[currentQuestion].category === 'mental' ? 'bg-warm-yellow-100 text-warm-yellow-800' :
                'bg-saffron-100 text-saffron-800'
              }`}>
                {questions[currentQuestion].category.charAt(0).toUpperCase() + questions[currentQuestion].category.slice(1)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {questions[currentQuestion].question}
            </h2>
            <p className="text-gray-600">Choose the option that best describes you:</p>
          </div>

          <div className="space-y-4">
            {Object.entries(questions[currentQuestion].options).map(([dosha, option]) => (
              <button
                key={dosha}
                onClick={() => handleAnswer(dosha as 'vata' | 'pitta' | 'kapha')}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  dosha === 'vata' ? 'border-warm-yellow-200 hover:border-warm-yellow-400 hover:bg-warm-yellow-50' :
                  dosha === 'pitta' ? 'border-emergency-red-200 hover:border-emergency-red-400 hover:bg-emergency-red-50' :
                  'border-clay-brown-200 hover:border-clay-brown-400 hover:bg-clay-brown-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    dosha === 'vata' ? 'bg-warm-yellow-100' :
                    dosha === 'pitta' ? 'bg-emergency-red-100' :
                    'bg-clay-brown-100'
                  }`}>
                    <span className="text-xl">{getDoshaIcon(dosha as any)}</span>
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 capitalize ${
                      dosha === 'vata' ? 'text-warm-yellow-800' :
                      dosha === 'pitta' ? 'text-emergency-red-800' :
                      'text-clay-brown-800'
                    }`}>
                      {dosha}
                    </div>
                    <div className="text-gray-700">{option}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium"
            >
              Previous Question
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
