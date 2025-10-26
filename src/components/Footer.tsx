import { Heart, ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-stone-50">Anthony Verruijt</h3>
            <p className="text-stone-400 leading-relaxed">
              Developer & Creator die ideeën omzet in digitale realiteit. 
              Altijd op zoek naar de perfecte balans tussen functionaliteit en design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-stone-50">Quick Links</h4>
            <nav className="space-y-2">
              <a 
                href="#over-mij" 
                className="block hover:text-stone-50 transition-colors duration-200"
              >
                Over Mij
              </a>
              <a 
                href="#vaardigheden" 
                className="block hover:text-stone-50 transition-colors duration-200"
              >
                Vaardigheden
              </a>
              <a 
                href="#projecten" 
                className="block hover:text-stone-50 transition-colors duration-200"
              >
                Projecten
              </a>
              <a 
                href="#contact" 
                className="block hover:text-stone-50 transition-colors duration-200"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-stone-50">Contact</h4>
            <div className="space-y-2">
              <a 
                href="mailto:anthony@example.com"
                className="block hover:text-stone-50 transition-colors duration-200"
              >
                anthony@example.com
              </a>
              <a 
                href="tel:+31612345678"
                className="block hover:text-stone-50 transition-colors duration-200"
              >
                +31 6 12345678
              </a>
              <span className="block">📍 Nederland</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-stone-400">
              <span>© {currentYear} Anthony Verruijt. Gemaakt met</span>
              <Heart size={16} className="text-red-500 fill-current" />
              <span>en veel koffie ☕</span>
            </div>

            {/* Tech Stack */}
            <div className="text-stone-400 text-sm">
              <span>Gebouwd met Next.js & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-stone-50 p-3 rounded-full transition-all duration-200 shadow-lg"
        aria-label="Scroll naar boven"
      >
        <ArrowUp size={20} />
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-600 via-stone-500 to-stone-600"></div>
    </footer>
  )
}