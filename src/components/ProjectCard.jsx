import React from 'react'
import { Github, ExternalLink, Zap } from 'lucide-react'

const ProjectCard = ({ title, description, image, technologies = [], githubUrl, liveUrl, featured }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Project image */}
      {image && (
        <div className="relative w-full h-48 md:h-64 bg-slate-200 dark:bg-slate-800 overflow-hidden group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Overlay links */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-slate-900 hover:bg-accent hover:text-white rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-slate-900 hover:bg-accent hover:text-white rounded-full transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex-1">{title}</h3>
          {featured && (
            <span className="flex items-center gap-1 text-xs px-2 py-1 bg-accent/10 text-accent rounded-full whitespace-nowrap">
              <Zap size={14} /> Featured
            </span>
          )}
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{description}</p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {(githubUrl || liveUrl) && (
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors"
              >
                <Github size={16} />
                Code
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors"
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
