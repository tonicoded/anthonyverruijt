'use client'

import { useEffect, useRef, useState } from 'react'

export function Cool3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isDark, setIsDark] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 })
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

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

    // Enhanced mouse tracking with velocity and scroll
    const handleMouseMove = (e: MouseEvent) => {
      const newMousePos = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      }
      
      // Calculate mouse velocity for dynamic effects
      setMouseVelocity({
        x: (newMousePos.x - lastMousePos.x) * 10,
        y: (newMousePos.y - lastMousePos.y) * 10
      })
      
      setLastMousePos(mousePos)
      setMousePos(newMousePos)
    }
    
    // Scroll tracking for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
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

    // MOUSE TRAIL PARTICLE SYSTEM
    interface MouseTrail {
      x: number
      y: number
      life: number
      maxLife: number
      size: number
      velocity: { x: number, y: number }
    }

    const mouseTrails: MouseTrail[] = []

    // EPIC ANIMATION LOOP WITH MULTIPLE LAYERED EFFECTS
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      const baseColor = isDark ? [214, 211, 209] : [87, 83, 78]
      const accentColor = isDark ? [168, 162, 158] : [120, 113, 108]
      
      // Calculate scroll-based parallax effects
      const scrollProgress = Math.min(1, scrollY / 1000)
      const parallaxIntensity = scrollProgress * 0.5
      
      // Add dynamic mouse trail particles
      if (Math.random() < 0.3 && (Math.abs(mouseVelocity.x) > 0.01 || Math.abs(mouseVelocity.y) > 0.01)) {
        mouseTrails.push({
          x: mousePos.x * canvas.width + (Math.random() - 0.5) * 30,
          y: mousePos.y * canvas.height + (Math.random() - 0.5) * 30,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          size: 2 + Math.random() * 4,
          velocity: {
            x: mouseVelocity.x * 0.1 + (Math.random() - 0.5) * 2,
            y: mouseVelocity.y * 0.1 + (Math.random() - 0.5) * 2
          }
        })
      }

      // Update and draw mouse trail particles
      for (let i = mouseTrails.length - 1; i >= 0; i--) {
        const trail = mouseTrails[i]
        trail.life++
        trail.x += trail.velocity.x
        trail.y += trail.velocity.y
        trail.velocity.x *= 0.98
        trail.velocity.y *= 0.98

        if (trail.life > trail.maxLife) {
          mouseTrails.splice(i, 1)
          continue
        }

        const alpha = 1 - (trail.life / trail.maxLife)
        const size = trail.size * alpha
        
        ctx.save()
        ctx.globalAlpha = alpha * 0.8
        ctx.beginPath()
        ctx.arc(trail.x, trail.y, Math.max(0.1, size), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha})`
        ctx.fill()
        
        // Add glow effect
        ctx.shadowColor = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha * 0.5})`
        ctx.shadowBlur = size * 2
        ctx.fill()
        ctx.restore()
      }

      // 1. CYBERPUNK GRID BACKGROUND WITH SCROLL PARALLAX
      ctx.save()
      ctx.translate(0, -scrollY * 0.1) // Parallax effect
      ctx.globalAlpha = 0.1 + scrollProgress * 0.1
      
      for (let i = 0; i < cyberpunkGrid.length; i++) {
        for (let j = 0; j < cyberpunkGrid[i].length; j++) {
          const point = cyberpunkGrid[i][j]
          
          // Enhanced ripple effect from mouse with velocity
          const mouseDistance = Math.sqrt(
            Math.pow(point.x - mousePos.x * canvas.width, 2) +
            Math.pow(point.y - mousePos.y * canvas.height, 2)
          )
          
          const velocityMagnitude = Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y)
          const rippleRadius = 150 + velocityMagnitude * 100
          
          if (mouseDistance < rippleRadius) {
            point.active = true
            point.energy = Math.max(0.8, 1 - mouseDistance / rippleRadius) * (1 + velocityMagnitude)
            point.ripple = time * (5 + velocityMagnitude * 10)
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
      ctx.restore()

      // 2. NEURAL NETWORK SYSTEM WITH 3D DEPTH PARALLAX
      ctx.globalAlpha = 1
      
      // Update neural activity with 3D depth and parallax
      neuralNodes.forEach((node, i) => {
        node.pulse += 0.1
        node.energy = (Math.sin(node.pulse) + 1) / 2
        
        // Calculate 3D perspective based on Z position and scroll
        const depth = node.z + scrollY * 0.02
        const perspective = 1000
        const scale = perspective / (perspective + depth)
        
        // Enhanced mouse interaction with 3D awareness
        const projectedX = node.x * scale
        const projectedY = node.y * scale
        const mouseDistance = Math.sqrt(
          Math.pow(projectedX - mousePos.x * canvas.width, 2) +
          Math.pow(projectedY - mousePos.y * canvas.height, 2)
        )
        
        const velocityMagnitude = Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y)
        const interactionRadius = 100 * scale + velocityMagnitude * 200
        
        if (mouseDistance < interactionRadius) {
          node.activity = Math.min(1, node.activity + 0.05 + velocityMagnitude * 0.1)
          
          // Push nodes away from fast mouse movement
          if (velocityMagnitude > 0.1) {
            const pushX = (projectedX - mousePos.x * canvas.width) * velocityMagnitude * 0.001
            const pushY = (projectedY - mousePos.y * canvas.height) * velocityMagnitude * 0.001
            node.x += pushX / scale
            node.y += pushY / scale
          }
        } else {
          node.activity *= 0.98
        }

        // Enhanced floating with depth-based parallax
        node.x += Math.sin(time * 0.5 + i + depth * 0.01) * (0.3 + depth * 0.001)
        node.y += Math.cos(time * 0.3 + i + depth * 0.01) * (0.2 + depth * 0.001)
        
        // Scroll-based Z movement for 3D parallax
        node.z += Math.sin(time * 0.1 + i) * 0.5
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

      // 3. DNA HELIX SYSTEM WITH SCROLL PARALLAX AND MOUSE INTERACTION
      ctx.save()
      ctx.translate(0, -scrollY * 0.15) // Different parallax speed for depth
      
      dnaHelixes.forEach((helix, helixIndex) => {
        // Dynamic rotation speed based on scroll and mouse velocity
        const velocityMagnitude = Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y)
        helix.rotation += 0.01 + scrollProgress * 0.02 + velocityMagnitude * 0.05
        
        // Mouse distance to helix center for interaction
        const helixDistance = Math.sqrt(
          Math.pow(helix.centerX - mousePos.x * canvas.width, 2) +
          Math.pow(helix.centerY - mousePos.y * canvas.height, 2)
        )
        const isInteracting = helixDistance < 200
        
        // Update DNA points with mouse interaction
        helix.points.forEach(point => {
          const finalAngle = point.angle + helix.rotation
          let radius = point.radius
          
          // Expand helix when mouse is near
          if (isInteracting) {
            const expansionFactor = 1 + (1 - helixDistance / 200) * 0.5 + velocityMagnitude * 2
            radius *= expansionFactor
          }
          
          point.x = Math.cos(finalAngle) * radius
          point.z = Math.sin(finalAngle) * radius
        })

        // Draw enhanced DNA strands with interaction effects
        for (let strand = 0; strand < 2; strand++) {
          const strandPoints = helix.points.filter(p => p.strand === strand)
          
          // Dynamic strand appearance based on interaction
          const strandAlpha = isInteracting ? 0.9 : 0.6
          const strandWidth = isInteracting ? 3 + velocityMagnitude * 5 : 2
          
          ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${strandAlpha})`
          ctx.lineWidth = strandWidth
          ctx.beginPath()
          
          strandPoints.forEach((point, i) => {
            const screenX = helix.centerX + point.x
            const screenY = helix.centerY + point.y
            
            if (i === 0) ctx.moveTo(screenX, screenY)
            else ctx.lineTo(screenX, screenY)
          })
          ctx.stroke()

          // Add glow effect when interacting
          if (isInteracting) {
            ctx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.5)`
            ctx.shadowBlur = 8 + velocityMagnitude * 10
            ctx.stroke()
            ctx.shadowBlur = 0
          }

          // Enhanced base connections with interaction
          strandPoints.forEach((point, i) => {
            if (i % 4 === 0) {
              const otherStrand = helix.points.find(p => 
                Math.abs(p.baseY - point.baseY) < 5 && p.strand !== strand
              )
              
              if (otherStrand) {
                const connectionAlpha = isInteracting ? 0.8 : 0.4
                ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${connectionAlpha})`
                ctx.lineWidth = isInteracting ? 2 : 1
                ctx.beginPath()
                ctx.moveTo(helix.centerX + point.x, helix.centerY + point.y)
                ctx.lineTo(helix.centerX + otherStrand.x, helix.centerY + otherStrand.y)
                ctx.stroke()
                
                // Pulsing connection points
                if (isInteracting && Math.random() < 0.1) {
                  ctx.beginPath()
                  ctx.arc(helix.centerX + point.x, helix.centerY + point.y, Math.max(0.1, 2 + Math.sin(time * 10) * 1), 0, Math.PI * 2)
                  ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${connectionAlpha})`
                  ctx.fill()
                }
              }
            }
          })
        }
      })
      ctx.restore()

      // 4. ENHANCED FLOATING CODE MATRIX WITH PARALLAX
      ctx.save()
      ctx.translate(0, -scrollY * 0.05) // Subtle parallax for background effect
      
      codeDrops.forEach((drop, dropIndex) => {
        // Dynamic speed based on scroll and mouse proximity
        const mouseDistance = Math.sqrt(
          Math.pow(drop.x - mousePos.x * canvas.width, 2) +
          Math.pow(drop.y - mousePos.y * canvas.height, 2)
        )
        
        const velocityMagnitude = Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y)
        const dynamicSpeed = drop.speed + scrollProgress * 2 + (mouseDistance < 150 ? velocityMagnitude * 5 : 0)
        
        drop.y += dynamicSpeed
        
        // Add horizontal drift near mouse
        if (mouseDistance < 200) {
          const driftX = (mousePos.x * canvas.width - drop.x) * 0.002
          drop.x += driftX + mouseVelocity.x * 10
        }
        
        if (drop.y > canvas.height + 100) {
          drop.y = -100
          drop.x = Math.random() * canvas.width
        }

        // Dynamic font size and glow based on interaction
        const isNearMouse = mouseDistance < 150
        const fontSize = drop.type === 'code' ? (isNearMouse ? 14 + velocityMagnitude * 5 : 12) : (isNearMouse ? 12 : 10)
        ctx.font = `${fontSize}px monospace`
        
        drop.chars.forEach((char, i) => {
          const charY = drop.y - i * (20 + scrollProgress * 5)
          const alpha = drop.opacity * (1 - i / drop.chars.length)
          const enhancedAlpha = isNearMouse ? alpha * (1 + velocityMagnitude) : alpha
          
          // Add glow effect for nearby text
          if (isNearMouse) {
            ctx.shadowColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${enhancedAlpha * 0.5})`
            ctx.shadowBlur = 5 + velocityMagnitude * 10
          }
          
          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${enhancedAlpha})`
          ctx.fillText(char, drop.x, charY)
          
          ctx.shadowBlur = 0
          
          // Add matrix-like trailing effect
          if (Math.random() < 0.05 && isNearMouse) {
            ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha * 0.3})`
            ctx.fillText(char, drop.x + Math.sin(time * 10 + i) * 2, charY)
          }
        })
      })
      ctx.restore()

      // 5. ENHANCED INTERACTIVE ENERGY WAVES WITH SCROLL EFFECTS
      const velocityMagnitude = Math.sqrt(mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y)
      
      // Create more waves based on mouse velocity and scroll
      if (Math.random() < (0.03 + velocityMagnitude * 0.2 + scrollProgress * 0.05)) {
        const waveX = mousePos.x * canvas.width + (Math.random() - 0.5) * 200
        const waveY = mousePos.y * canvas.height + (Math.random() - 0.5) * 200 - scrollY * 0.1
        
        const maxRadius = 100 + velocityMagnitude * 200 + scrollProgress * 50
        const waveSpeed = 1 + velocityMagnitude * 2
        
        for (let r = 0; r < maxRadius; r += 10 * waveSpeed) {
          const alpha = 0.5 * (1 - r/maxRadius) * (1 + velocityMagnitude)
          ctx.strokeStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha})`
          ctx.lineWidth = 1 + velocityMagnitude * 3
          ctx.beginPath()
          ctx.arc(waveX, waveY, r, 0, Math.PI * 2)
          ctx.stroke()
          
          // Add inner glow for high velocity
          if (velocityMagnitude > 0.1) {
            ctx.shadowColor = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${alpha * 0.5})`
            ctx.shadowBlur = 5 + velocityMagnitude * 15
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        }
      }

      // 6. NEW: DYNAMIC LIGHTING SYSTEM
      ctx.save()
      ctx.globalAlpha = 0.3 + scrollProgress * 0.2
      
      // Create dynamic light source following mouse with scroll influence
      const lightX = mousePos.x * canvas.width
      const lightY = mousePos.y * canvas.height - scrollY * 0.08
      const lightRadius = 300 + velocityMagnitude * 400 + Math.sin(time * 2) * 50
      
      const lightGradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius)
      lightGradient.addColorStop(0, `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${0.4 + velocityMagnitude})`)
      lightGradient.addColorStop(0.5, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.2 + scrollProgress * 0.3})`)
      lightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.fillStyle = lightGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      // 7. NEW: PARTICLE EXPLOSIONS ON FAST MOUSE MOVEMENT
      if (velocityMagnitude > 0.2) {
        const explosionX = mousePos.x * canvas.width
        const explosionY = mousePos.y * canvas.height
        const particleCount = Math.floor(velocityMagnitude * 20)
        
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2
          const distance = Math.random() * 50 + 20
          const x = explosionX + Math.cos(angle) * distance
          const y = explosionY + Math.sin(angle) * distance
          
          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.1, 2 + Math.random() * 3), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${velocityMagnitude})`
          ctx.fill()
          
          // Add sparkle effect
          ctx.shadowColor = `rgba(${accentColor[0]}, ${accentColor[1]}, ${accentColor[2]}, ${velocityMagnitude * 0.5})`
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDark, mousePos, scrollY, mouseVelocity, lastMousePos])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}