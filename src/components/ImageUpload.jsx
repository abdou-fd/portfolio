import React, { useState } from 'react'
import { Upload, X, AlertCircle } from 'lucide-react'
import supabase from '../lib/supabase'

const ImageUpload = ({ folder = 'uploads', onUploadComplete, maxSize = 5 }) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validation
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload
    await uploadFile(file)
  }

  const uploadFile = async (file) => {
    if (!supabase) {
      setError('Supabase is not configured')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { data, error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file, {
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath)

      const publicUrl = urlData.publicUrl

      if (onUploadComplete) {
        onUploadComplete(publicUrl, filePath)
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    setError(null)
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs h-auto rounded-lg border-2 border-accent"
          />
          <button
            onClick={clearPreview}
            className="absolute -top-3 -right-3 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            aria-label="Remove preview"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mb-2" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            PNG, JPG, GIF up to {maxSize}MB
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      )}

      {uploading && (
        <div className="mt-4 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-slate-600 dark:text-slate-400">Uploading...</span>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
