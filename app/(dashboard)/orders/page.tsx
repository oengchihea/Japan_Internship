import Link from 'next/link'
import { Edit, Eye, Plus, Search } from 'lucide-react'

export default function OrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">注文管理</h1>
        <Link href="/orders/new" className="btn-primary flex items-center">
          <Plus size={18} className="mr-1" />
          <span>新規注文</span>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="顧客名、注文IDで検索..."
                className="form-input pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select className="form-select">
              <option value="">すべての部門</option>
              <option value="sewing">縫製部門</option>
              <option value="interior">インテリア部門</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <select className="form-select">
              <option value="">すべてのステータス</option>
              <option value="draft">下書き</option>
              <option value="confirmed">確認済み</option>
              <option value="in_progress">進行中</option>
              <option value="completed">完了</option>
              <option value="cancelled">キャンセル</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                注文ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                顧客
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                部門
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                金額
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日付
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample Order 1 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">ORD-001</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">田中太郎</div>
                <div className="text-sm text-gray-500">田中商事</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">縫製部門</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">¥75,000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">2025/07/05</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="status-confirmed">確認済み</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href="/orders/1" className="text-blue-600 hover:text-blue-900">
                    <Eye size={18} />
                  </Link>
                  <Link href="/orders/1/edit" className="text-blue-600 hover:text-blue-900">
                    <Edit size={18} />
                  </Link>
                </div>
              </td>
            </tr>

            {/* Sample Order 2 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">ORD-002</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">佐藤花子</div>
                <div className="text-sm text-gray-500">佐藤工業</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">インテリア部門</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">¥125,000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">2025/07/01</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="status-in-progress">進行中</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href="/orders/2" className="text-blue-600 hover:text-blue-900">
                    <Eye size={18} />
                  </Link>
                  <Link href="/orders/2/edit" className="text-blue-600 hover:text-blue-900">
                    <Edit size={18} />
                  </Link>
                </div>
              </td>
            </tr>

            {/* Sample Order 3 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">ORD-003</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">山田次郎</div>
                <div className="text-sm text-gray-500">山田デザイン</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">縫製部門</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">¥45,000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">2025/06/28</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="status-completed">完了</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href="/orders/3" className="text-blue-600 hover:text-blue-900">
                    <Eye size={18} />
                  </Link>
                  <Link href="/orders/3/edit" className="text-blue-600 hover:text-blue-900">
                    <Edit size={18} />
                  </Link>
                </div>
              </td>
            </tr>

            {/* Sample Order 4 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">ORD-004</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">田中太郎</div>
                <div className="text-sm text-gray-500">田中商事</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">インテリア部門</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">¥95,000</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">2025/06/25</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="status-draft">下書き</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href="/orders/4" className="text-blue-600 hover:text-blue-900">
                    <Eye size={18} />
                  </Link>
                  <Link href="/orders/4/edit" className="text-blue-600 hover:text-blue-900">
                    <Edit size={18} />
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              全 <span className="font-medium">42</span> 件中 <span className="font-medium">1</span> から <span className="font-medium">10</span> 件を表示
            </div>
            <div className="flex-1 flex justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                前へ
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                次へ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
