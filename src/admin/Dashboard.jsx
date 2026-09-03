import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Users, Zap, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { label: 'Total Projects', value: '15', icon: Zap, color: 'from-blue-500 to-cyan-500' },
    { label: 'Experiences', value: '3', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Skills', value: '25+', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
    { label: 'Certificates', value: '8', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
  ]

  const recentSections = [
    { label: 'Manage Experiences', path: '/admin/experiences', icon: '💼' },
    { label: 'Manage Projects', path: '/admin/projects', icon: '🚀' },
    { label: 'Manage Videos', path: '/admin/videos', icon: '🎥' },
    { label: 'Manage Certificates', path: '/admin/certificates', icon: '🏆' },
    { label: 'Manage Skills', path: '/admin/skills', icon: '⚙️' },
    { label: 'Manage Timeline', path: '/admin/timeline', icon: '📅' },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentSections.map((section, index) => (
            <Link
              key={index}
              to={section.path}
              className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md hover:shadow-lg hover:border-accent border border-transparent transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{section.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{section.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Click to manage</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="bg-accent/10 dark:bg-accent/5 border border-accent/20 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Portfolio Tip</h3>
        <p className="text-slate-700 dark:text-slate-300">
          Keep your portfolio updated with your latest projects and achievements. Regular updates help attract better
          opportunities and keep your professional presence fresh.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
