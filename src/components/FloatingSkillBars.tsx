'use client'

import { useState, useEffect } from 'react'

interface Skill {
  name: string
  percentage: number
  color: string
  icon: string
}

export function FloatingSkillBars() {
  const [isVisible, setIsVisible] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    const interval = setInterval(() => setTime(prev => prev + 1), 100)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const skills: Skill[] = [
    { name: 'iOS Development', percentage: 95, color: '#FA7343', icon: '📱' },
    { name: 'React/Next.js', percentage: 90, color: '#61DAFB', icon: '⚛️' },
    { name: 'TypeScript', percentage: 88, color: '#3178C6', icon: '🔷' },
    { name: 'Python', percentage: 85, color: '#3776AB', icon: '🐍' },
    { name: 'UI/UX Design', percentage: 80, color: '#FF6B6B', icon: '🎨' },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-30 hidden lg:block">
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group relative"
            style={{
              animation: `slideInRight 0.8s ease-out ${index * 0.2}s both`
            }}
          >
            {/* Floating container */}
            <div className="relative">
              {/* Glowing background */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-30"
                style={{
                  background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`,
                  transform: `scale(${1 + 0.2 * Math.sin(time * 0.1 + index)})`
                }}
              />
              
              {/* Main skill bar */}
              <div className="relative bg-white/10 dark:bg-stone-800/20 backdrop-blur-md rounded-full border border-white/20 dark:border-stone-700/30 p-3 hover:scale-105 transition-all duration-300">
                {/* Icon */}
                <div className="flex items-center justify-center w-8 h-8 mb-2">
                  <span className="text-lg">{skill.icon}</span>
                </div>
                
                {/* Circular progress */}
                <div className="relative w-16 h-16 mx-auto">
                  {/* Background circle */}
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke={skill.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${skill.percentage * 0.88} 88`}
                      style={{
                        filter: `drop-shadow(0 0 6px ${skill.color})`,
                        animation: `drawCircle 2s ease-out ${index * 0.3}s both`
                      }}
                    />
                  </svg>
                  
                  {/* Percentage text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-xs font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.percentage}%
                    </span>
                  </div>
                  
                  {/* Pulsing dot */}
                  <div 
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: skill.color,
                      boxShadow: `0 0 10px ${skill.color}`,
                      top: '2px',
                      left: '50%',
                      transform: `translateX(-50%) rotate(${skill.percentage * 3.6}deg) translateY(14px)`,
                      animation: 'pulse 2s infinite'
                    }}
                  />
                </div>
                
                {/* Skill name */}
                <div className="text-center mt-2">
                  <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">
                    {skill.name.split(' ')[0]}
                  </span>
                </div>
              </div>
              
              {/* Expanded tooltip on hover */}
              <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div 
                  className="bg-white/90 dark:bg-stone-800/90 backdrop-blur-md rounded-lg px-3 py-2 border shadow-xl whitespace-nowrap"
                  style={{
                    borderColor: skill.color + '40',
                    boxShadow: `0 0 20px ${skill.color}20`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{skill.icon}</span>
                    <div>
                      <div 
                        className="font-semibold text-sm"
                        style={{ color: skill.color }}
                      >
                        {skill.name}
                      </div>
                      <div className="text-xs text-stone-600 dark:text-stone-400">
                        {skill.percentage}% expertise
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div 
                    className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-t-4 border-b-4 border-t-transparent border-b-transparent"
                    style={{ borderLeftColor: skill.color + '60' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes drawCircle {
          from {
            stroke-dasharray: 0 88;
          }
        }
      `}</style>
    </div>
  )
}