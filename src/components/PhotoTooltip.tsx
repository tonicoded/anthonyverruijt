'use client'

import { useState, useRef, useEffect } from 'react'
import { ProfileImage } from './ProfileImage'

interface PhotoTooltipProps {
  onPhotoClick: () => void
}

export function PhotoTooltip({ onPhotoClick }: PhotoTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const rotateX = (e.clientY - centerY) / 8
    const rotateY = (centerX - e.clientX) / 8
    
    setMousePosition({ x: rotateY, y: rotateX })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
    setShowTooltip(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowTooltip(true)
  }

  return (
    <div className="relative group perspective-1000">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onPhotoClick}
        className="w-24 h-24 sm:w-32 sm:h-32 block mx-auto cursor-pointer transform-gpu transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Ultra modern animated ring system */}
        <div className="absolute inset-0 rounded-full">
          {/* Outer scanning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin-slow">
            <div className="w-full h-full rounded-full border-2 border-dashed border-gray-400 dark:border-gray-500 opacity-30"></div>
          </div>
          
          {/* Middle pulse ring */}
          <div className="absolute inset-2 rounded-full border border-gray-300 dark:border-gray-600 opacity-50 animate-pulse"></div>
          
          {/* Inner glow ring */}
          <div className="absolute inset-4 rounded-full border border-gray-200 dark:border-gray-700 opacity-70"></div>
        </div>
        
        {/* Modern grid overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-20 dark:opacity-30">
          <div className="w-full h-full rounded-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px'
          }}></div>
        </div>
        
        {/* Main photo container with modern glass effect */}
        <div className="relative w-full h-full rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 p-1 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <ProfileImage />
            
            {/* Modern glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 dark:from-white/5 dark:via-transparent dark:to-white/10 rounded-full"></div>
            
            {/* Advanced scanning effect - ultra modern */}
            <div className={`absolute inset-0 ${isHovered ? 'animate-scan' : 'opacity-0'} transition-opacity duration-500`}>
              {/* Main scan line */}
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent absolute top-1/2 transform -translate-y-1/2 opacity-80"></div>
              {/* Secondary scan lines */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 dark:via-gray-300 to-transparent absolute top-1/2 transform -translate-y-1/2 mt-2 opacity-60"></div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 dark:via-gray-300 to-transparent absolute top-1/2 transform -translate-y-1/2 -mt-2 opacity-60"></div>
            </div>
            
            {/* Modern data visualization on hover */}
            {isHovered && (
              <>
                {/* Radar sweep effect */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute top-1/2 left-1/2 w-16 h-px bg-gradient-to-r from-gray-800 dark:from-white to-transparent transform -translate-x-1/2 -translate-y-1/2 animate-spin origin-left opacity-70"></div>
                </div>
                
                {/* Corner indicators */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-gray-600 dark:border-gray-400 opacity-60"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-gray-600 dark:border-gray-400 opacity-60"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-gray-600 dark:border-gray-400 opacity-60"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-gray-600 dark:border-gray-400 opacity-60"></div>
              </>
            )}
          </div>
        </div>
        
        {/* Modern tech indicators */}
        {isHovered && (
          <>
            {/* Data points - modern minimal */}
            <div className="absolute -top-1 -left-1 w-1 h-1 bg-gray-800 dark:bg-white rounded-full animate-float-1 opacity-90"></div>
            <div className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full animate-float-2 opacity-80"></div>
            <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-gray-600 dark:bg-gray-400 rounded-full animate-float-3 opacity-90"></div>
            <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-gray-800 dark:bg-white rounded-full animate-float-4 opacity-75"></div>
            
            {/* Signal indicators */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-px">
                <div className="w-px h-2 bg-gray-600 dark:bg-gray-400 animate-pulse"></div>
                <div className="w-px h-3 bg-gray-700 dark:bg-gray-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-px h-2 bg-gray-600 dark:bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            {/* Status dots */}
            <div className="absolute bottom-0 right-1/4 flex space-x-1">
              <div className="w-1 h-1 bg-gray-800 dark:bg-white rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </>
        )}
      </div>
      
      {/* Ultra modern tooltip */}
      {showTooltip && (
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in px-4">
          <div className="relative">
            {/* Modern tooltip container */}
            <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl text-black dark:text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-600 text-sm font-medium max-w-xs text-center relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 via-gray-800 dark:via-white to-gray-400"></div>
              
              {/* Content */}
              <div className="flex items-center gap-3 justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-1 h-1 bg-gray-800 dark:bg-white rounded-full animate-pulse"></div>
                  <div className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                
                <span className="font-semibold">Klik voor meer informatie over mij</span>
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1 h-1 bg-gray-800 dark:bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
              
              {/* Corner brackets */}
              <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-gray-400 dark:border-gray-500"></div>
              <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-gray-400 dark:border-gray-500"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-gray-400 dark:border-gray-500"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-gray-400 dark:border-gray-500"></div>
            </div>
            
            {/* Modern arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-300 dark:border-t-gray-600"></div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%) rotate(0deg); }
          100% { transform: translateY(200%) rotate(0deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -10px) rotate(90deg); }
          50% { transform: translate(-5px, -20px) rotate(180deg); }
          75% { transform: translate(-10px, -10px) rotate(270deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-8px, -5px) rotate(120deg); }
          66% { transform: translate(8px, -15px) rotate(240deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 10px) rotate(180deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-5px, 8px) rotate(-90deg); }
          50% { transform: translate(5px, 15px) rotate(-180deg); }
          75% { transform: translate(10px, 8px) rotate(-270deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-scan { animation: scan 2s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 4s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 3.5s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 4.5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .perspective-1000 { perspective: 1000px; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
        .animate-quantum-pulse { animation: quantum-pulse 2s ease-in-out infinite; }
        
        @keyframes quantum-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}