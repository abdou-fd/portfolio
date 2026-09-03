import React from 'react'
import { portfolioData } from '../data/portfolioData'
import { Target } from 'lucide-react'

const Goal = () => {
  const { goal } = portfolioData

  return (
    <section id="goal" className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent/10 to-purple-500/10 dark:from-accent/5 dark:to-purple-500/5">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Section title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="text-accent" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                {goal.title}
              </h2>
            </div>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>

          {/* Main goal */}
          <div className="mb-8">
            <p className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              {goal.mainGoal}
            </p>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 md:p-12 shadow-lg">
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
              {goal.description.split('\n').map((line, index) => {
                if (line.trim() === '') return null
                if (line.trim().startsWith('-')) {
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-accent font-bold text-lg mt-1">•</span>
                      <span className="text-lg">{line.replace('-', '').trim()}</span>
                    </div>
                  )
                }
                return <p key={index} className="text-lg">{line}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Goal
