import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/supabase'

// GET all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const division = searchParams.get('division') || ''
    
    let query = supabase
      .from('products')
      .select('*')
    
    // Apply division filter if provided
    if (division) {
      query = query.eq('division', division)
    }
    
    // Apply search filter if provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,product_code.ilike.%${search}%`)
    }
    
    // Get the data
    const { data, error } = await query.order('name')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ products: data || [] })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, product_code, price, division, unit } = body
    
    if (!name || !price || !division) {
      return NextResponse.json({ 
        error: 'Product name, price, and division are required' 
      }, { status: 400 })
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert([
        { name, description, product_code, price, division, unit }
      ])
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ product: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
