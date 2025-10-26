'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  connections: number[]
}

interface MousePosition {
  x: number
  y: number
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let isMouseActive = false

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      connections: []
    })

    const initParticles = () => {
      const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 15000))
      particlesRef.current = Array.from({ length: particleCount }, createParticle)
    }

    const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
      return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
    }

    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(250, 250, 249, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const maxDistance = 150
      const mouseInfluence = 100

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse attraction/repulsion
        if (isMouseActive) {
          const distanceToMouse = getDistance(particle, mouse)
          if (distanceToMouse < mouseInfluence) {
            const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x)
            const force = (mouseInfluence - distanceToMouse) / mouseInfluence
            particle.vx += Math.cos(angle) * force * 0.02
            particle.vy += Math.sin(angle) * force * 0.02
          }
        }

        // Boundary check with bounce
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -0.9
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -0.9
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Apply friction
        particle.vx *= 0.998
        particle.vy *= 0.998

        // Draw particle with proper contrast
        ctx.fillStyle = `rgba(110, 110, 110, ${particle.opacity * 0.4})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Clean fill without glow
        ctx.shadowBlur = 0

        // Draw connections
        particle.connections = []
        for (let i = index + 1; i < particlesRef.current.length; i++) {
          const other = particlesRef.current[i]
          const distance = getDistance(particle, other)

          if (distance < maxDistance) {
            particle.connections.push(i)
            
            const opacity = (1 - distance / maxDistance) * 0.2
            
            ctx.strokeStyle = `rgba(110, 110, 110, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        // Draw line to mouse if close enough - clean theme
        if (isMouseActive) {
          const mouseDistance = getDistance(particle, mouse)
          if (mouseDistance < mouseInfluence) {
            const opacity = (1 - mouseDistance / mouseInfluence) * 0.3
            ctx.strokeStyle = `rgba(110, 110, 110, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      })

      // Draw mouse indicator with proper contrast
      if (isMouseActive) {
        const mouseGlow = 15 + Math.sin(Date.now() * 0.005) * 3
        ctx.fillStyle = `rgba(110, 110, 110, 0.15)`
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouseGlow, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.strokeStyle = `rgba(110, 110, 110, 0.3)`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouseGlow / 2, 0, Math.PI * 2)
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      isMouseActive = true
    }

    const handleMouseLeave = () => {
      isMouseActive = false
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initParticles()
    })
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-5 opacity-40 dark:opacity-20"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}