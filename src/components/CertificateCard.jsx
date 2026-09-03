import React from 'react'
import { Award, Calendar } from 'lucide-react'

const CertificateCard = ({ title, issuer, date, credentialUrl, image }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-accent font-semibold text-sm">{issuer}</p>
          </div>
          <Award className="text-accent flex-shrink-0" size={24} />
        </div>

        {date && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
        )}

        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors"
          >
            View Credential
          </a>
        )}
      </div>
    </div>
  )
}

export default CertificateCard
