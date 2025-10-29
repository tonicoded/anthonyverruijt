'use client'

import { Star } from 'lucide-react'

export function CleanTestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah van der Berg',
      role: 'CEO TechStart',
      content: 'Anthony heeft onze website laten maken en compleet omgetoverd. Professional webdesign, op tijd opgeleverd, en precies wat we nodig hadden voor ons bedrijf.',
      rating: 5,
      project: 'Zakelijke website laten maken'
    },
    {
      name: 'Mark Jansen',
      role: 'Oprichter FitLife',
      content: 'De iOS app die Anthony heeft ontwikkeld overtrof onze verwachtingen. Professionele app development met clean code en geweldige user experience.',
      rating: 5,
      project: 'iOS app development'
    },
    {
      name: 'Lisa Chen',
      role: 'Marketing Director',
      content: 'Snel, professioneel en denkt mee in oplossingen. Precies wat je wilt van een webdeveloper. Onze webshop was binnen een week online.',
      rating: 5,
      project: 'E-commerce webshop'
    }
  ]

  const stats = [
    { number: '50+', label: 'Websites gemaakt' },
    { number: '100%', label: 'Tevreden klanten' },
    { number: '3-7', label: 'Dagen oplevering' },
    { number: '€350', label: 'Vanaf prijs website' }
  ]

  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Website Laten Maken</span> Reviews
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Ervaring van klanten die hun <strong className="text-stone-800 dark:text-stone-200">website lieten maken</strong> en 
            <strong className="text-stone-800 dark:text-stone-200"> apps ontwikkelden</strong> door Anthony Verruijt.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-700"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-stone-400 text-stone-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-stone-200 dark:border-stone-700 pt-4">
                <div className="font-medium text-stone-900 dark:text-stone-100">
                  {testimonial.name}
                </div>
                <div className="text-sm text-stone-600 dark:text-stone-400">
                  {testimonial.role}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {testimonial.project}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}