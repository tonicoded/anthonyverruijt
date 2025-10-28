'use client'

import { useEffect, useRef } from 'react'

export function Cool3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // 3D Cube vertices
    const cubes: Array<{
      x: number
      y: number
      z: number
      rotX: number
      rotY: number
      rotZ: number
      size: number
      speed: number
    }> = []

    // Create floating 3D cubes
    for (let i = 0; i < 12; i++) {
      cubes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        size: Math.random() * 60 + 20,
        speed: Math.random() * 0.02 + 0.01
      })
    }

    const isDark = () => document.documentElement.classList.contains('dark')

    // Draw 3D cube
    const drawCube = (cube: typeof cubes[0]) => {
      ctx.save()
      
      // Move to cube position
      ctx.translate(cube.x, cube.y)
      
      // 3D perspective
      const perspective = 800
      const scale = perspective / (perspective + cube.z)
      ctx.scale(scale, scale)
      
      // Rotation
      const cos = Math.cos(cube.rotY)
      const sin = Math.sin(cube.rotY)
      
      // Define cube faces
      const size = cube.size
      const faces = [
        // Front face
        { points: [[-size/2, -size/2], [size/2, -size/2], [size/2, size/2], [-size/2, size/2]], depth: size/2 },
        // Back face  
        { points: [[-size/2, -size/2], [size/2, -size/2], [size/2, size/2], [-size/2, size/2]], depth: -size/2 },
        // Top face
        { points: [[-size/2, -size/2], [size/2, -size/2], [size/2, -size/2], [-size/2, -size/2]], depth: 0 },
        // Bottom face
        { points: [[-size/2, size/2], [size/2, size/2], [size/2, size/2], [-size/2, size/2]], depth: 0 }
      ]
      
      // Draw faces
      faces.forEach((face, index) => {
        ctx.beginPath()
        ctx.moveTo(
          face.points[0][0] * cos - face.depth * sin,
          face.points[0][1]
        )
        
        face.points.forEach((point, i) => {
          if (i > 0) {
            ctx.lineTo(
              point[0] * cos - face.depth * sin,
              point[1]
            )
          }
        })
        ctx.closePath()
        
        // Color based on theme and face
        const opacity = 0.1 + (index * 0.05)
        if (isDark()) {
          ctx.fillStyle = `rgba(168, 162, 158, ${opacity})`
          ctx.strokeStyle = `rgba(214, 211, 209, ${opacity * 2})`
        } else {
          ctx.fillStyle = `rgba(120, 113, 108, ${opacity})`
          ctx.strokeStyle = `rgba(87, 83, 78, ${opacity * 2})`
        }
        
        ctx.lineWidth = 1
        ctx.fill()
        ctx.stroke()
      })
      
      ctx.restore()
    }

    // Floating dots/particles
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
    }> = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw cubes
      cubes.forEach(cube => {
        cube.rotX += cube.speed
        cube.rotY += cube.speed * 0.7
        cube.rotZ += cube.speed * 0.5
        
        // Floating movement
        cube.x += Math.sin(cube.rotX * 0.5) * 0.3
        cube.y += Math.cos(cube.rotY * 0.3) * 0.2
        cube.z += Math.sin(cube.rotZ * 0.2) * 0.5
        
        // Wrap around screen
        if (cube.x > canvas.width + 100) cube.x = -100
        if (cube.x < -100) cube.x = canvas.width + 100
        if (cube.y > canvas.height + 100) cube.y = -100
        if (cube.y < -100) cube.y = canvas.height + 100
        
        drawCube(cube)
      })
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz
        
        // Wrap particles
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height
        
        // 3D perspective for particles
        const perspective = 800
        const scale = perspective / (perspective + particle.z)
        const size = particle.size * scale
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        
        if (isDark()) {
          ctx.fillStyle = `rgba(214, 211, 209, ${0.3 * scale})`
        } else {
          ctx.fillStyle = `rgba(87, 83, 78, ${0.4 * scale})`
        }
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}