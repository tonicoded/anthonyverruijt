'use client'

import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: number
}

export function GlitchText({ text, className = '', intensity = 1 }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  // Glitch characters for corruption effect
  const glitchChars = '!@#$%^&*()_+-={}[]|\\:";\'<>?,.~/`абвгдежзийклмнопрстуфхцчшщъыьэюя'
  
  const glitchText = (originalText: string, level: number = 0.3) => {
    return originalText
      .split('')
      .map(char => {
        if (Math.random() < level * intensity) {
          // Random glitch character
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        } else if (Math.random() < level * 0.5 * intensity) {
          // Random case change
          return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
        }
        return char
      })
      .join('')
  }

  const triggerGlitch = () => {
    if (isGlitching) return
    
    setIsGlitching(true)
    
    // Rapid glitch sequence
    const glitchSequence = [
      { delay: 0, level: 0.8 },
      { delay: 50, level: 0.9 },
      { delay: 80, level: 0.6 },
      { delay: 120, level: 0.8 },
      { delay: 150, level: 0.4 },
      { delay: 200, level: 0.7 },
      { delay: 230, level: 0.3 },
      { delay: 280, level: 0.5 },
      { delay: 320, level: 0.2 },
      { delay: 380, level: 0 }
    ]
    
    glitchSequence.forEach(({ delay, level }) => {
      setTimeout(() => {
        if (level === 0) {
          setGlitchedText(text)
          setIsGlitching(false)
        } else {
          setGlitchedText(glitchText(text, level))
        }
      }, delay)
    })
  }

  // Random glitch triggers
  useEffect(() => {
    const randomGlitch = () => {
      if (Math.random() < 0.3) {
        triggerGlitch()
      }
    }

    const interval = setInterval(randomGlitch, 3000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [text])

  // Mouse hover trigger
  const handleMouseEnter = () => {
    if (Math.random() < 0.7) {
      triggerGlitch()
    }
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: 'pointer' }}
    >
      {/* Main text */}
      <span 
        className={`relative z-10 transition-all duration-100 ${
          isGlitching ? 'animate-glitch-shake' : ''
        }`}
        style={{
          textShadow: isGlitching 
            ? `
              2px 0 #ff0000,
              -2px 0 #00ffff,
              0 2px #ffff00,
              0 -2px #ff00ff
            `
            : 'none'
        }}
      >
        {glitchedText}
      </span>
      
      {/* Glitch overlay layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 z-0 text-red-500 animate-glitch-1"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translateX(-2px)'
            }}
          >
            {glitchText(text, 0.6)}
          </span>
          <span 
            className="absolute inset-0 z-0 text-cyan-500 animate-glitch-2"
            style={{ 
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translateX(2px)'
            }}
          >
            {glitchText(text, 0.7)}
          </span>
          <span 
            className="absolute inset-0 z-0 text-yellow-500 animate-glitch-3"
            style={{ 
              clipPath: 'polygon(0 20%, 100% 20%, 100% 80%, 0 80%)',
              transform: 'translateY(-1px)',
              opacity: 0.5
            }}
          >
            {glitchText(text, 0.5)}
          </span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch-shake {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-1px, -1px); }
          20% { transform: translate(1px, 1px); }
          30% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          70% { transform: translate(-1px, 1px); }
          80% { transform: translate(1px, -1px); }
          90% { transform: translate(-1px, -1px); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translateX(-2px); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(-1px); }
          75% { transform: translateX(-3px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translateX(2px); }
          25% { transform: translateX(4px); }
          50% { transform: translateX(1px); }
          75% { transform: translateX(3px); }
        }
        
        @keyframes glitch-3 {
          0%, 100% { transform: translateY(-1px); }
          33% { transform: translateY(-2px); }
          66% { transform: translateY(1px); }
        }
        
        .animate-glitch-shake { animation: glitch-shake 0.3s ease-in-out; }
        .animate-glitch-1 { animation: glitch-1 0.2s ease-in-out infinite; }
        .animate-glitch-2 { animation: glitch-2 0.25s ease-in-out infinite; }
        .animate-glitch-3 { animation: glitch-3 0.15s ease-in-out infinite; }
      `}</style>
    </div>
  )
}