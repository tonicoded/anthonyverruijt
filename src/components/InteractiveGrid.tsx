'use client'

import { useState, useEffect } from 'react'

export function InteractiveGrid() {
  const [hoveredCells, setHoveredCells] = useState<Set<number>>(new Set())
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set())

  // Create a grid of cells
  const gridSize = 40
  const totalCells = gridSize * gridSize

  useEffect(() => {
    // Randomly activate cells for ambient effect
    const interval = setInterval(() => {
      const randomCells = new Set<number>()
      for (let i = 0; i < 3; i++) {
        randomCells.add(Math.floor(Math.random() * totalCells))
      }
      setActiveCells(randomCells)
    }, 3000)

    return () => clearInterval(interval)
  }, [totalCells])

  const handleCellHover = (index: number) => {
    setHoveredCells(prev => new Set(prev).add(index))
    setTimeout(() => {
      setHoveredCells(prev => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    }, 1000)
  }

  return (
    <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
      <div 
        className="grid gap-px h-full w-full"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`
        }}
      >
        {Array.from({ length: totalCells }).map((_, index) => {
          const isHovered = hoveredCells.has(index)
          const isActive = activeCells.has(index)
          
          return (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isHovered || isActive
                  ? 'bg-stone-300 dark:bg-stone-600'
                  : 'bg-stone-100 dark:bg-stone-800'
              }`}
              style={{
                opacity: isHovered ? 0.8 : isActive ? 0.4 : 0.1
              }}
              onMouseEnter={() => handleCellHover(index)}
            />
          )
        })}
      </div>
    </div>
  )
}