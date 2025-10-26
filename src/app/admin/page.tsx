'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Users, Wifi, Activity, Server, MapPin, Clock, TrendingUp } from 'lucide-react'

interface AdminStats {
  totalVisitors: number
  onlineNow: number
  todayVisitors: number
  totalPageViews: number
  currentSessionTime: string
  activeSessions: Array<{ id: string; startTime: number; lastActivity: number }>
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState<AdminStats>({
    totalVisitors: 0,
    onlineNow: 0,
    todayVisitors: 0,
    totalPageViews: 0,
    currentSessionTime: '0m 0s',
    activeSessions: []
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'kp9a4x3qw0') {
      setIsAuthenticated(true)
      setError('')
      loadDashboardData()
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const loadDashboardData = () => {
    // Load ONLY real data from localStorage
    const totalVisitors = parseInt(localStorage.getItem('anthonysite_total_visitors') || '0')
    const sessions = JSON.parse(localStorage.getItem('anthonysite_sessions') || '[]')
    const now = Date.now()
    const fiveMinutesAgo = now - (5 * 60 * 1000)
    const oneDayAgo = now - (24 * 60 * 60 * 1000)
    
    // Calculate active sessions (online now)
    const activeSessions = sessions.filter((session: any) => session.lastActivity > fiveMinutesAgo)
    
    // Calculate today's unique visitors (sessions started today)
    const todayVisitors = sessions.filter((session: any) => session.startTime > oneDayAgo).length
    
    // Get or initialize total page views (real counter)
    let totalPageViews = parseInt(localStorage.getItem('anthonysite_total_pageviews') || '0')
    
    // Increment page views for this admin visit (if first time loading)
    if (!sessionStorage.getItem('admin_pageview_counted')) {
      totalPageViews += 1
      localStorage.setItem('anthonysite_total_pageviews', totalPageViews.toString())
      sessionStorage.setItem('admin_pageview_counted', 'true')
    }
    
    // Calculate current session time
    const currentVisitorId = localStorage.getItem('anthonysite_visitor_id')
    const currentSession = activeSessions.find((s: any) => s.id === currentVisitorId)
    const currentSessionTime = currentSession 
      ? Math.floor((now - currentSession.startTime) / 60000) + 'm ' + Math.floor(((now - currentSession.startTime) % 60000) / 1000) + 's'
      : '0m 0s'

    setStats({
      totalVisitors,
      onlineNow: activeSessions.length,
      todayVisitors,
      totalPageViews,
      currentSessionTime,
      activeSessions: activeSessions.map((session: any) => ({
        id: session.id,
        startTime: session.startTime,
        lastActivity: session.lastActivity
      }))
    })
  }

  useEffect(() => {
    // Check if already authenticated (session storage)
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true'
    if (isAuth) {
      setIsAuthenticated(true)
      loadDashboardData()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('admin_authenticated', 'true')
      // Refresh data every 30 seconds
      const interval = setInterval(loadDashboardData, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-stone-200 dark:border-stone-700">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Enter password to access analytics
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100"
                  placeholder="Enter admin password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-red-500 text-sm">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Admin Dashboard
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-2">
              Real-time website analytics and visitor data
            </p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem('admin_authenticated')
              setIsAuthenticated(false)
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Total Visitors</p>
                <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{stats.totalVisitors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Online Now</p>
                <p className="text-3xl font-bold text-green-600">{stats.onlineNow}</p>
              </div>
              <Wifi className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Today&apos;s Visitors</p>
                <p className="text-3xl font-bold text-purple-600">{stats.todayVisitors}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Page Views</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalPageViews}</p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Sessions */}
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-6">
              Active Sessions
            </h3>
            <div className="space-y-4">
              {stats.activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-stone-700 dark:text-stone-300 text-xs">
                        Session {session.id.slice(-8)}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Started: {new Date(session.startTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                    {Math.floor((Date.now() - session.startTime) / 60000)}m
                  </span>
                </div>
              ))}
              {stats.activeSessions.length === 0 && (
                <p className="text-stone-500 dark:text-stone-400 text-center py-4">
                  No active sessions
                </p>
              )}
            </div>
          </div>

          {/* Current Session Info */}
          <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-6">
              Current Session
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-stone-600 dark:text-stone-400">Session Duration</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{stats.currentSessionTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600 dark:text-stone-400">Total Sessions Today</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">{stats.todayVisitors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600 dark:text-stone-400">Currently Online</span>
                <span className="font-bold text-green-600">{stats.onlineNow}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Server Info */}
        <div className="mt-8 bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-200 dark:border-stone-700">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-6">
            Server Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-400">Server Location</p>
                <p className="font-medium text-stone-900 dark:text-stone-100">Amsterdam, NL</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-400">Status</p>
                <p className="font-medium text-green-600">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-400">Current Session</p>
                <p className="font-medium text-stone-900 dark:text-stone-100">{stats.currentSessionTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}