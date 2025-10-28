'use client'

import { useEffect, useRef, useState } from 'react'

export function Cool3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Smooth 3D geometric shapes
    interface Shape3D {
      x: number
      y: number
      z: number
      rotX: number
      rotY: number
      rotZ: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      speedZ: number
      type: 'cube' | 'sphere' | 'diamond'
      opacity: number
    }

    const shapes: Shape3D[] = []

    // Create visible but balanced 3D shapes
    for (let i = 0; i < 8; i++) {
      const types: Array<'cube' | 'sphere' | 'diamond'> = ['cube', 'sphere', 'diamond']
      const baseSize = Math.random() * 35 + 25
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 400 + 200,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        size: baseSize,
        baseSize: baseSize,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        speedZ: (Math.random() - 0.5) * 0.2,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.4 + 0.3
      })
    }

    // Subtle floating particles
    interface Particle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      baseSize: number
      life: number
      maxLife: number
    }

    const particles: Particle[] = []
    for (let i = 0; i < 15; i++) {
      const baseSize = Math.random() * 2 + 1
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 300 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.1,
        size: baseSize,
        baseSize: baseSize,
        life: Math.random() * 200 + 100,
        maxLife: 300
      })
    }

    // Draw smooth 3D shape
    const drawShape = (shape: Shape3D) => {
      ctx.save()
      
      const perspective = 800
      const scale = Math.max(0.2, Math.min(1, perspective / (perspective + shape.z)))
      
      ctx.translate(shape.x, shape.y)
      ctx.scale(scale, scale)

      const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
      const finalOpacity = Math.min(1, shape.opacity * scale * 1.5)

      switch (shape.type) {
        case 'cube':
          // Clear visible cube with better 3D effect
          const size = shape.size
          ctx.save()
          ctx.rotate(shape.rotY * 0.5)
          
          // Front face - main visible face
          ctx.beginPath()
          ctx.rect(-size/2, -size/2, size, size)
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.6})`
          ctx.fill()
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity})`
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Top face for 3D depth
          ctx.beginPath()
          ctx.moveTo(-size/2, -size/2)
          ctx.lineTo(-size/2 + size*0.4, -size/2 - size*0.4)
          ctx.lineTo(size/2 + size*0.4, -size/2 - size*0.4)
          ctx.lineTo(size/2, -size/2)
          ctx.closePath()
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.4})`
          ctx.fill()
          ctx.stroke()
          
          // Right side face
          ctx.beginPath()
          ctx.moveTo(size/2, -size/2)
          ctx.lineTo(size/2 + size*0.4, -size/2 - size*0.4)
          ctx.lineTo(size/2 + size*0.4, size/2 - size*0.4)
          ctx.lineTo(size/2, size/2)
          ctx.closePath()
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.3})`
          ctx.fill()
          ctx.stroke()
          
          ctx.restore()
          break

        case 'sphere':
          // Enhanced gradient sphere
          const gradient = ctx.createRadialGradient(-shape.size*0.4, -shape.size*0.4, 0, 0, 0, shape.size)
          gradient.addColorStop(0, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.8})`)
          gradient.addColorStop(0.7, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.4})`)
          gradient.addColorStop(1, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.1})`)
          
          ctx.beginPath()
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
          // Add outer ring for definition
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.8})`
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Inner highlight
          ctx.beginPath()
          ctx.arc(-shape.size*0.3, -shape.size*0.3, shape.size*0.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${baseColor[0] + 20}, ${baseColor[1] + 20}, ${baseColor[2] + 20}, ${finalOpacity * 0.6})`
          ctx.fill()
          break

        case 'diamond':
          // Enhanced diamond with inner detail
          ctx.save()
          ctx.rotate(shape.rotZ * 0.7)
          
          // Outer diamond
          ctx.beginPath()
          ctx.moveTo(0, -shape.size)
          ctx.lineTo(shape.size * 0.7, 0)
          ctx.lineTo(0, shape.size)
          ctx.lineTo(-shape.size * 0.7, 0)
          ctx.closePath()
          
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity * 0.5})`
          ctx.fill()
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${finalOpacity})`
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Inner diamond for depth
          ctx.beginPath()
          ctx.moveTo(0, -shape.size * 0.6)
          ctx.lineTo(shape.size * 0.4, 0)
          ctx.lineTo(0, shape.size * 0.6)
          ctx.lineTo(-shape.size * 0.4, 0)
          ctx.closePath()
          
          ctx.fillStyle = `rgba(${baseColor[0] + 15}, ${baseColor[1] + 15}, ${baseColor[2] + 15}, ${finalOpacity * 0.7})`
          ctx.fill()
          
          ctx.restore()
          break
      }
      
      ctx.restore()
    }

    // Smooth animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Update and draw smooth 3D shapes
      shapes.forEach((shape, index) => {
        // Gentle floating movement
        shape.x += shape.speedX + Math.sin(time * 0.3 + index) * 0.2
        shape.y += shape.speedY + Math.cos(time * 0.2 + index) * 0.15
        shape.z += shape.speedZ + Math.sin(time * 0.1 + index) * 0.1
        
        // Smooth rotation
        shape.rotX += 0.005
        shape.rotY += 0.003
        shape.rotZ += 0.004

        // Gentle size pulsing
        shape.size = shape.baseSize + Math.sin(time * 0.4 + index) * 4

        // Boundary wrapping
        if (shape.x > canvas.width + 80) shape.x = -80
        if (shape.x < -80) shape.x = canvas.width + 80
        if (shape.y > canvas.height + 80) shape.y = -80
        if (shape.y < -80) shape.y = canvas.height + 80
        if (shape.z > 600) shape.z = 200
        if (shape.z < 200) shape.z = 600

        drawShape(shape)
      })

      // Update and draw smooth particles  
      particles.forEach((particle, index) => {
        // Gentle movement
        particle.x += particle.vx + Math.sin(time * 0.4 + index) * 0.1
        particle.y += particle.vy + Math.cos(time * 0.3 + index) * 0.1
        particle.z += particle.vz

        // Boundary wrapping
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.z > 500) particle.z = 100
        if (particle.z < 100) particle.z = 500

        // 3D perspective
        const perspective = 600
        const scale = Math.max(0.3, perspective / (perspective + particle.z))
        const size = Math.max(1, particle.baseSize * scale)

        // Pulsing effect
        particle.life += 1
        if (particle.life > particle.maxLife) particle.life = 0
        const pulseOpacity = Math.sin((particle.life / particle.maxLife) * Math.PI * 2) * 0.3 + 0.7

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
        ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.3 * scale * pulseOpacity})`
        ctx.fill()
        
        // Add subtle glow to particles
        ctx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.3)`
        ctx.shadowBlur = 3
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}