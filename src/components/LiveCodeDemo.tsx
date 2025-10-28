'use client'

import { useState, useEffect, useMemo } from 'react'

export function LiveCodeDemo() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const codeSnippets = useMemo(() => [
    "// Building your dream website...",
    "const website = new NextJS({",
    "  framework: 'React',",
    "  styling: 'TailwindCSS',",
    "  performance: 'optimized',",
    "  responsive: true,",
    "  seo: 'enhanced'",
    "})",
    "",
    "website.addFeatures([",
    "  'mobile-first design',",
    "  'lightning fast loading',", 
    "  'conversion optimization',",
    "  'premium animations'",
    "])",
    "",
    "// Deploy to production ✨",
    "await website.deploy()",
    "console.log('Your website is live! 🚀')"
  ], [])

  useEffect(() => {
    if (currentLineIndex >= codeSnippets.length) {
      setIsCompleted(true)
      return
    }

    const currentLine = codeSnippets[currentLineIndex]
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => {
          const newCode = [...prev]
          if (!newCode[currentLineIndex]) {
            newCode[currentLineIndex] = ''
          }
          newCode[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          return newCode
        })
        setCurrentCharIndex(prev => prev + 1)
      }, Math.random() * 50 + 30) // Realistic typing speed with variation

      return () => clearTimeout(timer)
    } else {
      // Move to next line
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex, codeSnippets])

  // Reset animation when completed
  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        setDisplayedCode([])
        setIsCompleted(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isCompleted])

  const getLineColor = (line: string | undefined) => {
    if (!line) return 'text-gray-300'
    if (line.startsWith('//')) return 'text-green-400'
    if (line.includes('const') || line.includes('await')) return 'text-purple-400'
    if (line.includes("'") || line.includes('"')) return 'text-yellow-400'
    if (line.includes('console.log')) return 'text-cyan-400'
    return 'text-gray-300'
  }

  return (
    <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-2xl overflow-hidden max-w-2xl mx-auto">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 text-sm ml-4 font-mono">anthony-builds-websites.js</span>
      </div>

      {/* Code content */}
      <div className="font-mono text-sm space-y-1 min-h-[400px]">
        {displayedCode.map((line, index) => (
          <div key={index} className="flex items-start">
            <span className="text-gray-500 select-none w-8 text-right pr-3">
              {String(index + 1).padStart(2, ' ')}
            </span>
            <span className={getLineColor(line)}>
              {line}
              {index === currentLineIndex && (
                <span className="animate-pulse bg-gray-300 w-2 h-5 inline-block ml-1 rounded-sm" />
              )}
            </span>
          </div>
        ))}
        
        {/* Cursor on current line if it's empty */}
        {currentLineIndex < codeSnippets.length && 
         codeSnippets[currentLineIndex] === '' && 
         !displayedCode[currentLineIndex] && (
          <div className="flex items-start">
            <span className="text-gray-500 select-none w-8 text-right pr-3">
              {String(currentLineIndex + 1).padStart(2, ' ')}
            </span>
            <span className="animate-pulse bg-gray-300 w-2 h-5 inline-block rounded-sm" />
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-400' : 'bg-blue-400 animate-pulse'}`}></div>
        <span className="text-xs text-gray-400">
          {isCompleted ? 'Deployed ✨' : 'Building...'}
        </span>
      </div>

      {/* Background code pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-20 gap-1 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div 
              key={i}
              className="bg-blue-500 rounded-full w-1 h-1"
              style={{
                opacity: Math.random() * 0.5,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}