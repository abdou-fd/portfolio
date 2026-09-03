import React from 'react'
import { portfolioData } from '../data/portfolioData'

const Hero = () => {
  const { personal, about } = portfolioData

  return (
    <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white animate-fade-in-up">
            <p className="text-accent font-semibold text-lg mb-2">Welcome to my portfolio</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {personal.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-300 font-light mb-6">
              {personal.title}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              {personal.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold transition-colors inline-block text-center"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-semibold transition-colors inline-block text-center"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right content - Profile image */}
          <div className="hidden md:flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 rounded-2xl blur-lg opacity-50"></div>
              <img
                src={personal.image}
                alt={personal.name}
                className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-accent/20"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-slate-700">
          {about.highlights.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <p className="text-3xl md:text-4xl font-bold text-accent">{stat.label}</p>
              <p className="text-slate-400 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
