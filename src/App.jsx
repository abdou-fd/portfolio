import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Portfolio from './pages/Portfolio'
import Login from './pages/Login'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import ExperienceList from './admin/experiences/ExperienceList'
import ExperienceForm from './admin/experiences/ExperienceForm'
import ProjectList from './admin/projects/ProjectList'
import ProjectForm from './admin/projects/ProjectForm'
import VideoList from './admin/videos/VideoList'
import VideoForm from './admin/videos/VideoForm'
import CertificateList from './admin/certificates/CertificateList'
import CertificateForm from './admin/certificates/CertificateForm'
import SkillList from './admin/skills/SkillList'
import SkillForm from './admin/skills/SkillForm'
import TimelineList from './admin/timeline/TimelineList'
import TimelineForm from './admin/timeline/TimelineForm'
import SiteSettings from './admin/settings/SiteSettings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Navigate to="/admin/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  
                  {/* Experiences */}
                  <Route path="experiences" element={<ExperienceList />} />
                  <Route path="experiences/new" element={<ExperienceForm />} />
                  <Route path="experiences/:id" element={<ExperienceForm />} />
                  
                  {/* Projects */}
                  <Route path="projects" element={<ProjectList />} />
                  <Route path="projects/new" element={<ProjectForm />} />
                  <Route path="projects/:id" element={<ProjectForm />} />
                  
                  {/* Videos */}
                  <Route path="videos" element={<VideoList />} />
                  <Route path="videos/new" element={<VideoForm />} />
                  <Route path="videos/:id" element={<VideoForm />} />
                  
                  {/* Certificates */}
                  <Route path="certificates" element={<CertificateList />} />
                  <Route path="certificates/new" element={<CertificateForm />} />
                  <Route path="certificates/:id" element={<CertificateForm />} />
                  
                  {/* Skills */}
                  <Route path="skills" element={<SkillList />} />
                  <Route path="skills/new" element={<SkillForm />} />
                  <Route path="skills/:id" element={<SkillForm />} />
                  
                  {/* Timeline */}
                  <Route path="timeline" element={<TimelineList />} />
                  <Route path="timeline/new" element={<TimelineForm />} />
                  <Route path="timeline/:id" element={<TimelineForm />} />
                  
                  {/* Settings */}
                  <Route path="settings" element={<SiteSettings />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
