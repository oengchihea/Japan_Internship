"use client"

import Link from 'next/link'
import { BarChart3, FileText, Home, Menu, Settings, Users, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  
  // Only show the fully translated content after mounting on the client
  // This prevents hydration mismatch between server and client
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="h-8 w-8 bg-primary-600 text-white rounded-md flex items-center justify-center mr-2">
                  <span className="font-bold">I</span>
                </div>
                <span className="text-lg font-bold text-gray-900">Iwate DX</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-2">
              <Link href="/" className="flex items-center px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
                <Home size={18} className="mr-1 text-primary-600" />
                <span>{mounted ? t('home') : 'Home'}</span>
              </Link>
              <Link href="/dashboard" className="flex items-center px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
                <BarChart3 size={18} className="mr-1 text-primary-600" />
                <span>{mounted ? t('dashboard') : 'Dashboard'}</span>
              </Link>
              <Link href="/customers" className="flex items-center px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
                <Users size={18} className="mr-1 text-primary-600" />
                <span>{mounted ? t('customers') : 'Customers'}</span>
              </Link>
              <Link href="/invoices" className="flex items-center px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
                <FileText size={18} className="mr-1 text-primary-600" />
                <span>{mounted ? t('invoices') : 'Invoices'}</span>
              </Link>
              <Link href="/reports" className="flex items-center px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
                <BarChart3 size={18} className="mr-1 text-primary-600" />
                <span>{mounted ? t('reports') : 'Reports'}</span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="mr-4 border-r pr-4">
              <LanguageSwitcher />
            </div>
            <div className="relative">
              <button
                type="button"
                className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <Settings size={18} className="mr-1" />
                <span>{mounted ? t('settings') : 'Settings'}</span>
              </button>
            </div>
            <div className="flex md:hidden items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-gray-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
              <div className="flex items-center">
                <Home size={18} className="mr-2 text-primary-600" />
                <span>{mounted ? t('home') : 'Home'}</span>
              </div>
            </Link>
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
              <div className="flex items-center">
                <BarChart3 size={18} className="mr-2 text-primary-600" />
                <span>{mounted ? t('dashboard') : 'Dashboard'}</span>
              </div>
            </Link>
            <Link href="/customers" className="block px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
              <div className="flex items-center">
                <Users size={18} className="mr-2 text-primary-600" />
                <span>{mounted ? t('customers') : 'Customers'}</span>
              </div>
            </Link>
            <Link href="/invoices" className="block px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
              <div className="flex items-center">
                <FileText size={18} className="mr-2 text-primary-600" />
                <span>{mounted ? t('invoices') : 'Invoices'}</span>
              </div>
            </Link>
            <Link href="/reports" className="block px-3 py-2 rounded-md text-gray-900 font-medium hover:bg-gray-100 hover:text-primary-600">
              <div className="flex items-center">
                <BarChart3 size={18} className="mr-2 text-primary-600" />
                <span>{mounted ? t('reports') : 'Reports'}</span>
              </div>
            </Link>
            <div className="mt-4 border-t pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
