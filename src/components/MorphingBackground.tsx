'use client'

import { useEffect, useRef } from 'react'

interface Shape {
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  hue: number
  vx: number
  vy: number
  rotationSpeed: number
  pulsePhase: number
  morphPhase: number
}

export function MorphingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapesRef = useRef<Shape[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createShape = (index: number): Shape => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.3 + 0.1,
      hue: (index * 60 + Math.random() * 60) % 360,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      rotationSpeed: (Math.random() - 0.5) * 2,
      pulsePhase: Math.random() * Math.PI * 2,
      morphPhase: Math.random() * Math.PI * 2
    })

    const initShapes = () => {
      shapesRef.current = Array.from({ length: 6 }, (_, i) => createShape(i))
    }

    const drawMorphingShape = (ctx: CanvasRenderingContext2D, shape: Shape, time: number) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate((shape.rotation + time * shape.rotationSpeed) * Math.PI / 180)

      // Create morphing polygon
      const sides = 3 + Math.floor(3 * (Math.sin(time * 0.003 + shape.morphPhase) + 1))
      const radius = shape.size * (0.8 + 0.4 * Math.sin(time * 0.002 + shape.pulsePhase))
      
      // Create gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
      const alpha = shape.opacity * (0.6 + 0.4 * Math.sin(time * 0.001 + shape.pulsePhase))
      
      gradient.addColorStop(0, `hsla(${shape.hue + Math.sin(time * 0.001) * 30}, 70%, 60%, ${alpha})`)
      gradient.addColorStop(0.7, `hsla(${shape.hue + 60}, 80%, 70%, ${alpha * 0.3})`)
      gradient.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient
      ctx.beginPath()

      // Draw morphing polygon
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides
        const waveRadius = radius * (1 + 0.2 * Math.sin(time * 0.005 + angle * 3 + shape.morphPhase))
        const x = Math.cos(angle) * waveRadius
        const y = Math.sin(angle) * waveRadius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.fill()

      // Add inner glow
      ctx.shadowColor = `hsla(${shape.hue}, 80%, 70%, ${alpha * 0.5})`
      ctx.shadowBlur = 20
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      if (!canvas || !ctx) return

      timeRef.current += 16

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(250, 250, 249, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += shape.vx
        shape.y += shape.vy

        // Bounce off edges
        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) {
          shape.vx *= -1
        }
        if (shape.y < -shape.size || shape.y > canvas.height + shape.size) {
          shape.vy *= -1
        }

        // Keep in bounds
        shape.x = Math.max(-shape.size, Math.min(canvas.width + shape.size, shape.x))
        shape.y = Math.max(-shape.size, Math.min(canvas.height + shape.size, shape.y))

        drawMorphingShape(ctx, shape, timeRef.current)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initShapes()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}