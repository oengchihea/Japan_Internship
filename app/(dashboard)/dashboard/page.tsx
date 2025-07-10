"use client"

import { useTranslation } from 'react-i18next'
import DashboardStats from '../../../components/DashboardStats'
import DashboardDivisions from '../../../components/DashboardDivisions'
import DashboardActivities from '../../../components/DashboardActivities'

export default function Dashboard() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('dashboardTitle')}</h1>
      
      {/* Stats Overview */}
      <DashboardStats />

      {/* Division Overview */}
      <DashboardDivisions />

      {/* Recent Activities */}
      <DashboardActivities />
    </div>
  )
}
