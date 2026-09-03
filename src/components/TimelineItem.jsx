import React from 'react'
import { Calendar, MapPin } from 'lucide-react'

const TimelineItem = ({ date, title, description, location, type = 'work' }) => {
  const isLeft = type === 'education'

  return (
    <div className="relative pb-12">
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2">
        <div className="w-4 h-4 bg-accent rounded-full border-4 border-white dark:border-slate-950"></div>
      </div>

      {/* Content */}
      <div className={`md:w-1/2 md:${isLeft ? 'mr-auto' : 'ml-auto'} ml-8 md:ml-0 md:pr-8 md:${isLeft ? 'pr-0' : ''}`}>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            <span className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full whitespace-nowrap">
              {type}
            </span>
          </div>

          {location && (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <Calendar size={16} />
            <span>{date}</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default TimelineItem
