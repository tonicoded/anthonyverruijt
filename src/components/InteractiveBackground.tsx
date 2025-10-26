'use client'

import { useEffect, useRef, useState } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  connections: number[]
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createNodes = () => {
      const nodeCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        connections: []
      }))
    }

    const drawNode = (node: Node) => {
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2)
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      } else {
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.6)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      }
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawConnection = (node1: Node, node2: Node, distance: number) => {
      const opacity = Math.max(0, 1 - distance / 150)
      const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y)
      
      if (isDarkMode) {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.1})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.3})`)
      } else {
        gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity * 0.4})`)
        gradient.addColorStop(0.5, `rgba(0, 0, 0, ${opacity * 0.2})`)
        gradient.addColorStop(1, `rgba(0, 0, 0, ${opacity * 0.4})`)
      }

      ctx.strokeStyle = gradient
      ctx.lineWidth = opacity * 2
      ctx.beginPath()
      ctx.moveTo(node1.x, node1.y)
      ctx.lineTo(node2.x, node2.y)
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodesRef.current.forEach(node => {
        // Apply mouse attraction
        const dx = mousePos.x - node.x
        const dy = mousePos.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.01
          node.vx += dx * force * 0.001
          node.vy += dy * force * 0.001
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Apply friction
        node.vx *= 0.99
        node.vy *= 0.99
      })

      // Draw connections
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const node1 = nodesRef.current[i]
          const node2 = nodesRef.current[j]
          const dx = node1.x - node2.x
          const dy = node1.y - node2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            drawConnection(node1, node2, distance)
          }
        }
      }

      // Draw nodes
      nodesRef.current.forEach(drawNode)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    resizeCanvas()
    createNodes()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      createNodes()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos.x, mousePos.y, isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5 opacity-40"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}