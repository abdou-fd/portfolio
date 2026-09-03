import React from 'react'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-4">Faradjou</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional software engineer building modern, scalable applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Resume
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-accent transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-accent transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>&copy; {currentYear} Faradjou Abdelfetah. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
