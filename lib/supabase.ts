import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database Types
export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  company?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  category: 'sewing' | 'interior'
  price: number
  unit: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_id: string
  division: 'sewing' | 'interior'
  status: 'draft' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  total_amount: number
  notes?: string
  created_at: string
  updated_at: string
  customer?: Customer
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  notes?: string
  product?: Product
}

export interface Invoice {
  id: string
  order_id: string
  invoice_number: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  issue_date: string
  due_date: string
  subtotal: number
  tax_amount: number
  total_amount: number
  notes?: string
  created_at: string
  updated_at: string
  order?: Order
}

export interface AccountingEntry {
  id: string
  invoice_id: string
  entry_type: 'revenue' | 'expense' | 'asset' | 'liability'
  account_name: string
  debit_amount: number
  credit_amount: number
  description: string
  entry_date: string
  created_at: string
  invoice?: Invoice
}
