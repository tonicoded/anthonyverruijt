'use client'

import { useEffect, useState, useRef } from 'react'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

export function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create initial bubbles
    const createBubble = (id: number): Bubble => ({
      id,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      size: Math.random() * 40 + 20,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 2
    })

    setBubbles(Array.from({ length: 8 }, (_, i) => createBubble(i)))

    const animate = () => {
      setBubbles(prev => 
        prev.map(bubble => {
          const newY = bubble.y - bubble.speed
          const newRotation = bubble.rotation + bubble.rotationSpeed
          
          // Reset bubble when it goes off screen
          if (newY < -100) {
            return createBubble(bubble.id)
          }
          
          return {
            ...bubble,
            y: newY,
            rotation: newRotation,
            x: bubble.x + Math.sin(newY * 0.01) * 0.5 // Slight wave motion
          }
        })
      )
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleBubbleClick = (bubbleId: number) => {
    setBubbles(prev => prev.filter(b => b.id !== bubbleId))
    
    // Create ripple effect
    const bubble = bubbles.find(b => b.id === bubbleId)
    if (bubble && containerRef.current) {
      const ripple = document.createElement('div')
      ripple.className = 'animate-wave-ripple'
      ripple.style.cssText = `
        position: fixed;
        left: ${bubble.x - 25}px;
        top: ${bubble.y - 25}px;
        width: 50px;
        height: 50px;
        border: 2px solid rgba(0,0,0,0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `
      
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 2000)
    }
    
    // Play success sound if available
    if ((window as any).soundEffects) {
      (window as any).soundEffects.success()
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full cursor-pointer hover-magnetic pointer-events-auto transition-all duration-300 hover:scale-110"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            opacity: bubble.opacity,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(0,0,0,0.1))`,
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(255,255,255,0.1)',
            transform: `rotate(${bubble.rotation}deg)`,
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)'
          }}
          onClick={() => handleBubbleClick(bubble.id)}
        >
          {/* Inner glow */}
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 50%)`
            }}
          />
          
          {/* Floating highlight */}
          <div 
            className="absolute top-2 left-2 w-3 h-3 rounded-full animate-floating-particle"
            style={{
              background: 'rgba(255,255,255,0.6)',
              filter: 'blur(1px)'
            }}
          />
        </div>
      ))}
    </div>
  )
}