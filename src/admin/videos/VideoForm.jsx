import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import supabase from '../../lib/supabase'
import { extractYoutubeId } from '../../utils/youtube'

const VideoForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    published: false,
    display_order: 0,
  })

  useEffect(() => {
    if (id) {
      fetchVideo()
    }
  }, [id])

  const fetchVideo = async () => {
    if (!supabase) return
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError
      setFormData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Supabase is not configured')
      return
    }

    // Validate YouTube URL
    const videoId = extractYoutubeId(formData.videoUrl)
    if (!videoId) {
      setError('Please provide a valid YouTube URL')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (id) {
        const { error: updateError } = await supabase
          .from('videos')
          .update(formData)
          .eq('id', id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('videos')
          .insert([formData])
        if (insertError) throw insertError
      }

      navigate('/admin/videos')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/videos')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {id ? 'Edit Video' : 'Add Video'}
          </h1>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-lg p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Video Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="e.g., Building a React Application"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent resize-none"
            placeholder="Describe your video content..."
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            YouTube Video URL
          </label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Supports youtube.com, youtu.be, and direct video IDs
          </p>
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Display Order
          </label>
          <input
            type="number"
            name="display_order"
            value={formData.display_order}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
          />
        </div>

        {/* Publish checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
          />
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Publish this video
          </label>
        </div>

        {/* Submit button */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent/90 disabled:opacity-50 text-white rounded-lg transition-colors font-medium"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Video'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/videos')}
            className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default VideoForm
