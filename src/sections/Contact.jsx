import React, { useState } from 'react'
import { portfolioData } from '../data/portfolioData'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react'

const Contact = () => {
  const { contact, personal } = portfolioData
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {contact.title}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact information */}
          <div className="space-y-8">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow group"
            >
              <div className="p-3 bg-accent/10 group-hover:bg-accent/20 rounded-lg transition-colors">
                <Mail className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                <p className="text-slate-600 dark:text-slate-400">{contact.email}</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${personal.phone.replace(/\s/g, '')}`}
              className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow group"
            >
              <div className="p-3 bg-accent/10 group-hover:bg-accent/20 rounded-lg transition-colors">
                <Phone className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                <p className="text-slate-600 dark:text-slate-400">{personal.phone}</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-lg">
              <div className="p-3 bg-accent/10 rounded-lg">
                <MapPin className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Location</h3>
                <p className="text-slate-600 dark:text-slate-400">{personal.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Connect With Me</h3>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="#"
                  className="p-3 bg-white dark:bg-slate-800 hover:bg-accent hover:text-white rounded-lg transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-white dark:bg-slate-800 hover:bg-accent hover:text-white rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-white dark:bg-slate-800 hover:bg-accent hover:text-white rounded-lg transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitted && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-300 font-medium">
                  Thank you! I'll get back to you soon.
                </p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-accent resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
