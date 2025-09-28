'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface TherapyStep {
  id: number
  name: string
  duration: number
  description: string
  instructions: string[]
}

interface SideEffect {
  id: string
  name: string
  severity: 'mild' | 'moderate' | 'severe'
}

export default function TherapyTracking() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sideEffects, setSideEffects] = useState<string[]>([])
  const [showSideEffectModal, setShowSideEffectModal] = useState(false)
  const [practitionerNotes, setPractitionerNotes] = useState('')

  const therapySteps: TherapyStep[] = [
    {
      id: 1,
      name: 'Oil Application',
      duration: 300, // 5 minutes in seconds
      description: 'Warm herbal oil application to prepare the body',
      instructions: [
        'Lie comfortably on the therapy table',
        'Breathe deeply and relax your muscles',
        'Inform practitioner of any discomfort',
        'Keep your eyes closed for better relaxation'
      ]
    },
    {
      id: 2,
      name: 'Steam Therapy',
      duration: 900, // 15 minutes
      description: 'Herbal steam to open pores and enhance oil absorption',
      instructions: [
        'Remain still during steam application',
        'Breathe normally through your nose',
        'Signal if temperature feels too hot',
        'Stay hydrated with small sips of warm water'
      ]
    },
    {
      id: 3,
      name: 'Rest Phase',
      duration: 600, // 10 minutes
      description: 'Relaxation period for oil absorption and body recovery',
      instructions: [
        'Rest quietly without movement',
        'Focus on your breathing',
        'Allow the oils to penetrate deeply',
        'Prepare for gentle transition to sitting'
      ]
    }
  ]

  const availableSideEffects: SideEffect[] = [
    { id: 'nausea', name: 'Nausea', severity: 'mild' },
    { id: 'headache', name: 'Headache', severity: 'moderate' },
    { id: 'dizziness', name: 'Dizziness', severity: 'mild' },
    { id: 'skin_irritation', name: 'Skin Irritation', severity: 'moderate' },
    { id: 'fatigue', name: 'Excessive Fatigue', severity: 'moderate' },
    { id: 'breathing', name: 'Breathing Difficulty', severity: 'severe' }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isSessionActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Move to next step or end session
            if (currentStep < therapySteps.length - 1) {
              setCurrentStep(currentStep + 1)
              return therapySteps[currentStep + 1].duration
            } else {
              setIsSessionActive(false)
              return 0
            }
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSessionActive, isPaused, timeRemaining, currentStep, therapySteps])

  const startSession = () => {
    setIsSessionActive(true)
    setCurrentStep(0)
    setTimeRemaining(therapySteps[0].duration)
  }

  const pauseSession = () => {
    setIsPaused(!isPaused)
  }

  const stopSession = () => {
    setIsSessionActive(false)
    setIsPaused(false)
    setTimeRemaining(0)
    setCurrentStep(0)
  }

  const reportSideEffect = (effectId: string) => {
    if (!sideEffects.includes(effectId)) {
      setSideEffects([...sideEffects, effectId])
    }
    setShowSideEffectModal(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    if (!isSessionActive) return 0
    const totalDuration = therapySteps[currentStep].duration
    const elapsed = totalDuration - timeRemaining
    return (elapsed / totalDuration) * 100
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-[#FFC107] bg-[#FFC10720]'
      case 'moderate': return 'text-[#43170d] bg-[#43170d20]'
      case 'severe': return 'text-[#D32F2F] bg-[#D32F2F20]'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Therapy Session</h1>
          <p className="text-xl text-gray-600">Abhyanga - Full Body Oil Massage</p>
        </div>

        {!isSessionActive ? (
          /* Pre-Session View */
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">🧘‍♀️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin Your Session?</h2>
            <p className="text-gray-600 mb-8">Your Abhyanga therapy consists of 3 steps totaling 30 minutes</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {therapySteps.map((step, index) => (
                <div key={step.id} className="p-4 bg-saffron-50 rounded-xl border border-saffron-200">
                  <div className="text-saffron-600 font-bold mb-2">Step {index + 1}</div>
                  <div className="font-semibold text-gray-900">{step.name}</div>
                  <div className="text-sm text-gray-600">{formatTime(step.duration)}</div>
                </div>
              ))}
            </div>

            <button
              onClick={startSession}
              className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Session
            </button>
          </div>
        ) : (
          /* Active Session View */
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Step {currentStep + 1}: {therapySteps[currentStep].name}
                </h2>
                <div className="text-2xl font-bold text-[#43170d]">
                  {formatTime(timeRemaining)}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-[#0d3018] to-[#43170d] h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              
              <p className="text-gray-600">{therapySteps[currentStep].description}</p>
            </div>

            {/* Step Instructions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Step-by-Step Instructions</h3>
              <div className="space-y-3">
                {therapySteps[currentStep].instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-clay-brown-50 rounded-xl">
                    <span className="flex-shrink-0 w-6 h-6 bg-clay-brown-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Options */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Options</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowSideEffectModal(true)}
                    className="w-full px-4 py-3 bg-warm-yellow-100 text-warm-yellow-700 rounded-xl hover:bg-warm-yellow-200 transition-colors duration-300 font-medium"
                  >
                    Report Side Effect
                  </button>
                  <button
                    onClick={pauseSession}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-colors duration-300 ${
                      isPaused 
                        ? 'bg-saffron-100 text-saffron-700 hover:bg-saffron-200' 
                        : 'bg-saffron-100 text-saffron-700 hover:bg-saffron-200'
                    }`}
                  >
                    {isPaused ? 'Resume Session' : 'Pause Session'}
                  </button>
                  <button
                    onClick={stopSession}
                    className="w-full px-4 py-3 bg-emergency-red-100 text-emergency-red-700 rounded-xl hover:bg-emergency-red-200 transition-colors duration-300 font-medium"
                  >
                    Stop Session
                  </button>
                </div>
              </div>

              {/* Practitioner Options */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Practitioner Notes</h3>
                <textarea
                  value={practitionerNotes}
                  onChange={(e) => setPractitionerNotes(e.target.value)}
                  placeholder="Add session notes..."
                  className="w-full h-24 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none resize-none"
                />
                <button className="w-full mt-3 px-4 py-3 bg-clay-brown-100 text-clay-brown-700 rounded-xl hover:bg-clay-brown-200 transition-colors duration-300 font-medium">
                  Save Notes
                </button>
              </div>
            </div>

            {/* Reported Side Effects */}
            {sideEffects.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Reported Side Effects</h3>
                <div className="flex flex-wrap gap-2">
                  {sideEffects.map((effectId) => {
                    const effect = availableSideEffects.find(e => e.id === effectId)
                    return effect ? (
                      <span
                        key={effectId}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(effect.severity)}`}
                      >
                        {effect.name}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Side Effect Modal */}
        {showSideEffectModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Report Side Effect</h3>
                <p className="text-gray-600">Select the side effect you're experiencing</p>
              </div>

              <div className="space-y-2 mb-6">
                {availableSideEffects.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => reportSideEffect(effect.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 hover:border-orange-300 transition-colors duration-300 ${getSeverityColor(effect.severity)}`}
                  >
                    <div className="font-medium">{effect.name}</div>
                    <div className="text-sm opacity-75 capitalize">{effect.severity} severity</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowSideEffectModal(false)}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
