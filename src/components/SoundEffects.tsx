'use client'

import { useEffect, useRef, useCallback } from 'react'

interface SoundEffectsProps {
  enabled?: boolean
}

export function SoundEffects({ enabled = true }: SoundEffectsProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    if (!enabled) return

    // Initialize Web Audio API
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        gainNodeRef.current = audioContextRef.current.createGain()
        gainNodeRef.current.connect(audioContextRef.current.destination)
        gainNodeRef.current.gain.value = 0.1 // Low volume
      } catch (error) {
        console.log('Audio not supported')
      }
    }

    initAudio()

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [enabled])

  const createTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || !gainNodeRef.current || !enabled) return

    const oscillator = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()

    oscillator.connect(envelope)
    envelope.connect(gainNodeRef.current)

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)

    // Envelope for smooth sound
    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    envelope.gain.linearRampToValueAtTime(0.8, audioContextRef.current.currentTime + 0.01)
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }, [enabled])

  const playHoverSound = useCallback(() => {
    createTone(800, 0.1, 'sine')
  }, [createTone])

  const playClickSound = useCallback(() => {
    // Create a softer, more pleasant click sound
    createTone(660, 0.08, 'sine')
    setTimeout(() => createTone(440, 0.05, 'sine'), 25)
  }, [createTone])

  const playSuccessSound = useCallback(() => {
    // Success sound sequence
    createTone(523, 0.1, 'sine') // C
    setTimeout(() => createTone(659, 0.1, 'sine'), 100) // E
    setTimeout(() => createTone(784, 0.2, 'sine'), 200) // G
  }, [createTone])

  const playInteractionSound = useCallback((velocity: number) => {
    // Mouse velocity-based sound
    const frequency = Math.min(400 + velocity * 5, 1200)
    const duration = Math.min(0.05 + velocity * 0.001, 0.2)
    createTone(frequency, duration, 'triangle')
  }, [createTone])

  useEffect(() => {
    if (!enabled) return

    const handleMouseDown = () => playClickSound()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        playClickSound()
      }
    }

    // Add haptic feedback for mobile
    const handleTouchStart = () => {
      if ('vibrate' in navigator) {
        navigator.vibrate(20) // 20ms vibration
      }
      playClickSound()
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [enabled, playClickSound])

  // Expose sound functions globally for other components
  useEffect(() => {
    if (!enabled) return

    ;(window as any).soundEffects = {
      hover: playHoverSound,
      click: playClickSound,
      success: playSuccessSound,
      interaction: playInteractionSound
    }

    return () => {
      delete (window as any).soundEffects
    }
  }, [enabled, playHoverSound, playClickSound, playSuccessSound, playInteractionSound])

  return null // This component doesn't render anything visual
}

// Hook for using sound effects in other components
export function useSoundEffects() {
  const playSound = useCallback((type: 'hover' | 'click' | 'success' | 'interaction', ...args: any[]) => {
    const sounds = (window as any).soundEffects
    if (sounds && sounds[type]) {
      sounds[type](...args)
    }
  }, [])

  return { playSound }
}