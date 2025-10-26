'use client'

import { useState, useEffect, useRef } from 'react'
import { Wifi, Globe, Zap } from 'lucide-react'

interface ConnectionNode {
  id: string
  x: number
  y: number
  country: string
  flag: string
  type: 'server' | 'client'
  active: boolean
}

export function NetworkVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<ConnectionNode[]>([])
  const [connectionCount, setConnectionCount] = useState(0)
  const animationRef = useRef<number>()

  useEffect(() => {
    const countries = [
      { country: 'Netherlands', flag: '🇳🇱' },
      { country: 'Germany', flag: '🇩🇪' },
      { country: 'United States', flag: '🇺🇸' },
      { country: 'United Kingdom', flag: '🇬🇧' },
      { country: 'France', flag: '🇫🇷' },
      { country: 'Japan', flag: '🇯🇵' },
      { country: 'Canada', flag: '🇨🇦' },
      { country: 'Australia', flag: '🇦🇺' },
    ]

    // Create initial nodes
    const initialNodes: ConnectionNode[] = [
      // Server node (center)
      {
        id: 'server',
        x: 150,
        y: 75,
        country: 'Server (Amsterdam)',
        flag: '🏠',
        type: 'server',
        active: true
      }
    ]

    // Add client nodes
    for (let i = 0; i < 6; i++) {
      const country = countries[Math.floor(Math.random() * countries.length)]
      initialNodes.push({
        id: `client-${i}`,
        x: 50 + Math.random() * 200,
        y: 25 + Math.random() * 100,
        country: country.country,
        flag: country.flag,
        type: 'client',
        active: Math.random() > 0.3
      })
    }

    setNodes(initialNodes)
    setConnectionCount(initialNodes.filter(n => n.active && n.type === 'client').length)

    // Animation loop
    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      const serverNode = initialNodes.find(n => n.type === 'server')
      if (serverNode) {
        initialNodes.forEach(node => {
          if (node.type === 'client' && node.active) {
            // Animated connection line
            const time = Date.now() / 1000
            const opacity = (Math.sin(time * 2 + node.x) + 1) / 2 * 0.5 + 0.3
            
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`
            ctx.lineWidth = 2
            ctx.setLineDash([5, 5])
            ctx.lineDashOffset = -time * 10
            
            ctx.beginPath()
            ctx.moveTo(serverNode.x, serverNode.y)
            ctx.lineTo(node.x, node.y)
            ctx.stroke()
            
            // Data packets
            const packetProgress = (time * 0.5 + node.x * 0.01) % 1
            const packetX = serverNode.x + (node.x - serverNode.x) * packetProgress
            const packetY = serverNode.y + (node.y - serverNode.y) * packetProgress
            
            ctx.fillStyle = '#22c55e'
            ctx.beginPath()
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      // Draw nodes
      initialNodes.forEach(node => {
        if (node.type === 'server') {
          // Server node (larger, pulsing)
          const pulse = (Math.sin(Date.now() / 500) + 1) / 2 * 3 + 8
          ctx.fillStyle = '#3b82f6'
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2)
          ctx.fill()
          
          // Inner core
          ctx.fillStyle = '#1d4ed8'
          ctx.beginPath()
          ctx.arc(node.x, node.y, 6, 0, Math.PI * 2)
          ctx.fill()
        } else if (node.active) {
          // Client nodes
          ctx.fillStyle = '#22c55e'
          ctx.beginPath()
          ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
          ctx.fill()
          
          // Glow effect
          ctx.fillStyle = 'rgba(34, 197, 94, 0.3)'
          ctx.beginPath()
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Inactive nodes
          ctx.fillStyle = '#6b7280'
          ctx.beginPath()
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Randomly activate/deactivate nodes
    const interval = setInterval(() => {
      setNodes(prevNodes => {
        const newNodes = [...prevNodes]
        const clientNodes = newNodes.filter(n => n.type === 'client')
        const randomNode = clientNodes[Math.floor(Math.random() * clientNodes.length)]
        
        if (randomNode) {
          randomNode.active = Math.random() > 0.4
        }
        
        setConnectionCount(newNodes.filter(n => n.active && n.type === 'client').length)
        return newNodes
      })
    }, 3000)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-30">
      <div className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 dark:from-blue-100/90 dark:to-indigo-100/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-blue-700/50 dark:border-blue-300/50">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Globe size={16} className="text-blue-400 dark:text-blue-600" />
          <span className="text-white dark:text-blue-900 font-semibold text-sm">Network</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={300}
          height={150}
          className="bg-black/20 dark:bg-white/20 rounded mb-3"
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-white dark:text-blue-900 font-bold text-lg">{connectionCount}</div>
            <div className="text-blue-300 dark:text-blue-700">Active</div>
          </div>
          <div className="text-center">
            <div className="text-white dark:text-blue-900 font-bold text-lg">6</div>
            <div className="text-blue-300 dark:text-blue-700">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-bold text-sm">LIVE</div>
            <div className="text-blue-300 dark:text-blue-700">Status</div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-blue-700 dark:border-blue-300">
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-300 dark:text-blue-700">Server</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-blue-300 dark:text-blue-700">Clients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}