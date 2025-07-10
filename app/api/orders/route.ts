import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Order, OrderItem } from '@/lib/supabase'

// GET all orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const division = searchParams.get('division') || ''
    const status = searchParams.get('status') || ''
    
    let query = supabase
      .from('orders')
      .select(`
        *,
        customer:customers(*),
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
    
    // Apply filters if provided
    if (division) {
      query = query.eq('division', division)
    }
    
    if (status) {
      query = query.eq('status', status)
    }
    
    // Get the data
    const { data, error } = await query.order('created_at', { ascending: false })
    
    // Apply search filter if provided
    let filteredData = data
    if (search && data) {
      const searchLower = search.toLowerCase()
      filteredData = data.filter(order => {
        return (
          order.id.toLowerCase().includes(searchLower) ||
          order.customer?.name.toLowerCase().includes(searchLower) ||
          order.customer?.company?.toLowerCase().includes(searchLower)
        )
      })
    }
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ orders: filteredData || [] })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer_id, division, notes, order_items } = body
    
    if (!customer_id || !division) {
      return NextResponse.json({ 
        error: 'Customer ID and division are required' 
      }, { status: 400 })
    }
    
    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        { 
          customer_id, 
          division, 
          notes,
          status: 'draft',
          total_amount: 0 // Will be calculated by the database trigger
        }
      ])
      .select()
    
    if (orderError) {
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }
    
    if (!order || order.length === 0) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }
    
    const orderId = order[0].id
    
    // Add order items if provided
    if (order_items && order_items.length > 0) {
      const formattedItems = order_items.map((item: Partial<OrderItem>) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: (item.quantity || 0) * (item.unit_price || 0),
        notes: item.notes
      }))
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(formattedItems)
      
      if (itemsError) {
        // If adding items fails, we should delete the order to maintain consistency
        await supabase.from('orders').delete().eq('id', orderId)
        return NextResponse.json({ error: itemsError.message }, { status: 500 })
      }
    }
    
    // Get the complete order with items
    const { data: completeOrder, error: fetchError } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customers(*),
        order_items:order_items(
          *,
          product:products(*)
        )
      `)
      .eq('id', orderId)
      .single()
    
    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }
    
    return NextResponse.json({ order: completeOrder }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
