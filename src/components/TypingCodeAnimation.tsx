'use client'

import { useState, useEffect, useRef } from 'react'

export function TypingCodeAnimation() {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()

  const codeSnippets = [
    {
      language: 'Swift',
      code: `import SwiftUI

struct ContentView: View {
    @State private var isAnimating = false
    
    var body: some View {
        VStack {
            Text("Hello, World!")
                .font(.largeTitle)
                .scaleEffect(isAnimating ? 1.2 : 1.0)
                .animation(.spring(), value: isAnimating)
        }
        .onAppear {
            isAnimating = true
        }
    }
}`
    },
    {
      language: 'TypeScript',
      code: `interface User {
    id: string;
    name: string;
    email: string;
}

const fetchUserData = async (id: string): Promise<User> => {
    const response = await fetch(\`/api/users/\${id}\`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    
    return response.json();
};

export default fetchUserData;`
    },
    {
      language: 'Python',
      code: `import asyncio
from typing import List, Dict

class DataProcessor:
    def __init__(self, config: Dict[str, any]):
        self.config = config
        self.results = []
    
    async def process_data(self, data: List[Dict]) -> List[Dict]:
        tasks = [self._process_item(item) for item in data]
        results = await asyncio.gather(*tasks)
        return [r for r in results if r is not None]
    
    async def _process_item(self, item: Dict) -> Dict:
        # Process individual item
        await asyncio.sleep(0.1)  # Simulate async work
        return {"id": item["id"], "processed": True}`
    }
  ]

  useEffect(() => {
    const currentSnippet = codeSnippets[currentCodeIndex]
    const lines = currentSnippet.code.split('\n')
    
    if (isTyping) {
      if (currentCharIndex < currentSnippet.code.length) {
        timeoutRef.current = setTimeout(() => {
          const char = currentSnippet.code[currentCharIndex]
          
          if (char === '\n') {
            // Start new line
            setVisibleLines(prev => [...prev, ''])
          } else {
            // Add character to current line
            setVisibleLines(prev => {
              const newLines = [...prev]
              if (newLines.length === 0) newLines.push('')
              newLines[newLines.length - 1] += char
              return newLines
            })
          }
          
          setCurrentCharIndex(prev => prev + 1)
        }, Math.random() * 50 + 20) // Variable typing speed
      } else {
        // Finished typing current snippet
        setIsTyping(false)
        timeoutRef.current = setTimeout(() => {
          // Move to next snippet
          setCurrentCodeIndex(prev => (prev + 1) % codeSnippets.length)
          setCurrentCharIndex(0)
          setVisibleLines([])
          setIsTyping(true)
        }, 3000) // Pause before next snippet
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentCharIndex, currentCodeIndex, isTyping])

  const currentSnippet = codeSnippets[currentCodeIndex]

  return (
    <div className="fixed bottom-8 left-8 z-20 hidden xl:block">
      <div className="bg-stone-900/80 dark:bg-stone-950/80 backdrop-blur-md rounded-lg border border-stone-700/50 shadow-2xl overflow-hidden max-w-md">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-stone-800/50 border-b border-stone-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-stone-400 text-xs ml-2">
            {currentSnippet.language} • anthony-portfolio
          </div>
        </div>
        
        {/* Code content */}
        <div className="p-4 font-mono text-sm max-h-64 overflow-hidden">
          {visibleLines.map((line, index) => (
            <div key={index} className="leading-5">
              <span className="text-stone-500 select-none mr-3 inline-block w-6 text-right">
                {index + 1}
              </span>
              <span className="text-stone-300">
                {highlightSyntax(line, currentSnippet.language)}
              </span>
              {/* Cursor */}
              {index === visibleLines.length - 1 && isTyping && (
                <span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse"></span>
              )}
            </div>
          ))}
          
          {/* Loading indicator when paused */}
          {!isTyping && (
            <div className="mt-4 flex items-center gap-2 text-stone-500 text-xs">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Loading next snippet...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function highlightSyntax(line: string, language: string): React.ReactNode {
  if (!line) return <span>&nbsp;</span>

  // Simple syntax highlighting
  const keywords = {
    Swift: ['import', 'struct', 'var', 'let', 'func', 'private', 'public', 'View', 'State', 'VStack', 'Text', 'onAppear'],
    TypeScript: ['interface', 'const', 'async', 'await', 'fetch', 'Promise', 'if', 'throw', 'new', 'Error', 'return', 'export', 'default'],
    Python: ['import', 'from', 'class', 'def', 'async', 'await', 'for', 'in', 'if', 'return', 'self']
  }

  const languageKeywords = keywords[language as keyof typeof keywords] || []
  
  // Simple regex-based highlighting
  let highlightedLine = line
  
  // Highlight keywords
  languageKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    highlightedLine = highlightedLine.replace(regex, `<span class="text-purple-400 font-semibold">${keyword}</span>`)
  })
  
  // Highlight strings
  highlightedLine = highlightedLine.replace(
    /(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
    '<span class="text-green-400">$1$2$3</span>'
  )
  
  // Highlight comments
  highlightedLine = highlightedLine.replace(
    /(\/\/.*$|#.*$)/g,
    '<span class="text-stone-500 italic">$1</span>'
  )
  
  // Highlight numbers
  highlightedLine = highlightedLine.replace(
    /\b\d+\.?\d*\b/g,
    '<span class="text-orange-400">$&</span>'
  )

  return <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
}