'use client'

import { useState, useEffect } from 'react'

export function CodeSnippets() {
  const codeSnippets = [
    'const isAwesome = true;',
    'func buildApp() -> Success',
    'import React from "react"',
    'def create_magic():',
    'let dreams = reality;',
    'npm install happiness',
    'git commit -m "✨ Magic"',
    '<div>Hello World</div>',
    'while(learning) { grow(); }',
    'const anthony = new Developer();',
  ]

  const [visibleSnippets, setVisibleSnippets] = useState<Array<{
    id: number
    text: string
    x: number
    y: number
    opacity: number
  }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      // Add new snippet
      const newSnippet = {
        id: Date.now(),
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0.8
      }

      setVisibleSnippets(prev => {
        const updated = [...prev, newSnippet]
        // Keep only last 8 snippets
        return updated.slice(-8)
      })

      // Remove snippet after animation
      setTimeout(() => {
        setVisibleSnippets(prev => prev.filter(snippet => snippet.id !== newSnippet.id))
      }, 8000)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {visibleSnippets.map((snippet) => (
        <div
          key={snippet.id}
          className="absolute text-xs font-mono text-stone-400/30 dark:text-stone-500/20 animate-code-float"
          style={{
            left: `${snippet.x}%`,
            top: `${snippet.y}%`,
            opacity: snippet.opacity,
            animation: 'codeFloat 8s ease-out forwards'
          }}
        >
          {snippet.text}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes codeFloat {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          20% {
            opacity: 0.6;
            transform: translateY(0px) scale(1);
          }
          80% {
            opacity: 0.3;
            transform: translateY(-20px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.8);
          }
        }
      `}</style>
    </div>
  )
}