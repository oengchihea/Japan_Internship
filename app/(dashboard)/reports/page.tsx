"use client"

import { BarChart, BarChart3, Download, FileText, PieChart } from 'lucide-react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'
import { useTranslation } from 'react-i18next'

export default function ReportsPage() {
  const { t } = useTranslation();
  
  // Sample data for charts
  const monthlyRevenueData = [
    { name: t('month1'), sewing: 950000, interior: 850000 },
    { name: t('month2'), sewing: 880000, interior: 920000 },
    { name: t('month3'), sewing: 1050000, interior: 980000 },
    { name: t('month4'), sewing: 1150000, interior: 1050000 },
    { name: t('month5'), sewing: 1250000, interior: 1100000 },
    { name: t('month6'), sewing: 1200000, interior: 1180000 },
    { name: t('month7'), sewing: 1250000, interior: 1200000 },
  ]

  const divisionRevenueData = [
    { name: t('sewingDivision'), value: 7730000, color: '#3b82f6' },
    { name: t('interiorDivision'), value: 7280000, color: '#10b981' }
  ]

  const COLORS = ['#3b82f6', '#10b981']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('financialReports')}</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            <Download size={18} className="mr-1" />
            <span>{t('csvDownload')}</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            <FileText size={18} className="mr-1" />
            <span>{t('pdfReport')}</span>
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-card p-6 mb-6">
        <div className="flex items-center mb-4">
          <BarChart3 size={24} className="text-primary-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">{t('monthlyRevenue')}</h2>
        </div>
        <p className="text-gray-700 mb-6">
          {t('monthlyRevenueDesc')}
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={monthlyRevenueData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip formatter={(value) => `¥${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="sewing" name={t('sewingDivision')} fill="#3b82f6" />
              <Bar dataKey="interior" name={t('interiorDivision')} fill="#10b981" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Division Revenue Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card p-6">
          <div className="flex items-center mb-4">
            <PieChart size={24} className="text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">{t('divisionRevenueComparison')}</h2>
          </div>
          <p className="text-gray-700 mb-6">
            {t('divisionRevenueDesc')}
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={divisionRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {divisionRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `¥${value.toLocaleString()}`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>縫製部門: ¥7,730,000</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>{t('interiorDivision')}: ¥7,280,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6">
          <div className="flex items-center mb-4">
            <BarChart size={24} className="text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">{t('accountingEffectiveness')}</h2>
          </div>
          <p className="text-gray-700 mb-4">
            {t('accountingEffectivenessDesc')}
          </p>
          
          <div className="space-y-4 mt-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{t('timeReduction')}</span>
                <span className="text-sm font-medium text-success-600">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{t('errorReduction')}</span>
                <span className="text-sm font-medium text-success-600">90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-600 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{t('dataVisibility')}</span>
                <span className="text-sm font-medium text-success-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{t('processingSpeed')}</span>
                <span className="text-sm font-medium text-success-600">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">コスト削減</span>
                <span className="text-sm font-medium text-green-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accounting Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">会計サマリー</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('accountItem')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('sewingDivision')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('interiorDivision')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('total')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t('revenue')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥7,730,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥7,280,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ¥15,010,000
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t('materialCosts')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥2,850,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥3,120,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ¥5,970,000
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t('laborCosts')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥1,950,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥1,850,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ¥3,800,000
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {t('otherExpenses')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥850,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ¥780,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ¥1,630,000
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {t('netProfit')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ¥2,080,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ¥1,530,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                  ¥3,610,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
