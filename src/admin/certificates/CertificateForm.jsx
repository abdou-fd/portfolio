import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, AlertCircle } from 'lucide-react'
import supabase from '../../lib/supabase'
import ImageUpload from '../../components/ImageUpload'

const CertificateForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    credentialUrl: '',
    image: '',
    published: false,
    display_order: 0,
  })

  useEffect(() => {
    if (id) {
      fetchCertificate()
    }
  }, [id])

  const fetchCertificate = async () => {
    if (!supabase) return
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('certificates')
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
          .from('certificates')
          .update(formData)
          .eq('id', id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('certificates')
          .insert([formData])
        if (insertError) throw insertError
      }

      navigate('/admin/certificates')
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
          onClick={() => navigate('/admin/certificates')}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {id ? 'Edit Certificate' : 'Add Certificate'}
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
            Certificate Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="e.g., AWS Solutions Architect"
          />
        </div>

        {/* Issuer */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Issuing Organization
          </label>
          <input
            type="text"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="e.g., Amazon Web Services"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Issue Date
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="e.g., January 2024"
          />
        </div>

        {/* Credential URL */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Credential URL (Optional)
          </label>
          <input
            type="url"
            name="credentialUrl"
            value={formData.credentialUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
            placeholder="https://www.credly.com/..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Certificate Image (Optional)
          </label>
          <ImageUpload
            folder="certificates"
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
            Publish this certificate
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
            {loading ? 'Saving...' : 'Save Certificate'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/certificates')}
            className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CertificateForm
