'use client'

import { useState, useEffect, useMemo } from 'react'

export function CleanCodeDemo() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const codeSnippets = useMemo(() => [
    "// Ik bouw jouw website precies zoals jij het wilt",
    "",
    "const project = {",
    "  client: 'jouw-bedrijf',",
    "  requirements: 'gathered',",
    "  timeline: 'realistic'",
    "}",
    "",
    "// Clean, performant code",
    "function buildWebsite() {",
    "  const foundation = createReactApp()",
    "  foundation.addStyling('tailwindcss')",
    "  foundation.optimize('seo', 'performance')",
    "  return foundation.deploy()",
    "}",
    "",
    "// Resultaat: tevreden klant",
    "buildWebsite() // ✓ Live binnen 2-4 weken"
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
      }, Math.random() * 40 + 20)

      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex, codeSnippets])

  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        setDisplayedCode([])
        setIsCompleted(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isCompleted])

  const getLineColor = (line: string | undefined) => {
    if (!line) return 'text-stone-400 dark:text-stone-500'
    if (line.startsWith('//')) return 'text-stone-500 dark:text-stone-400'
    if (line.includes('const') || line.includes('function')) return 'text-stone-700 dark:text-stone-300'
    if (line.includes("'") || line.includes('"')) return 'text-stone-600 dark:text-stone-400'
    return 'text-stone-600 dark:text-stone-300'
  }

  return (
    <div className="relative bg-stone-50 dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-700 shadow-sm overflow-hidden max-w-3xl mx-auto">
      {/* Simple header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-200 dark:border-stone-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-stone-300 dark:bg-stone-600 rounded-full"></div>
          <div className="w-3 h-3 bg-stone-300 dark:bg-stone-600 rounded-full"></div>
          <div className="w-3 h-3 bg-stone-300 dark:bg-stone-600 rounded-full"></div>
        </div>
        <span className="text-stone-500 text-sm font-mono">hoe-ik-werk.js</span>
      </div>

      {/* Clean code content */}
      <div className="font-mono text-sm leading-relaxed space-y-1 min-h-[320px]">
        {displayedCode.map((line, index) => (
          <div key={index} className="flex items-start">
            <span className="text-stone-400 dark:text-stone-600 select-none w-6 text-right pr-4 text-xs">
              {line && line.trim() ? String(index + 1).padStart(2, ' ') : ''}
            </span>
            <span className={getLineColor(line)}>
              {line}
              {index === currentLineIndex && (
                <span className="animate-pulse bg-stone-400 dark:bg-stone-500 w-2 h-4 inline-block ml-1" />
              )}
            </span>
          </div>
        ))}
        
        {currentLineIndex < codeSnippets.length && 
         codeSnippets[currentLineIndex] === '' && 
         !displayedCode[currentLineIndex] && (
          <div className="flex items-start">
            <span className="text-stone-400 dark:text-stone-600 select-none w-6 text-right pr-4 text-xs"></span>
            <span className="animate-pulse bg-stone-400 dark:bg-stone-500 w-2 h-4 inline-block" />
          </div>
        )}
      </div>

      {/* Enhanced status with progress */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-200 dark:border-stone-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            {!isCompleted ? (
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-stone-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-stone-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-stone-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            ) : (
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            )}
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {isCompleted ? '✓ Website live' : 'Aan het bouwen...'}
          </span>
          {!isCompleted && (
            <div className="w-16 h-1 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div className="h-full bg-stone-400 rounded-full animate-pulse" style={{ width: `${(currentLineIndex / codeSnippets.length) * 100}%` }}></div>
            </div>
          )}
        </div>
        <span className="text-xs text-stone-400">Anthony&apos;s approach</span>
      </div>
    </div>
  )
}