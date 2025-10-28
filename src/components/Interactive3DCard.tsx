'use client'

import { useState, useRef, useEffect } from 'react'
import { Code, Smartphone, Globe, Zap, Users, TrendingUp } from 'lucide-react'

export function Interactive3DCard() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const rotateYValue = (e.clientX - centerX) / 10
    const rotateXValue = -(e.clientY - centerY) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const services = [
    {
      icon: Globe,
      title: 'Websites',
      description: 'Moderne, responsive websites die converteren',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'iOS Apps',
      description: 'Native apps voor iPhone, iPad en Apple Watch',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      title: 'Web Apps',
      description: 'Krachtige webapplicaties met premium UX',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Automatisering',
      description: 'Python scripts en workflow optimalisatie',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Consultancy',
      description: 'Strategisch advies voor je digitale groei',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Optimalisatie',
      description: 'Performance en conversie verbetering',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="perspective-1000 flex justify-center">
      <div
        ref={cardRef}
        className="relative w-full max-w-4xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out'
        }}
      >
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 transform-gpu">
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
                Wat ik voor je kan bouwen
              </h2>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Van idee tot werkende applicatie. Elke oplossing op maat gemaakt met moderne technologie.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={service.title}
                  className="group relative p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: `translateZ(${isHovered ? '20px' : '0'})`
                  }}
                >
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                  <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-2xl group-hover:bg-white/90 dark:group-hover:bg-gray-800/90 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} className="text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Hover effect particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1 h-1 bg-gradient-to-r ${service.color} rounded-full animate-bounce`}
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 15}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 relative z-10">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 text-white dark:text-gray-900 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer group">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Laten we je project bespreken</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Floating elements */}
          {isHovered && (
            <>
              <div className="absolute top-10 left-10 w-4 h-4 bg-blue-500/30 rounded-full animate-pulse"></div>
              <div className="absolute top-20 right-16 w-3 h-3 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="absolute bottom-16 right-12 w-3 h-3 bg-cyan-500/30 rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
            </>
          )}
        </div>

        {/* Shadow */}
        <div className="absolute inset-0 bg-black/20 rounded-3xl blur-xl transform translate-y-8 scale-95 -z-10"></div>
      </div>
    </div>
  )
}