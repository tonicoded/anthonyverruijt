'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  scale: number
  opacity: number
  hue: number
  life: number
  maxLife: number
  type: 'trail' | 'burst' | 'energy'
}

interface MouseState {
  x: number
  y: number
  lastX: number
  lastY: number
  velocity: number
  isMoving: boolean
}

export function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mouseState, setMouseState] = useState<MouseState>({
    x: 0, y: 0, lastX: 0, lastY: 0, velocity: 0, isMoving: false
  })
  const particleId = useRef(0)
  const animationRef = useRef<number>()
  const lastUpdateTime = useRef(Date.now())

  const createParticle = useCallback((x: number, y: number, type: Particle['type'] = 'trail', velocity = 0) => {
    const baseHue = type === 'energy' ? 280 : type === 'burst' ? 320 : 240
    const hueVariation = type === 'energy' ? 40 : type === 'burst' ? 60 : 80
    
    return {
      id: particleId.current++,
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * (velocity * 0.1 + 1),
      vy: (Math.random() - 0.5) * (velocity * 0.1 + 1),
      scale: Math.random() * (type === 'energy' ? 1.5 : type === 'burst' ? 2 : 1) + 0.3,
      opacity: type === 'energy' ? 0.9 : type === 'burst' ? 1 : 0.7,
      hue: baseHue + Math.random() * hueVariation,
      life: 0,
      maxLife: type === 'energy' ? 120 : type === 'burst' ? 80 : 60,
      type
    }
  }, [])

  const updateParticles = useCallback(() => {
    const now = Date.now()
    const deltaTime = now - lastUpdateTime.current
    lastUpdateTime.current = now

    setParticles(prev => {
      return prev.map(particle => {
        const newLife = particle.life + deltaTime * 0.1
        if (newLife >= particle.maxLife) return null

        const lifeRatio = newLife / particle.maxLife
        let newOpacity = particle.opacity * (1 - lifeRatio)
        let newScale = particle.scale
        
        if (particle.type === 'energy') {
          newOpacity = particle.opacity * (1 - lifeRatio * 0.7) * (0.8 + 0.2 * Math.sin(newLife * 0.2))
          newScale = particle.scale * (0.8 + 0.4 * Math.sin(newLife * 0.15))
        } else if (particle.type === 'burst') {
          newOpacity = particle.opacity * (1 - lifeRatio * lifeRatio)
          newScale = particle.scale * (1 + lifeRatio * 0.5)
        }

        return {
          ...particle,
          x: particle.x + particle.vx * deltaTime * 0.05,
          y: particle.y + particle.vy * deltaTime * 0.05,
          life: newLife,
          opacity: Math.max(0, newOpacity),
          scale: newScale,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98
        }
      }).filter(Boolean) as Particle[]
    })

    animationRef.current = requestAnimationFrame(updateParticles)
  }, [])

  useEffect(() => {
    let lastMoveTime = 0
    let moveTimeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const deltaX = e.clientX - mouseState.lastX
      const deltaY = e.clientY - mouseState.lastY
      const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      setMouseState(prev => ({
        x: e.clientX,
        y: e.clientY,
        lastX: prev.x,
        lastY: prev.y,
        velocity,
        isMoving: true
      }))

      // Create different particles based on mouse speed
      if (now - lastMoveTime > 30) {
        lastMoveTime = now
        
        // Basic trail particles
        const newParticles: any[] = []
        for (let i = 0; i < Math.min(3, Math.ceil(velocity / 20)); i++) {
          newParticles.push(createParticle(e.clientX, e.clientY, 'trail', velocity))
        }

        // High-speed energy particles
        if (velocity > 50) {
          for (let i = 0; i < 2; i++) {
            newParticles.push(createParticle(e.clientX, e.clientY, 'energy', velocity))
          }
        }

        setParticles(prev => [...prev, ...newParticles])
      }

      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        setMouseState(prev => ({ ...prev, isMoving: false }))
      }, 100)
    }

    const handleMouseDown = (e: MouseEvent) => {
      // Create burst effect on click
      const burstParticles: any[] = []
      for (let i = 0; i < 8; i++) {
        burstParticles.push(createParticle(e.clientX, e.clientY, 'burst', 100))
      }
      setParticles(prev => [...prev, ...burstParticles])
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(updateParticles)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(moveTimeout)
    }
  }, [createParticle, updateParticles, mouseState.lastX, mouseState.lastY])

  const getParticleStyle = (particle: Particle) => {
    const baseStyle = {
      left: particle.x - 6,
      top: particle.y - 6,
      transform: `scale(${particle.scale}) rotate(${particle.life * 2}deg)`,
      opacity: particle.opacity
    }

    switch (particle.type) {
      case 'energy':
        return {
          ...baseStyle,
          background: `radial-gradient(circle, hsla(${particle.hue}, 90%, 70%, ${particle.opacity}) 0%, hsla(${particle.hue + 20}, 80%, 60%, ${particle.opacity * 0.5}) 70%, transparent 100%)`,
          boxShadow: `0 0 20px hsla(${particle.hue}, 90%, 70%, ${particle.opacity * 0.8})`,
          filter: 'blur(0.5px)'
        }
      case 'burst':
        return {
          ...baseStyle,
          background: `conic-gradient(from ${particle.life * 10}deg, hsla(${particle.hue}, 100%, 80%, ${particle.opacity}), hsla(${particle.hue + 60}, 100%, 70%, ${particle.opacity * 0.8}), hsla(${particle.hue}, 100%, 80%, ${particle.opacity}))`,
          boxShadow: `0 0 15px hsla(${particle.hue}, 100%, 80%, ${particle.opacity})`,
          borderRadius: '30%'
        }
      default:
        return {
          ...baseStyle,
          background: `radial-gradient(circle, hsla(${particle.hue}, 80%, 65%, ${particle.opacity}) 0%, hsla(${particle.hue + 30}, 70%, 55%, ${particle.opacity * 0.6}) 60%, transparent 100%)`,
          boxShadow: `0 0 10px hsla(${particle.hue}, 80%, 65%, ${particle.opacity * 0.6})`
        }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={getParticleStyle(particle)}
        />
      ))}

      {/* Cursor glow effect when moving fast */}
      {mouseState.isMoving && mouseState.velocity > 30 && (
        <div
          className="absolute w-8 h-8 rounded-full pointer-events-none"
          style={{
            left: mouseState.x - 16,
            top: mouseState.y - 16,
            background: `radial-gradient(circle, hsla(260, 90%, 80%, 0.3) 0%, transparent 70%)`,
            animation: 'pulse 0.5s ease-out'
          }}
        />
      )}
    </div>
  )
}