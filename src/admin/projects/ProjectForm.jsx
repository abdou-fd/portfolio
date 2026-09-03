import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, AlertCircle, X } from 'lucide-react'
import supabase from '../../lib/supabase'
import ImageUpload from '../../components/ImageUpload'

const ProjectForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    published: false,
    display_order: 0,
  })
  const [techInput, setTechInput] = useState('')

  useEffect(() => {
    if (id) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    if (!supabase) return
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('projects')
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

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }))
      setTechInput('')
    }
  }

  const handleRemoveTech = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
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
          .from('projects')
          .update(formData)
          .eq('id', id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([formData])
        if (insertError) throw insertError
      }

      navigate('/admin/projects')
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
          onClick={() => navigate('/admin/projects')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {id ? 'Edit Project' : 'Add Project'}
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
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="e.g., E-Commerce Platform"
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
            placeholder="Describe your project..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Project Image
          </label>
          <ImageUpload
            folder="projects"
            onUploadComplete={handleImageUpload}
          />
          {formData.image && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">Image uploaded successfully</p>
          )}
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Technologies
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
              placeholder="Add a technology..."
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          {formData.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(index)}
                    className="hover:text-accent/70"
                  >
                    <X size={16} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            GitHub URL (Optional)
          </label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="https://github.com/..."
          />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Live Demo URL (Optional)
          </label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="https://example.com"
          />
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

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Mark as featured project
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent"
            />
            <label className="text-sm font-medium text-slate-900 dark:text-white">
              Publish this project
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent/90 disabled:opacity-50 text-white rounded-lg transition-colors font-medium"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
