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

    // Complex geometric shapes
    interface Shape3D {
      x: number
      y: number
      z: number
      rotX: number
      rotY: number
      rotZ: number
      size: number
      speedX: number
      speedY: number
      speedZ: number
      type: 'cube' | 'sphere' | 'diamond' | 'helix'
      trail: Array<{ x: number; y: number; opacity: number }>
    }

    const shapes: Shape3D[] = []

    // Create diverse 3D shapes
    for (let i = 0; i < 20; i++) {
      const types: Array<'cube' | 'sphere' | 'diamond' | 'helix'> = ['cube', 'sphere', 'diamond', 'helix']
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 800 + 200,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        size: Math.random() * 40 + 20,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.6,
        speedZ: (Math.random() - 0.5) * 0.4,
        type: types[Math.floor(Math.random() * types.length)],
        trail: []
      })
    }

    // Enhanced wave system
    const waves: Array<{
      x: number
      y: number
      radius: number
      maxRadius: number
      speed: number
      opacity: number
      frequency: number
    }> = []

    for (let i = 0; i < 8; i++) {
      waves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 300 + 100,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        frequency: Math.random() * 0.02 + 0.01
      })
    }

    // Matrix rain effect
    const matrixDrops: Array<{
      x: number
      y: number
      speed: number
      chars: string[]
      opacity: number
    }> = []

    const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()'.split('')
    
    for (let i = 0; i < 15; i++) {
      matrixDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        chars: Array.from({ length: 10 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
        opacity: Math.random() * 0.5 + 0.3
      })
    }

    // Complex particle network
    interface NetworkNode {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      connections: number[]
      energy: number
    }

    const networkNodes: NetworkNode[] = []
    for (let i = 0; i < 50; i++) {
      networkNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 300 + 50,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        connections: [],
        energy: Math.random()
      })
    }

    // Draw complex 3D shape
    const drawShape = (shape: Shape3D) => {
      ctx.save()
      
      const perspective = 1000
      const scale = Math.max(0.1, perspective / (perspective + shape.z))
      
      ctx.translate(shape.x, shape.y)
      ctx.scale(scale, scale)

      const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
      const opacity = 0.2 + (scale * 0.8)

      switch (shape.type) {
        case 'cube':
          // Enhanced 3D cube with multiple faces
          const size = shape.size
          const faces = [
            { points: [[-size, -size], [size, -size], [size, size], [-size, size]], z: size },
            { points: [[-size*0.8, -size*0.8], [size*0.8, -size*0.8], [size*0.8, size*0.8], [-size*0.8, size*0.8]], z: -size },
          ]
          
          faces.forEach((face, index) => {
            ctx.beginPath()
            const cos = Math.cos(shape.rotY)
            const sin = Math.sin(shape.rotY)
            
            face.points.forEach((point, i) => {
              const x3d = point[0] * cos - face.z * sin * 0.5
              const y3d = point[1]
              
              if (i === 0) ctx.moveTo(x3d, y3d)
              else ctx.lineTo(x3d, y3d)
            })
            ctx.closePath()
            
            ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity * 0.6})`
            ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`
            ctx.lineWidth = 2
            ctx.fill()
            ctx.stroke()
          })
          break

        case 'sphere':
          // Wireframe sphere
          for (let i = 0; i < 8; i++) {
            ctx.beginPath()
            ctx.arc(0, 0, shape.size * (0.3 + i * 0.1), 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity * (0.8 - i * 0.1)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
          break

        case 'diamond':
          // Complex diamond shape
          ctx.beginPath()
          const points = [
            [0, -shape.size],
            [shape.size * 0.7, -shape.size * 0.3],
            [shape.size * 0.7, shape.size * 0.3],
            [0, shape.size],
            [-shape.size * 0.7, shape.size * 0.3],
            [-shape.size * 0.7, -shape.size * 0.3]
          ]
          
          points.forEach((point, i) => {
            if (i === 0) ctx.moveTo(point[0], point[1])
            else ctx.lineTo(point[0], point[1])
          })
          ctx.closePath()
          
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity * 0.4})`
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`
          ctx.lineWidth = 2
          ctx.fill()
          ctx.stroke()
          break

        case 'helix':
          // DNA-like helix
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 4 + shape.rotZ
            const radius = shape.size * 0.5
            const x = Math.cos(angle) * radius
            const y = (i - 10) * shape.size * 0.1
            const x2 = Math.cos(angle + Math.PI) * radius
            
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`
            ctx.fill()
            
            ctx.beginPath()
            ctx.arc(x2, y, 2, 0, Math.PI * 2)
            ctx.fill()
            
            // Connect points
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x2, y)
            ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity * 0.5})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
          break
      }
      
      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      // Update and draw shapes
      shapes.forEach((shape, index) => {
        // Complex movement patterns
        shape.x += shape.speedX + Math.sin(time * 0.5 + index) * 0.5
        shape.y += shape.speedY + Math.cos(time * 0.3 + index) * 0.3
        shape.z += shape.speedZ + Math.sin(time * 0.2 + index) * 0.2
        
        shape.rotX += 0.01 + Math.sin(time + index) * 0.005
        shape.rotY += 0.008 + Math.cos(time * 0.7 + index) * 0.003
        shape.rotZ += 0.006 + Math.sin(time * 1.2 + index) * 0.002

        // Boundary wrapping with smooth transitions
        if (shape.x > canvas.width + 100) shape.x = -100
        if (shape.x < -100) shape.x = canvas.width + 100
        if (shape.y > canvas.height + 100) shape.y = -100
        if (shape.y < -100) shape.y = canvas.height + 100
        if (shape.z > 1000) shape.z = 100
        if (shape.z < 100) shape.z = 1000

        // Trail effect
        shape.trail.unshift({ x: shape.x, y: shape.y, opacity: 1 })
        if (shape.trail.length > 5) shape.trail.pop()
        
        // Draw trail
        shape.trail.forEach((point, i) => {
          if (i > 0) {
            ctx.beginPath()
            ctx.moveTo(shape.trail[i-1].x, shape.trail[i-1].y)
            ctx.lineTo(point.x, point.y)
            const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
            ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.1 * (1 - i/5)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        drawShape(shape)
      })

      // Animated waves
      waves.forEach(wave => {
        wave.radius += wave.speed
        if (wave.radius > wave.maxRadius) {
          wave.radius = 0
          wave.x = Math.random() * canvas.width
          wave.y = Math.random() * canvas.height
        }

        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        const baseColor = isDark ? [168, 162, 158] : [120, 113, 108]
        ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${wave.opacity * (1 - wave.radius/wave.maxRadius)})`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Matrix rain (subtle)
      if (Math.random() < 0.1) {
        matrixDrops.forEach(drop => {
          drop.y += drop.speed
          if (drop.y > canvas.height) {
            drop.y = -20
            drop.x = Math.random() * canvas.width
          }

          ctx.font = '12px monospace'
          const baseColor = isDark ? [120, 113, 108] : [168, 162, 158]
          drop.chars.forEach((char, i) => {
            ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${drop.opacity * (1 - i/10)})`
            ctx.fillText(char, drop.x, drop.y - i * 15)
          })
        })
      }

      // Network connections
      networkNodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy
        node.z += node.vz
        node.energy = Math.sin(time + i) * 0.5 + 0.5

        // Boundary wrapping
        if (node.x > canvas.width) node.x = 0
        if (node.x < 0) node.x = canvas.width
        if (node.y > canvas.height) node.y = 0
        if (node.y < 0) node.y = canvas.height

        const perspective = 500
        const scale = Math.max(0.1, perspective / (perspective + node.z))
        const size = Math.max(1, node.size * scale)

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
        ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.6 * node.energy * scale})`
        ctx.fill()

        // Draw connections to nearby nodes
        networkNodes.forEach((otherNode, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            )
            
            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              const opacity = (120 - distance) / 120 * 0.2 * node.energy
              ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
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