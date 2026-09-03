import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

export const usePortfolioData = () => {
  const [experiences, setExperiences] = useState([])
  const [projects, setProjects] = useState([])
  const [videos, setVideos] = useState([])
  const [certificates, setCertificates] = useState([])
  const [skills, setSkills] = useState([])
  const [timeline, setTimeline] = useState([])
  const [siteSettings, setSiteSettings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPublishedData = async () => {
    if (!supabase) return

    try {
      setLoading(true)
      setError(null)

      const [expRes, projRes, vidRes, certRes, skillRes, timeRes, setRes] = await Promise.all([
        supabase.from('experiences').select('*').eq('published', true).order('display_order'),
        supabase.from('projects').select('*').eq('published', true).order('display_order'),
        supabase.from('videos').select('*').eq('published', true).order('display_order'),
        supabase.from('certificates').select('*').eq('published', true).order('display_order'),
        supabase.from('skills').select('*').eq('published', true).order('display_order'),
        supabase.from('timeline').select('*').eq('published', true).order('date', { ascending: false }),
        supabase.from('site_settings').select('*').limit(1),
      ])

      if (expRes.data) setExperiences(expRes.data)
      if (projRes.data) setProjects(projRes.data)
      if (vidRes.data) setVideos(vidRes.data)
      if (certRes.data) setCertificates(certRes.data)
      if (skillRes.data) setSkills(skillRes.data)
      if (timeRes.data) setTimeline(timeRes.data)
      if (setRes.data?.[0]) setSiteSettings(setRes.data[0])
    } catch (err) {
      console.error('Error fetching portfolio data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublishedData()
  }, [])

  return {
    experiences,
    projects,
    videos,
    certificates,
    skills,
    timeline,
    siteSettings,
    loading,
    error,
    refetch: fetchPublishedData,
  }
}
