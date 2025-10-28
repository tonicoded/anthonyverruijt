'use client'

import { useState, useEffect } from 'react'

export function SkillRadar() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  const skills = [
    { name: 'React', level: 95, angle: 0 },
    { name: 'Swift', level: 85, angle: 60 },
    { name: 'Python', level: 88, angle: 120 },
    { name: 'Next.js', level: 90, angle: 180 },
    { name: 'TypeScript', level: 92, angle: 240 },
    { name: 'Design', level: 82, angle: 300 }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(phaseInterval)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('skill-radar')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const getPointPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180
    const x = 50 + radius * Math.cos(radian)
    const y = 50 + radius * Math.sin(radian)
    return { x, y }
  }

  return (
    <div id="skill-radar" className="flex justify-center items-center py-16">
      <div className="relative w-80 h-80">
        {/* Radar circles */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* Background circles */}
          {[20, 40, 60, 80].map((radius, index) => (
            <circle
              key={radius}
              cx="50"
              cy="50"
              r={radius / 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-stone-300 dark:text-stone-600"
              opacity={0.5}
            />
          ))}
          
          {/* Radar lines */}
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const end = getPointPosition(angle, 40)
            return (
              <line
                key={angle}
                x1="50"
                y1="50"
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth="0.2"
                className="text-stone-300 dark:text-stone-600"
                opacity={0.5}
              />
            )
          })}

          {/* Animated scanning line */}
          <line
            x1="50"
            y1="50"
            x2="90"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-stone-500 dark:text-stone-400"
            style={{
              transformOrigin: '50% 50%',
              transform: `rotate(${animationPhase * 120}deg)`,
              transition: 'transform 2s ease-in-out'
            }}
          />

          {/* Skill points */}
          {skills.map((skill, index) => {
            const position = getPointPosition(skill.angle, (skill.level / 100) * 35)
            return (
              <g key={skill.name}>
                <circle
                  cx={position.x}
                  cy={position.y}
                  r="1.5"
                  fill="currentColor"
                  className="text-stone-600 dark:text-stone-400"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `scale(${isVisible ? 1 : 0})`,
                    transition: `all 0.8s ease-out ${index * 0.2}s`
                  }}
                />
                
                {/* Skill label */}
                <text
                  x={position.x}
                  y={position.y - 3}
                  textAnchor="middle"
                  className="text-stone-700 dark:text-stone-300 text-xs font-medium"
                  style={{
                    fontSize: '3px',
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.8s ease-out ${index * 0.2 + 0.5}s`
                  }}
                >
                  {skill.name}
                </text>
                
                {/* Percentage */}
                <text
                  x={position.x}
                  y={position.y + 2}
                  textAnchor="middle"
                  className="text-stone-500 dark:text-stone-400"
                  style={{
                    fontSize: '2px',
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.8s ease-out ${index * 0.2 + 0.8}s`
                  }}
                >
                  {skill.level}%
                </text>
              </g>
            )
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-bold text-stone-800 dark:text-stone-200">
              Skills
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400">
              Radar
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}