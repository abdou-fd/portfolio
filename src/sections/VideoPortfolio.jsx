import React from 'react'
import { portfolioData } from '../data/portfolioData'
import VideoCard from '../components/VideoCard'

const VideoPortfolio = () => {
  const { videos } = portfolioData

  return (
    <section id="videos" className="py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Video Portfolio
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg mt-6 max-w-2xl mx-auto">
            Check out some of my video tutorials and demonstrations
          </p>
        </div>

        {/* Video cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoPortfolio
