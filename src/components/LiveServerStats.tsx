'use client'

import { useState, useEffect } from 'react'
import { Activity, Users, Server, Wifi, Cpu, HardDrive } from 'lucide-react'

interface ServerStats {
  visitors: number
  onlineNow: number
  uptime: string
  serverLocation: string
  cpuUsage: number
  memoryUsage: number
  requests: number
}

export function LiveServerStats() {
  const [stats, setStats] = useState<ServerStats>({
    visitors: 0,
    onlineNow: 0,
    uptime: '0d 0h 0m',
    serverLocation: 'Amsterdam, NL',
    cpuUsage: 0,
    memoryUsage: 0,
    requests: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate real server stats (replace with actual API calls)
    const fetchServerStats = () => {
      // In a real implementation, this would call your server API
      // For demo purposes, we'll simulate realistic data
      setStats(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        onlineNow: Math.floor(Math.random() * 12) + 1,
        uptime: calculateUptime(),
        serverLocation: 'Amsterdam, NL 🇳🇱',
        cpuUsage: Math.floor(Math.random() * 30) + 10,
        memoryUsage: Math.floor(Math.random() * 20) + 40,
        requests: prev.requests + Math.floor(Math.random() * 5) + 1
      }))
    }

    const calculateUptime = () => {
      const now = new Date()
      const start = new Date('2025-01-01') // Your server start date
      const diff = now.getTime() - start.getTime()
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      return `${days}d ${hours}h ${minutes}m`
    }

    // Initial load
    fetchServerStats()
    setIsVisible(true)

    // Update every 5 seconds for live feel
    const interval = setInterval(fetchServerStats, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`fixed top-4 left-4 z-30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
      <div className="bg-gradient-to-br from-stone-900/90 to-stone-800/90 dark:from-stone-100/90 dark:to-stone-200/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-stone-700/50 dark:border-stone-300/50 min-w-[280px]">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white dark:text-stone-900 font-semibold text-sm">Live Server Stats</span>
          <Server size={14} className="text-green-400" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          
          {/* Visitors */}
          <div className="bg-black/20 dark:bg-white/20 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Users size={12} className="text-blue-400" />
              <span className="text-stone-300 dark:text-stone-700">Bezoekers</span>
            </div>
            <div className="text-white dark:text-stone-900 font-bold text-lg">
              {stats.visitors.toLocaleString()}
            </div>
          </div>

          {/* Online Now */}
          <div className="bg-black/20 dark:bg-white/20 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Wifi size={12} className="text-green-400" />
              <span className="text-stone-300 dark:text-stone-700">Online Nu</span>
            </div>
            <div className="text-white dark:text-stone-900 font-bold text-lg">
              {stats.onlineNow}
            </div>
          </div>

          {/* CPU Usage */}
          <div className="bg-black/20 dark:bg-white/20 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Cpu size={12} className="text-orange-400" />
              <span className="text-stone-300 dark:text-stone-700">CPU</span>
            </div>
            <div className="text-white dark:text-stone-900 font-bold">
              {stats.cpuUsage}%
            </div>
            <div className="w-full bg-stone-600 dark:bg-stone-400 rounded-full h-1 mt-1">
              <div 
                className="bg-orange-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${stats.cpuUsage}%` }}
              />
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-black/20 dark:bg-white/20 rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <HardDrive size={12} className="text-purple-400" />
              <span className="text-stone-300 dark:text-stone-700">RAM</span>
            </div>
            <div className="text-white dark:text-stone-900 font-bold">
              {stats.memoryUsage}%
            </div>
            <div className="w-full bg-stone-600 dark:bg-stone-400 rounded-full h-1 mt-1">
              <div 
                className="bg-purple-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${stats.memoryUsage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-3 pt-3 border-t border-stone-600 dark:border-stone-400">
          <div className="flex justify-between items-center text-xs">
            <div className="text-stone-400 dark:text-stone-600">
              📍 {stats.serverLocation}
            </div>
            <div className="text-stone-400 dark:text-stone-600">
              ⏱️ {stats.uptime}
            </div>
          </div>
          <div className="flex justify-between items-center text-xs mt-1">
            <div className="text-stone-400 dark:text-stone-600">
              <Activity size={10} className="inline mr-1" />
              {stats.requests} requests
            </div>
            <div className="text-green-400 text-xs font-mono">
              ●  LIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}