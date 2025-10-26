'use client'

import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, Instagram, MapPin, FolderOpen } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TechStack } from '@/components/TechStack'
import { Modal } from '@/components/Modal'
import { ProjectsModal } from '@/components/ProjectsModal'
import { AboutModal } from '@/components/AboutModal'
import { PhotoTooltip } from '@/components/PhotoTooltip'
import { TypewriterEffect } from '@/components/TypewriterEffect'

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showTerminalLoader, setShowTerminalLoader] = useState(false)
  const sessionStart = useRef<number>(Date.now())

  useEffect(() => {
    // Initialize real visitor tracking
    const initializeVisitorTracking = () => {
      // Get or create unique visitor ID
      let visitorId = localStorage.getItem('anthonysite_visitor_id')
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('anthonysite_visitor_id', visitorId)
      }

      // Get or initialize total visitors
      let totalVisitors = parseInt(localStorage.getItem('anthonysite_total_visitors') || '0')
      
      // Check if this is a new session (24h cooldown)
      const lastVisit = localStorage.getItem('anthonysite_last_visit')
      const now = Date.now()
      const oneDayAgo = now - (24 * 60 * 60 * 1000)
      
      if (!lastVisit || parseInt(lastVisit) < oneDayAgo) {
        totalVisitors += 1
        localStorage.setItem('anthonysite_total_visitors', totalVisitors.toString())
        localStorage.setItem('anthonysite_last_visit', now.toString())
      }

      // Initialize page views
      let totalPageViews = parseInt(localStorage.getItem('anthonysite_total_pageviews') || '0')
      if (!sessionStorage.getItem('homepage_pageview_counted')) {
        totalPageViews += 1
        localStorage.setItem('anthonysite_total_pageviews', totalPageViews.toString())
        sessionStorage.setItem('homepage_pageview_counted', 'true')
      }

      // Get active sessions (online now)
      const sessions = JSON.parse(localStorage.getItem('anthonysite_sessions') || '[]')
      const fiveMinutesAgo = now - (5 * 60 * 1000)
      
      // Clean old sessions
      const activeSessions = sessions.filter((session: any) => session.lastActivity > fiveMinutesAgo)
      
      // Add/update current session
      const existingSessionIndex = activeSessions.findIndex((s: any) => s.id === visitorId)
      if (existingSessionIndex >= 0) {
        activeSessions[existingSessionIndex].lastActivity = now
      } else {
        activeSessions.push({
          id: visitorId,
          lastActivity: now,
          startTime: sessionStart.current
        })
      }
      
      localStorage.setItem('anthonysite_sessions', JSON.stringify(activeSessions))
    }

    // Initialize immediately
    initializeVisitorTracking()

    // Update session activity every 30 seconds
    const interval = setInterval(() => {
      const now = Date.now()
      const sessions = JSON.parse(localStorage.getItem('anthonysite_sessions') || '[]')
      const fiveMinutesAgo = now - (5 * 60 * 1000)
      const activeSessions = sessions.filter((session: any) => session.lastActivity > fiveMinutesAgo)
      
      // Update current session activity
      const visitorId = localStorage.getItem('anthonysite_visitor_id')
      const existingSessionIndex = activeSessions.findIndex((s: any) => s.id === visitorId)
      if (existingSessionIndex >= 0) {
        activeSessions[existingSessionIndex].lastActivity = now
      }
      
      localStorage.setItem('anthonysite_sessions', JSON.stringify(activeSessions))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <main className="h-screen bg-stone-50 dark:bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* SPECTACULAR floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Original floating circles with enhanced effects */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl animate-cosmic-drift"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-dimensional-shift" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 bg-green-200/20 dark:bg-green-500/10 rounded-full blur-xl animate-quantum-tunnel" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-18 h-18 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-xl animate-matrix-glitch" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-pink-200/20 dark:bg-pink-500/10 rounded-full blur-xl animate-hologram-flicker" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 right-10 w-14 h-14 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-xl animate-neural-pulse" style={{ animationDelay: '5s' }}></div>

        {/* Nieuwe geometric shapes */}
        <div className="floating-element floating-triangle animate-cosmic-drift absolute top-16 left-1/4" style={{ animationDelay: '1s' }}></div>
        <div className="floating-element floating-diamond animate-dimensional-shift absolute top-1/3 right-1/4" style={{ animationDelay: '3s' }}></div>
        <div className="floating-element floating-hexagon animate-quantum-tunnel absolute bottom-1/3 left-1/3" style={{ animationDelay: '2s' }}></div>
        <div className="floating-element floating-star animate-matrix-glitch absolute bottom-20 right-1/3" style={{ animationDelay: '4s' }}></div>
        
        {/* Meer geometric shapes */}
        <div className="floating-element floating-triangle animate-hologram-flicker absolute top-2/3 left-20" style={{ animationDelay: '6s' }}></div>
        <div className="floating-element floating-diamond animate-neural-pulse absolute top-20 right-20" style={{ animationDelay: '7s' }}></div>
        <div className="floating-element floating-hexagon animate-cosmic-drift absolute bottom-40 left-1/2" style={{ animationDelay: '5s' }}></div>
        <div className="floating-element floating-star animate-dimensional-shift absolute top-40 left-1/3" style={{ animationDelay: '8s' }}></div>

        {/* Extra glowing orbs met nieuwe animaties */}
        <div className="absolute top-10 left-1/2 w-8 h-8 bg-cyan-300/20 dark:bg-cyan-400/15 rounded-full blur-lg animate-quantum-tunnel" style={{ animationDelay: '9s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-10 h-10 bg-yellow-300/20 dark:bg-yellow-400/15 rounded-full blur-lg animate-matrix-glitch" style={{ animationDelay: '10s' }}></div>
        <div className="absolute top-1/4 right-1/3 w-6 h-6 bg-red-300/20 dark:bg-red-400/15 rounded-full blur-lg animate-hologram-flicker" style={{ animationDelay: '11s' }}></div>
        <div className="absolute bottom-1/4 right-1/2 w-12 h-12 bg-emerald-300/20 dark:bg-emerald-400/15 rounded-full blur-lg animate-cosmic-drift" style={{ animationDelay: '12s' }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(100,100,100,0.3) 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      {/* Theme toggle */}
      <ThemeToggle />

      {/* Projects button - met tooltip en pijltje */}
      <div className="fixed bottom-8 right-8 z-50 group">
        {/* Tooltip met pijltje */}
        <div className="absolute bottom-16 right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
          <div className="relative">
            <div className="bg-gray-800 dark:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl backdrop-blur-sm">
              Bekijk hier mijn projecten
            </div>
            {/* Pijltje naar beneden */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800 dark:border-t-gray-700"></div>
          </div>
        </div>
        
        {/* Projects button */}
        <button
          onClick={() => setActiveModal('projects')}
          className="w-12 h-12 bg-white/80 dark:bg-black/40 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center hover:scale-125 hover:-translate-y-2 hover:rotate-12 transition-all duration-300 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-black/60 group"
        >
          <FolderOpen size={18} className="group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
        </button>
      </div>




      {/* Main content - PERFECT 100vh responsive */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 h-full py-8">
        
        {/* Profile foto */}
        <div className="flex-shrink-0 mb-4 sm:mb-6 relative z-50">
          <PhotoTooltip onPhotoClick={() => setActiveModal('about')} />
        </div>

        {/* Status indicator - met hover animatie */}
        <div className="flex-shrink-0 mt-4 sm:mt-6">
          <div className="relative flex items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2 border border-gray-200 dark:border-slate-600 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg group">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:animate-pulse"></div>
            <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">Beschikbaar</span>
            <div className="mx-2 w-px h-4 bg-gray-300 dark:bg-slate-400"></div>
            <MapPin size={12} className="text-gray-600 dark:text-slate-300 mr-1 group-hover:text-green-500 transition-colors duration-300" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-slate-200">Nederland</span>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex-shrink-0">
          <TechStack />
        </div>

        {/* Name - met hover 3D effect */}
        <div className="flex-shrink-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black relative group cursor-pointer text-black dark:text-white transform transition-all duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-2xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gray-600 hover:via-gray-800 hover:to-gray-600 dark:hover:from-gray-300 dark:hover:via-gray-100 dark:hover:to-gray-300">
            Anthony Verruijt
            {/* Underline effect */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700 ease-out"></div>
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg bg-gradient-to-r from-blue-500 to-purple-500 -z-10"></div>
          </h1>
        </div>

        {/* Tagline - met hover 3D effect */}
        <div className="relative flex-shrink-0 max-w-xl mx-auto">
          <div className="relative text-sm sm:text-lg text-gray-700 dark:text-slate-200 leading-relaxed h-12 sm:h-16 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-slate-600 px-6 py-3 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl group overflow-hidden">
            <TypewriterEffect 
              phrases={[
                "iOS apps die gebruikers liefhebben",
                "Websites die converteren", 
                "Processen automatiseren met Python",
                "Ideeën werkelijkheid maken"
              ]}
              className="font-semibold text-gray-800 dark:text-slate-100 relative z-10"
            />
            {/* Subtle hover shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-200/30 dark:via-blue-500/20 to-transparent skew-x-12"></div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center space-x-4 flex-shrink-0">
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
            { icon: Mail, href: 'mailto:anthonyverruijt@hotmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-3 hover:shadow-xl group"
              aria-label={label}
            >
              <Icon size={22} className="text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-shrink-0">
          <a
            href="tel:0640470662"
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-900 to-black dark:bg-slate-700 rounded-xl font-bold text-white text-sm sm:text-base hover:scale-110 hover:-translate-y-1 hover:rotate-1 transition-all duration-300 hover:shadow-2xl border border-gray-700 dark:border-slate-600 hover:border-gray-600 dark:hover:border-slate-500 overflow-hidden"
          >
            <span className="flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 bg-gray-300 dark:bg-slate-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
              Neem Contact Op
              <div className="w-2 h-2 bg-gray-300 dark:bg-slate-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
            </span>
            {/* Hover shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
          </a>
          
          <a
            href="mailto:anthonyverruijt@hotmail.com"
            className="group relative px-8 py-4 bg-white dark:bg-gray-900 rounded-xl font-bold text-gray-900 dark:text-white text-sm sm:text-base border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:-rotate-1 hover:border-gray-400 dark:hover:border-slate-500 hover:shadow-2xl overflow-hidden"
          >
            <span className="flex items-center gap-2 relative z-10">
              <div className="w-2 h-2 bg-gray-600 dark:bg-slate-400 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
              Plan een Gesprek
              <div className="w-2 h-2 bg-gray-600 dark:bg-slate-400 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
            </span>
            {/* Hover shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent skew-x-12"></div>
          </a>
        </div>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'about'} 
        onClose={() => setActiveModal(null)}
      >
        <AboutModal />
      </Modal>

      <Modal 
        isOpen={activeModal === 'projects'} 
        onClose={() => setActiveModal(null)}
        title="Projecten"
      >
        <ProjectsModal />
      </Modal>
      
    </main>
    
    </>
  )
}