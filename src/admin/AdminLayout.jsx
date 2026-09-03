import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Menu, X, LayoutGrid } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const AdminLayout = ({ children }) => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Experiences', path: '/admin/experiences', icon: '💼' },
    { label: 'Projects', path: '/admin/projects', icon: '🚀' },
    { label: 'Videos', path: '/admin/videos', icon: '🎥' },
    { label: 'Certificates', path: '/admin/certificates', icon: '🏆' },
    { label: 'Skills', path: '/admin/skills', icon: '⚙️' },
    { label: 'Timeline', path: '/admin/timeline', icon: '📅' },
    { label: 'Settings', path: '/admin/settings', icon: '⚡' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/admin/dashboard" className="text-2xl font-bold gradient-text">
            FAD Admin
          </Link>

          {/* User info and logout */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:inline">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'fixed' : 'hidden'
          } md:relative md:block w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-30 md:z-10 left-0 top-20 md:top-0 h-[calc(100vh-80px)] md:h-screen overflow-y-auto`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
