import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import supabase from '../../lib/supabase'
import ImageUpload from '../../components/ImageUpload'

const ExperienceForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    responsibilities: [],
    image: '',
    published: false,
    display_order: 0,
  })
  const [responsibilityInput, setResponsibilityInput] = useState('')

  useEffect(() => {
    if (id) {
      fetchExperience()
    }
  }, [id])

  const fetchExperience = async () => {
    if (!supabase) return
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('experiences')
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

  const handleAddResponsibility = () => {
    if (responsibilityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, responsibilityInput.trim()],
      }))
      setResponsibilityInput('')
    }
  }

  const handleRemoveResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Supabase is not configured')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (id) {
        const { error: updateError } = await supabase
          .from('experiences')
          .update(formData)
          .eq('id', id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('experiences')
          .insert([formData])
        if (insertError) throw insertError
      }

      navigate('/admin/experiences')
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
          onClick={() => navigate('/admin/experiences')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {id ? 'Edit Experience' : 'Add Experience'}
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
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="e.g., Senior Full Stack Engineer"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="e.g., Tech Innovations Inc"
          />
        </div>

        {/* Duration and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
              placeholder="e.g., Jan 2022 - Present"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
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
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent resize-none"
            placeholder="Describe your role and achievements..."
          />
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Responsibilities
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={responsibilityInput}
              onChange={(e) => setResponsibilityInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResponsibility())}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
              placeholder="Add a responsibility..."
            />
            <button
              type="button"
              onClick={handleAddResponsibility}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          {formData.responsibilities.length > 0 && (
            <div className="space-y-2">
              {formData.responsibilities.map((resp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg"
                >
                  <span className="text-slate-900 dark:text-white">{resp}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveResponsibility(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Image
          </label>
          <ImageUpload
            folder="experiences"
            onUploadComplete={handleImageUpload}
          />
          {formData.image && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">Image uploaded successfully</p>
          )}
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
            Publish this experience
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
            {loading ? 'Saving...' : 'Save Experience'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/experiences')}
            className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExperienceForm
