'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { InlineLoader } from '../components/ui/LoadingSpinner'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface QuickAction {
  id: string
  label: string
  query: string
  icon: string
}

export default function Panchabot() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: '1',
      label: 'Therapy Benefits',
      query: 'What are the benefits of Abhyanga therapy?',
      icon: '🌿'
    },
    {
      id: '2',
      label: 'Diet Recommendations',
      query: 'What should I eat during Panchakarma treatment?',
      icon: '🥗'
    },
    {
      id: '3',
      label: 'Side Effects',
      query: 'What are common side effects of Panchakarma?',
      icon: '⚠️'
    },
    {
      id: '4',
      label: 'Preparation Tips',
      query: 'How should I prepare for my next therapy session?',
      icon: '📝'
    },
    {
      id: '5',
      label: 'Dosha Analysis',
      query: 'Can you explain my dosha constitution?',
      icon: '⚖️'
    },
    {
      id: '6',
      label: 'Recovery Timeline',
      query: 'How long does recovery typically take?',
      icon: '⏰'
    }
  ]

  const welcomeMessage: Message = {
    id: 'welcome',
    type: 'bot',
    content: `Namaste ${user?.username || 'Friend'}! 🙏 I'm Panchabot, your AI-powered Ayurveda assistant. I'm here to help you with questions about your Panchakarma therapy, diet recommendations, dosha analysis, and general wellness guidance. How can I assist you today?`,
    timestamp: new Date()
  }

  useEffect(() => {
    setMessages([welcomeMessage])
  }, [user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const simulateTyping = (response: string) => {
    setIsTyping(true)
    
    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setIsLoading(false)
    }, 1500 + Math.random() * 1000) // Random delay between 1.5-2.5 seconds
  }

  const generateBotResponse = (userQuery: string): string => {
    const query = userQuery.toLowerCase()
    
    if (query.includes('abhyanga') || query.includes('therapy benefit')) {
      return `Abhyanga is a full-body oil massage that offers numerous benefits:

🌿 **Physical Benefits:**
• Improves blood circulation and lymphatic drainage
• Nourishes and moisturizes the skin
• Relieves muscle tension and joint stiffness
• Enhances flexibility and mobility

🧘 **Mental Benefits:**
• Reduces stress and anxiety
• Promotes deep relaxation
• Improves sleep quality
• Balances the nervous system

⚖️ **Ayurvedic Benefits:**
• Balances Vata dosha
• Strengthens the immune system
• Detoxifies the body
• Promotes longevity and vitality

For your specific constitution, I recommend discussing the frequency and oil type with your practitioner.`
    }
    
    if (query.includes('diet') || query.includes('food') || query.includes('eat')) {
      return `During Panchakarma, proper diet is crucial for optimal results:

🥗 **Recommended Foods:**
• Light, warm, and easily digestible meals
• Kitchari (rice and lentil porridge)
• Steamed vegetables
• Herbal teas and warm water
• Fresh fruits (in moderation)

❌ **Foods to Avoid:**
• Heavy, oily, or fried foods
• Cold drinks and ice cream
• Processed and packaged foods
• Excessive spices
• Alcohol and caffeine

⏰ **Meal Timing:**
• Eat your largest meal at lunch (12-1 PM)
• Light breakfast and dinner
• Avoid eating late at night
• Maintain regular meal times

Would you like specific recipes or meal plans based on your dosha type?`
    }
    
    if (query.includes('side effect') || query.includes('reaction')) {
      return `Common side effects during Panchakarma are usually mild and temporary:

😴 **Normal Reactions:**
• Fatigue or drowsiness (body is detoxifying)
• Mild headaches
• Temporary skin breakouts
• Emotional releases or mood changes
• Increased urination or bowel movements

⚠️ **When to Contact Your Practitioner:**
• Severe nausea or vomiting
• Persistent headaches
• Skin rashes or allergic reactions
• Breathing difficulties
• Extreme fatigue lasting more than 2 days

🌿 **Management Tips:**
• Stay well-hydrated
• Get adequate rest
• Follow prescribed diet strictly
• Practice gentle yoga or meditation
• Communicate openly with your therapist

Remember, these reactions indicate your body is responding to treatment. Always report any concerns to your healthcare provider.`
    }
    
    if (query.includes('prepare') || query.includes('preparation')) {
      return `Here's how to prepare for your upcoming therapy session:

📅 **24 Hours Before:**
• Avoid heavy meals and alcohol
• Get adequate sleep (7-8 hours)
• Stay hydrated with warm water
• Practice light meditation or breathing exercises

🌅 **Day of Treatment:**
• Eat a light breakfast 2 hours before
• Wear comfortable, loose clothing
• Arrive 15 minutes early
• Bring a water bottle

🧘 **Mental Preparation:**
• Set positive intentions
• Practice deep breathing
• Release any stress or anxiety
• Be open to the healing process

🚿 **Physical Preparation:**
• Take a warm shower beforehand
• Remove jewelry and accessories
• Inform therapist of any concerns
• Empty your bladder before treatment

Following these guidelines will enhance your therapy experience and results!`
    }
    
    if (query.includes('dosha') || query.includes('constitution')) {
      return `Understanding your dosha constitution is key to personalized treatment:

🌪️ **Vata Dosha (Air + Space):**
• Characteristics: Creative, energetic, quick-thinking
• Imbalance signs: Anxiety, insomnia, dry skin, constipation
• Balancing: Warm oils, regular routine, grounding practices

🔥 **Pitta Dosha (Fire + Water):**
• Characteristics: Focused, ambitious, strong digestion
• Imbalance signs: Anger, inflammation, acidity, skin rashes
• Balancing: Cooling treatments, moderate exercise, calm environment

🌍 **Kapha Dosha (Earth + Water):**
• Characteristics: Stable, nurturing, strong immunity
• Imbalance signs: Weight gain, lethargy, congestion, depression
• Balancing: Stimulating treatments, regular exercise, light diet

Most people have a combination of doshas. Your Panchakarma treatment is customized based on your unique constitution and current imbalances. Would you like me to help you identify your dominant dosha?`
    }
    
    if (query.includes('recovery') || query.includes('timeline') || query.includes('how long')) {
      return `Recovery timeline varies based on individual factors:

📊 **Typical Timeline:**
• **Week 1-2:** Initial detox symptoms, body adjustment
• **Week 3-4:** Increased energy, improved sleep
• **Week 5-8:** Significant improvements in target conditions
• **3-6 months:** Long-term benefits stabilize

⚡ **Factors Affecting Recovery:**
• Your current health status
• Severity of imbalances
• Adherence to treatment protocol
• Lifestyle and dietary compliance
• Individual constitution type

🎯 **Milestone Indicators:**
• Better sleep quality
• Improved digestion
• Increased energy levels
• Enhanced mental clarity
• Reduced symptoms

📈 **Maximizing Results:**
• Follow all dietary guidelines
• Maintain regular sleep schedule
• Practice recommended yoga/meditation
• Attend all scheduled sessions
• Stay positive and patient

Remember, Ayurveda focuses on sustainable, long-term healing rather than quick fixes. Your body's wisdom guides the healing process!`
    }
    
    // Default response for unrecognized queries
    return `Thank you for your question! As your Ayurveda assistant, I can help you with:

🌿 **Therapy Information:** Benefits, procedures, and expectations
🥗 **Dietary Guidance:** Meal plans and food recommendations
⚖️ **Dosha Analysis:** Understanding your constitution
📝 **Preparation Tips:** How to prepare for treatments
⚠️ **Side Effects:** What to expect and when to seek help
⏰ **Recovery Process:** Timeline and milestones

Please feel free to ask about any of these topics, or try one of the quick action buttons below. I'm here to support your healing journey!

If you have specific medical concerns, please consult with your practitioner directly.`
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim()
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Generate and add bot response
    const response = generateBotResponse(textToSend)
    simulateTyping(response)
  }

  const handleQuickAction = (query: string) => {
    handleSendMessage(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-brown-50 via-green-50 to-yellow-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🤖</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Panchabot</h1>
          <p className="text-xl text-gray-600">Your AI-Powered Ayurveda Assistant</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-saffron-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-saffron-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl max-w-xs">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">Panchabot is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.query)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-3 py-2 bg-saffron-50 text-saffron-700 rounded-xl hover:bg-saffron-100 transition-colors duration-300 text-sm font-medium disabled:opacity-50"
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your Panchakarma therapy..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? <InlineLoader size="sm" /> : 'Send'}
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-warm-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <span className="text-warm-yellow-600 text-xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-warm-yellow-800 mb-1">Medical Disclaimer</h4>
              <p className="text-sm text-warm-yellow-700">
                Panchabot provides general information about Ayurveda and Panchakarma therapy. 
                This is not a substitute for professional medical advice. Always consult with 
                your qualified Ayurvedic practitioner for personalized guidance and treatment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
