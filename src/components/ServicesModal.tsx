'use client'

import { Globe, Smartphone, Zap, Bot, Code, Palette } from 'lucide-react'

export function ServicesModal() {
  const services = [
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Van simpele landingspaginas tot complexe web-applicaties. Responsive, snel en SEO-geoptimaliseerd.',
      features: ['Responsive Design', 'SEO Optimized', 'CMS Integration', 'E-commerce'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native iOS en Android apps, of cross-platform oplossingen met React Native.',
      features: ['iOS & Android', 'Cross-platform', 'App Store Ready', 'Push Notifications'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Automatisering',
      description: 'Automatiseer repetitieve taken en verbeter efficiency met custom scripts en tools.',
      features: ['Process Automation', 'API Integration', 'Data Processing', 'Workflow Optimization'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Bot,
      title: 'AI Integration',
      description: 'Integreer AI en machine learning in je bestaande systemen voor slimmere oplossingen.',
      features: ['ChatGPT Integration', 'Custom AI Models', 'Data Analysis', 'Smart Automation'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Code,
      title: 'Custom Software',
      description: 'Op maat gemaakte software oplossingen voor specifieke bedrijfsbehoeften.',
      features: ['Desktop Applications', 'Web Tools', 'API Development', 'Database Design'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Moderne, gebruiksvriendelijke designs die je merk perfect representeren.',
      features: ['Modern Design', 'User Experience', 'Brand Identity', 'Prototyping'],
      color: 'from-pink-500 to-red-500'
    }
  ]

  return (
    <div className="text-white">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Mijn Services</h3>
        <p className="text-lg text-gray-300">
          Van idee tot realiteit - ik help je digitale dromen waar te maken
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="group p-6 glass-effect rounded-xl hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <service.icon size={24} className="text-white" />
            </div>
            
            <h4 className="text-xl font-bold mb-3">{service.title}</h4>
            <p className="text-gray-300 mb-4 leading-relaxed">{service.description}</p>
            
            <div className="space-y-2">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                  <span className="text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="glass-effect rounded-xl p-6">
          <h4 className="text-xl font-bold mb-4">Ready to get started?</h4>
          <p className="text-gray-300 mb-6">
            Laten we samen kijken hoe ik jouw project tot leven kan brengen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0640470662"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-200"
            >
              Bel: 06 40 47 06 62
            </a>
            <a
              href="mailto:anthonyverruijt@hotmail.com"
              className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-medium hover:bg-cyan-400/10 transition-colors duration-200"
            >
              Email me
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}