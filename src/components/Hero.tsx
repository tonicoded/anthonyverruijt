'use client'

import { ArrowDown, Github, Linkedin, Mail, Instagram } from 'lucide-react'

export function Hero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('over-mij')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image Placeholder */}
        <div className="mb-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center shadow-lg">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-stone-400 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold text-stone-600">AV</span>
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-6 text-balance">
          Anthony Verruijt
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 mb-12 max-w-3xl mx-auto text-balance">
          Ik maak ideeën werkelijkheid op schermen, <span className="font-semibold text-stone-800">groot</span> en <span className="font-semibold text-stone-800">klein</span>.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-all duration-200"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-all duration-200"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="mailto:anthony@example.com"
            className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-all duration-200"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#contact"
            className="bg-stone-900 text-stone-50 px-8 py-3 rounded-full font-medium hover:bg-stone-800 transition-colors duration-200 min-w-[180px]"
          >
            Neem Contact Op
          </a>
          <a
            href="#projecten"
            className="border border-stone-300 text-stone-700 px-8 py-3 rounded-full font-medium hover:border-stone-400 hover:bg-stone-100 transition-all duration-200 min-w-[180px]"
          >
            Bekijk Mijn Werk
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-stone-500 hover:text-stone-700 transition-colors duration-200"
          aria-label="Scroll naar beneden"
        >
          <ArrowDown size={24} className="animate-bounce" />
        </button>
      </div>

      {/* Location Indicator */}
      <div className="absolute top-8 right-8 hidden lg:flex items-center text-stone-500 text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <span>Beschikbaar</span>
        <span className="ml-4">📍 Nederland</span>
      </div>
    </section>
  )
}