'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // You can integrate with email service like EmailJS, Netlify Forms, etc.
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'anthony@example.com',
      href: 'mailto:anthony@example.com'
    },
    {
      icon: Phone,
      label: 'Telefoon',
      value: '+31 6 12345678',
      href: 'tel:+31612345678'
    },
    {
      icon: MapPin,
      label: 'Locatie',
      value: 'Nederland',
      href: '#'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:text-gray-900'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com',
      color: 'hover:text-pink-600'
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
            Laten We Samenwerken
          </h2>
          <div className="w-24 h-1 bg-stone-900 mx-auto mb-6"></div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Heb je een project in gedachten? Of wil je gewoon even kletsen over tech? 
            Ik hoor graag van je! Stuur me een bericht en ik neem zo snel mogelijk contact op.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-stone-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-stone-900 mb-6">Stuur een Bericht</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                    placeholder="Je naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                    placeholder="je@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                  Onderwerp *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                  placeholder="Waarover wil je praten?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Vertel me over je project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-stone-50 px-6 py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Verstuur Bericht</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-6">Contact Informatie</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-stone-50 transition-colors duration-200 group"
                  >
                    <div className="p-3 bg-stone-100 rounded-full group-hover:bg-stone-200 transition-colors duration-200">
                      <info.icon size={20} className="text-stone-700" />
                    </div>
                    <div>
                      <div className="text-sm text-stone-500">{info.label}</div>
                      <div className="text-stone-900 font-medium">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-bold text-stone-900 mb-4">Volg Me Online</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-stone-100 rounded-full transition-all duration-200 ${social.color} hover:bg-stone-200`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="text-lg font-bold text-green-900">Beschikbaar voor Projecten</h4>
              </div>
              <p className="text-green-700">
                Ik ben momenteel beschikbaar voor nieuwe projecten en samenwerkingen. 
                Laten we samen iets moois bouwen!
              </p>
            </div>

            {/* Response Time */}
            <div className="text-center text-stone-600">
              <p className="text-sm">
                📧 Gemiddelde reactietijd: <span className="font-medium text-stone-900">binnen 24 uur</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}