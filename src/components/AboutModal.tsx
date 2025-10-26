'use client'

import { MapPin, Code, Sparkles, Clock, Coffee, Target, Zap, TrendingUp, Star } from 'lucide-react'
import { SkillBars } from './SkillBars'
import { useState, useEffect } from 'react'

export function AboutModal() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => prev + 1)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const journey = [
    {
      year: '2025',
      title: 'Freelance Developer',
      description: 'Bezig met diverse projecten voor klanten - van websites tot complexe automatisering.',
      icon: Sparkles,
      color: 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white',
      bgColor: 'from-gray-50 to-white dark:from-gray-900/20 dark:to-gray-800/20'
    },
    {
      year: '2024',
      title: 'Professioneel aan de slag',
      description: 'Eerste betaalde projecten en het opbouwen van een portfolio van echte klanten.',
      icon: TrendingUp,
      color: 'from-gray-800 to-black dark:from-gray-200 dark:to-gray-400',
      bgColor: 'from-gray-100 to-gray-50 dark:from-gray-800/20 dark:to-gray-900/20'
    },
    {
      year: '2020',
      title: 'IT Opleiding Afgerond',
      description: 'Officiële basis gelegd, maar eigenlijk vooral veel zelf geleerd door gewoon te doen.',
      icon: Target,
      color: 'from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200',
      bgColor: 'from-white to-gray-50 dark:from-gray-900/20 dark:to-gray-800/20'
    },
    {
      year: '2015',
      title: 'Middelbare School',
      description: 'Begon serieuzer te experimenteren met websites en kleine applicaties.',
      icon: Code,
      color: 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white',
      bgColor: 'from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-900/20'
    },
    {
      year: '2010',
      title: 'Basisschool',
      description: 'Eerste kennismaking met programmeren - simpele scripts en veel uitproberen.',
      icon: Zap,
      color: 'from-gray-800 to-black dark:from-gray-200 dark:to-gray-400',
      bgColor: 'from-gray-100 to-white dark:from-gray-900/20 dark:to-gray-800/20'
    }
  ]

  const interests = [
    { name: 'Koffie', icon: Coffee, color: 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white' },
    { name: 'Technologie', icon: Code, color: 'from-gray-800 to-black dark:from-gray-200 dark:to-gray-400' },
    { name: 'Automatisering', icon: Zap, color: 'from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200' },
    { name: 'Design', icon: Sparkles, color: 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white' },
    { name: 'Problem Solving', icon: Target, color: 'from-gray-800 to-black dark:from-gray-200 dark:to-gray-400' }
  ]

  const stats = [
    { label: 'Jaren Ervaring', value: '15+', icon: Clock, color: 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white' },
    { label: 'Projecten Voltooid', value: '50+', icon: Star, color: 'from-gray-800 to-black dark:from-gray-200 dark:to-gray-400' },
    { label: 'Tevreden Klanten', value: '25+', icon: Sparkles, color: 'from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200' }
  ]

  return (
    <div className="text-stone-800 dark:text-stone-200 relative overflow-hidden">
      {/* Clean animated background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-600 dark:bg-gray-400 rounded-full animate-floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header met foto en basis info */}
      <div className="text-center mb-12 relative pt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/30 dark:via-gray-700/30 to-transparent blur-3xl"></div>
        <div className="relative">
          {/* Clean Profile Photo */}
          <div className="relative w-28 h-28 mx-auto mb-6 group mt-4">
            {/* Clean rotating ring */}
            <div className="absolute inset-0 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full animate-spin-slow opacity-50 z-0"></div>
            <div className="relative w-full h-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden border-4 border-white dark:border-stone-800 shadow-2xl z-20">
              <img 
                src="/foto.jpg" 
                alt="Anthony Verruijt"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-stone-200 dark:bg-stone-700 rounded-full flex items-center justify-center hidden">
                <span className="text-2xl font-bold text-stone-600 dark:text-stone-300">AV</span>
              </div>
              
              {/* Clean Scanning Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/30 dark:via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:animate-scan-profile"></div>
            </div>
            
            {/* Clean minimal indicators */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-800 dark:bg-white rounded-full animate-bounce z-30"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse z-30"></div>
          </div>
          
          <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 bg-clip-text text-transparent">
            Anthony Verruijt
          </h3>
          <div className="flex items-center justify-center text-stone-600 dark:text-stone-400 mb-8 group">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-xl border border-gray-200 dark:border-stone-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <MapPin size={18} className="text-red-500 animate-pulse" />
              <span className="font-semibold">Amersfoort, Nederland</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 rounded-2xl p-6 border border-gray-200 dark:border-stone-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
            <div className="relative z-10 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full mb-4 shadow-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-3xl font-black text-stone-900 dark:text-stone-100 mb-2">{stat.value}</div>
              <div className="text-sm font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Introductie tekst met enhanced styling */}
      <div className="mb-12 relative">
        <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 rounded-3xl p-8 border border-gray-200 dark:border-stone-700 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
          
          <h4 className="text-2xl font-black text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            Over Mij
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </h4>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-stone-700 dark:text-stone-300">
              <span className="font-bold text-stone-900 dark:text-stone-100">Hoi!</span> Ik ben Anthony, 26 jaar en woon in Amersfoort. Al sinds de basisschool ben ik bezig met programmeren - 
              begon als klein kind met simpele scripts en ben nooit meer gestopt.
            </p>
            <p className="text-stone-700 dark:text-stone-300">
              Ik bouw eigenlijk alles - <span className="font-semibold text-gray-800 dark:text-gray-200">websites</span>, 
              <span className="font-semibold text-gray-700 dark:text-gray-300"> apps</span>, 
              <span className="font-semibold text-gray-600 dark:text-gray-400"> automatisering</span>, je noemt het maar op. 
              Wat ik vooral fijn vind is dat ik per project kijk naar wat er echt nodig is qua tijd en complexiteit, 
              waardoor ik vaak goedkoper uitkom dan grote bureaus.
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
              <p className="text-stone-700 dark:text-stone-300 font-semibold">
                <span className="text-emerald-600 dark:text-emerald-400">✨ Beschikbaar</span> voor freelance projecten en vaste samenwerkingen. 
                Laten we kijken wat ik voor jou kan betekenen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Journey sectie */}
      <div className="mb-12">
        <h4 className="text-2xl font-black text-stone-700 dark:text-stone-300 mb-8 uppercase tracking-wider flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          Journey
          <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500/30 to-transparent rounded-full"></div>
        </h4>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          
          <div className="space-y-8">
            {journey.map((item, index) => {
              const IconComponent = item.icon
              const isHovered = hoveredYear === item.year
              
              return (
                <div 
                  key={item.year} 
                  className={`relative flex items-start gap-6 group transition-all duration-500 ${isHovered ? 'transform translate-x-2' : ''}`}
                  onMouseEnter={() => setHoveredYear(item.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Timeline Node */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    {isHovered && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-ping"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-1 bg-gradient-to-br ${item.bgColor} rounded-2xl p-6 border border-stone-200 dark:border-stone-700 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden`}>
                    {isHovered && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50 dark:from-white/10 dark:via-transparent dark:to-white/10 rounded-2xl"></div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-black text-stone-900 dark:text-stone-100">{item.year}</span>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                      </div>
                      <h5 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-3">
                        {item.title}
                      </h5>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Interactive Skills Bars */}
      <div className="mb-12">
        <h4 className="text-2xl font-black text-stone-700 dark:text-stone-300 mb-8 uppercase tracking-wider flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
          Skills & Expertise
          <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full"></div>
        </h4>
        <SkillBars />
      </div>

      {/* Enhanced Interests sectie */}
      <div className="mb-12">
        <h4 className="text-2xl font-black text-stone-700 dark:text-stone-300 mb-8 uppercase tracking-wider flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></div>
          Interests & Passions
          <div className="flex-1 h-0.5 bg-gradient-to-r from-pink-500/30 to-transparent rounded-full"></div>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {interests.map((interest, index) => (
            <div
              key={interest.name}
              className="group relative bg-white dark:bg-stone-800 rounded-2xl p-4 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              <div className="relative z-10 text-center">
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${interest.color} rounded-full mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <interest.icon size={18} className="text-white" />
                </div>
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300 block">{interest.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Momenteel sectie */}
      <div className="mb-12">
        <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-3xl p-8 border border-purple-200 dark:border-purple-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-t-3xl"></div>
          
          {/* Floating particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-floating-particle"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
          
          <div className="relative z-10">
            <h4 className="text-2xl font-black text-stone-700 dark:text-stone-300 mb-4 uppercase tracking-wider flex items-center gap-3">
              <Sparkles size={24} className="text-purple-500" />
              Momenteel
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </h4>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              Bezig met het bouwen van <span className="font-bold text-purple-600 dark:text-purple-400">AI-powered tools</span> voor development teams, 
              en werk aan wat ik interessant vind. Altijd op zoek naar de volgende uitdaging!
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Contact buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <a
          href="tel:0640470662"
          className="group relative bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 dark:from-stone-100 dark:via-stone-200 dark:to-stone-100 text-stone-50 dark:text-stone-900 px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Neem Contact Op
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 dark:from-stone-300 dark:via-stone-200 dark:to-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 px-10 py-4 rounded-full font-bold hover:border-stone-400 hover:bg-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            Bekijk LinkedIn
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
          </span>
        </a>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scan-profile {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        
        @keyframes floating-particle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-30px) translateX(15px) rotate(90deg); opacity: 0.8; }
          50% { transform: translateY(-60px) translateX(-10px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-30px) translateX(-20px) rotate(270deg); opacity: 0.8; }
        }
        
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-scan-profile { animation: scan-profile 2s ease-in-out infinite; }
        .animate-floating-particle { animation: floating-particle 8s ease-in-out infinite; }
      `}</style>
    </div>
  )
}