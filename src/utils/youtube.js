export const extractYoutubeId = (url) => {
  if (!url) return null

  let videoId = null

  // Try to match different YouTube URL formats
  if (url.includes('youtube.com')) {
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    const match = url.match(/[?&]v=([^&]+)/)
    videoId = match ? match[1] : null
  } else if (url.includes('youtu.be')) {
    // Format: https://youtu.be/VIDEO_ID
    const match = url.match(/youtu\.be\/([^/?]+)/)
    videoId = match ? match[1] : null
  } else if (url.includes('youtube.com/embed')) {
    // Format: https://www.youtube.com/embed/VIDEO_ID
    const match = url.match(/embed\/([^/?]+)/)
    videoId = match ? match[1] : null
  } else if (url.length === 11 && !url.includes('/')) {
    // Direct video ID
    videoId = url
  }

  return videoId
}

export const getYoutubeThumbnail = (videoId) => {
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export const getYoutubeEmbedUrl = (videoId) => {
  if (!videoId) return null
  return `https://www.youtube.com/embed/${videoId}`
}
