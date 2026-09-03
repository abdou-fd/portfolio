import React from 'react'
import { portfolioData } from '../data/portfolioData'
import ExperienceCard from '../components/ExperienceCard'

const Experience = () => {
  const { experience } = portfolioData

  return (
    <section id="experience" className="py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Experience cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {experience.map((job) => (
            <ExperienceCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
