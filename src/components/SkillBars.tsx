'use client'

import { useState, useEffect } from 'react'

interface Skill {
  name: string
  level: number
  color: string
  years: number
}

export function SkillBars() {
  const [isVisible, setIsVisible] = useState(false)
  
  const skills: Skill[] = [
    { name: 'Swift/iOS', level: 95, color: '#FA7343', years: 8 },
    { name: 'React/Next.js', level: 90, color: '#61DAFB', years: 6 },
    { name: 'TypeScript', level: 88, color: '#3178C6', years: 5 },
    { name: 'Python', level: 85, color: '#3776AB', years: 10 },
    { name: 'Node.js', level: 82, color: '#339933', years: 4 },
    { name: 'CSS/Tailwind', level: 92, color: '#1572B6', years: 12 },
  ]

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold text-stone-700 dark:text-stone-300 mb-6 uppercase tracking-wide">
        Vaardigheden
      </h4>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {skill.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {skill.years} jaar
                </span>
                <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                  {skill.level}%
                </span>
              </div>
            </div>
            
            {/* Skill bar */}
            <div className="relative h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{
                  width: isVisible ? `${skill.level}%` : '0%',
                  backgroundColor: skill.color,
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Animated shine effect */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`,
                    animationName: isVisible ? 'shimmer' : 'none',
                    animationDuration: '2s',
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDelay: `${index * 200 + 1000}ms`
                  }}
                />
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}