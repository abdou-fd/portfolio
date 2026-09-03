import React, { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'experience', label: 'Experience' },
    { id: 'videos', label: 'Videos' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'goal', label: 'Goal' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleScroll = (sectionId) => {
    setActiveSection(sectionId)
    setIsOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScrollEvent = () => {
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScrollEvent)
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#hero" className="text-2xl font-bold gradient-text">
              FAD
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'text-accent'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Dark mode toggle and mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-accent/10 text-accent font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
