'use client'

import { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, Instagram, MapPin, FolderOpen, ArrowDown, ChevronUp } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TechStack } from '@/components/TechStack'
import { Modal } from '@/components/Modal'
import { ProjectsModal } from '@/components/ProjectsModal'
import { AboutModal } from '@/components/AboutModal'
import { PhotoTooltip } from '@/components/PhotoTooltip'
import { TypewriterEffect } from '@/components/TypewriterEffect'
import { ParticleSystem } from '@/components/ParticleSystem'
import { CleanCodeDemo } from '@/components/LiveCodeDemo'
import { CleanServicesSection } from '@/components/CleanServicesSection'
import { CleanTestimonialsSection } from '@/components/CleanTestimonialsSection'
import { CleanContactSection } from '@/components/CleanContactSection'
import { CursorTrail } from '@/components/CursorTrail'
import { InteractiveGrid } from '@/components/InteractiveGrid'
import { HoverGlow } from '@/components/HoverGlow'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SkillRadar } from '@/components/SkillRadar'
import { InteractiveTypography } from '@/components/InteractiveTypography'
import { ParallaxText } from '@/components/ParallaxText'
import { Cool3DBackground } from '@/components/Cool3DBackground'

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
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

    // Handle scroll for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToNext = () => {
    const nextSection = document.getElementById('code-demo-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Interactive Background Elements */}
      <ParticleSystem />
      <CursorTrail />
      <ScrollProgress />
      
      {/* Hero Section */}
      <section className="h-screen bg-stone-50 dark:bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      
        {/* Interactive Grid Background */}
        <InteractiveGrid />
        
        {/* Cool 3D animated background */}
        <Cool3DBackground />
        
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-stone-50/50 dark:bg-slate-900/70 pointer-events-none"></div>
        
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

          {/* Name - simplified hover effect */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black relative group cursor-pointer text-black dark:text-white transition-all duration-300 hover:scale-[1.02]">
              Anthony Verruijt
              {/* Subtle underline effect */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-stone-600 to-stone-800 dark:from-stone-400 dark:to-stone-200 group-hover:w-full transition-all duration-500 ease-out"></div>
            </h1>
          </div>

          {/* SEO-optimized Tagline */}
          <div className="relative flex-shrink-0 max-w-xl mx-auto">
            <div className="relative text-sm sm:text-lg text-gray-700 dark:text-slate-200 leading-relaxed h-12 sm:h-16 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-slate-600 px-6 py-3 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl group overflow-hidden">
              <TypewriterEffect 
                phrases={[
                  "Website laten maken vanaf €350",
                  "Professionele webdesign Nederland", 
                  "iOS apps & webshops",
                  "Van idee naar online succes"
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
              className="px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-semibold text-sm sm:text-base hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-200 hover:scale-105"
            >
              Neem Contact Op
            </a>
            
            <a
              href="mailto:anthonyverruijt@hotmail.com"
              className="px-8 py-4 bg-transparent border-2 border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100 rounded-xl font-semibold text-sm sm:text-base hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 hover:scale-105"
            >
              Plan een Gesprek
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors duration-200 animate-bounce z-10"
          aria-label="Scroll naar beneden"
        >
          <ArrowDown size={20} className="sm:w-6 sm:h-6" />
        </button>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white dark:bg-slate-900 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              Website Laten Maken door <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Anthony Verruijt</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-200">
                Professionele Websites & Apps in Nederland
              </h3>
              <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
                <p>
                  Ben je op zoek naar een <strong className="text-stone-800 dark:text-stone-200">website laten maken</strong> die echt resultaat oplevert? 
                  Als ervaren <strong className="text-stone-800 dark:text-stone-200">webdesigner</strong> en <strong className="text-stone-800 dark:text-stone-200">app developer</strong> 
                  help ik bedrijven in heel Nederland met professionele digitale oplossingen.
                </p>
                <p>
                  Van een moderne <strong className="text-stone-800 dark:text-stone-200">zakelijke website</strong> tot complete 
                  <strong className="text-stone-800 dark:text-stone-200"> webshops</strong> en <strong className="text-stone-800 dark:text-stone-200">iOS apps</strong> - 
                  ik bouw wat jouw bedrijf nodig heeft. Alle websites zijn <strong className="text-stone-800 dark:text-stone-200">SEO geoptimaliseerd</strong>, 
                  mobile-first en worden snel opgeleverd.
                </p>
              </div>
              
              {/* Service highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { title: "Website Maken", desc: "Vanaf €350", icon: "🌐" },
                  { title: "Webshop", desc: "E-commerce oplossingen", icon: "🛒" },
                  { title: "iOS Apps", desc: "Native app ontwikkeling", icon: "📱" },
                  { title: "SEO Optimalisatie", desc: "Google ranking verbeteren", icon: "📈" }
                ].map((service, i) => (
                  <div key={i} className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{service.icon}</span>
                      <h4 className="font-bold text-stone-800 dark:text-stone-200">{service.title}</h4>
                    </div>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Waarom kiezen voor mij?
                </h3>
                <ul className="space-y-3 text-stone-600 dark:text-stone-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>15+ jaar ervaring</strong> in webdevelopment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Snelle oplevering</strong> binnen 3-7 dagen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Eerlijke prijzen</strong> zonder verborgen kosten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Persoonlijke aanpak</strong> en direct contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span><strong>Ondersteuning</strong> na oplevering</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <a
                  href="tel:0640470662"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>📞</span>
                  Gratis Vrijblijvend Gesprek
                </a>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-3">
                  Bel direct: 06-40 47 06 62
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Demo Section */}
      <section id="code-demo-section" className="py-20 bg-stone-50 dark:bg-stone-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <ParallaxText speed={0.3}>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                <InteractiveTypography text="Hoe ik werk" />
              </h2>
            </ParallaxText>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Een kijkje in mijn ontwikkelproces. Clean code, duidelijke structuur.
            </p>
          </div>
          <CleanCodeDemo />
          
          {/* Add SkillRadar component */}
          <SkillRadar />
        </div>
      </section>

      {/* Services Section */}
      <CleanServicesSection />

      {/* Testimonials Section */}
      <CleanTestimonialsSection />

      {/* Additional SEO Content Section */}
      <section className="py-16 bg-stone-50 dark:bg-stone-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Column 1: Website Development */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-700">
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                <span className="text-blue-600">Website</span> Ontwikkeling
              </h3>
              <ul className="space-y-3 text-stone-600 dark:text-stone-400">
                <li>• <strong>Responsive webdesign</strong> voor alle apparaten</li>
                <li>• <strong>SEO geoptimaliseerde</strong> websites</li>
                <li>• <strong>WordPress</strong> en custom CMS</li>
                <li>• <strong>E-commerce webshops</strong></li>
                <li>• <strong>Landing pages</strong> die converteren</li>
                <li>• <strong>Website onderhoud</strong> en support</li>
              </ul>
            </div>

            {/* Column 2: App Development */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-700">
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                <span className="text-purple-600">App</span> Ontwikkeling
              </h3>
              <ul className="space-y-3 text-stone-600 dark:text-stone-400">
                <li>• <strong>Native iOS apps</strong> in Swift</li>
                <li>• <strong>iPhone en iPad</strong> applicaties</li>
                <li>• <strong>App Store</strong> optimalisatie</li>
                <li>• <strong>Progressive Web Apps</strong> (PWA)</li>
                <li>• <strong>Cross-platform</strong> oplossingen</li>
                <li>• <strong>App design</strong> en UX/UI</li>
              </ul>
            </div>

            {/* Column 3: Local SEO */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-700">
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                <span className="text-green-600">Nederland</span> Service
              </h3>
              <ul className="space-y-3 text-stone-600 dark:text-stone-400">
                <li>• <strong>Webdesign Amsterdam</strong> en omgeving</li>
                <li>• <strong>Website maken</strong> heel Nederland</li>
                <li>• <strong>Lokale SEO</strong> optimalisatie</li>
                <li>• <strong>Nederlandse hosting</strong> en domeinen</li>
                <li>• <strong>Persoonlijke service</strong> en contact</li>
                <li>• <strong>Snelle oplevering</strong> 3-7 dagen</li>
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                Klaar om je <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">website te laten maken</span>?
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-2xl mx-auto">
                Van simpele <strong>bedrijfswebsite</strong> tot complete <strong>webshop</strong> of <strong>iOS app</strong>. 
                Ik help je van concept tot online succes. Vraag een vrijblijvende offerte aan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0640470662"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  📞 Bel Direct - 06 40 47 06 62
                </a>
                <a
                  href="mailto:anthonyverruijt@hotmail.com"
                  className="px-8 py-4 border-2 border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100 rounded-xl font-bold hover:bg-stone-100 dark:hover:bg-stone-700 transition-all duration-300 hover:scale-105"
                >
                  ✉️ Stuur Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <CleanContactSection />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-full flex items-center justify-center hover:scale-110 hover:bg-stone-300 dark:hover:bg-stone-600 transition-all duration-300 shadow-lg hover:shadow-xl border border-stone-300 dark:border-stone-600"
          aria-label="Scroll naar boven"
        >
          <ChevronUp size={20} />
        </button>
      )}

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
    </>
  )
}