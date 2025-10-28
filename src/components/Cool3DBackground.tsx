'use client'

import { useEffect, useRef, useState } from 'react'

export function Cool3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isDark, setIsDark] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

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

    // Mouse tracking for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // EPIC NEURAL NETWORK SYSTEM
    interface NeuralNode {
      x: number
      y: number
      z: number
      targetX: number
      targetY: number
      energy: number
      pulse: number
      connections: number[]
      type: 'main' | 'secondary' | 'data'
      activity: number
    }

    const neuralNodes: NeuralNode[] = []
    const gridSize = 6
    const spacing = Math.min(canvas.width, canvas.height) / (gridSize + 1)

    // Create neural network grid
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * (i + 1) + (Math.random() - 0.5) * 50
        const y = spacing * (j + 1) + (Math.random() - 0.5) * 50
        neuralNodes.push({
          x,
          y,
          z: Math.random() * 200 + 100,
          targetX: x,
          targetY: y,
          energy: Math.random(),
          pulse: Math.random() * Math.PI * 2,
          connections: [],
          type: Math.random() < 0.3 ? 'main' : Math.random() < 0.6 ? 'secondary' : 'data',
          activity: 0
        })
      }
    }

    // Create intelligent connections
    neuralNodes.forEach((node, i) => {
      neuralNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          )
          if (distance < spacing * 2.2 && Math.random() < 0.4) {
            node.connections.push(j)
          }
        }
      })
    })

    // DNA HELIX SYSTEM
    interface DNAPoint {
      x: number
      y: number
      z: number
      angle: number
      strand: number
      radius: number
      baseY: number
    }

    const dnaHelixes: Array<{
      centerX: number
      centerY: number
      points: DNAPoint[]
      rotation: number
      height: number
    }> = []

    // Create DNA helixes
    for (let h = 0; h < 3; h++) {
      const helix = {
        centerX: (canvas.width / 4) * (h + 1),
        centerY: canvas.height / 2,
        points: [] as DNAPoint[],
        rotation: 0,
        height: 300
      }

      for (let i = 0; i < 40; i++) {
        const progress = i / 39
        const y = progress * helix.height - helix.height / 2
        
        // Two strands of DNA
        for (let strand = 0; strand < 2; strand++) {
          helix.points.push({
            x: 0,
            y,
            z: 0,
            angle: progress * Math.PI * 4 + strand * Math.PI,
            strand,
            radius: 30 + Math.sin(progress * Math.PI * 2) * 10,
            baseY: y
          })
        }
      }
      
      dnaHelixes.push(helix)
    }

    // CYBERPUNK GRID SYSTEM
    interface GridPoint {
      x: number
      y: number
      active: boolean
      energy: number
      ripple: number
    }

    const cyberpunkGrid: GridPoint[][] = []
    const gridResolution = 25
    const cellSize = Math.max(canvas.width, canvas.height) / gridResolution

    for (let i = 0; i <= gridResolution; i++) {
      cyberpunkGrid[i] = []
      for (let j = 0; j <= gridResolution; j++) {
        cyberpunkGrid[i][j] = {
          x: i * cellSize,
          y: j * cellSize,
          active: false,
          energy: 0,
          ripple: 0
        }
      }
    }

    // FLOATING CODE MATRIX
    interface CodeRain {
      x: number
      y: number
      speed: number
      chars: string[]
      opacity: number
      type: 'code' | 'binary' | 'hex'
    }

    const codeDrops: CodeRain[] = []
    const codeChars = {
      code: ['react', 'swift', 'python', 'typescript', 'nextjs', 'api', 'json', 'css'],
      binary: ['0', '1'],
      hex: ['0x', 'FF', 'A3', '7C', 'B2', 'E1']
    }

    for (let i = 0; i < 12; i++) {
      const types: Array<'code' | 'binary' | 'hex'> = ['code', 'binary', 'hex']
      const type = types[Math.floor(Math.random() * types.length)]
      codeDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        chars: Array.from({ length: 8 }, () => 
          codeChars[type][Math.floor(Math.random() * codeChars[type].length)]
        ),
        opacity: Math.random() * 0.6 + 0.2,
        type
      })
    }

    // EPIC ANIMATION LOOP WITH MULTIPLE LAYERED EFFECTS
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
      const accentColor = isDark ? [168, 162, 158] : [120, 113, 108]

      // 1. CYBERPUNK GRID BACKGROUND
      ctx.globalAlpha = 0.1
      for (let i = 0; i < cyberpunkGrid.length; i++) {
        for (let j = 0; j < cyberpunkGrid[i].length; j++) {
          const point = cyberpunkGrid[i][j]
          
          // Create ripple effect from mouse
          const mouseDistance = Math.sqrt(
            Math.pow(point.x - mousePos.x * canvas.width, 2) +
            Math.pow(point.y - mousePos.y * canvas.height, 2)
          )
          
          if (mouseDistance < 150) {
            point.active = true
            point.energy = Math.max(0.8, 1 - mouseDistance / 150)
            point.ripple = time * 5
          } else {
            point.energy *= 0.95
            point.active = point.energy > 0.1
          }

          if (point.active) {
            ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${point.energy})`
            ctx.lineWidth = 1
            
            // Draw grid lines
            if (i < cyberpunkGrid.length - 1) {
              ctx.beginPath()
              ctx.moveTo(point.x, point.y)
              ctx.lineTo(cyberpunkGrid[i + 1][j].x, cyberpunkGrid[i + 1][j].y)
              ctx.stroke()
            }
            if (j < cyberpunkGrid[i].length - 1) {
              ctx.beginPath()
              ctx.moveTo(point.x, point.y)
              ctx.lineTo(cyberpunkGrid[i][j + 1].x, cyberpunkGrid[i][j + 1].y)
              ctx.stroke()
            }
          }
        }
      }

      // 2. NEURAL NETWORK SYSTEM
      ctx.globalAlpha = 1
      
      // Update neural activity
      neuralNodes.forEach((node, i) => {
        node.pulse += 0.1
        node.energy = (Math.sin(node.pulse) + 1) / 2
        
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(node.x - mousePos.x * canvas.width, 2) +
          Math.pow(node.y - mousePos.y * canvas.height, 2)
        )
        
        if (mouseDistance < 100) {
          node.activity = Math.min(1, node.activity + 0.05)
        } else {
          node.activity *= 0.98
        }

        // Gentle floating
        node.x += Math.sin(time * 0.5 + i) * 0.3
        node.y += Math.cos(time * 0.3 + i) * 0.2
      })

      // Draw neural connections with data flow
      neuralNodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const targetNode = neuralNodes[connectionIndex]
          if (!targetNode) return

          const connectionActivity = (node.activity + targetNode.activity) / 2
          
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.3 + connectionActivity * 0.5})`
          ctx.lineWidth = 1 + connectionActivity * 2
          
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.stroke()

          // Animated data packets
          if (connectionActivity > 0.3) {
            const progress = (time * 2 + i) % 1
            const packetX = node.x + (targetNode.x - node.x) * progress
            const packetY = node.y + (targetNode.y - node.y) * progress
            
            ctx.beginPath()
            ctx.arc(packetX, packetY, 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${connectionActivity})`
            ctx.fill()
          }
        })
      })

      // Draw neural nodes
      neuralNodes.forEach(node => {
        const size = node.type === 'main' ? 8 : node.type === 'secondary' ? 6 : 4
        const glowSize = size + node.activity * 6
        
        // Glow effect
        ctx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${node.activity})`
        ctx.shadowBlur = glowSize
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.7 + node.energy * 0.3})`
        ctx.fill()
        
        ctx.shadowBlur = 0
      })

      // 3. DNA HELIX SYSTEM
      dnaHelixes.forEach(helix => {
        helix.rotation += 0.01
        
        // Update DNA points
        helix.points.forEach(point => {
          const finalAngle = point.angle + helix.rotation
          point.x = Math.cos(finalAngle) * point.radius
          point.z = Math.sin(finalAngle) * point.radius
        })

        // Draw DNA strands
        for (let strand = 0; strand < 2; strand++) {
          const strandPoints = helix.points.filter(p => p.strand === strand)
          
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.6)`
          ctx.lineWidth = 2
          ctx.beginPath()
          
          strandPoints.forEach((point, i) => {
            const screenX = helix.centerX + point.x
            const screenY = helix.centerY + point.y
            
            if (i === 0) ctx.moveTo(screenX, screenY)
            else ctx.lineTo(screenX, screenY)
          })
          ctx.stroke()

          // Draw base connections
          strandPoints.forEach((point, i) => {
            if (i % 4 === 0) {
              const otherStrand = helix.points.find(p => 
                Math.abs(p.baseY - point.baseY) < 5 && p.strand !== strand
              )
              
              if (otherStrand) {
                ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, 0.4)`
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(helix.centerX + point.x, helix.centerY + point.y)
                ctx.lineTo(helix.centerX + otherStrand.x, helix.centerY + otherStrand.y)
                ctx.stroke()
              }
            }
          })
        }
      })

      // 4. FLOATING CODE MATRIX
      codeDrops.forEach(drop => {
        drop.y += drop.speed
        if (drop.y > canvas.height + 100) {
          drop.y = -100
          drop.x = Math.random() * canvas.width
        }

        ctx.font = drop.type === 'code' ? '12px monospace' : '10px monospace'
        
        drop.chars.forEach((char, i) => {
          const alpha = drop.opacity * (1 - i / drop.chars.length)
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${alpha})`
          ctx.fillText(char, drop.x, drop.y - i * 20)
        })
      })

      // 5. INTERACTIVE ENERGY WAVES
      if (Math.random() < 0.03) {
        const waveX = mousePos.x * canvas.width + (Math.random() - 0.5) * 200
        const waveY = mousePos.y * canvas.height + (Math.random() - 0.5) * 200
        
        for (let r = 0; r < 100; r += 10) {
          ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${0.5 * (1 - r/100)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(waveX, waveY, r, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

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