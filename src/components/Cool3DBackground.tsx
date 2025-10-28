'use client'

import { useEffect, useRef, useState } from 'react'

export function Cool3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isDark, setIsDark] = useState(false)
  const [scrollY, setScrollY] = useState(0)

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

    // Scroll tracking for smooth parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })

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

    // SMOOTH AUTONOMOUS ANIMATION LOOP
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
      const accentColor = isDark ? [168, 162, 158] : [120, 113, 108]
      
      // Calculate scroll-based parallax effects
      const scrollProgress = Math.min(1, scrollY / 1000)
      
      // Create beautiful floating particles autonomously
      if (Math.random() < 0.02) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = 1 + Math.random() * 3
        const alpha = 0.3 + Math.random() * 0.4
        
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha})`
        ctx.fill()
        
        // Subtle glow
        ctx.shadowColor = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha * 0.3})`
        ctx.shadowBlur = size
        ctx.fill()
        ctx.restore()
      }

      // 1. SMOOTH CYBERPUNK GRID WITH FLOWING WAVES
      ctx.save()
      ctx.translate(0, -scrollY * 0.1) // Parallax effect
      ctx.globalAlpha = 0.08 + Math.sin(time * 0.5) * 0.03
      
      for (let i = 0; i < cyberpunkGrid.length; i++) {
        for (let j = 0; j < cyberpunkGrid[i].length; j++) {
          const point = cyberpunkGrid[i][j]
          
          // Beautiful autonomous wave effects
          const waveX = Math.sin(time * 0.8 + i * 0.3) * 0.5
          const waveY = Math.cos(time * 0.6 + j * 0.4) * 0.3
          const energy = 0.3 + Math.sin(time * 1.2 + i * 0.2 + j * 0.15) * 0.2
          
          point.energy = energy
          point.active = energy > 0.2

          if (point.active) {
            ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${point.energy})`
            ctx.lineWidth = 0.5 + energy * 0.5
            
            // Draw flowing grid lines
            if (i < cyberpunkGrid.length - 1) {
              ctx.beginPath()
              ctx.moveTo(point.x + waveX, point.y + waveY)
              ctx.lineTo(cyberpunkGrid[i + 1][j].x + waveX, cyberpunkGrid[i + 1][j].y + waveY)
              ctx.stroke()
            }
            if (j < cyberpunkGrid[i].length - 1) {
              ctx.beginPath()
              ctx.moveTo(point.x + waveX, point.y + waveY)
              ctx.lineTo(cyberpunkGrid[i][j + 1].x + waveX, cyberpunkGrid[i][j + 1].y + waveY)
              ctx.stroke()
            }
          }
        }
      }
      ctx.restore()

      // 2. NEURAL NETWORK SYSTEM WITH 3D DEPTH PARALLAX
      ctx.globalAlpha = 1
      
      // Update neural activity with smooth autonomous patterns
      neuralNodes.forEach((node, i) => {
        node.pulse += 0.08
        node.energy = (Math.sin(node.pulse) + 1) / 2
        
        // Calculate 3D perspective based on Z position and scroll
        const depth = node.z + scrollY * 0.02
        const perspective = 1000
        const scale = perspective / (perspective + depth)
        
        // Beautiful autonomous activity waves
        const activityWave = Math.sin(time * 1.5 + i * 0.3) * 0.5 + 0.5
        node.activity = Math.max(0, activityWave * (0.3 + Math.sin(time * 0.8 + i * 0.1) * 0.4))

        // Smooth flowing movement instead of random jumps
        node.x += Math.sin(time * 0.4 + i * 0.2 + depth * 0.01) * 0.2
        node.y += Math.cos(time * 0.3 + i * 0.15 + depth * 0.01) * 0.15
        
        // Gentle Z movement for 3D depth
        node.z += Math.sin(time * 0.08 + i * 0.1) * 0.3
      })

      // Draw neural connections with 3D perspective and enhanced data flow
      neuralNodes.forEach((node, i) => {
        const nodeDepth = node.z + scrollY * 0.02
        const nodePerspective = 1000
        const nodeScale = nodePerspective / (nodePerspective + nodeDepth)
        const nodeScreenX = node.x * nodeScale
        const nodeScreenY = node.y * nodeScale
        
        node.connections.forEach(connectionIndex => {
          const targetNode = neuralNodes[connectionIndex]
          if (!targetNode) return

          const targetDepth = targetNode.z + scrollY * 0.02
          const targetScale = nodePerspective / (nodePerspective + targetDepth)
          const targetScreenX = targetNode.x * targetScale
          const targetScreenY = targetNode.y * targetScale

          const connectionActivity = (node.activity + targetNode.activity) / 2
          const depthAlpha = (nodeScale + targetScale) / 2
          
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${(0.3 + connectionActivity * 0.5) * depthAlpha})`
          ctx.lineWidth = (1 + connectionActivity * 2) * depthAlpha
          
          ctx.beginPath()
          ctx.moveTo(nodeScreenX, nodeScreenY)
          ctx.lineTo(targetScreenX, targetScreenY)
          ctx.stroke()

          // Enhanced animated data packets with 3D depth
          if (connectionActivity > 0.3) {
            const progress = (time * (2 + connectionActivity * 2) + i) % 1
            const packetX = nodeScreenX + (targetScreenX - nodeScreenX) * progress
            const packetY = nodeScreenY + (targetScreenY - nodeScreenY) * progress
            const packetDepth = nodeDepth + (targetDepth - nodeDepth) * progress
            const packetScale = nodePerspective / (nodePerspective + packetDepth)
            
            // Multiple packets for high activity
            const packetCount = Math.floor(connectionActivity * 3) + 1
            for (let p = 0; p < packetCount; p++) {
              const packetProgress = (progress + p * 0.3) % 1
              const pX = nodeScreenX + (targetScreenX - nodeScreenX) * packetProgress
              const pY = nodeScreenY + (targetScreenY - nodeScreenY) * packetProgress
              
              ctx.beginPath()
              ctx.arc(pX, pY, Math.max(0.1, 3 * packetScale), 0, Math.PI * 2)
              ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${connectionActivity * packetScale})`
              ctx.fill()
              
              // Add glow trail
              ctx.shadowColor = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${connectionActivity * 0.5})`
              ctx.shadowBlur = 6 * packetScale
              ctx.fill()
              ctx.shadowBlur = 0
            }
          }
        })
      })

      // Draw neural nodes with 3D perspective and enhanced effects
      neuralNodes.forEach(node => {
        const nodeDepth = node.z + scrollY * 0.02
        const nodePerspective = 1000
        const nodeScale = nodePerspective / (nodePerspective + nodeDepth)
        const nodeScreenX = node.x * nodeScale
        const nodeScreenY = node.y * nodeScale
        
        const baseSize = node.type === 'main' ? 8 : node.type === 'secondary' ? 6 : 4
        const size = baseSize * nodeScale
        const glowSize = (size + node.activity * 6) * nodeScale
        
        // Enhanced glow effect with depth
        ctx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${node.activity * nodeScale})`
        ctx.shadowBlur = glowSize
        
        ctx.beginPath()
        ctx.arc(nodeScreenX, nodeScreenY, Math.max(0.1, size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${(0.7 + node.energy * 0.3) * nodeScale})`
        ctx.fill()
        
        // Add pulsing ring for active nodes
        if (node.activity > 0.5) {
          const ringSize = Math.max(0.1, size + Math.sin(time * 5 + node.pulse) * 3)
          ctx.beginPath()
          ctx.arc(nodeScreenX, nodeScreenY, ringSize, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${node.activity * 0.5 * nodeScale})`
          ctx.lineWidth = Math.max(0.1, 2 * nodeScale)
          ctx.stroke()
        }
        
        ctx.shadowBlur = 0
      })

      // 3. SMOOTH DNA HELIX SYSTEM WITH FLOWING PARALLAX
      ctx.save()
      ctx.translate(0, -scrollY * 0.15) // Different parallax speed for depth
      
      dnaHelixes.forEach((helix, helixIndex) => {
        // Smooth rotation with subtle variations
        helix.rotation += 0.012 + Math.sin(time * 0.3 + helixIndex) * 0.005 + scrollProgress * 0.008
        
        // Beautiful breathing effect for radius
        const breathingFactor = 1 + Math.sin(time * 1.2 + helixIndex * 0.7) * 0.15
        
        // Update DNA points with smooth flowing motion
        helix.points.forEach(point => {
          const finalAngle = point.angle + helix.rotation
          const radius = point.radius * breathingFactor
          
          point.x = Math.cos(finalAngle) * radius
          point.z = Math.sin(finalAngle) * radius
        })

        // Draw smooth DNA strands with flowing effects
        for (let strand = 0; strand < 2; strand++) {
          const strandPoints = helix.points.filter(p => p.strand === strand)
          
          // Dynamic pulsing appearance
          const pulseFactor = 0.6 + Math.sin(time * 2 + helixIndex + strand) * 0.2
          const strandWidth = 2 + Math.sin(time * 1.5 + helixIndex) * 0.5
          
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${pulseFactor})`
          ctx.lineWidth = strandWidth
          ctx.beginPath()
          
          strandPoints.forEach((point, i) => {
            const screenX = helix.centerX + point.x
            const screenY = helix.centerY + point.y
            
            if (i === 0) ctx.moveTo(screenX, screenY)
            else ctx.lineTo(screenX, screenY)
          })
          ctx.stroke()

          // Subtle flowing glow
          ctx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${pulseFactor * 0.3})`
          ctx.shadowBlur = 3 + Math.sin(time * 2.5 + helixIndex) * 2
          ctx.stroke()
          ctx.shadowBlur = 0

          // Smooth base connections
          strandPoints.forEach((point, i) => {
            if (i % 4 === 0) {
              const otherStrand = helix.points.find(p => 
                Math.abs(p.baseY - point.baseY) < 5 && p.strand !== strand
              )
              
              if (otherStrand) {
                const connectionAlpha = 0.4 + Math.sin(time * 1.8 + i * 0.3) * 0.2
                ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${connectionAlpha})`
                ctx.lineWidth = 1 + Math.sin(time * 2.2 + i * 0.2) * 0.3
                ctx.beginPath()
                ctx.moveTo(helix.centerX + point.x, helix.centerY + point.y)
                ctx.lineTo(helix.centerX + otherStrand.x, helix.centerY + otherStrand.y)
                ctx.stroke()
                
                // Smooth pulsing points
                if (Math.sin(time * 3 + i * 0.5) > 0.7) {
                  ctx.beginPath()
                  ctx.arc(helix.centerX + point.x, helix.centerY + point.y, Math.max(0.1, 1.5 + Math.sin(time * 8 + i) * 0.5), 0, Math.PI * 2)
                  ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${connectionAlpha})`
                  ctx.fill()
                }
              }
            }
          })
        }
      })
      ctx.restore()

      // 4. SMOOTH FLOATING CODE MATRIX WITH GENTLE PARALLAX
      ctx.save()
      ctx.translate(0, -scrollY * 0.05) // Subtle parallax for background effect
      
      codeDrops.forEach((drop, dropIndex) => {
        // Smooth flowing speed with gentle variations
        const flowSpeed = drop.speed + scrollProgress * 1.5 + Math.sin(time * 0.8 + dropIndex * 0.2) * 0.3
        drop.y += flowSpeed
        
        // Gentle horizontal drift
        drop.x += Math.sin(time * 0.6 + dropIndex * 0.3) * 0.1
        
        if (drop.y > canvas.height + 100) {
          drop.y = -100
          drop.x = Math.random() * canvas.width
        }

        // Smooth font sizing with gentle pulsing
        const pulseFactor = 1 + Math.sin(time * 1.5 + dropIndex * 0.4) * 0.1
        const fontSize = drop.type === 'code' ? 12 * pulseFactor : 10 * pulseFactor
        ctx.font = `${fontSize}px monospace`
        
        drop.chars.forEach((char, i) => {
          const charY = drop.y - i * (20 + scrollProgress * 3)
          const alpha = drop.opacity * (1 - i / drop.chars.length)
          const flowingAlpha = alpha * (0.8 + Math.sin(time * 2 + dropIndex + i * 0.5) * 0.3)
          
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${flowingAlpha})`
          ctx.fillText(char, drop.x, charY)
          
          // Subtle trailing effect
          if (Math.sin(time * 4 + dropIndex + i) > 0.8) {
            ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha * 0.2})`
            ctx.fillText(char, drop.x + Math.sin(time * 6 + i) * 1, charY)
          }
        })
      })
      ctx.restore()

      // 5. SMOOTH AUTONOMOUS ENERGY WAVES
      if (Math.random() < (0.008 + scrollProgress * 0.01)) {
        const waveX = Math.random() * canvas.width
        const waveY = Math.random() * canvas.height - scrollY * 0.1
        
        const maxRadius = 80 + Math.sin(time * 1.2) * 30 + scrollProgress * 40
        
        for (let r = 0; r < maxRadius; r += 8) {
          const alpha = 0.3 * (1 - r/maxRadius) * (0.5 + Math.sin(time * 2) * 0.3)
          ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha})`
          ctx.lineWidth = 1 + Math.sin(time * 1.8) * 0.5
          ctx.beginPath()
          ctx.arc(waveX, waveY, r, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      // 6. GENTLE AMBIENT LIGHTING SYSTEM
      ctx.save()
      ctx.globalAlpha = 0.15 + scrollProgress * 0.1 + Math.sin(time * 0.8) * 0.05
      
      // Create gentle flowing light sources
      const lightX = canvas.width * 0.5 + Math.sin(time * 0.3) * canvas.width * 0.3
      const lightY = canvas.height * 0.5 + Math.cos(time * 0.2) * canvas.height * 0.2 - scrollY * 0.08
      const lightRadius = 250 + Math.sin(time * 1.5) * 100
      
      const lightGradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius)
      lightGradient.addColorStop(0, `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, 0.3)`)
      lightGradient.addColorStop(0.5, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.15)`)
      lightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.fillStyle = lightGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      // 7. FLOWING AMBIENT PARTICLES
      if (Math.random() < 0.05) {
        const particleCount = 3 + Math.floor(Math.random() * 4)
        
        for (let i = 0; i < particleCount; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = 1 + Math.random() * 2
          const alpha = 0.2 + Math.random() * 0.3
          
          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.1, size), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha})`
          ctx.fill()
          
          // Gentle sparkle
          ctx.shadowColor = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha * 0.5})`
          ctx.shadowBlur = 4
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDark, scrollY])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}