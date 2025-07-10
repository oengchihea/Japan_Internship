"use client"

import Link from 'next/link'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function CustomersPage() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  
  // Only show the fully translated content after mounting on the client
  // This prevents hydration mismatch between server and client
  useEffect(() => {
    setMounted(true);
  }, []);
  // Sample customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "田中太郎",
      company: "田中商事",
      email: "tanaka@example.com",
      phone: "090-1234-5678",
      orders: 8,
      lastOrder: "2025/07/05"
    },
    {
      id: 2,
      name: "佐藤花子",
      company: "佐藤工業",
      email: "sato@example.com",
      phone: "090-2345-6789",
      orders: 5,
      lastOrder: "2025/07/01"
    },
    {
      id: 3,
      name: "山田次郎",
      company: "山田デザイン",
      email: "yamada@example.com",
      phone: "090-3456-7890",
      orders: 3,
      lastOrder: "2025/06/28"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  
  // Handle delete customer
  const handleDelete = (id) => {
    const confirmMessage = i18n.language === 'ja' ? "この顧客を削除してもよろしいですか？" : "Are you sure you want to delete this customer?";
    if (confirm(confirmMessage)) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };
  
  // Handle edit customer
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };
  
  // Handle save edited customer
  const handleSave = (e) => {
    e.preventDefault();
    setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c));
    setEditingCustomer(null);
  };
  
  // Handle search
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {mounted ? t('customersTitle') : (i18n.language === 'ja' ? '顧客管理' : 'Customers')}
        </h1>
        <Link href="/customers/new" className="btn-primary flex items-center">
          <Plus size={18} className="mr-1" />
          <span>
            {mounted ? t('addCustomer') : (i18n.language === 'ja' ? '新規顧客' : 'Add Customer')}
          </span>
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
                placeholder={mounted ? t('search') + '...' : (i18n.language === 'ja' ? '顧客名、会社名、メールで検索...' : 'Search by name, company, email...')}
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select className="form-select">
              <option value="">
                {mounted ? t('allCustomers') : (i18n.language === 'ja' ? 'すべての顧客' : 'All Customers')}
              </option>
              <option value="sewing">
                {mounted ? t('sewingDivisionCustomers') : (i18n.language === 'ja' ? '縫製部門の顧客' : 'Sewing Division Customers')}
              </option>
              <option value="interior">
                {mounted ? t('interiorDivisionCustomers') : (i18n.language === 'ja' ? 'インテリア部門の顧客' : 'Interior Division Customers')}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {mounted ? t('name') : (i18n.language === 'ja' ? '顧客名' : 'Name')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {mounted ? t('company') : (i18n.language === 'ja' ? '会社名' : 'Company')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {mounted ? t('contact') : (i18n.language === 'ja' ? '連絡先' : 'Contact')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {mounted ? t('orders') : (i18n.language === 'ja' ? '注文数' : 'Orders')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {mounted ? t('lastOrder') : (i18n.language === 'ja' ? '最終注文' : 'Last Order')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {mounted ? t('actions') : (i18n.language === 'ja' ? '操作' : 'Actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {editingCustomer ? (
              <tr className="bg-blue-50">
                <td colSpan={6} className="px-6 py-4">
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{mounted ? t('name') : (i18n.language === 'ja' ? '顧客名' : 'Name')}</label>
                        <input 
                          type="text" 
                          className="form-input w-full" 
                          value={editingCustomer.name}
                          onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{mounted ? t('company') : (i18n.language === 'ja' ? '会社名' : 'Company')}</label>
                        <input 
                          type="text" 
                          className="form-input w-full" 
                          value={editingCustomer.company}
                          onChange={(e) => setEditingCustomer({...editingCustomer, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                        <input 
                          type="email" 
                          className="form-input w-full" 
                          value={editingCustomer.email}
                          onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                        <input 
                          type="text" 
                          className="form-input w-full" 
                          value={editingCustomer.phone}
                          onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={() => setEditingCustomer(null)}
                      >
                        キャンセル
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                      >
                        保存
                      </button>
                    </div>
                  </form>
                </td>
              </tr>
            ) : (
              filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{customer.lastOrder}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(customer)} 
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)} 
                        className="text-danger-600 hover:text-danger-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            {filteredCustomers.length === 0 && !editingCustomer && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  顧客が見つかりません
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              全 <span className="font-medium">{customers.length}</span> 件中 <span className="font-medium">1</span> から <span className="font-medium">{filteredCustomers.length}</span> 件を表示
            </div>
            <div className="flex-1 flex justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                前へ
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" disabled={true}>
                次へ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
