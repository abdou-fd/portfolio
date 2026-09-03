import React from 'react'
import { Check } from 'lucide-react'

const SkillCategory = ({ category, skills = [], level = 'intermediate' }) => {
  const levelColor = {
    beginner: 'from-yellow-400 to-yellow-500',
    intermediate: 'from-blue-400 to-blue-500',
    advanced: 'from-green-400 to-green-500',
    expert: 'from-accent to-purple-500',
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category}</h3>
        <span className={`text-xs px-3 py-1 bg-gradient-to-r ${levelColor[level] || levelColor.intermediate} text-white rounded-full font-semibold`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="text-accent flex-shrink-0" size={20} />
            <span className="text-slate-700 dark:text-slate-300">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillCategory
