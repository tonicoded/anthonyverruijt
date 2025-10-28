'use client'

import { useState, useEffect, useRef } from 'react'

interface HoverGlowProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function HoverGlow({ 
  children, 
  className = "", 
  glowColor = "stone", 
  intensity = 0.1 
}: HoverGlowProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return
    
    const rect = elementRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }

  const getGlowStyle = () => {
    if (!isHovered) return {}
    
    const colorMap = {
      stone: '120, 113, 108',
      blue: '59, 130, 246',
      purple: '147, 51, 234',
      green: '34, 197, 94',
      orange: '249, 115, 22'
    }
    
    const rgb = colorMap[glowColor as keyof typeof colorMap] || colorMap.stone
    
    return {
      background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${rgb}, ${intensity}) 0%, transparent 50%)`,
      opacity: isHovered ? 1 : 0,
      transition: 'opacity 0.3s ease'
    }
  }

  return (
    <div 
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={getGlowStyle()}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}