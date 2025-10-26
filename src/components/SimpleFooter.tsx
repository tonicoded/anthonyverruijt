'use client'

import { useState, useEffect } from 'react'

export function SimpleFooter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-20 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border-t border-stone-200/50 dark:border-stone-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center">
            <div className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300">
              © 2025 Anthony Verruijt. Alle rechten voorbehouden.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}