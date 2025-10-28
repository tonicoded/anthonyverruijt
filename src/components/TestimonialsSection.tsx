'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const testimonials = [
    {
      name: 'Sarah van der Berg',
      role: 'CEO, TechStart Amsterdam',
      company: 'TechStart',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      content: 'Anthony heeft onze bedrijfswebsite compleet getransformeerd. Van concept tot live website in minder dan 3 weken. De conversie is met 340% gestegen!',
      rating: 5,
      project: 'Website Redesign',
      result: '+340% conversie'
    },
    {
      name: 'Mark Jansen',
      role: 'Founder, FitLife App',
      company: 'FitLife',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'De iOS app die Anthony heeft gebouwd overtrof al onze verwachtingen. Clean code, prachtig design en nu al 50K+ downloads in de App Store.',
      rating: 5,
      project: 'iOS App Development',
      result: '50K+ downloads'
    },
    {
      name: 'Lisa Chen',
      role: 'Marketing Director, Dutch Startup',
      company: 'Dutch Startup',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'Professioneel, snel en precies wat we nodig hadden. Anthony denkt mee in oplossingen en levert altijd op tijd. Echte aanrader!',
      rating: 5,
      project: 'Web Application',
      result: '98% uptime'
    },
    {
      name: 'David Rodriguez',
      role: 'CTO, InnovateTech',
      company: 'InnovateTech',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Anthony heeft ons geholpen met Python automatisering die ons team 15 uur per week bespaart. ROI was binnen 2 maanden terugverdiend.',
      rating: 5,
      project: 'Process Automation',
      result: '15h/week besparing'
    }
  ]

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const nextTestimonial = () => {
    setIsAutoPlay(false)
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const prevTestimonial = () => {
    setIsAutoPlay(false)
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float-slow"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
              Wat klanten zeggen
            </h2>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Resultaten waar klanten blij van worden. Van startup tot scale-up.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-700">
            
            {/* Quote icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-20">
              <Quote size={24} className="text-white" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Avatar and info */}
              <div className="text-center md:text-left">
                <div className="relative mb-6 inline-block">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-24 h-24 rounded-full mx-auto md:mx-0 border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {current.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {current.role}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs font-medium">
                  {current.company}
                </p>

                {/* Rating */}
                <div className="flex justify-center md:justify-start gap-1 mt-4">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Testimonial content */}
              <div className="md:col-span-2">
                <div className="relative">
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                    &ldquo;{current.content}&rdquo;
                  </p>
                  
                  {/* Project details */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        {current.project}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        {current.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 group"
              >
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100" />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index)
                      setIsAutoPlay(false)
                      setTimeout(() => setIsAutoPlay(true), 10000)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 group"
              >
                <ArrowRight size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
          {[
            { number: '50+', label: 'Tevreden klanten' },
            { number: '100+', label: 'Projecten voltooid' },
            { number: '99%', label: 'Tevredenheid score' },
            { number: '24/7', label: 'Support beschikbaar' }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}