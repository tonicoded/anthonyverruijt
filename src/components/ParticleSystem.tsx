'use client'

import { useEffect, useRef } from 'react'

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 800)
        this.y = Math.random() * (canvas?.height || 600)
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.hue = Math.random() * 60 + 200 // Blue to purple range
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Wrap around edges
        if (this.x < 0) this.x = canvas?.width || 800
        if (this.x > (canvas?.width || 800)) this.x = 0
        if (this.y < 0) this.y = canvas?.height || 600
        if (this.y > (canvas?.height || 600)) this.y = 0

        // Subtle opacity pulsing
        this.opacity += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.005
        this.opacity = Math.max(0.05, Math.min(0.4, this.opacity))
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)
        gradient.addColorStop(0, `hsl(${this.hue}, 70%, 60%)`)
        gradient.addColorStop(1, `hsl(${this.hue}, 70%, 30%)`)
        
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(150, Math.floor(((canvas?.width || 800) * (canvas?.height || 600)) / 8000))
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse interaction
    let mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.update()
        particle.draw()

        // Mouse interaction - attract particles to mouse
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += dx * force * 0.001
          particle.vy += dy * force * 0.001
        }

        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            if (!ctx) return
            ctx.save()
            ctx.globalAlpha = (80 - distance) / 80 * 0.2
            ctx.strokeStyle = `hsl(${(particle.hue + other.hue) / 2}, 50%, 50%)`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  )
}