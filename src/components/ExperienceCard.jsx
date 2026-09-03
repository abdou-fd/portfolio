import React from 'react'
import { Calendar, MapPin, Briefcase } from 'lucide-react'

const ExperienceCard = ({ title, company, duration, location, description, responsibilities = [], image }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      {image && (
        <img
          src={image}
          alt={company}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-accent font-semibold">{company}</p>
          </div>
          <Briefcase className="text-accent flex-shrink-0" size={24} />
        </div>

        <div className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{duration}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          )}
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>

        {responsibilities.length > 0 && (
          <ul className="space-y-2">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="text-accent font-bold">•</span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ExperienceCard
