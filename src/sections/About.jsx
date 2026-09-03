import React from 'react'
import { portfolioData } from '../data/portfolioData'

const About = () => {
  const { about } = portfolioData

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-center">
            {about.title}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>

          {/* Content */}
          <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {about.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
