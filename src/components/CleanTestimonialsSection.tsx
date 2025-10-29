'use client'

import { Star } from 'lucide-react'

export function CleanTestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah van der Berg',
      role: 'CEO TechStart',
      content: 'Anthony heeft onze website compleet omgetoverd. Professional, op tijd, en precies wat we nodig hadden.',
      rating: 5,
      project: 'Website redesign'
    },
    {
      name: 'Mark Jansen',
      role: 'Oprichter FitLife',
      content: 'De app die Anthony heeft gebouwd overtrof onze verwachtingen. Clean code en geweldige user experience.',
      rating: 5,
      project: 'iOS app development'
    },
    {
      name: 'Lisa Chen',
      role: 'Marketing Director',
      content: 'Snel, professioneel en denkt mee in oplossingen. Precies wat je wilt van een developer.',
      rating: 5,
      project: 'Web applicatie'
    }
  ]

  const stats = [
    { number: '25+', label: 'Projecten voltooid' },
    { number: '100%', label: 'Tevreden klanten' },
    { number: '2-4', label: 'Weken gemiddeld' },
    { number: '24/7', label: 'Support beschikbaar' }
  ]

  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            Wat klanten zeggen
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Resultaten waar klanten blij van worden.
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