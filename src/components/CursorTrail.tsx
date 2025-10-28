'use client'

import { useState, useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  id: number
}

export function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const idCounter = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++
      }

      setTrail(prev => {
        const newTrail = [newPoint, ...prev.slice(0, 8)]
        return newTrail
      })
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setTrail([])
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(0, -1))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-stone-400 dark:bg-stone-500 rounded-full transition-opacity duration-300"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: Math.max(0, 1 - index * 0.15),
            transform: `scale(${Math.max(0.3, 1 - index * 0.1)})`
          }}
        />
      ))}
    </div>
  )
}