'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { PageLoader } from '../components/ui/LoadingSpinner'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface Milestone {
  id: string
  percentage: number
  title: string
  description: string
  achieved: boolean
  achievedDate?: string
}

export default function ProgressInsights() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [completedSessions, setCompletedSessions] = useState(5)
  const [totalSessions, setTotalSessions] = useState(12)
  const [nextSession, setNextSession] = useState('2025-01-16 10:00 AM')

  const milestones: Milestone[] = [
    {
      id: '1',
      percentage: 25,
      title: 'Initial Detox Complete',
      description: 'Body toxins elimination phase completed',
      achieved: true,
      achievedDate: '2025-01-10'
    },
    {
      id: '2',
      percentage: 50,
      title: 'Energy & Sleep Improved',
      description: 'Noticeable improvement in energy levels and sleep quality',
      achieved: true,
      achievedDate: '2025-01-13'
    },
    {
      id: '3',
      percentage: 75,
      title: 'Dosha Balance Restored',
      description: 'Constitutional balance and harmony achieved',
      achieved: false
    },
    {
      id: '4',
      percentage: 100,
      title: 'Therapy Completed',
      description: 'Full Panchakarma program successfully completed',
      achieved: false
    }
  ]

  // Mock data for symptom reduction
  const symptomReductionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Fatigue Level',
        data: [8, 7, 6, 4, 3, 2],
        borderColor: '#0d3018',
        backgroundColor: 'rgba(13, 48, 24, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Stress Level',
        data: [9, 8, 6, 5, 3, 2],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Digestive Issues',
        data: [7, 6, 5, 3, 2, 1],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      }
    ],
  }

  // Mock data for therapy attendance
  const attendanceData = {
    labels: ['Abhyanga', 'Shirodhara', 'Panchakarma', 'Nasya', 'Basti'],
    datasets: [
      {
        label: 'Attendance %',
        data: [100, 85, 75, 90, 60],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#374151',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
      },
    },
  }

  const generateSessionReport = () => {
    // Mock PDF generation
    alert('Session report PDF will be downloaded')
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return <PageLoader text="Loading your progress insights..." />
  }

  const progressPercentage = (completedSessions / totalSessions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Progress</h1>
          <p className="text-xl text-gray-600">Track your Panchakarma therapy journey</p>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm border border-saffron-100 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Session</p>
                <p className="text-lg font-bold text-saffron-600">{nextSession}</p>
              </div>
              <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center">
                <span className="text-saffron-600 text-xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-clay-brown-100 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-clay-brown-600">{completedSessions}/{totalSessions}</p>
              </div>
              <div className="w-12 h-12 bg-clay-brown-100 rounded-full flex items-center justify-center">
                <span className="text-clay-brown-600 text-xl">✅</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#0d3018] h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-[#0d3018] mt-1">{Math.round(progressPercentage)}% Complete</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-warm-yellow-100 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold text-warm-yellow-600">{Math.round(progressPercentage)}%</p>
              </div>
              <div className="w-12 h-12 bg-warm-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-warm-yellow-600 text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-yellow-100 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wellness Score</p>
                <p className="text-2xl font-bold text-warm-yellow-600">8.5/10</p>
              </div>
              <div className="w-12 h-12 bg-warm-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-warm-yellow-600 text-xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Symptom Reduction Chart */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Symptom Reduction Over Time</h3>
            <div className="h-64">
              <Line data={symptomReductionData} options={chartOptions} />
            </div>
          </div>

          {/* Therapy Attendance Chart */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Therapy Attendance %</h3>
            <div className="h-64">
              <Bar data={attendanceData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Recovery Milestones */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-xl mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recovery Milestones</h3>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  milestone.achieved 
                    ? 'bg-[#0d3018] text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {milestone.achieved ? '✓' : milestone.percentage + '%'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                    {milestone.achieved && (
                      <span className="px-2 py-1 bg-saffron-100 text-saffron-800 text-xs rounded-full font-medium">
                        Achieved
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                  {milestone.achievedDate && (
                    <p className="text-saffron-600 text-xs mt-1">Completed on {milestone.achievedDate}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Session Report */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Session Reports</h3>
            <p className="text-gray-600 mb-6">Download detailed reports of your therapy sessions</p>
            <button
              onClick={generateSessionReport}
              className="w-full bg-gradient-to-r from-clay-brown-600 to-clay-brown-700 hover:from-clay-brown-700 hover:to-clay-brown-800 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              📄 Download PDF Report
            </button>
          </div>

          {/* Feedback Form */}
          <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback Form</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Satisfaction
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none">
                  <option>Excellent</option>
                  <option>Very Good</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments
                </label>
                <textarea
                  placeholder="Share your experience..."
                  className="w-full h-24 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#C08552] focus:ring-4 focus:ring-[#C0855220] transition-all duration-300 outline-none resize-none"
                />
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#8d5c36] text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
