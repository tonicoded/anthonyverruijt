'use client'

import { useState, useEffect } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  icon: string
  color: string
  duration: number
}

export function FloatingNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const predefinedNotifications: Omit<Notification, 'id'>[] = [
    {
      title: 'iOS App Deployed',
      message: 'FinanceTracker v2.1 successfully published to App Store',
      icon: '📱',
      color: '#FA7343',
      duration: 4000
    },
    {
      title: 'Code Optimized',
      message: 'React components performance improved by 40%',
      icon: '⚡',
      color: '#61DAFB',
      duration: 3500
    },
    {
      title: 'Database Updated',
      message: 'PostgreSQL migration completed successfully',
      icon: '💾',
      color: '#3776AB',
      duration: 3000
    },
    {
      title: 'API Integration',
      message: 'New payment gateway integrated with Stripe',
      icon: '🔗',
      color: '#22C55E',
      duration: 4500
    },
    {
      title: 'UI/UX Enhanced',
      message: 'Dark mode theme implemented across all components',
      icon: '🎨',
      color: '#8B5CF6',
      duration: 3800
    },
    {
      title: 'Security Audit',
      message: 'All endpoints secured with JWT authentication',
      icon: '🔒',
      color: '#EF4444',
      duration: 4200
    }
  ]

  useEffect(() => {
    const showRandomNotification = () => {
      const randomNotification = predefinedNotifications[
        Math.floor(Math.random() * predefinedNotifications.length)
      ]
      
      const notification: Notification = {
        ...randomNotification,
        id: `notif-${Date.now()}-${Math.random()}`
      }

      setNotifications(prev => [...prev, notification])

      // Auto remove notification
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
      }, notification.duration)
    }

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(showRandomNotification, 5000)
    
    // Then show notifications every 8-15 seconds
    const interval = setInterval(() => {
      if (Math.random() < 0.7) { // 70% chance to show notification
        showRandomNotification()
      }
    }, Math.random() * 7000 + 8000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed top-8 right-8 z-50 space-y-3 max-w-xs">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="relative transform transition-all duration-500 ease-out"
          style={{
            animation: `slideInFromRight 0.5s ease-out ${index * 0.1}s both, 
                       fadeOutRight ${notification.duration}ms ease-in ${notification.duration - 500}ms both`
          }}
        >
          {/* Glowing background */}
          <div 
            className="absolute inset-0 rounded-xl blur-lg opacity-30"
            style={{
              background: `radial-gradient(circle, ${notification.color}40 0%, transparent 70%)`
            }}
          />
          
          {/* Main notification */}
          <div className="relative bg-white/90 dark:bg-stone-800/90 backdrop-blur-md rounded-xl border border-white/30 dark:border-stone-700/30 p-4 shadow-xl">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${notification.color}20, ${notification.color}10)`,
                  border: `1px solid ${notification.color}40`
                }}
              >
                <span className="text-sm">{notification.icon}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div 
                  className="font-semibold text-sm leading-tight"
                  style={{ color: notification.color }}
                >
                  {notification.title}
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-tight">
                  {notification.message}
                </div>
              </div>
              
              {/* Status indicator */}
              <div 
                className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: notification.color }}
              />
            </div>
            
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200/30 dark:bg-stone-700/30 rounded-b-xl overflow-hidden">
              <div 
                className="h-full rounded-b-xl"
                style={{
                  background: `linear-gradient(90deg, ${notification.color}, ${notification.color}80)`,
                  animation: `shrinkWidth ${notification.duration}ms linear`
                }}
              />
            </div>
            
            {/* Scan line effect */}
            <div 
              className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${notification.color}15 50%, transparent 100%)`,
                animation: 'scanAcross 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes fadeOutRight {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(50%) scale(0.9);
          }
        }
        
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        @keyframes scanAcross {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}