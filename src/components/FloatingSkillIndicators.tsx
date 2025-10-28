'use client'

import { useState, useEffect } from 'react'

export function FloatingSkillIndicators() {
  const [activeSkills, setActiveSkills] = useState<number[]>([])

  const skills = [
    { name: 'React', level: 95, x: 10, y: 20 },
    { name: 'Next.js', level: 90, x: 80, y: 15 },
    { name: 'Swift', level: 85, x: 15, y: 70 },
    { name: 'Python', level: 88, x: 75, y: 80 },
    { name: 'TypeScript', level: 92, x: 50, y: 30 },
    { name: 'Tailwind', level: 94, x: 65, y: 60 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomSkill = Math.floor(Math.random() * skills.length)
      setActiveSkills(prev => {
        const newActive = [...prev, randomSkill]
        if (newActive.length > 2) {
          newActive.shift()
        }
        return newActive
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [skills.length])

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className={`absolute transition-all duration-1000 ${
            activeSkills.includes(index) 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-90'
          }`}
          style={{
            left: `${skill.x}%`,
            top: `${skill.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm rounded-xl p-3 border border-stone-200 dark:border-stone-700 shadow-lg">
            <div className="text-xs font-medium text-stone-800 dark:text-stone-200 mb-1">
              {skill.name}
            </div>
            <div className="w-16 h-1 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-stone-600 to-stone-800 dark:from-stone-400 dark:to-stone-200 rounded-full transition-all duration-1000"
                style={{ 
                  width: activeSkills.includes(index) ? `${skill.level}%` : '0%' 
                }}
              />
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              {skill.level}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}