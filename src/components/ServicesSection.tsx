'use client'

import { useState } from 'react'
import { 
  Globe, 
  Smartphone, 
  Code, 
  Zap, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Target,
  Shield,
  Sparkles
} from 'lucide-react'

export function ServicesSection() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: Globe,
      title: 'Website Ontwikkeling',
      subtitle: 'Van landingspagina tot complex platform',
      description: 'Moderne, responsive websites die je doelgroep bekoren en converteren naar klanten.',
      features: [
        'Responsive design voor alle apparaten',
        'SEO geoptimaliseerd voor Google',
        'Lightning-fast loading speeds',
        'Conversion optimization',
        'Content Management System',
        'Analytics en tracking setup'
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      pricing: 'Vanaf €2.500',
      deliveryTime: '2-4 weken',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
    },
    {
      icon: Smartphone,
      title: 'iOS App Development',
      subtitle: 'Native apps voor iPhone, iPad & Apple Watch',
      description: 'Van concept tot App Store. Ik bouw native iOS apps die gebruikers liefhebben.',
      features: [
        'Native Swift & SwiftUI development',
        'App Store optimalisatie en publicatie',
        'Universal app (iPhone, iPad, Mac)',
        'Push notifications & widgets',
        'Core Data & CloudKit integratie',
        'App Store submission hulp'
      ],
      technologies: ['Swift', 'SwiftUI', 'Core Data', 'CloudKit', 'Xcode'],
      pricing: 'Vanaf €5.000',
      deliveryTime: '6-12 weken',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
    },
    {
      icon: Code,
      title: 'Web Applicaties',
      subtitle: 'Krachtige tools voor je business',
      description: 'Custom webapplicaties die je processen stroomlijnen en je team productiever maken.',
      features: [
        'Database design en architectuur',
        'User authentication & roles',
        'Real-time data synchronisatie',
        'API development & integratie',
        'Dashboard & analytics',
        'Automated workflows'
      ],
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'tRPC', 'Vercel'],
      pricing: 'Vanaf €7.500',
      deliveryTime: '8-16 weken',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
    },
    {
      icon: Zap,
      title: 'Automatisering',
      subtitle: 'Python scripts & workflow optimalisatie',
      description: 'Repetitieve taken automatiseren zodat je team zich kan focussen op wat echt belangrijk is.',
      features: [
        'Data processing & analysis',
        'Web scraping & API integratie',
        'Email & report automatisering',
        'File processing workflows',
        'Database synchronisatie',
        'Custom business logic'
      ],
      technologies: ['Python', 'FastAPI', 'Pandas', 'SQLAlchemy', 'Celery'],
      pricing: 'Vanaf €1.500',
      deliveryTime: '1-3 weken',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
    },
    {
      icon: Users,
      title: 'Consultancy',
      subtitle: 'Strategisch advies voor digitale groei',
      description: 'Samen bepalen we de beste aanpak voor jouw digitale uitdagingen en groeimogelijkheden.',
      features: [
        'Tech stack advies & keuzes',
        'Architectuur planning',
        'Performance optimalisatie',
        'Security best practices',
        'Team mentoring & code reviews',
        'Roadmap & prioriteiten'
      ],
      technologies: ['Strategy', 'Analysis', 'Planning', 'Best Practices'],
      pricing: 'Vanaf €150/uur',
      deliveryTime: 'Flexibel',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
    },
    {
      icon: TrendingUp,
      title: 'Optimalisatie',
      subtitle: 'Performance & conversie verbetering',
      description: 'Bestaande systemen sneller, stabieler en winstgevender maken.',
      features: [
        'Performance audits & monitoring',
        'Database query optimalisatie',
        'Frontend loading speed',
        'Conversion rate optimization',
        'A/B testing setup',
        'Analytics & insights'
      ],
      technologies: ['Lighthouse', 'GTMetrix', 'Google Analytics', 'Hotjar'],
      pricing: 'Vanaf €2.000',
      deliveryTime: '2-6 weken',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
    }
  ]

  const currentService = services[activeService]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentService.bgColor} transition-all duration-1000`}></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-gradient-to-r ${currentService.color} rounded-full opacity-10 animate-float-slow`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.6}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`w-3 h-3 bg-gradient-to-r ${currentService.color} rounded-full animate-pulse`}></div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-gray-200 dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
              Mijn Services
            </h2>
            <div className={`w-3 h-3 bg-gradient-to-r ${currentService.color} rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Van idee tot werkende oplossing. Elke service is gericht op resultaat en waarde voor jouw business.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Service Navigation */}
          <div className="lg:col-span-4">
            <div className="space-y-3">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <button
                    key={service.title}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-500 group ${
                      index === activeService
                        ? 'bg-white dark:bg-gray-800 shadow-xl border-2 border-transparent bg-gradient-to-r border-gradient'
                        : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                    }`}
                    style={{
                      borderImage: index === activeService ? `linear-gradient(135deg, ${currentService.color.split(' ')[1]}, ${currentService.color.split(' ')[3]}) 1` : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 ${
                        index === activeService ? 'scale-110' : 'group-hover:scale-105'
                      } transition-transform duration-300`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-bold mb-1 ${
                          index === activeService 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400' 
                            : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {service.subtitle}
                        </p>
                      </div>
                      {index === activeService && (
                        <ArrowRight size={20} className="text-gray-400 animate-pulse" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Service Details */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              
              {/* Gradient overlay */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${currentService.color} opacity-10 rounded-full blur-3xl -translate-y-12 translate-x-12`}></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentService.color} flex items-center justify-center`}>
                    <currentService.icon size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100 mb-2">
                      {currentService.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                      {currentService.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Clock size={16} className="text-green-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {currentService.deliveryTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Target size={16} className="text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {currentService.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <CheckCircle size={20} className="text-green-500" />
                    Wat je krijgt
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentService.features.map((feature, index) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${currentService.color} rounded-full`}></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-500" />
                    Technologieën
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {currentService.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className={`px-4 py-2 bg-gradient-to-r ${currentService.color} text-white rounded-full text-sm font-bold hover:scale-105 transition-transform duration-200 cursor-default`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:0640470662"
                    className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r ${currentService.color} text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}
                  >
                    <Shield size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                    Start dit project
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <a
                    href="mailto:anthonyverruijt@hotmail.com"
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:border-gray-400 hover:bg-gray-50 dark:hover:border-gray-500 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    Meer informatie
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}