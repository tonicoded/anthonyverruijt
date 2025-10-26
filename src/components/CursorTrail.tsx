'use client'

import { useEffect, useState, useRef } from 'react'

interface Particle {
  x: number
  y: number
  life: number
  maxLife: number
  size: number
  velocity: { x: number; y: number }
}

export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const animationRef = useRef<number>()
  const lastMouseTime = useRef<number>(Date.now())

  useEffect(() => {
    let mouseTimer: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const timeDiff = now - lastMouseTime.current
      const velocity = timeDiff > 0 ? Math.sqrt(
        Math.pow(e.clientX - mousePos.x, 2) + Math.pow(e.clientY - mousePos.y, 2)
      ) / timeDiff : 0

      setMousePos({ x: e.clientX, y: e.clientY })
      setIsMoving(true)
      lastMouseTime.current = now

      // Only create particles when moving fast enough
      if (velocity > 0.5) {
        setParticles(prev => [
          ...prev,
          {
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            life: 60,
            maxLife: 60,
            size: Math.random() * 3 + 1,
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2
            }
          }
        ].slice(-50)) // Keep only last 50 particles
      }

      clearTimeout(mouseTimer)
      mouseTimer = setTimeout(() => setIsMoving(false), 100)
    }

    const animate = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            life: particle.life - 1,
            velocity: {
              x: particle.velocity.x * 0.98,
              y: particle.velocity.y * 0.98
            }
          }))
          .filter(particle => particle.life > 0)
      )
      
      animationRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(mouseTimer)
    }
  }, [mousePos.x, mousePos.y])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor */}
      <div
        className={`fixed w-4 h-4 rounded-full pointer-events-none transition-transform duration-100 ${
          isMoving ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        }}
      />
      
      {/* Particle trail */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="fixed rounded-full pointer-events-none"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            opacity: particle.life / particle.maxLife * 0.6,
            background: `radial-gradient(circle, rgba(0,0,0,${0.4 * particle.life / particle.maxLife}) 0%, transparent 70%)`,
            transform: `scale(${particle.life / particle.maxLife})`
          }}
        />
      ))}
      
      <style jsx>{`
        @media (prefers-color-scheme: dark) {
          .fixed {
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%) !important;
          }
        }
      `}</style>
    </div>
  )
}