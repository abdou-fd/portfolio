import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import supabase from '../../lib/supabase'

const SkillList = () => {
  const navigate = useNavigate()
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    if (!supabase) {
      setError('Supabase is not configured')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('skills')
        .select('*')
        .order('display_order')

      if (fetchError) throw fetchError
      setSkills(data || [])
    } catch (err) {
      console.error('Error fetching skills:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill category?')) return

    try {
      const { error: deleteError } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSkills(skills.filter((skill) => skill.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const togglePublish = async (id, published) => {
    try {
      const { error: updateError } = await supabase
        .from('skills')
        .update({ published: !published })
        .eq('id', id)

      if (updateError) throw updateError
      setSkills(
        skills.map((skill) =>
          skill.id === id ? { ...skill, published: !published } : skill
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Skills</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your technical skills</p>
        </div>
        <Link
          to="/admin/skills/new"
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Skill Category
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
          <p className="text-slate-600 dark:text-slate-400">Loading skills...</p>
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg">
          <p className="text-slate-600 dark:text-slate-400 mb-4">No skills yet</p>
          <Link to="/admin/skills/new" className="text-accent hover:underline">
            Add your first skill category
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{skill.category}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Level: <span className="font-semibold capitalize">{skill.level}</span>
                      </p>
                      {skill.skills && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          {skill.skills.length} skill{skill.skills.length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        skill.published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {skill.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(skill.id, skill.published)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    {skill.published ? (
                      <Eye className="text-green-600" size={20} />
                    ) : (
                      <EyeOff className="text-gray-400" size={20} />
                    )}
                  </button>
                  <Link
                    to={`/admin/skills/${skill.id}`}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit className="text-blue-600" size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(skill.id)}
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

export default SkillList
