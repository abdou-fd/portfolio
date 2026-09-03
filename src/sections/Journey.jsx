import React from 'react'
import { portfolioData } from '../data/portfolioData'
import TimelineItem from '../components/TimelineItem'

const Journey = () => {
  const { journey } = portfolioData

  return (
    <section id="journey" className="py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My Journey
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-transparent"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {journey.map((item, index) => (
              <TimelineItem
                key={index}
                date={item.date}
                title={item.title}
                description={item.description}
                location={item.location}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journey
