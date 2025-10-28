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

    // Minimal particle class - stone aesthetic
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 800)
        this.y = Math.random() * (canvas?.height || 600)
        this.vx = (Math.random() - 0.5) * 0.2 // Slower movement
        this.vy = (Math.random() - 0.5) * 0.2
        this.size = Math.random() * 1 + 0.5 // Smaller particles
        this.opacity = Math.random() * 0.15 + 0.05 // Much more subtle
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Wrap around edges
        if (this.x < 0) this.x = canvas?.width || 800
        if (this.x > (canvas?.width || 800)) this.x = 0
        if (this.y < 0) this.y = canvas?.height || 600
        if (this.y > (canvas?.height || 600)) this.y = 0

        // Very subtle pulsing
        this.opacity += Math.sin(Date.now() * 0.0005 + this.x * 0.005) * 0.002
        this.opacity = Math.max(0.02, Math.min(0.1, this.opacity))
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        
        // Simple stone-colored particles - no gradients
        const isDark = document.documentElement.classList.contains('dark')
        ctx.fillStyle = isDark ? '#64748b' : '#94a3b8' // stone-500/400
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Fewer particles for cleaner look
    const particles: Particle[] = []
    const particleCount = Math.min(50, Math.floor(((canvas?.width || 800) * (canvas?.height || 600)) / 15000))
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Subtle mouse interaction
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

      particles.forEach((particle) => {
        particle.update()
        particle.draw()

        // Subtle mouse interaction
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 80) {
          const force = (80 - distance) / 80
          particle.vx += dx * force * 0.0005 // Much more subtle
          particle.vy += dy * force * 0.0005
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
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  )
}