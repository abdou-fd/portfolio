import React from 'react'
import { portfolioData } from '../data/portfolioData'
import SkillCategory from '../components/SkillCategory'

const Skills = () => {
  const { skills } = portfolioData

  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Skills
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCategory key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
