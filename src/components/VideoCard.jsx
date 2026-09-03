import React from 'react'
import { Play } from 'lucide-react'
import { extractYoutubeId, getYoutubeThumbnail } from '../utils/youtube'

const VideoCard = ({ title, description, videoUrl, thumbnail }) => {
  const videoId = extractYoutubeId(videoUrl)
  const thumbnailUrl = thumbnail || getYoutubeThumbnail(videoId)

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
      {/* Video thumbnail */}
      <div className="relative w-full h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-accent hover:bg-accent/90 text-white rounded-full transition-colors transform group-hover:scale-110"
            aria-label="Play video"
          >
            <Play size={24} fill="currentColor" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default VideoCard
