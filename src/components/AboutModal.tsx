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

      {/* Modern Header met Hero Layout */}
      <div className="relative mb-16">
        {/* Hero Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-3xl"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative p-12 text-center">
          {/* Enhanced Profile Photo */}
          <div className="relative w-36 h-36 mx-auto mb-8 group">
            {/* Multiple rotating rings */}
            <div className="absolute inset-0 border-2 border-dashed border-blue-300/50 dark:border-blue-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 border-2 border-dotted border-purple-300/50 dark:border-purple-500/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
            
            {/* Photo container with glassmorphism */}
            <div className="relative w-full h-full bg-white/80 dark:bg-stone-800/80 backdrop-blur-xl rounded-full overflow-hidden border-4 border-white/60 dark:border-stone-700/60 shadow-2xl z-20 hover:shadow-3xl transition-all duration-500">
              <img 
                src="/foto.jpg" 
                alt="Anthony Verruijt"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800 rounded-full flex items-center justify-center hidden">
                <span className="text-3xl font-bold text-stone-600 dark:text-stone-300">AV</span>
              </div>
              
              {/* Enhanced scanning effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 dark:via-blue-300/30 to-transparent skew-x-12 -translate-x-full group-hover:animate-scan-profile"></div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 rounded-full transition-all duration-700"></div>
            </div>
            
            {/* Status indicators with better positioning */}
            <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-30">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Online
            </div>
            <div className="absolute -bottom-2 -left-2 flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-30">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              Available
            </div>
          </div>
          
          {/* Enhanced Name with typing effect */}
          <div className="mb-6">
            <h3 className="text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 dark:from-gray-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Anthony Verruijt
            </h3>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span>Freelance Developer</span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Location with better styling */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/70 dark:bg-stone-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-stone-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
              <MapPin size={20} className="text-red-500 group-hover:animate-bounce" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Amersfoort, Nederland</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
          
          {/* Quick stats row */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">15+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Jaren</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">50+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Projecten</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-pink-600 dark:text-pink-400">25+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Klanten</div>
            </div>
          </div>
        </div>
      </div>


      {/* Modern Intro Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Over Mij Card */}
        <div className="relative bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/50 dark:from-stone-800/80 dark:via-stone-900/50 dark:to-stone-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/60 dark:border-stone-700/60 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
          {/* Floating gradient orb */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <h4 className="text-2xl font-black text-stone-900 dark:text-stone-100">Over Mij</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent"></div>
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-stone-700 dark:text-stone-300">
                <span className="font-bold text-blue-600 dark:text-blue-400">Hoi!</span> Ik ben Anthony, 26 jaar uit Amersfoort. 
                Al sinds de basisschool bezig met programmeren - begon als kind met scripts en ben nooit gestopt.
              </p>
              <p className="text-stone-600 dark:text-stone-400">
                Van websites tot mobiele apps en automatisering - ik bouw wat nodig is. 
                Focus op <span className="font-semibold text-purple-600 dark:text-purple-400">kwaliteit</span> en 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> eerlijke prijzen</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Beschikbaarheid Card */}
        <div className="relative bg-gradient-to-br from-emerald-50/80 via-green-50/50 to-blue-50/50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-blue-900/20 backdrop-blur-xl rounded-3xl p-8 border border-emerald-200/60 dark:border-emerald-700/60 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden">
          {/* Floating gradient orb */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-emerald-400/30 to-blue-400/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
              <h4 className="text-2xl font-black text-stone-900 dark:text-stone-100">Status</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
            </div>
            
            {/* Status indicator */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 group/status">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                <span className="text-xl font-black">Beschikbaar</span>
              </div>
              <p className="text-emerald-100 font-medium">
                Open voor nieuwe projecten en samenwerkingen
              </p>
            </div>
            
            <div className="text-stone-600 dark:text-stone-400">
              <p className="text-sm leading-relaxed">
                Laten we kijken wat ik voor jou kan betekenen. Van idee tot eindproduct - 
                <span className="font-semibold text-emerald-600 dark:text-emerald-400"> samen maken we het waar</span>.
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

      {/* Modern Contact Section */}
      <div className="text-center">
        <div className="mb-8">
          <h4 className="text-3xl font-black text-stone-900 dark:text-stone-100 mb-4">
            Laten we <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">samenwerken</span>
          </h4>
          <p className="text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Klaar om jouw idee om te zetten in een geweldig product? Laten we praten.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Primary CTA */}
          <a
            href="tel:0640470662"
            className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden min-w-[200px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              Bel Direct
              <div className="w-3 h-3 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          {/* Secondary CTA */}
          <a
            href="mailto:anthonyverruijt@hotmail.com"
            className="group relative bg-white/80 dark:bg-stone-800/80 backdrop-blur-xl border-2 border-gray-200 dark:border-stone-600 text-stone-700 dark:text-stone-300 px-8 py-4 rounded-2xl font-bold hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-w-[200px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              Email Sturen
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
            </span>
          </a>
        </div>

        {/* Quick links */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            LinkedIn
          </a>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            GitHub
          </a>
        </div>
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