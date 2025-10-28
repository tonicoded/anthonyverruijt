'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

export function CleanContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset after success
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', project: '', message: '' })
    }, 3000)
  }

  return (
    <section className="py-24 bg-white dark:bg-stone-900">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            Laten we praten
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Vertel me over je project. Ik help je graag verder.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              Contact informatie
            </h3>
            
            <div className="space-y-4">
              <a
                href="tel:0640470662"
                className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200 group"
              >
                <Phone size={20} className="text-stone-600 dark:text-stone-400" />
                <div>
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    +31 6 40 47 06 62
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">
                    Bel direct voor urgent advies
                  </div>
                </div>
              </a>

              <a
                href="mailto:anthonyverruijt@hotmail.com"
                className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200 group"
              >
                <Mail size={20} className="text-stone-600 dark:text-stone-400" />
                <div>
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    anthonyverruijt@hotmail.com
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">
                    Binnen 4 uur antwoord
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
                <MapPin size={20} className="text-stone-600 dark:text-stone-400" />
                <div>
                  <div className="font-medium text-stone-900 dark:text-stone-100">
                    Nederland
                  </div>
                  <div className="text-sm text-stone-600 dark:text-stone-400">
                    CET timezone
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  Gratis eerste gesprek
                </span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                30 minuten om je project te bespreken, zonder verplichtingen.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-8 border border-stone-200 dark:border-stone-700">
              
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    Bericht verzonden!
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">
                    Ik neem binnen 4 uur contact met je op.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Naam *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-200"
                        placeholder="Je naam"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-200"
                        placeholder="je@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                      Type project
                    </label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Selecteer type</option>
                      <option value="website">Website</option>
                      <option value="ios-app">iOS App</option>
                      <option value="web-app">Web Applicatie</option>
                      <option value="automatisering">Automatisering</option>
                      <option value="anders">Anders</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                      Vertel over je project *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-stone-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Beschrijf je idee, doelen, of vragen..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-medium transition-all duration-200 ${
                      isSubmitting 
                        ? 'opacity-75 cursor-not-allowed' 
                        : 'hover:bg-stone-800 dark:hover:bg-stone-200'
                    }`}
                  >
                    {isSubmitting ? 'Versturen...' : 'Verstuur bericht'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}