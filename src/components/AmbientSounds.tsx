'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export function AmbientSounds() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainNodesRef = useRef<GainNode[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for dark mode changes
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  const createAmbientTone = useCallback((frequency: number, volume: number, type: OscillatorType = 'sine') => {
    const context = initAudio()
    if (!context) return null

    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(context.destination)
    
    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    gainNode.gain.setValueAtTime(0, context.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 2)
    
    return { oscillator, gainNode }
  }, [initAudio])

  const startAmbientSounds = useCallback(() => {
    if (isPlaying) return

    try {
      const context = initAudio()
      if (!context) return

      // Clear existing oscillators
      oscillatorsRef.current.forEach(osc => osc.stop())
      oscillatorsRef.current = []
      gainNodesRef.current = []

      const baseVolume = 0.02

      if (isDarkMode) {
        // Dark mode: Mysterious, spacey ambient sounds
        const frequencies = [
          { freq: 55, vol: baseVolume * 0.8, type: 'sine' as OscillatorType }, // Deep bass
          { freq: 110, vol: baseVolume * 0.6, type: 'triangle' as OscillatorType }, // Sub bass
          { freq: 220, vol: baseVolume * 0.4, type: 'sine' as OscillatorType }, // Mid tone
          { freq: 440, vol: baseVolume * 0.3, type: 'sine' as OscillatorType }, // Higher harmonics
          { freq: 660, vol: baseVolume * 0.2, type: 'triangle' as OscillatorType }, // Ethereal layer
        ]

        frequencies.forEach(({ freq, vol, type }) => {
          const sound = createAmbientTone(freq, vol, type)
          if (sound) {
            oscillatorsRef.current.push(sound.oscillator)
            gainNodesRef.current.push(sound.gainNode)
            sound.oscillator.start()
          }
        })
      } else {
        // Light mode: Gentle, calming tones
        const frequencies = [
          { freq: 261.63, vol: baseVolume * 0.5, type: 'sine' as OscillatorType }, // C4
          { freq: 329.63, vol: baseVolume * 0.4, type: 'sine' as OscillatorType }, // E4
          { freq: 392, vol: baseVolume * 0.3, type: 'triangle' as OscillatorType }, // G4
          { freq: 523.25, vol: baseVolume * 0.25, type: 'sine' as OscillatorType }, // C5
        ]

        frequencies.forEach(({ freq, vol, type }) => {
          const sound = createAmbientTone(freq, vol, type)
          if (sound) {
            oscillatorsRef.current.push(sound.oscillator)
            gainNodesRef.current.push(sound.gainNode)
            sound.oscillator.start()
          }
        })
      }

      setIsPlaying(true)

      // Add subtle frequency modulation for organic feel
      oscillatorsRef.current.forEach((osc, index) => {
        const modulator = context.createOscillator()
        const modulatorGain = context.createGain()
        
        modulator.connect(modulatorGain)
        modulatorGain.connect(osc.frequency)
        
        modulator.frequency.setValueAtTime(0.1 + index * 0.05, context.currentTime)
        modulatorGain.gain.setValueAtTime(isDarkMode ? 2 : 1, context.currentTime)
        
        modulator.start()
      })

    } catch (error) {
      console.log('Ambient audio not supported')
    }
  }, [isPlaying, isDarkMode, createAmbientTone, initAudio])

  const stopAmbientSounds = useCallback(() => {
    if (!isPlaying) return

    gainNodesRef.current.forEach(gainNode => {
      const context = audioContextRef.current
      if (context) {
        gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 1)
      }
    })

    setTimeout(() => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop()
        } catch (e) {
          // Oscillator may already be stopped
        }
      })
      oscillatorsRef.current = []
      gainNodesRef.current = []
      setIsPlaying(false)
    }, 1000)
  }, [isPlaying])

  const toggleAmbientSounds = useCallback(() => {
    if (isPlaying) {
      stopAmbientSounds()
    } else {
      startAmbientSounds()
    }
  }, [isPlaying, startAmbientSounds, stopAmbientSounds])

  // Start ambient sounds when dark mode changes
  useEffect(() => {
    if (isPlaying) {
      stopAmbientSounds()
      setTimeout(startAmbientSounds, 1500)
    }
  }, [isDarkMode])

  // Auto-start after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      startAmbientSounds()
    }, 3000)

    return () => clearTimeout(timer)
  }, [startAmbientSounds])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbientSounds()
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close()
      }
    }
  }, [stopAmbientSounds])

  return (
    <button
      onClick={toggleAmbientSounds}
      className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-slate-500/30 hover:scale-110 transition-all duration-300 premium-glow"
      title={isPlaying ? 'Mute ambient sounds' : 'Play ambient sounds'}
    >
      <div className="relative">
        <div className={`w-5 h-5 rounded-full transition-colors duration-300 ${
          isPlaying 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 dark:from-slate-500 dark:to-slate-400' 
            : 'bg-gray-400 dark:bg-gray-600'
        }`}>
          {isPlaying && (
            <>
              <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-75"></div>
              <div className="absolute inset-0 rounded-full bg-current animate-pulse"></div>
            </>
          )}
        </div>
        
        {/* Sound waves visualization */}
        {isPlaying && (
          <div className="absolute -right-1 top-1/2 transform -translate-y-1/2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute w-1 bg-gray-400 dark:bg-slate-400 rounded-full animate-pulse"
                style={{
                  height: `${8 + i * 4}px`,
                  right: `${i * 3}px`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  )
}