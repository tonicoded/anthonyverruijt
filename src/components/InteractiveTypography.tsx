'use client'

import { useState, useEffect, useRef } from 'react'

interface InteractiveTypographyProps {
  text: string
  className?: string
  delay?: number
}

export function InteractiveTypography({ 
  text, 
  className = "", 
  delay = 50 
}: InteractiveTypographyProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [visibleChars, setVisibleChars] = useState<boolean[]>([])
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const chars = text.split('')
    setVisibleChars(new Array(chars.length).fill(false))

    chars.forEach((_, index) => {
      setTimeout(() => {
        setVisibleChars(prev => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, index * delay)
    })
  }, [isInView, text, delay])

  const handleCharHover = (index: number) => {
    setHoveredIndex(index)
  }

  const handleCharLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {text.split('').map((char, index) => {
        const isVisible = visibleChars[index]
        const isHovered = hoveredIndex === index
        const isNearHovered = hoveredIndex !== null && Math.abs(hoveredIndex - index) <= 1
        
        return (
          <span
            key={index}
            className={`inline-block transition-all duration-300 cursor-default ${
              char === ' ' ? 'w-2' : ''
            }`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `
                translateY(${isVisible ? '0px' : '20px'}) 
                scale(${isHovered ? '1.2' : isNearHovered ? '1.05' : '1'})
                rotate(${isHovered ? (Math.random() - 0.5) * 10 : '0'}deg)
              `,
              color: isHovered 
                ? 'rgb(120 113 108)' 
                : isNearHovered 
                ? 'rgb(168 162 158)' 
                : 'inherit',
              textShadow: isHovered 
                ? '0 0 10px rgba(120, 113, 108, 0.5)' 
                : 'none',
              transitionDelay: `${index * 20}ms`
            }}
            onMouseEnter={() => handleCharHover(index)}
            onMouseLeave={handleCharLeave}
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}