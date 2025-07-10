import Link from 'next/link'
import { ArrowLeft, Download, Printer } from 'lucide-react'

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  // In a real implementation, we would fetch the invoice data from the API
  // using the params.id and the useEffect hook with SWR or React Query
  
  // Sample invoice data for demonstration
  const invoice = {
    id: params.id,
    invoice_number: 'INV-20250705-1234',
    status: 'sent',
    issue_date: '2025-07-05',
    due_date: '2025-08-04',
    total_amount: 82500,
    tax_amount: 7500,
    notes: '自動生成された請求書',
    order: {
      id: 'ORD-20250701-1234',
      division: 'sewing',
      status: 'confirmed',
      created_at: '2025-07-01',
      customer: {
        id: 'CUST-001',
        name: '田中太郎',
        company: '田中商事',
        email: 'tanaka@example.com',
        phone: '03-1234-5678',
        address: '東京都千代田区1-1-1'
      },
      order_items: [
        {
          id: 'ITEM-001',
          product: {
            id: 'PROD-001',
            name: 'カスタムシャツ',
            description: '高品質コットン素材のカスタムシャツ',
            price: 15000,
            unit: '枚'
          },
          quantity: 3,
          unit_price: 15000,
          total_price: 45000
        },
        {
          id: 'ITEM-002',
          product: {
            id: 'PROD-002',
            name: 'ビジネススーツ',
            description: 'オーダーメイドビジネススーツ',
            price: 30000,
            unit: '着'
          },
          quantity: 1,
          unit_price: 30000,
          total_price: 30000
        }
      ]
    }
  }
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount)
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date)
  }
  
  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'draft': return 'status-draft'
      case 'sent': return 'status-sent'
      case 'paid': return 'status-paid'
      case 'overdue': return 'status-overdue'
      default: return 'status-draft'
    }
  }
  
  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return '下書き'
      case 'sent': return '送信済み'
      case 'paid': return '支払済み'
      case 'overdue': return '期限超過'
      default: return '下書き'
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Link href="/invoices" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={18} className="mr-1" />
          <span>請求書一覧に戻る</span>
        </Link>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center">
            <Printer size={18} className="mr-1" />
            <span>印刷</span>
          </button>
          <button className="btn-secondary flex items-center">
            <Download size={18} className="mr-1" />
            <span>PDFダウンロード</span>
          </button>
          <button className="btn-primary">
            ステータス更新
          </button>
        </div>
      </div>

      {/* Invoice Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">請求書 #{invoice.invoice_number}</h1>
            <div className="text-gray-600">
              <p>注文番号: {invoice.order.id}</p>
              <p>部門: {invoice.order.division === 'sewing' ? '縫製部門' : 'インテリア部門'}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:text-right">
            <span className={getStatusBadgeClass(invoice.status)}>
              {getStatusText(invoice.status)}
            </span>
            <p className="mt-2">発行日: {formatDate(invoice.issue_date)}</p>
            <p>支払期限: {formatDate(invoice.due_date)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">請求先:</h2>
            <p className="font-medium">{invoice.order.customer.name}</p>
            {invoice.order.customer.company && (
              <p>{invoice.order.customer.company}</p>
            )}
            <p>{invoice.order.customer.address}</p>
            <p>{invoice.order.customer.email}</p>
            <p>{invoice.order.customer.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">請求元:</h2>
            <p className="font-medium">岩手DXコンサルテーションセンター</p>
            <p>〒020-0023</p>
            <p>岩手県盛岡市内丸1-1</p>
            <p>info@iwate-dx.example.com</p>
            <p>019-123-4567</p>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                品目
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                数量
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                単価
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                金額
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoice.order.order_items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                  <div className="text-sm text-gray-500">{item.product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.quantity} {item.product.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatCurrency(item.unit_price)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatCurrency(item.total_price)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Invoice Summary */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-end">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">小計:</span>
                <span className="font-medium">{formatCurrency(invoice.total_amount - invoice.tax_amount)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">消費税 (10%):</span>
                <span className="font-medium">{formatCurrency(invoice.tax_amount)}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>合計:</span>
                <span>{formatCurrency(invoice.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">備考:</h2>
        <p className="text-gray-700">{invoice.notes}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-2">お支払い方法:</h2>
          <p className="text-gray-700">銀行振込</p>
          <p className="text-gray-700">岩手銀行 盛岡支店 (普) 1234567</p>
          <p className="text-gray-700">口座名義: イワテディーエックスコンサルテーションセンター</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-gray-600">
          <p>この請求書は注文確認時に自動生成されました。</p>
          <p>お問い合わせは岩手DXコンサルテーションセンター (019-123-4567) までご連絡ください。</p>
        </div>
      </div>
    </div>
  )
}
