"use client"

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { ArrowRight, Database, FileSpreadsheet } from 'lucide-react'

export default function FeaturesPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">{t('features')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Eliminate manual data re-entry */}
        <div className="bg-card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Database className="text-primary-600 mr-3" size={24} />
            <h2 className="text-xl font-bold text-gray-900">{t('eliminateManualEntry')}</h2>
          </div>
          <p className="text-gray-700 mb-4">
            {t('eliminateManualEntryDesc')}
          </p>
          <Link 
            href="/features/data-entry" 
            className="flex items-center text-primary-600 hover:text-primary-800 font-medium"
          >
            {t('learnMore')} <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* Automated accounting integration */}
        <div className="bg-card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <FileSpreadsheet className="text-success-600 mr-3" size={24} />
            <h2 className="text-xl font-bold text-gray-900">{t('automatedAccounting')}</h2>
          </div>
          <p className="text-gray-700 mb-4">
            {t('automatedAccountingDesc')}
          </p>
          <Link 
            href="/features/accounting" 
            className="flex items-center text-success-600 hover:text-success-700 font-medium"
          >
            {t('learnMore')} <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
