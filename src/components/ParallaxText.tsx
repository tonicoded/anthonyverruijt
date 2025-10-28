'use client'

import { useEffect, useRef, useState } from 'react'

interface ParallaxTextProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function ParallaxText({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = "" 
}: ParallaxTextProps) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed

      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`
      case 'down':
        return `translateY(${-offset}px)`
      case 'left':
        return `translateX(${offset}px)`
      case 'right':
        return `translateX(${-offset}px)`
      default:
        return `translateY(${offset}px)`
    }
  }

  return (
    <div 
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: getTransform(),
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  )
}