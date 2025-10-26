'use client'

import { useEffect, useRef } from 'react'

interface Drop {
  x: number
  y: number
  speed: number
  chars: string[]
  opacity: number
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Matrix characters (mix of code symbols and Japanese katakana)
    const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]()<>+-*/=!@#$%^&*アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createDrop = (): Drop => ({
      x: Math.random() * canvas.width,
      y: -50,
      speed: Math.random() * 3 + 1,
      chars: Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () => 
        matrixChars[Math.floor(Math.random() * matrixChars.length)]
      ),
      opacity: Math.random() * 0.8 + 0.2
    })

    const initDrops = () => {
      dropsRef.current = Array.from({ length: Math.floor(canvas.width / 20) }, createDrop)
    }

    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(250, 250, 249, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      dropsRef.current.forEach((drop, index) => {
        // Update position
        drop.y += drop.speed

        // Draw characters
        drop.chars.forEach((char, charIndex) => {
          const charY = drop.y + charIndex * 16
          
          if (charY > 0 && charY < canvas.height + 50) {
            // Calculate opacity based on position in trail
            const trailOpacity = drop.opacity * (1 - charIndex / drop.chars.length) * 0.3
            
            // Set character color with proper contrast
            ctx.fillStyle = `rgba(80, 80, 80, ${trailOpacity * 0.4})`
            ctx.font = '14px "Courier New", monospace'
            ctx.textAlign = 'center'
            
            // Add subtle glow for leading characters  
            if (charIndex < 3) {
              ctx.shadowColor = `rgba(80, 80, 80, ${trailOpacity * 0.3})`
              ctx.shadowBlur = 2
            } else {
              ctx.shadowBlur = 0
            }
            
            ctx.fillText(char, drop.x, charY)
          }
        })

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + 100) {
          dropsRef.current[index] = createDrop()
        }

        // Occasionally change characters for digital effect
        if (Math.random() < 0.05) {
          const randomIndex = Math.floor(Math.random() * drop.chars.length)
          drop.chars[randomIndex] = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initDrops()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initDrops()
    })

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
      className="fixed inset-0 pointer-events-none z-5 opacity-30 dark:opacity-15"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}