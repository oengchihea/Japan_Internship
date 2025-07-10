"use client"

import { useTranslation } from 'react-i18next'
import { ArrowLeft, CheckCircle2, Upload, Database, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function DataEntryFeaturePage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/features" className="flex items-center text-primary-600 hover:text-primary-800 mb-6">
        <ArrowLeft size={16} className="mr-1" /> {t('back')}
      </Link>
      
      <div className="bg-card p-8 mb-8">
        <div className="flex items-center mb-6">
          <Database className="text-primary-600 mr-3" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">{t('eliminateManualEntry')}</h1>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          {t('eliminateManualEntryFullDesc')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-primary-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-primary-800">{t('dataEntryBenefits')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="text-success-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-800">{t('dataEntryBenefit1')}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-success-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-800">{t('dataEntryBenefit2')}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-success-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-800">{t('dataEntryBenefit3')}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-success-600 mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-800">{t('dataEntryBenefit4')}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">{t('howItWorks')}</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-primary-800 font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t('dataEntryStep1Title')}</p>
                  <p className="text-gray-700 text-sm">{t('dataEntryStep1Desc')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-primary-800 font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t('dataEntryStep2Title')}</p>
                  <p className="text-gray-700 text-sm">{t('dataEntryStep2Desc')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-primary-800 font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t('dataEntryStep3Title')}</p>
                  <p className="text-gray-700 text-sm">{t('dataEntryStep3Desc')}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center">
            <Upload size={18} className="mr-2" />
            {t('tryDataImport')}
          </button>
        </div>
      </div>
    </div>
  )
}
