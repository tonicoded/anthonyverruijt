'use client'

import { useState, useEffect } from 'react'

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.pageYOffset
      const progress = (currentScroll / totalHeight) * 100
      
      setScrollProgress(Math.min(Math.max(progress, 0), 100))
      setIsVisible(currentScroll > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200/50 dark:bg-stone-700/50 z-50">
        <div 
          className="h-full bg-gradient-to-r from-stone-600 to-stone-800 dark:from-stone-400 dark:to-stone-200 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Circular progress indicator */}
      <div className="fixed bottom-20 right-20 z-40 hidden lg:block">
        <div className="relative w-12 h-12">
          {/* Background circle */}
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-stone-200 dark:text-stone-700"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-stone-600 dark:text-stone-400"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  )
}