import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all invoices
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const division = searchParams.get('division') || ''
    const status = searchParams.get('status') || ''
    
    let query = supabase
      .from('invoices')
      .select(`
        *,
        order:orders(
          *,
          customer:customers(*),
          order_items:order_items(
            *,
            product:products(*)
          )
        ),
        accounting_entries:accounting_entries(*)
      `)
    
    // Apply filters if provided
    if (status) {
      query = query.eq('status', status)
    }
    
    // Get the data
    const { data, error } = await query.order('created_at', { ascending: false })
    
    // Apply additional filters that need post-processing
    let filteredData = data
    
    // Filter by division if specified
    if (division && filteredData) {
      filteredData = filteredData.filter(invoice => {
        return invoice.order?.division === division
      })
    }
    
    // Apply search filter if provided
    if (search && filteredData) {
      const searchLower = search.toLowerCase()
      filteredData = filteredData.filter(invoice => {
        return (
          invoice.invoice_number.toLowerCase().includes(searchLower) ||
          invoice.order?.customer?.name.toLowerCase().includes(searchLower) ||
          invoice.order?.customer?.company?.toLowerCase().includes(searchLower)
        )
      })
    }
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ invoices: filteredData || [] })
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
