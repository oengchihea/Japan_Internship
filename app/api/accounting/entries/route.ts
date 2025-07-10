import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all accounting entries
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const division = searchParams.get('division') || ''
    const startDate = searchParams.get('start_date') || ''
    const endDate = searchParams.get('end_date') || ''
    const accountType = searchParams.get('account_type') || ''
    
    let query = supabase
      .from('accounting_entries')
      .select(`
        *,
        invoice:invoices(
          *,
          order:orders(
            *,
            customer:customers(*)
          )
        )
      `)
    
    // Apply date range filter if provided
    if (startDate) {
      query = query.gte('entry_date', startDate)
    }
    
    if (endDate) {
      query = query.lte('entry_date', endDate)
    }
    
    // Apply account type filter if provided
    if (accountType) {
      query = query.eq('account_type', accountType)
    }
    
    // Get the data
    const { data, error } = await query.order('entry_date', { ascending: false })
    
    // Apply division filter if provided (needs post-processing)
    let filteredData = data
    if (division && filteredData) {
      filteredData = filteredData.filter(entry => {
        return entry.invoice?.order?.division === division
      })
    }
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ accounting_entries: filteredData || [] })
  } catch (error) {
    console.error('Error fetching accounting entries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new accounting entry (manual entry)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      invoice_id, 
      account_type, 
      entry_date, 
      amount, 
      description,
      is_manual_entry 
    } = body
    
    if (!account_type || !amount) {
      return NextResponse.json({ 
        error: 'Account type and amount are required' 
      }, { status: 400 })
    }
    
    // For manual entries, we need to ensure they are marked as such
    const entryData = {
      invoice_id, 
      account_type, 
      entry_date: entry_date || new Date().toISOString(),
      amount,
      description,
      is_manual_entry: true // Always set to true for API-created entries
    }
    
    const { data, error } = await supabase
      .from('accounting_entries')
      .insert([entryData])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      accounting_entry: data[0],
      message: '会計エントリが手動で作成されました'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating accounting entry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
