'use client'

import { useEffect, useRef } from 'react'

interface Point3D {
  x: number
  y: number
  z: number
}

interface Point2D {
  x: number
  y: number
}

interface Edge {
  from: number
  to: number
}

interface WireframeObject {
  vertices: Point3D[]
  edges: Edge[]
  position: Point3D
  rotation: Point3D
  rotationSpeed: Point3D
  scale: number
  opacity: number
}

export function Wireframe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const objectsRef = useRef<WireframeObject[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Create cube vertices
    const createCube = (): { vertices: Point3D[], edges: Edge[] } => ({
      vertices: [
        { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
        { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
        { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
      ],
      edges: [
        { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 0 },
        { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 4 },
        { from: 0, to: 4 }, { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 }
      ]
    })

    // Create octahedron vertices
    const createOctahedron = (): { vertices: Point3D[], edges: Edge[] } => ({
      vertices: [
        { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
        { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }
      ],
      edges: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 }, { from: 0, to: 5 },
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 1, to: 5 },
        { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 3, to: 4 }, { from: 3, to: 5 }
      ]
    })

    // Create tetrahedron vertices
    const createTetrahedron = (): { vertices: Point3D[], edges: Edge[] } => ({
      vertices: [
        { x: 1, y: 1, z: 1 }, { x: -1, y: -1, z: 1 },
        { x: -1, y: 1, z: -1 }, { x: 1, y: -1, z: -1 }
      ],
      edges: [
        { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }
      ]
    })

    const createWireframeObject = (): WireframeObject => {
      const shapes = [createCube(), createOctahedron(), createTetrahedron()]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      
      return {
        ...shape,
        position: {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200 + 100
        },
        rotation: {
          x: Math.random() * Math.PI * 2,
          y: Math.random() * Math.PI * 2,
          z: Math.random() * Math.PI * 2
        },
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03
        },
        scale: Math.random() * 60 + 30,
        opacity: Math.random() * 0.8 + 0.3
      }
    }

    const initObjects = () => {
      const objectCount = Math.min(12, Math.floor(canvas.width / 150))
      objectsRef.current = Array.from({ length: objectCount }, createWireframeObject)
    }

    // 3D rotation matrices
    const rotateX = (point: Point3D, angle: number): Point3D => ({
      x: point.x,
      y: point.y * Math.cos(angle) - point.z * Math.sin(angle),
      z: point.y * Math.sin(angle) + point.z * Math.cos(angle)
    })

    const rotateY = (point: Point3D, angle: number): Point3D => ({
      x: point.x * Math.cos(angle) + point.z * Math.sin(angle),
      y: point.y,
      z: -point.x * Math.sin(angle) + point.z * Math.cos(angle)
    })

    const rotateZ = (point: Point3D, angle: number): Point3D => ({
      x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
      y: point.x * Math.sin(angle) + point.y * Math.cos(angle),
      z: point.z
    })

    // Project 3D point to 2D screen coordinates
    const project = (point: Point3D, object: WireframeObject): Point2D => {
      const distance = 400
      const scale = distance / (distance + point.z)
      return {
        x: object.position.x + point.x * scale,
        y: object.position.y + point.y * scale
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(250, 250, 249, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      objectsRef.current.forEach((object, index) => {
        // Update rotation
        object.rotation.x += object.rotationSpeed.x
        object.rotation.y += object.rotationSpeed.y
        object.rotation.z += object.rotationSpeed.z

        // Transform vertices
        const transformedVertices = object.vertices.map(vertex => {
          // Scale vertex
          let transformed = {
            x: vertex.x * object.scale,
            y: vertex.y * object.scale,
            z: vertex.z * object.scale
          }

          // Apply rotations
          transformed = rotateX(transformed, object.rotation.x)
          transformed = rotateY(transformed, object.rotation.y)
          transformed = rotateZ(transformed, object.rotation.z)

          return transformed
        })

        // Project to 2D and draw edges
        const projectedVertices = transformedVertices.map(vertex => 
          project(vertex, object)
        )

        // Calculate depth for opacity variation
        const avgZ = transformedVertices.reduce((sum, v) => sum + v.z, 0) / transformedVertices.length
        const depthOpacity = Math.max(0.1, 1 - Math.abs(avgZ) / 200)
        const finalOpacity = object.opacity * depthOpacity

        // Set line style with proper contrast for light/dark mode
        ctx.strokeStyle = `rgba(100, 100, 100, ${finalOpacity * 0.6})`
        ctx.lineWidth = 2
        ctx.shadowColor = `rgba(100, 100, 100, ${finalOpacity * 0.3})`
        ctx.shadowBlur = 3

        // Draw edges
        object.edges.forEach(edge => {
          const start = projectedVertices[edge.from]
          const end = projectedVertices[edge.to]

          // Skip if either point is outside reasonable bounds
          if (start.x < -100 || start.x > canvas.width + 100 || 
              start.y < -100 || start.y > canvas.height + 100 ||
              end.x < -100 || end.x > canvas.width + 100 || 
              end.y < -100 || end.y > canvas.height + 100) {
            return
          }

          ctx.beginPath()
          ctx.moveTo(start.x, start.y)
          ctx.lineTo(end.x, end.y)
          ctx.stroke()
        })

        // Draw vertices as small dots with proper contrast
        ctx.shadowBlur = 0
        projectedVertices.forEach(vertex => {
          if (vertex.x >= -50 && vertex.x <= canvas.width + 50 && 
              vertex.y >= -50 && vertex.y <= canvas.height + 50) {
            ctx.fillStyle = `rgba(120, 120, 120, ${finalOpacity * 0.8})`
            ctx.beginPath()
            ctx.arc(vertex.x, vertex.y, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        // Drift objects slowly
        object.position.x += (Math.random() - 0.5) * 0.5
        object.position.y += (Math.random() - 0.5) * 0.5

        // Reset objects that drift too far
        if (object.position.x < -200 || object.position.x > canvas.width + 200 ||
            object.position.y < -200 || object.position.y > canvas.height + 200) {
          objectsRef.current[index] = createWireframeObject()
        }

        // Occasionally change rotation speed for dynamic movement
        if (Math.random() < 0.002) {
          object.rotationSpeed.x += (Math.random() - 0.5) * 0.005
          object.rotationSpeed.y += (Math.random() - 0.5) * 0.005
          object.rotationSpeed.z += (Math.random() - 0.5) * 0.005
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initObjects()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initObjects()
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
      className="fixed inset-0 pointer-events-none z-5 opacity-60 dark:opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}