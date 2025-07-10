"use client"

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function DashboardDivisions() {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          {i18n.language === 'ja' ? '縫製部門' : 'Sewing Division'}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '今月の注文' : 'Orders this month'}
            </span>
            <span className="font-medium">
              {i18n.language === 'ja' ? '18件' : '18 orders'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '完了した注文' : 'Completed orders'}
            </span>
            <span className="font-medium">
              {i18n.language === 'ja' ? '14件' : '14 orders'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '進行中の注文' : 'Orders in progress'}
            </span>
            <span className="font-medium">
              {i18n.language === 'ja' ? '4件' : '4 orders'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '今月の収益' : 'Revenue this month'}
            </span>
            <span className="font-medium">¥1,250,000</span>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/orders?division=sewing" className="text-blue-600 hover:text-blue-800 font-medium">
            {i18n.language === 'ja' ? '縫製部門の注文を見る →' : 'View sewing division orders →'}
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          {i18n.language === 'ja' ? 'インテリア仕上げ部門' : 'Interior Finishing Division'}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '今月の注文' : 'Orders this month'}
            </span>
            <span className="font-medium">
              {i18n.language === 'ja' ? '24件' : '24 orders'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '完了した注文' : 'Completed orders'}
            </span>
            <span className="font-medium">
              {i18n.language === 'ja' ? '20件' : '20 orders'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '進行中の注文' : 'Orders in progress'}
            </span>
            <span className="font-medium">
              {i18n.language === 'ja' ? '4件' : '4 orders'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {i18n.language === 'ja' ? '今月の収益' : 'Revenue this month'}
            </span>
            <span className="font-medium">¥1,200,000</span>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/orders?division=interior" className="text-blue-600 hover:text-blue-800 font-medium">
            {i18n.language === 'ja' ? 'インテリア仕上げ部門の注文を見る →' : 'View interior finishing division orders →'}
          </Link>
        </div>
      </div>
    </div>
  )
}
