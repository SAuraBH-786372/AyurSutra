'use client'

import { useEffect, useRef } from 'react'
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
import { Line, Bar, Doughnut } from 'react-chartjs-2'

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

interface DashboardProps {
  user: {
    username: string
    dosha: string
    wallet_balance: number
  }
}

export default function Dashboard({ user }: DashboardProps) {
  // Mock data for wellness progress
  const wellnessProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Wellness Score',
        data: [65, 72, 78, 85, 88, 92],
        borderColor: '#C08552',
        backgroundColor: 'rgba(192, 133, 82, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Energy Level',
        data: [60, 68, 75, 82, 86, 90],
        borderColor: '#a06a3e',
        backgroundColor: 'rgba(160, 106, 62, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      }
    ],
  }

  // Mock data for dosha balance
  const doshaBalanceData = {
    labels: ['Vata', 'Pitta', 'Kapha'],
    datasets: [
      {
        data: user.dosha === 'Vata' ? [45, 30, 25] : 
              user.dosha === 'Pitta' ? [25, 45, 30] : [25, 30, 45],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Mock data for treatment progress
  const treatmentProgressData = {
    labels: ['Panchakarma', 'Herbal Medicine', 'Yoga Therapy', 'Diet Plan', 'Meditation'],
    datasets: [
      {
        label: 'Completion %',
        data: [85, 92, 78, 95, 88],
        backgroundColor: [
          'rgba(192, 133, 82, 0.8)',
          'rgba(160, 106, 62, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 69, 19, 0.8)',
        ],
        borderColor: [
          'rgba(192, 133, 82, 1)',
          'rgba(160, 106, 62, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(139, 69, 19, 1)',
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
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#374151',
          padding: 20,
        },
      },
    },
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#eaba8640] text-[#43170d]">
          ✨ Welcome Back, {user.username} - Your Ayurveda Dashboard
        </span>
      </div>

      {/* Ayurveda Wisdom Header */}
      <div className="bg-white/90 backdrop-blur-sm border border-[#C0855240] rounded-3xl p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <img
                src="/images/ayurveda-wisdom.jpg"
                alt="Ancient Ayurveda Wisdom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#C08552]/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold text-lg drop-shadow-lg">🕉️ Ancient Wisdom</p>
                <p className="text-sm opacity-90 drop-shadow-lg">Holistic Healing Journey</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Ayurveda Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#C08552] mb-4 flex items-center">
                <span className="mr-3">🌿</span>
                Ancient Ayurveda Wisdom
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Ayurveda, the "science of life," is a 5,000-year-old system of natural healing that originated in India. 
                It emphasizes the balance between mind, body, and spirit to achieve optimal health and prevent disease.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">🌿</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Natural Healing</h4>
                  <p className="text-gray-600 text-sm">Uses herbs, oils, and natural remedies to restore balance and promote self-healing.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#C08552] to-[#a06a3e] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">⚖️</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Dosha Balance</h4>
                  <p className="text-gray-600 text-sm">Your constitution: <strong className="text-purple-600">{user.dosha}</strong> - Personalized treatment approach.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <blockquote className="border-l-4 border-[#C08552] pl-4 italic text-gray-600">
                "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
                <footer className="text-sm text-[#C08552] mt-2 font-medium">— Ancient Ayurvedic Principle</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-sm border border-[#C0855240] rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wellness Score</p>
              <p className="text-3xl font-bold text-[#C08552]">92%</p>
            </div>
            <div className="w-12 h-12 bg-[#C0855220] rounded-full flex items-center justify-center">
              <span className="text-[#C08552] text-xl">🌟</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-emerald-600">
              <span className="mr-1">↗</span>
              <span>+12% from last week</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-[#a06a3e40] rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-3xl font-bold text-[#C08552]">8</p>
            </div>
            <div className="w-12 h-12 bg-[#a06a3e20] rounded-full flex items-center justify-center">
              <span className="text-[#a06a3e] text-xl">🧘‍♀️</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-blue-600">
              <span className="mr-1">↗</span>
              <span>2 this week</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-[#eaba8640] rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dosha Balance</p>
              <p className="text-3xl font-bold text-purple-600">{user.dosha}</p>
            </div>
            <div className="w-12 h-12 bg-[#eaba8620] rounded-full flex items-center justify-center">
              <span className="text-[#eaba86] text-xl">⚖️</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-purple-600">
              <span className="mr-1">→</span>
              <span>Balanced</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-[#FFC10720] rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Streak Days</p>
              <p className="text-3xl font-bold text-[#FFC107]">42</p>
            </div>
            <div className="w-12 h-12 bg-[#FFC10720] rounded-full flex items-center justify-center">
              <span className="text-[#FFC107] text-xl">🔥</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-[#FFC107]">
              <span className="mr-1">🎯</span>
              <span>Personal best!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wellness Progress Chart */}
        <div className="bg-white/90 backdrop-blur-sm border border-[#C0855240] rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-[#C08552] mb-6 flex items-center">
            <span className="mr-2">📈</span>
            Wellness Progress
          </h3>
          <div className="h-64">
            <Line data={wellnessProgressData} options={chartOptions} />
          </div>
        </div>

        {/* Dosha Balance Chart */}
        <div className="bg-white/90 backdrop-blur-sm border border-[#eaba8640] rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-[#C08552] mb-6 flex items-center">
            <span className="mr-2">⚖️</span>
            Dosha Balance
          </h3>
          <div className="h-64">
            <Doughnut data={doshaBalanceData} options={doughnutOptions} />
          </div>
        </div>

        {/* Treatment Progress Chart */}
        <div className="bg-white/90 backdrop-blur-sm border border-[#a06a3e40] rounded-3xl p-6 shadow-xl lg:col-span-2">
          <h3 className="text-xl font-bold text-[#C08552] mb-6 flex items-center">
            <span className="mr-2">🏥</span>
            Treatment Progress
          </h3>
          <div className="h-64">
            <Bar data={treatmentProgressData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/90 backdrop-blur-sm border border-[#C0855240] rounded-3xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-[#C08552] mb-6 flex items-center">
          <span className="mr-2">📋</span>
          Recent Activities
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#C0855210] rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#C08552] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🧘‍♀️</span>
              </div>
              <div>
                <p className="font-semibold text-[#C08552]">Morning Meditation</p>
                <p className="text-sm text-[#C0855280]">Completed 20 min session</p>
              </div>
            </div>
            <span className="text-sm text-[#C0855260]">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#a06a3e10] rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#a06a3e] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🍽️</span>
              </div>
              <div>
                <p className="font-semibold text-[#a06a3e]">Ayurvedic Meal</p>
                <p className="text-sm text-[#a06a3e80]">Logged breakfast for Vata dosha</p>
              </div>
            </div>
            <span className="text-sm text-[#a06a3e60]">4 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#eaba8620] rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#eaba86] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💊</span>
              </div>
              <div>
                <p className="font-semibold text-[#C08552]">Herbal Supplement</p>
                <p className="text-sm text-[#C0855280]">Took Triphala for digestion</p>
              </div>
            </div>
            <span className="text-sm text-[#C0855260]">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
