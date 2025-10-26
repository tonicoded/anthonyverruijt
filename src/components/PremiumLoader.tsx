'use client'

import { useEffect, useState } from 'react'

export function PremiumLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('')

  const loadingTexts = [
    'Initialiseren quantum matrix...',
    'Laden holographic interface...',
    'Activeren neural networks...',
    'Synchroniseren data streams...',
    'Optimaliseren user experience...',
    'Anthony Verruijt Portfolio gereed!'
  ]

  useEffect(() => {
    let textIndex = 0
    let progressValue = 0

    const textInterval = setInterval(() => {
      if (textIndex < loadingTexts.length) {
        setCurrentText(loadingTexts[textIndex])
        textIndex++
      }
    }, 800)

    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15 + 5
      if (progressValue >= 100) {
        progressValue = 100
        setProgress(100)
        
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
        
        clearInterval(progressInterval)
        clearInterval(textInterval)
      } else {
        setProgress(progressValue)
      }
    }, 400)

    // Auto-complete after max 6 seconds
    const maxTimeout = setTimeout(() => {
      setProgress(100)
      setCurrentText('Anthony Verruijt Portfolio gereed!')
      setTimeout(() => setIsLoading(false), 1000)
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }, 6000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
      clearTimeout(maxTimeout)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900 flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900"></div>
        
        {/* Quantum particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-400 dark:bg-purple-400 rounded-full animate-floating-particle opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        {/* Neural network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-300 dark:text-purple-400 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Holographic logo effect */}
        <div className="mb-8 relative">
          <div className="holographic-border rounded-full p-1 mx-auto w-24 h-24">
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center premium-glow">
              <div className="text-3xl font-black bg-gradient-to-r from-gray-700 to-gray-900 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-pulse">
                AV
              </div>
            </div>
          </div>
          
          {/* Rotating rings */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="w-full h-full border-2 border-transparent bg-gradient-to-r from-gray-300 via-transparent to-gray-300 dark:from-purple-400 dark:via-transparent dark:to-purple-400 rounded-full p-[2px]">
              <div className="w-full h-full rounded-full bg-transparent"></div>
            </div>
          </div>
        </div>

        {/* Progress text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 animate-pulse">
            Loading Premium Experience
          </h2>
          <p className="text-sm text-gray-600 dark:text-purple-300 h-6 animate-fade-in">
            {currentText}
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative mb-4">
          <div className="holographic-border rounded-full p-1">
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden premium-glow">
              <div 
                className="h-full bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 dark:from-purple-500 dark:via-pink-500 dark:to-blue-500 rounded-full transition-all duration-500 ease-out animate-energy-flow"
                style={{ width: `${progress}%` }}
              />
              
              {/* Progress shine effect */}
              <div 
                className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"
                style={{ 
                  left: `${progress - 10}%`,
                  opacity: progress > 5 ? 1 : 0
                }}
              />
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <span className="text-xs font-mono text-gray-500 dark:text-purple-400 animate-pulse">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-400 dark:bg-purple-400 rounded-full animate-pulse premium-glow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}