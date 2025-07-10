"use client"

import { useTranslation } from 'react-i18next'
import { ArrowLeft, CheckCircle2, FileSpreadsheet, BarChart3, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function AccountingFeaturePage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/features" className="flex items-center text-green-600 hover:text-green-800 mb-6">
        <ArrowLeft size={16} className="mr-1" /> {t('back')}
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center mb-6">
          <FileSpreadsheet className="text-green-600 mr-3" size={32} />
          <h1 className="text-3xl font-bold">{t('automatedAccounting')}</h1>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          {t('automatedAccountingFullDesc')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">{t('accountingBenefits')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>{t('accountingBenefit1')}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>{t('accountingBenefit2')}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>{t('accountingBenefit3')}</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                <span>{t('accountingBenefit4')}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{t('integrationOptions')}</h3>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-white rounded border border-gray-200">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-800 font-bold">Q</span>
                </div>
                <div>
                  <p className="font-medium">{t('quickBooks')}</p>
                  <p className="text-gray-600 text-sm">{t('quickBooksDesc')}</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-white rounded border border-gray-200">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-green-800 font-bold">X</span>
                </div>
                <div>
                  <p className="font-medium">{t('xero')}</p>
                  <p className="text-gray-600 text-sm">{t('xeroDesc')}</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-white rounded border border-gray-200">
                <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-purple-800 font-bold">S</span>
                </div>
                <div>
                  <p className="font-medium">{t('sage')}</p>
                  <p className="text-gray-600 text-sm">{t('sageDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">{t('realTimeSync')}</h3>
          <div className="flex items-center mb-4">
            <RefreshCw className="text-green-600 mr-2" size={20} />
            <p className="font-medium">{t('autoSyncTitle')}</p>
          </div>
          <p className="text-gray-600 mb-4">{t('autoSyncDesc')}</p>
          
          <div className="flex items-center mb-4">
            <BarChart3 className="text-blue-600 mr-2" size={20} />
            <p className="font-medium">{t('reportingTitle')}</p>
          </div>
          <p className="text-gray-600">{t('reportingDesc')}</p>
        </div>
        
        <div className="flex justify-center mt-8">
          <button className="btn-primary bg-green-600 hover:bg-green-700 flex items-center">
            <FileSpreadsheet size={18} className="mr-2" />
            {t('setupAccountingIntegration')}
          </button>
        </div>
      </div>
    </div>
  )
}
