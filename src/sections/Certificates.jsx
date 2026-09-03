import React from 'react'
import { portfolioData } from '../data/portfolioData'
import CertificateCard from '../components/CertificateCard'

const Certificates = () => {
  const { certificates } = portfolioData

  return (
    <section id="certificates" className="py-16 md:py-24 lg:py-32 bg-white dark:bg-slate-950">
      <div className="container-custom">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Certificates
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        {/* Certificate cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} {...cert} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates
