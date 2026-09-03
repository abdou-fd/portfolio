import React from 'react'
import { portfolioData } from '../data/portfolioData'
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  const { projects } = portfolioData
  const featured = projects.filter((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Featured projects grid */}
        {featured.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        )}

        {/* Other projects */}
        {regular.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 mt-12">
              Other Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
