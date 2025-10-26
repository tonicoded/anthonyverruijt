'use client'

import { useEffect, useRef } from 'react'

interface DataStream {
  x: number
  y: number
  speed: number
  length: number
  data: string[]
  opacity: number
  direction: 'horizontal' | 'vertical'
  color: string
}

export function DataStreams() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamsRef = useRef<DataStream[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Cyberpunk data characters
    const dataChars = [
      '01010101', '11001100', '10101010', '01100110',
      'EXEC', 'NULL', 'DATA', 'PROC', 'INIT', 'LOAD',
      'BYTE', 'WORD', 'ADDR', 'HEAP', 'STACK', 'CORE',
      '0xFF', '0x00', '0xAB', '0xCD', '0x42', '0x7F',
      'TCP', 'UDP', 'HTTP', 'SSH', 'FTP', 'DNS',
      'CPU', 'RAM', 'GPU', 'SSD', 'API', 'SDK',
      '└─', '├─', '│', '─', '┌─', '┐', '┘', '└',
      '▒▒▒', '░░░', '███', '▓▓▓', '▄▄▄', '▀▀▀'
    ]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createDataStream = (): DataStream => {
      const isHorizontal = Math.random() > 0.6
      return {
        x: isHorizontal ? -200 : Math.random() * canvas.width,
        y: isHorizontal ? Math.random() * canvas.height : -200,
        speed: Math.random() * 3 + 1,
        length: Math.floor(Math.random() * 15) + 8,
        data: Array.from({ length: Math.floor(Math.random() * 15) + 8 }, () => 
          dataChars[Math.floor(Math.random() * dataChars.length)]
        ),
        opacity: Math.random() * 0.6 + 0.2,
        direction: isHorizontal ? 'horizontal' : 'vertical',
        color: ['cyan', 'green', 'blue', 'purple', 'white'][Math.floor(Math.random() * 5)]
      }
    }

    const initStreams = () => {
      const streamCount = Math.floor(canvas.width / 300) + Math.floor(canvas.height / 300)
      streamsRef.current = Array.from({ length: streamCount }, createDataStream)
    }

    const getColorValue = (color: string, alpha: number) => {
      // Gray theme with proper contrast
      return `rgba(90, 90, 90, ${alpha * 0.5})`
    }

    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas with subtle fade
      ctx.fillStyle = 'rgba(250, 250, 249, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      streamsRef.current.forEach((stream, index) => {
        // Update position
        if (stream.direction === 'horizontal') {
          stream.x += stream.speed
        } else {
          stream.y += stream.speed
        }

        // Draw data stream
        ctx.font = '12px "Courier New", monospace'
        ctx.textAlign = 'left'

        stream.data.forEach((dataChunk, chunkIndex) => {
          const progress = chunkIndex / stream.data.length
          const alpha = stream.opacity * (1 - progress * 0.7)
          
          let x, y
          if (stream.direction === 'horizontal') {
            x = stream.x + chunkIndex * 60
            y = stream.y
          } else {
            x = stream.x
            y = stream.y + chunkIndex * 20
          }

          // Skip if outside canvas
          if (x < -100 || x > canvas.width + 100 || y < -50 || y > canvas.height + 50) {
            return
          }

          // Draw data chunk clean
          ctx.fillStyle = getColorValue(stream.color, alpha)
          ctx.shadowBlur = 0
          ctx.fillText(dataChunk, x, y)

          // Add connecting lines for data flow
          if (chunkIndex > 0 && alpha > 0.2) {
            ctx.strokeStyle = getColorValue(stream.color, alpha * 0.4)
            ctx.lineWidth = 1
            ctx.beginPath()
            
            if (stream.direction === 'horizontal') {
              ctx.moveTo(x - 50, y - 5)
              ctx.lineTo(x - 10, y - 5)
            } else {
              ctx.moveTo(x - 5, y - 15)
              ctx.lineTo(x - 5, y - 5)
            }
            ctx.stroke()

            // Add data transfer indicators
            if (Math.random() < 0.1) {
              ctx.fillStyle = getColorValue(stream.color, alpha * 0.8)
              ctx.beginPath()
              if (stream.direction === 'horizontal') {
                ctx.rect(x - 30, y - 8, 4, 2)
              } else {
                ctx.rect(x - 8, y - 10, 2, 4)
              }
              ctx.fill()
            }
          }
        })

        // Reset stream when it goes off screen
        const isOffScreen = stream.direction === 'horizontal' 
          ? stream.x > canvas.width + 200
          : stream.y > canvas.height + 200

        if (isOffScreen) {
          streamsRef.current[index] = createDataStream()
        }

        // Occasionally update data for dynamic effect
        if (Math.random() < 0.02) {
          const randomIndex = Math.floor(Math.random() * stream.data.length)
          stream.data[randomIndex] = dataChars[Math.floor(Math.random() * dataChars.length)]
        }
      })

      // Add random data bursts
      if (Math.random() < 0.005) {
        const burstX = Math.random() * canvas.width
        const burstY = Math.random() * canvas.height
        
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2
          const distance = 50 + Math.random() * 30
          const x = burstX + Math.cos(angle) * distance
          const y = burstY + Math.sin(angle) * distance
          
          ctx.fillStyle = `rgba(0, 255, 255, ${0.8 - (distance / 80)})`
          ctx.font = '10px "Courier New", monospace'
          ctx.fillText('◆', x, y)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initStreams()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initStreams()
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
      className="fixed inset-0 pointer-events-none z-5 opacity-25 dark:opacity-15"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}