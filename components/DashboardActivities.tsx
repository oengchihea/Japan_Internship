"use client"

import Link from 'next/link'
import { FileText, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function DashboardActivities() {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        {i18n.language === 'ja' ? '最近のアクティビティ' : 'Recent Activities'}
      </h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium">
              {i18n.language === 'ja' ? '新しい注文が作成されました' : 'New order was created'}
            </p>
            <p className="text-sm text-gray-500">
              {i18n.language === 'ja' ? '田中太郎様 - カーテン縫製 ¥75,000' : 'Tanaka Taro - Curtain Sewing ¥75,000'}
            </p>
            <p className="text-xs text-gray-400">
              {i18n.language === 'ja' ? '30分前' : '30 minutes ago'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">
              {i18n.language === 'ja' ? '請求書が自動生成されました' : 'Invoice was automatically generated'}
            </p>
            <p className="text-sm text-gray-500">
              {i18n.language === 'ja' ? '請求書番号: INV-20250708-1234' : 'Invoice number: INV-20250708-1234'}
            </p>
            <p className="text-xs text-gray-400">
              {i18n.language === 'ja' ? '1時間前' : '1 hour ago'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-3">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium">
              {i18n.language === 'ja' ? '新しい顧客が追加されました' : 'New customer was added'}
            </p>
            <p className="text-sm text-gray-500">
              {i18n.language === 'ja' ? '山田次郎様 - 山田デザイン' : 'Yamada Jiro - Yamada Design'}
            </p>
            <p className="text-xs text-gray-400">
              {i18n.language === 'ja' ? '3時間前' : '3 hours ago'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2 mr-3">
            <FileText className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="font-medium">
              {i18n.language === 'ja' ? '会計エントリが自動生成されました' : 'Accounting entry was automatically generated'}
            </p>
            <p className="text-sm text-gray-500">
              {i18n.language === 'ja' ? '請求書番号: INV-20250708-1230' : 'Invoice number: INV-20250708-1230'}
            </p>
            <p className="text-xs text-gray-400">
              {i18n.language === 'ja' ? '5時間前' : '5 hours ago'}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Link href="/activities" className="text-blue-600 hover:text-blue-800 font-medium">
          {i18n.language === 'ja' ? 'すべてのアクティビティを見る →' : 'View all activities →'}
        </Link>
      </div>
    </div>
  )
}
