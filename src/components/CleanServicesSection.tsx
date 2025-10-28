'use client'

import { Globe, Smartphone, Code, Zap } from 'lucide-react'

export function CleanServicesSection() {
  const services = [
    {
      icon: Globe,
      title: 'Websites',
      description: 'Responsive, snelle websites die bezoekers overtuigen en converteren naar klanten.',
      features: ['Mobile-first design', 'SEO geoptimaliseerd', 'CMS integratie'],
      price: 'Vanaf €350',
      timeline: '3-7 dagen'
    },
    {
      icon: Smartphone,
      title: 'iOS Apps',
      description: 'Native iPhone en iPad apps die gebruikers echt willen gebruiken.',
      features: ['Swift & SwiftUI', 'App Store ready', 'Universal app'],
      price: 'Vanaf €750',
      timeline: '4-8 weken'
    },
    {
      icon: Code,
      title: 'Web Apps',
      description: 'Krachtige webapplicaties voor je specifieke bedrijfsprocessen.',
      features: ['Custom functionaliteit', 'Database design', 'API integratie'],
      price: 'Vanaf €1.200',
      timeline: '3-6 weken'
    },
    {
      icon: Zap,
      title: 'Automatisering',
      description: 'Python scripts die repetitieve taken automatiseren en tijd besparen.',
      features: ['Data processing', 'Workflow automation', 'Report generatie'],
      price: 'Vanaf €200',
      timeline: '1-3 weken'
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-stone-900">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Clean header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            Wat ik voor je kan maken
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Van eenvoudige website tot complexe applicatie. Ik help je van idee naar werkende oplossing.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.title}
                className="group bg-stone-50 dark:bg-stone-800 rounded-2xl p-8 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-stone-200 dark:bg-stone-700 rounded-xl flex items-center justify-center group-hover:bg-stone-300 dark:group-hover:bg-stone-600 transition-colors duration-300">
                    <IconComponent size={24} className="text-stone-700 dark:text-stone-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-sm px-3 py-1 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 rounded-full border border-stone-200 dark:border-stone-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and timeline */}
                <div className="flex justify-between items-center pt-4 border-t border-stone-200 dark:border-stone-700">
                  <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                    {service.price}
                  </span>
                  <span className="text-sm text-stone-500 dark:text-stone-500">
                    {service.timeline}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Simple CTA */}
        <div className="text-center">
          <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-8 border border-stone-200 dark:border-stone-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Wil je weten wat mogelijk is?
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              Ik denk graag mee over je project. Geen verplichtingen, gewoon een gesprek over wat er kan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0640470662"
                className="px-8 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors duration-200"
              >
                Bel direct
              </a>
              <a
                href="mailto:anthonyverruijt@hotmail.com"
                className="px-8 py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-xl font-medium hover:border-stone-400 dark:hover:border-stone-500 hover:bg-stone-100 dark:hover:bg-stone-700 transition-all duration-200"
              >
                Stuur email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}