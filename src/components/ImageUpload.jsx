import React from 'react'

const ImageUpload = ({ folder, onUploadComplete }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For now, store base64 or handle with a simple approach
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (result && typeof result === 'string') {
        onUploadComplete(result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="sr-only">Choose file</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-600 dark:text-slate-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-accent file:text-white
            hover:file:bg-accent/90
            cursor-pointer"
        />
      </label>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Supported formats: JPG, PNG, WebP (Max 5MB)
      </p>
    </div>
  )
}

export default ImageUpload
