import Link from 'next/link'
import { ArrowRight, BarChart3, Database, FileText, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="mr-4">
              <span className="text-3xl">🏢</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Iwate DX Consultation Center</h1>
              <p className="mt-2 text-blue-100">統合ビジネス管理システム</p>
            </div>
          </div>
          
          <div className="mt-8 max-w-2xl">
            <p className="text-xl">
              縫製部門とインテリア仕上げ部門のデータを統合し、手動データ入力を排除し、会計システムと自動連携します。
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Problem Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Problem 1: Data Silos */}
          <div className="card">
            <div className="flex items-center mb-4 text-red-500">
              <Database size={24} className="mr-2" />
              <h2 className="text-xl font-semibold">データサイロの解決</h2>
            </div>
            <p className="text-gray-600 mb-4">
              縫製管理システムとインテリア仕上げシステムを統合し、すべての顧客データと注文情報を一元管理します。
            </p>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-700 font-medium">統合データベースで両部門のデータを共有</p>
            </div>
            <Link href="/dashboard" className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800">
              統合ダッシュボードを見る <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {/* Problem 2: Manual Data Re-entry */}
          <div className="card">
            <div className="flex items-center mb-4 text-red-500">
              <FileText size={24} className="mr-2" />
              <h2 className="text-xl font-semibold">手動データ再入力の排除</h2>
            </div>
            <p className="text-gray-600 mb-4">
              同じデータを複数回入力する必要がなくなります。注文情報を一度入力するだけで、請求書が自動生成されます。
            </p>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-700 font-medium">データを1回だけ入力、すべて自動化</p>
            </div>
            <Link href="/orders/new" className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800">
              新しい注文を作成 <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {/* Problem 3: No Accounting Integration */}
          <div className="card">
            <div className="flex items-center mb-4 text-red-500">
              <BarChart3 size={24} className="mr-2" />
              <h2 className="text-xl font-semibold">会計連携の自動化</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Excelへの手動入力が不要になります。請求書から会計エントリが自動的に生成され、リアルタイムのレポートが可能になります。
            </p>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-green-700 font-medium">自動会計処理で即時の財務可視性</p>
            </div>
            <Link href="/reports" className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800">
              財務レポートを見る <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Quick Access Section */}
        <h2 className="text-2xl font-bold mb-6">クイックアクセス</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/customers" className="card hover:shadow-lg transition-shadow">
            <Users size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">顧客管理</h3>
            <p className="text-gray-600">両部門の顧客データを統合管理</p>
          </Link>
          
          <Link href="/orders" className="card hover:shadow-lg transition-shadow">
            <FileText size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">注文管理</h3>
            <p className="text-gray-600">すべての注文を一元管理</p>
          </Link>
          
          <Link href="/invoices" className="card hover:shadow-lg transition-shadow">
            <FileText size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">請求書管理</h3>
            <p className="text-gray-600">自動生成された請求書を管理</p>
          </Link>
          
          <Link href="/reports" className="card hover:shadow-lg transition-shadow">
            <BarChart3 size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">レポート</h3>
            <p className="text-gray-600">リアルタイムの財務レポート</p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Iwate DX Consultation Center</h2>
              <p className="text-gray-400">統合ビジネス管理システム</p>
            </div>
            <div>
              <p className="text-gray-400">© 2025 Iwate DX Consultation Center</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
