'use client'

import { ExternalLink, Smartphone, Code2, DollarSign, Gamepad2, Timer, Star, TrendingUp, Zap } from 'lucide-react'
import { useState } from 'react'

export function ProjectsModal() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      title: 'tamagrey',
      description: 'Productiviteits-app met virtuele huisdier. Focus met je adorable companion die blij wordt van jouw geconcentreerde werk.',
      type: 'iOS App',
      tech: ['Swift', 'SwiftUI', 'Core Data'],
      icon: Timer,
      year: '2025',
      status: 'Live in de App Store',
      appStoreUrl: 'https://apps.apple.com/us/app/tamagrey/id6749504114',
      appIconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9f/c7/49/9fc749ee-cfe2-15d5-e3ed-1c31b7782f7e/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
      features: ['Smart app blocking', 'Home screen widget', 'Privacy focused', 'Universal app (iPhone, iPad, Mac, Vision Pro)'],
      gradient: 'from-gray-200/20 via-gray-300/20 to-gray-400/20',
      bgGradient: 'from-gray-50 to-white dark:from-gray-900/20 dark:to-gray-800/20'
    },
    {
      title: 'TypeRushr',
      description: 'Snelle typing game waar elke seconde telt. Type zoveel mogelijk woorden voordat de tijd op is.',
      type: 'iOS Game',
      tech: ['Swift', 'SwiftUI', 'GameKit'],
      icon: Gamepad2,
      year: '2025',
      status: 'Live in de App Store',
      appStoreUrl: 'https://apps.apple.com/us/app/typerushr-fast-typing-game/id6748623739',
      appIconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b7/5a/2d/b75a2d6f-6141-a41e-b355-17997c3fbaf6/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
      features: ['3 game modes', 'Word collection system', 'Offline gameplay', '5-star rating'],
      gradient: 'from-gray-300/20 via-gray-400/20 to-gray-500/20',
      bgGradient: 'from-gray-100 to-gray-50 dark:from-gray-800/20 dark:to-gray-900/20'
    },
    {
      title: 'Currency Converter: 1To1',
      description: 'Eenvoudige en snelle valuta converter voor reizigers. Clean interface zonder onnodige features.',
      type: 'iOS App',
      tech: ['Swift', 'SwiftUI', 'Network APIs'],
      icon: DollarSign,
      year: '2024',
      status: 'Live in de App Store',
      appStoreUrl: 'https://apps.apple.com/us/app/currency-converter-1to1/id6749094224',
      appIconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d8/74/ae/d874aeb4-9b8c-6919-820a-9e98ebd5dd2d/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
      features: ['Real-time rates', 'Travel focused', 'Minimalistic design', 'Premium app ($0.99)'],
      gradient: 'from-gray-400/20 via-gray-500/20 to-gray-600/20',
      bgGradient: 'from-white to-gray-50 dark:from-gray-900/20 dark:to-gray-800/20'
    },
    {
      title: 'Portfolio Website',
      description: 'Deze website die je nu bekijkt. Volledig custom gebouwd met moderne tech stack en clean, minimalistisch design.',
      type: 'Web Ontwikkeling',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      icon: Code2,
      year: '2025',
      status: 'In Ontwikkeling',
      features: ['Responsive design', 'Dark/light modus', 'Vloeiende animaties', 'Modal systeem'],
      gradient: 'from-gray-500/20 via-gray-600/20 to-gray-700/20',
      bgGradient: 'from-gray-50 to-gray-100 dark:from-gray-800/20 dark:to-gray-900/20'
    }
  ]

  const getStatusColor = (status: string) => {
    if (status.includes('Live')) return 'text-green-600 dark:text-green-400'
    if (status.includes('Ontwikkeling')) return 'text-blue-600 dark:text-blue-400'
    return 'text-stone-600 dark:text-stone-400'
  }

  return (
    <div className="text-stone-800 dark:text-stone-200">
      {/* Modern Hero Header */}
      <div className="relative mb-16 text-center">
        {/* Hero Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-3xl"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-8 right-12 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-8 left-12 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative p-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 dark:from-gray-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                Mijn Werk
              </h3>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-600 dark:text-gray-400 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span>Van Idee tot App Store</span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-lg mb-4">
              Van <span className="font-semibold text-blue-600 dark:text-blue-400">iOS apps</span> in de App Store tot 
              <span className="font-semibold text-purple-600 dark:text-purple-400"> custom websites</span> en 
              <span className="font-semibold text-pink-600 dark:text-pink-400"> automatisering</span>.
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Elk project met passie gebouwd
              <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid with Advanced Animations */}
      <div className="grid gap-8 mb-12">
        {projects.map((project, index) => {
          const IconComponent = project.icon
          const isHovered = hoveredProject === index
          
          return (
            <div
              key={project.title}
              className={`group relative border border-stone-200 dark:border-stone-700 rounded-3xl p-8 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-black/30 ${project.bgGradient} overflow-hidden`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}></div>
              
              {/* Floating Particles */}
              {isHovered && (
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gray-600 dark:bg-gray-400 rounded-full animate-floating-particle"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${20 + (i % 2) * 30}%`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </>
              )}

              <div className="relative z-10 flex flex-col lg:flex-row gap-6">
                {/* Enhanced Icon & Status */}
                <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
                  <div className="relative group/icon">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center transition-all duration-500 mb-4 overflow-hidden shadow-lg ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                      {project.appIconUrl ? (
                        <img 
                          src={project.appIconUrl} 
                          alt={`${project.title} app icon`}
                          className="w-full h-full object-cover rounded-3xl"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center ${project.appIconUrl ? 'hidden' : ''}`}>
                        <IconComponent size={32} className="text-stone-600 dark:text-stone-400" />
                      </div>
                      
                      {/* Scanning effect */}
                      {isHovered && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent skew-x-12 -translate-x-full animate-scan-slow"></div>
                      )}
                    </div>
                    
                    {/* Pulsing rings */}
                    {isHovered && (
                      <>
                        <div className="absolute top-2 left-2 w-16 h-16 border border-blue-400/30 rounded-3xl animate-ping"></div>
                        <div className="absolute top-1 left-1 w-18 h-18 border border-purple-400/20 rounded-3xl animate-pulse"></div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status).includes('green') ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                    <span className={`text-sm font-bold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-3xl font-black text-stone-900 dark:text-stone-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-yellow-500" />
                          <span className="font-bold">{project.type}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp size={14} className="text-green-500" />
                          <span>{project.year}</span>
                        </div>
                      </div>
                    </div>
                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-stone-100 dark:to-stone-200 text-stone-50 dark:text-stone-900 rounded-full text-sm font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group/button"
                      >
                        <Star size={16} className="group-hover/button:rotate-12 transition-transform duration-300" />
                        App Store
                        <ExternalLink size={16} className="group-hover/button:translate-x-1 transition-transform duration-300" />
                      </a>
                    )}
                  </div>

                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8 text-lg">
                    {project.description}
                  </p>

                  {/* Enhanced Features */}
                  {project.features && (
                    <div className="mb-8">
                      <h5 className="text-sm font-black text-stone-700 dark:text-stone-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                        Functies
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.features.map((feature, i) => (
                          <div 
                            key={feature} 
                            className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-stone-700/80 transition-all duration-300"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Tech Stack */}
                  <div>
                    <h5 className="text-sm font-black text-stone-700 dark:text-stone-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-4 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                      Technologie
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, i) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-gradient-to-r from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-sm font-bold border border-stone-200 dark:border-stone-600 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Enhanced Bottom Section */}
      <div className="text-center">
        <div className="relative bg-gradient-to-br from-stone-50 via-white to-stone-50 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 rounded-3xl p-12 border border-stone-200 dark:border-stone-700 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="grid grid-cols-12 gap-2 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div 
                  key={i}
                  className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    transform: `scale(${0.5 + Math.sin(i * 0.1) * 0.3})`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            <h4 className="text-3xl font-black mb-6 text-stone-900 dark:text-stone-100 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 bg-clip-text text-transparent">
              Laten we samen bouwen
            </h4>
            <p className="text-stone-600 dark:text-stone-400 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
              Elk project begint met een gesprek. Vertel me over jouw idee en 
              ik kijk hoe we het tot leven kunnen brengen.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:0640470662"
                className="group bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 dark:from-stone-100 dark:via-stone-200 dark:to-stone-100 text-stone-50 dark:text-stone-900 px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Neem Contact Op
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-700 dark:from-stone-300 dark:via-stone-200 dark:to-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="mailto:anthonyverruijt@hotmail.com"
                className="group border-2 border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 px-10 py-4 rounded-full font-bold hover:border-stone-400 hover:bg-stone-100 dark:hover:border-stone-500 dark:hover:bg-stone-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  Plan een Gesprek
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-x {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        @keyframes scan-slow {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(200%) skewX(12deg); }
        }
        
        @keyframes floating-particle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg); opacity: 0.7; }
          50% { transform: translateY(-40px) translateX(-5px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-20px) translateX(-15px) rotate(270deg); opacity: 0.7; }
        }
        
        .animate-scale-x { animation: scale-x 2s ease-out 0.5s both; }
        .animate-scan-slow { animation: scan-slow 2s ease-in-out infinite; }
        .animate-floating-particle { animation: floating-particle 6s ease-in-out infinite; }
      `}</style>
    </div>
  )
}