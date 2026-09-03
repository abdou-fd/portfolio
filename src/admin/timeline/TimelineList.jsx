import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import supabase from '../../lib/supabase'

const TimelineList = () => {
  const navigate = useNavigate()
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTimeline()
  }, [])

  const fetchTimeline = async () => {
    if (!supabase) {
      setError('Supabase is not configured')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('timeline')
        .select('*')
        .order('date', { ascending: false })

      if (fetchError) throw fetchError
      setTimeline(data || [])
    } catch (err) {
      console.error('Error fetching timeline:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this timeline entry?')) return

    try {
      const { error: deleteError } = await supabase
        .from('timeline')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setTimeline(timeline.filter((item) => item.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const togglePublish = async (id, published) => {
    try {
      const { error: updateError } = await supabase
        .from('timeline')
        .update({ published: !published })
        .eq('id', id)

      if (updateError) throw updateError
      setTimeline(
        timeline.map((item) =>
          item.id === id ? { ...item, published: !published } : item
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Timeline</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your career timeline</p>
        </div>
        <Link
          to="/admin/timeline/new"
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Timeline Entry
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
          <p className="text-slate-600 dark:text-slate-400">Loading timeline...</p>
        </div>
      ) : timeline.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg">
          <p className="text-slate-600 dark:text-slate-400 mb-4">No timeline entries yet</p>
          <Link to="/admin/timeline/new" className="text-accent hover:underline">
            Add your first timeline entry
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {timeline.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                        <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full capitalize">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.date}</p>
                      {item.location && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">{item.location}</p>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{item.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        item.published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(item.id, item.published)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    {item.published ? (
                      <Eye className="text-green-600" size={20} />
                    ) : (
                      <EyeOff className="text-gray-400" size={20} />
                    )}
                  </button>
                  <Link
                    to={`/admin/timeline/${item.id}`}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit className="text-blue-600" size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
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

export default TimelineList
