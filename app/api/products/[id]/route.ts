import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET a specific product by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json({ product: data })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update a product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    const { name, description, product_code, price, division, unit } = body
    
    if (!name || !price || !division) {
      return NextResponse.json({ 
        error: 'Product name, price, and division are required' 
      }, { status: 400 })
    }
    
    const { data, error } = await supabase
      .from('products')
      .update({ name, description, product_code, price, division, unit })
      .eq('id', id)
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    if (data.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    return NextResponse.json({ product: data[0] })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE a product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // First check if the product is used in any order items
    const { data: orderItems, error: checkError } = await supabase
      .from('order_items')
      .select('id')
      .eq('product_id', id)
      .limit(1)
    
    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 500 })
    }
    
    // If product is used in orders, prevent deletion
    if (orderItems && orderItems.length > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete product that is used in orders' 
      }, { status: 400 })
    }
    
    // Delete the product
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, message: '製品が削除されました' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
