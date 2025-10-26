'use client'

import { useState, useEffect } from 'react'

interface TerminalLoaderProps {
  onComplete?: () => void
  className?: string
}

export function TerminalLoader({ onComplete, className = '' }: TerminalLoaderProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const lines = [
    { text: 'anthony@portfolio:~$ whoami', delay: 100 },
    { text: 'Anthony Verruijt - Full Stack Developer', delay: 50 },
    { text: 'anthony@portfolio:~$ ls -la skills/', delay: 150 },
    { text: 'drwxr-xr-x  2 anthony anthony  4096 Jan 26 2025 .', delay: 30 },
    { text: 'drwxr-xr-x  2 anthony anthony  4096 Jan 26 2025 ..', delay: 30 },
    { text: '-rw-r--r--  1 anthony anthony  8192 Jan 26 2025 swift.skill', delay: 30 },
    { text: '-rw-r--r--  1 anthony anthony  7264 Jan 26 2025 typescript.skill', delay: 30 },
    { text: '-rw-r--r--  1 anthony anthony  6144 Jan 26 2025 python.skill', delay: 30 },
    { text: '-rw-r--r--  1 anthony anthony  5120 Jan 26 2025 react.skill', delay: 30 },
    { text: 'anthony@portfolio:~$ cat status.txt', delay: 100 },
    { text: '✓ SYSTEM ONLINE', delay: 80 },
    { text: '✓ SKILLS LOADED', delay: 80 },
    { text: '✓ PORTFOLIO READY', delay: 80 },
    { text: 'anthony@portfolio:~$ execute portfolio.sh', delay: 120 },
    { text: 'Loading portfolio interface...', delay: 60 },
    { text: 'Initializing user experience...', delay: 60 },
    { text: 'Portfolio loaded successfully! Welcome! 🚀', delay: 100 },
    { text: 'anthony@portfolio:~$ _', delay: 0 }
  ]

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing animation
  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsComplete(true)
      setTimeout(() => onComplete?.(), 1000)
      return
    }

    const line = lines[currentLine]
    
    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(prev => prev + 1)
      }, line.delay)
      return () => clearTimeout(timeout)
    } else {
      // Move to next line after a pause
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setCurrentChar(0)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar])

  const getLineColor = (lineIndex: number, text: string) => {
    if (text.startsWith('anthony@portfolio:~$')) return 'text-green-400'
    if (text.startsWith('✓')) return 'text-cyan-400'
    if (text.includes('ONLINE') || text.includes('LOADED') || text.includes('READY')) return 'text-green-300'
    if (text.includes('Loading') || text.includes('Initializing')) return 'text-yellow-300'
    if (text.includes('successfully') || text.includes('Welcome')) return 'text-blue-300'
    if (text.startsWith('drwx') || text.startsWith('-rw-')) return 'text-gray-400'
    return 'text-gray-300'
  }

  if (isComplete) return null

  return (
    <div className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}>
      <div className="w-full max-w-4xl mx-auto p-8">
        <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
          {/* Terminal header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-gray-400 text-sm font-mono">anthony@portfolio ~ terminal</span>
          </div>
          
          {/* Terminal content */}
          <div className="p-6 font-mono text-sm bg-black min-h-[400px]">
            {lines.slice(0, currentLine + 1).map((line, index) => (
              <div key={index} className={`mb-1 ${getLineColor(index, line.text)}`}>
                {index === currentLine ? (
                  <span>
                    {line.text.slice(0, currentChar)}
                    {currentChar < line.text.length && showCursor && (
                      <span className="bg-white text-black animate-pulse">▎</span>
                    )}
                  </span>
                ) : (
                  line.text
                )}
              </div>
            ))}
            
            {/* Blinking cursor at end */}
            {currentLine >= lines.length - 1 && showCursor && (
              <span className="bg-green-400 text-black animate-pulse">▋</span>
            )}
          </div>
        </div>
        
        {/* Loading bar */}
        <div className="mt-6">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 h-full transition-all duration-300 ease-out"
              style={{ 
                width: `${Math.min(100, (currentLine / lines.length) * 100)}%`
              }}
            />
          </div>
          <div className="text-center mt-2 text-gray-400 text-sm font-mono">
            Loading {Math.round((currentLine / lines.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  )
}