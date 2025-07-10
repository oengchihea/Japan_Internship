"use client"

import { BarChart3, FileText, TrendingUp, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function DashboardStats() {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{t('totalCustomers')}</p>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">
              {i18n.language === 'ja' ? '8% 増加' : '8% increase'}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {i18n.language === 'ja' ? '先月比' : 'Compared to last month'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              {i18n.language === 'ja' ? '注文総数' : 'Total Orders'}
            </p>
            <p className="text-2xl font-bold">42</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">
              {i18n.language === 'ja' ? '12% 増加' : '12% increase'}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {i18n.language === 'ja' ? '先月比' : 'Compared to last month'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              {i18n.language === 'ja' ? '請求書総数' : 'Total number of Invoices'}
            </p>
            <p className="text-2xl font-bold">36</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">
              {i18n.language === 'ja' ? '5% 増加' : '5% increase'}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {i18n.language === 'ja' ? '先月比' : 'Compared to last month'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 mr-4">
            <BarChart3 className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              {i18n.language === 'ja' ? '月間収益' : 'Monthly Revenue'}
            </p>
            <p className="text-2xl font-bold">¥2,450,000</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500 font-medium">
              {i18n.language === 'ja' ? '15% 増加' : '15% increase'}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {i18n.language === 'ja' ? '先月比' : 'Compared to last month'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
