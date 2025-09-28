'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PageLoader } from '../components/ui/LoadingSpinner'

interface CommunityPost {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  category: 'experience' | 'question' | 'tip' | 'success'
  timestamp: string
  likes: number
  replies: number
  liked: boolean
}

interface Expert {
  id: string
  name: string
  specialization: string
  experience: string
  rating: number
  avatar: string
  available: boolean
}

interface ConsultationSlot {
  id: string
  time: string
  available: boolean
  price: number
}

export default function Community() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'community' | 'experts' | 'consultation'>('community')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'experience' | 'question' | 'tip' | 'success'>('all')
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostCategory, setNewPostCategory] = useState<'experience' | 'question' | 'tip' | 'success'>('experience')
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      author: 'Priya Sharma',
      avatar: '👩‍🦱',
      title: 'Amazing results after 3 weeks of Panchakarma!',
      content: 'I just completed my third week of Panchakarma therapy and the results are incredible. My energy levels have improved dramatically, and my chronic digestive issues are almost gone. The Abhyanga sessions were so relaxing, and the dietary changes really made a difference. Highly recommend to anyone considering this treatment!',
      category: 'success',
      timestamp: '2 hours ago',
      likes: 24,
      replies: 8,
      liked: false
    },
    {
      id: '2',
      author: 'Rajesh Kumar',
      avatar: '👨‍💼',
      title: 'Question about Shirodhara frequency',
      content: 'Hi everyone! I\'m starting my Panchakarma treatment next week and my practitioner recommended Shirodhara twice a week. Is this normal? I\'ve heard some people do it daily. What was your experience?',
      category: 'question',
      timestamp: '5 hours ago',
      likes: 12,
      replies: 15,
      liked: true
    },
    {
      id: '3',
      author: 'Dr. Meera Patel',
      avatar: '👩‍⚕️',
      title: 'Tip: Best time for oil massage',
      content: 'Pro tip from my 15 years of practice: The best time for Abhyanga is early morning (6-8 AM) when Vata is naturally high. This helps ground the energy for the entire day. Always use warm oil and massage in circular motions towards the heart.',
      category: 'tip',
      timestamp: '1 day ago',
      likes: 45,
      replies: 12,
      liked: true
    },
    {
      id: '4',
      author: 'Anita Singh',
      avatar: '👩‍🎓',
      title: 'My Panchakarma journey - Week 1 experience',
      content: 'Starting my Panchakarma documentation here. Week 1 was challenging - lots of detox symptoms like headaches and fatigue. But my practitioner assured me this is normal. The Kitchari diet is actually quite tasty once you get used to it. Looking forward to week 2!',
      category: 'experience',
      timestamp: '2 days ago',
      likes: 18,
      replies: 6,
      liked: false
    }
  ]

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Ramesh Gupta',
      specialization: 'Panchakarma & Detoxification',
      experience: '20+ years',
      rating: 4.9,
      avatar: '👨‍⚕️',
      available: true
    },
    {
      id: '2',
      name: 'Dr. Kavitha Nair',
      specialization: 'Women\'s Health & Ayurveda',
      experience: '15+ years',
      rating: 4.8,
      avatar: '👩‍⚕️',
      available: true
    },
    {
      id: '3',
      name: 'Dr. Suresh Yadav',
      specialization: 'Chronic Disease Management',
      experience: '18+ years',
      rating: 4.7,
      avatar: '👨‍⚕️',
      available: false
    },
    {
      id: '4',
      name: 'Dr. Priya Joshi',
      specialization: 'Mental Health & Stress',
      experience: '12+ years',
      rating: 4.9,
      avatar: '👩‍⚕️',
      available: true
    }
  ]

  const consultationSlots: ConsultationSlot[] = [
    { id: '1', time: '10:00 AM', available: true, price: 1500 },
    { id: '2', time: '11:00 AM', available: false, price: 1500 },
    { id: '3', time: '2:00 PM', available: true, price: 1500 },
    { id: '4', time: '3:00 PM', available: true, price: 1500 },
    { id: '5', time: '4:00 PM', available: false, price: 1500 },
    { id: '6', time: '5:00 PM', available: true, price: 1500 }
  ]

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'experience': return 'bg-blue-100 text-blue-800'
      case 'question': return 'bg-purple-100 text-purple-800'
      case 'tip': return 'bg-green-100 text-green-800'
      case 'success': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'experience': return '📝'
      case 'question': return '❓'
      case 'tip': return '💡'
      case 'success': return '🎉'
      default: return '📢'
    }
  }

  const filteredPosts = selectedCategory === 'all' 
    ? communityPosts 
    : communityPosts.filter(post => post.category === selectedCategory)

  const handleLikePost = (postId: string) => {
    // In real app, this would update the backend
    console.log(`Liked post ${postId}`)
  }

  const handleNewPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return
    
    // In real app, this would send to backend
    console.log('New post:', { title: newPostTitle, content: newPostContent, category: newPostCategory })
    
    setNewPostTitle('')
    setNewPostContent('')
    setShowNewPostModal(false)
  }

  const handleBookConsultation = (expert: Expert) => {
    setSelectedExpert(expert)
    setShowBookingModal(true)
  }

  const confirmBooking = (slotId: string) => {
    // In real app, this would process payment and book the slot
    console.log(`Booked slot ${slotId} with expert ${selectedExpert?.id}`)
    setShowBookingModal(false)
    setSelectedExpert(null)
  }

  if (loading) {
    return <PageLoader text="Loading community..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaba8620] via-[#FFC10720] to-[#C0855220] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#43170d] mb-4">Community & Consultation</h1>
          <p className="text-xl text-[#C08552]">Connect, share, and learn from fellow wellness seekers</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-2 shadow-xl border border-white/20 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('community')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'community'
                  ? 'bg-[#C08552] text-white shadow-lg'
                  : 'text-[#43170d] hover:bg-[#C0855210]'
              }`}
            >
              👥 Community
            </button>
            <button
              onClick={() => setActiveTab('experts')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'experts'
                  ? 'bg-[#C08552] text-white shadow-lg'
                  : 'text-[#43170d] hover:bg-[#C0855210]'
              }`}
            >
              👨‍⚕️ Experts
            </button>
            <button
              onClick={() => setActiveTab('consultation')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'consultation'
                  ? 'bg-[#C08552] text-white shadow-lg'
                  : 'text-[#43170d] hover:bg-[#C0855210]'
              }`}
            >
              📞 Consultation
            </button>
          </div>
        </div>

        {activeTab === 'community' && (
          <div className="space-y-6">
            {/* Category Filter & New Post Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {['all', 'experience', 'question', 'tip', 'success'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as any)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[#C08552] text-white shadow-lg'
                        : 'bg-white text-[#43170d] hover:bg-[#C0855210]'
                    }`}
                  >
                    {category === 'all' ? '📋 All' : `${getCategoryIcon(category)} ${category.charAt(0).toUpperCase() + category.slice(1)}`}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowNewPostModal(true)}
                className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                ✍️ New Post
              </button>
            </div>

            {/* Community Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C08552] to-[#a06a3e] rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">{post.avatar}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-[#43170d]">{post.author}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                          {getCategoryIcon(post.category)} {post.category}
                        </span>
                        <span className="text-sm text-[#C0855280]">{post.timestamp}</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-[#43170d] mb-3">{post.title}</h4>
                      <p className="text-[#43170d] leading-relaxed mb-4">{post.content}</p>
                      
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-colors duration-300 ${
                            post.liked 
                              ? 'bg-red-100 text-red-600' 
                              : 'bg-[#C0855210] text-[#C08552] hover:bg-red-100 hover:text-red-600'
                          }`}
                        >
                          <span>{post.liked ? '❤️' : '🤍'}</span>
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 px-3 py-2 bg-[#C0855210] text-[#C08552] rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300">
                          <span>💬</span>
                          <span className="font-medium">{post.replies}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 px-3 py-2 bg-[#C0855210] text-[#C08552] rounded-xl hover:bg-[#C0855220] hover:text-[#a06a3e] transition-colors duration-300">
                          <span>🔗</span>
                          <span className="font-medium">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <div key={expert.id} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C08552] to-[#a06a3e] rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">{expert.avatar}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-[#43170d]">{expert.name}</h3>
                      {expert.available && (
                        <span className="w-3 h-3 bg-[#C08552] rounded-full"></span>
                      )}
                    </div>
                    <p className="text-[#C08552] mb-1">{expert.specialization}</p>
                    <p className="text-sm text-[#C0855280] mb-2">{expert.experience} experience</p>
                    
                    <div className="flex items-center space-x-1 mb-3">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-[#43170d]">{expert.rating}</span>
                      <span className="text-[#C0855280]">(4.9/5)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleBookConsultation(expert)}
                    disabled={!expert.available}
                    className="flex-1 bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white px-4 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:transform-none"
                  >
                    {expert.available ? '📞 Book Consultation' : '⏰ Not Available'}
                  </button>
                  <button className="px-4 py-3 bg-[#C0855210] text-[#C08552] rounded-xl hover:bg-[#C0855220] transition-colors duration-300 font-medium">
                    👁️ View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'consultation' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#C08552] to-[#a06a3e] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📞</span>
              </div>
              <h2 className="text-2xl font-bold text-[#43170d] mb-4">Video Consultation</h2>
              <p className="text-[#C08552]">Get personalized guidance from certified Ayurvedic experts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-[#43170d] mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="text-[#C08552]">✓</span>
                    <span className="text-[#43170d]">45-minute one-on-one video session</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-[#C08552]">✓</span>
                    <span className="text-[#43170d]">Personalized treatment recommendations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-[#C08552]">✓</span>
                    <span className="text-[#43170d]">Diet and lifestyle guidance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-[#C08552]">✓</span>
                    <span className="text-[#43170d]">Follow-up support via chat</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-[#C08552]">✓</span>
                    <span className="text-[#43170d]">Digital prescription and reports</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#43170d] mb-4">Consultation Types:</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#C0855210] rounded-xl border border-[#C0855240]">
                    <h4 className="font-semibold text-[#C08552] mb-2">🔍 Initial Consultation</h4>
                    <p className="text-sm text-[#43170d] mb-2">Comprehensive health assessment and treatment plan</p>
                    <span className="text-lg font-bold text-[#C08552]">₹1,500</span>
                  </div>
                  
                  <div className="p-4 bg-[#eaba8620] rounded-xl border border-[#eaba8640]">
                    <h4 className="font-semibold text-[#a06a3e] mb-2">🔄 Follow-up Session</h4>
                    <p className="text-sm text-[#43170d] mb-2">Progress review and treatment adjustments</p>
                    <span className="text-lg font-bold text-[#a06a3e]">₹800</span>
                  </div>
                  
                  <div className="p-4 bg-[#FFC10720] rounded-xl border border-[#FFC10740]">
                    <h4 className="font-semibold text-[#FFC107] mb-2">🎯 Specialized Consultation</h4>
                    <p className="text-sm text-[#43170d] mb-2">Expert guidance for specific conditions</p>
                    <span className="text-lg font-bold text-[#FFC107]">₹2,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg">
                📅 Schedule Consultation
              </button>
            </div>
          </div>
        )}

        {/* New Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-[#43170d] mb-6">Create New Post</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#43170d] mb-2">Category</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as any)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#C08552] focus:ring-4 focus:ring-[#C0855220] transition-all duration-300 outline-none"
                  >
                    <option value="experience">📝 Experience</option>
                    <option value="question">❓ Question</option>
                    <option value="tip">💡 Tip</option>
                    <option value="success">🎉 Success Story</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#43170d] mb-2">Title</label>
                  <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#C08552] focus:ring-4 focus:ring-[#C0855220] transition-all duration-300 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#43170d] mb-2">Content</label>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your thoughts, experiences, or questions..."
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#C08552] focus:ring-4 focus:ring-[#C0855220] transition-all duration-300 outline-none resize-none"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={handleNewPost}
                  className="flex-1 bg-gradient-to-r from-[#C08552] to-[#a06a3e] hover:from-[#a06a3e] hover:to-[#C08552] text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Post
                </button>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 px-6 py-3 bg-[#C0855210] text-[#C08552] rounded-xl hover:bg-[#C0855220] transition-colors duration-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedExpert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C08552] to-[#a06a3e] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">{selectedExpert.avatar}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#43170d] mb-2">Book Consultation</h3>
                <p className="text-[#C08552]">{selectedExpert.name}</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-[#43170d]">Available Slots - Tomorrow</h4>
                {consultationSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => confirmBooking(slot.id)}
                    disabled={!slot.available}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                      slot.available
                        ? 'border-[#C0855240] hover:border-[#C08552] hover:bg-[#C0855210]'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{slot.time}</span>
                      <span className="text-[#C08552] font-bold">₹{slot.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowBookingModal(false)}
                className="w-full px-6 py-3 bg-[#C0855210] text-[#C08552] rounded-xl hover:bg-[#C0855220] transition-colors duration-300 font-medium"
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
