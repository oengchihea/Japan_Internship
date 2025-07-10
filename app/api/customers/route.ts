import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Customer } from '@/lib/supabase'

// GET all customers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const division = searchParams.get('division') || ''
    
    let query = supabase
      .from('customers')
      .select(`
        *,
        orders:orders(division)
      `)
    
    // Apply search filter if provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`)
    }
    
    // Get the data
    const { data, error } = await query
    
    // Filter by division if specified
    let filteredData = data
    if (division && data) {
      filteredData = data.filter(customer => {
        return customer.orders.some((order: any) => order.division === division)
      })
    }
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ customers: filteredData || [] })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new customer
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, company } = body
    
    if (!name) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 })
    }
    
    const { data, error } = await supabase
      .from('customers')
      .insert([
        { name, email, phone, address, company }
      ])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ customer: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
