export const extractYoutubeId = (url) => {
  if (!url) return null

  // Direct video ID
  if (!/^[\w-]{11}$/.test(url) === false && /^[\w-]{11}$/.test(url)) {
    return url
  }

  // youtube.com format
  let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/)
  if (match && match[1]) {
    return match[1]
  }

  return null
}
