import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import supabase from '../../lib/supabase'

const VideoList = () => {
  const navigate = useNavigate()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    if (!supabase) {
      setError('Supabase is not configured')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('videos')
        .select('*')
        .order('display_order')

      if (fetchError) throw fetchError
      setVideos(data || [])
    } catch (err) {
      console.error('Error fetching videos:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return

    try {
      const { error: deleteError } = await supabase
        .from('videos')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setVideos(videos.filter((vid) => vid.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const togglePublish = async (id, published) => {
    try {
      const { error: updateError } = await supabase
        .from('videos')
        .update({ published: !published })
        .eq('id', id)

      if (updateError) throw updateError
      setVideos(
        videos.map((vid) =>
          vid.id === id ? { ...vid, published: !published } : vid
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Videos</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your video portfolio</p>
        </div>
        <Link
          to="/admin/videos/new"
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Video
        </Link>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg">
          <p className="text-slate-600 dark:text-slate-400 mb-4">No videos yet</p>
          <Link to="/admin/videos/new" className="text-accent hover:underline">
            Create your first video
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{vid.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {vid.description}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Video URL: {vid.videoUrl}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        vid.published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {vid.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(vid.id, vid.published)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    {vid.published ? (
                      <Eye className="text-green-600" size={20} />
                    ) : (
                      <EyeOff className="text-gray-400" size={20} />
                    )}
                  </button>
                  <Link
                    to={`/admin/videos/${vid.id}`}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit className="text-blue-600" size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(vid.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="text-red-600" size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VideoList
