import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET accounting reports
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const reportType = searchParams.get('type') || 'revenue'
    const division = searchParams.get('division') || ''
    const startDate = searchParams.get('start_date') || ''
    const endDate = searchParams.get('end_date') || ''
    const groupBy = searchParams.get('group_by') || 'month' // month, week, day
    
    // Base query to get all relevant accounting entries
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
    
    // Get the data
    const { data: entries, error } = await query
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Apply division filter if provided
    let filteredEntries = entries
    if (division && filteredEntries) {
      filteredEntries = filteredEntries.filter(entry => {
        return entry.invoice?.order?.division === division
      })
    }
    
    // Generate the appropriate report based on type
    let reportData
    
    switch (reportType) {
      case 'revenue':
        reportData = generateRevenueReport(filteredEntries, groupBy)
        break
      case 'profit':
        reportData = generateProfitReport(filteredEntries, groupBy)
        break
      case 'division_comparison':
        reportData = generateDivisionComparisonReport(entries) // Use all entries for division comparison
        break
      case 'customer_revenue':
        reportData = generateCustomerRevenueReport(filteredEntries)
        break
      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
    }
    
    return NextResponse.json({
      report_type: reportType,
      division: division || 'all',
      date_range: {
        start: startDate || 'all',
        end: endDate || 'all'
      },
      group_by: groupBy,
      data: reportData
    })
  } catch (error) {
    console.error('Error generating accounting report:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to generate revenue report
function generateRevenueReport(entries: any[], groupBy: string) {
  // Group entries by date according to groupBy parameter
  const groupedData: Record<string, number> = {}
  
  entries.forEach(entry => {
    if (entry.account_type === 'revenue') {
      const date = new Date(entry.entry_date)
      let groupKey
      
      switch (groupBy) {
        case 'month':
          groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          break
        case 'week':
          // Get ISO week number
          const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
          const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
          const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
          groupKey = `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`
          break
        case 'day':
          groupKey = date.toISOString().split('T')[0]
          break
        default:
          groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      }
      
      if (!groupedData[groupKey]) {
        groupedData[groupKey] = 0
      }
      
      groupedData[groupKey] += entry.amount
    }
  })
  
  // Convert to array format for charting
  return Object.keys(groupedData).sort().map(key => ({
    period: key,
    revenue: groupedData[key]
  }))
}

// Helper function to generate profit report
function generateProfitReport(entries: any[], groupBy: string) {
  // Group entries by date according to groupBy parameter
  const groupedData: Record<string, { revenue: number, expenses: number }> = {}
  
  entries.forEach(entry => {
    const date = new Date(entry.entry_date)
    let groupKey
    
    switch (groupBy) {
      case 'month':
        groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        break
      case 'week':
        // Get ISO week number
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
        const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
        groupKey = `${date.getFullYear()}-W${String(weekNum).padStart(2, '0')}`
        break
      case 'day':
        groupKey = date.toISOString().split('T')[0]
        break
      default:
        groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }
    
    if (!groupedData[groupKey]) {
      groupedData[groupKey] = { revenue: 0, expenses: 0 }
    }
    
    if (entry.account_type === 'revenue') {
      groupedData[groupKey].revenue += entry.amount
    } else if (entry.account_type === 'expense') {
      groupedData[groupKey].expenses += entry.amount
    }
  })
  
  // Convert to array format for charting and calculate profit
  return Object.keys(groupedData).sort().map(key => {
    const { revenue, expenses } = groupedData[key]
    return {
      period: key,
      revenue,
      expenses,
      profit: revenue - expenses
    }
  })
}

// Helper function to generate division comparison report
function generateDivisionComparisonReport(entries: any[]) {
  // Group entries by division
  const divisionData: Record<string, { revenue: number, expenses: number }> = {
    'sewing': { revenue: 0, expenses: 0 },
    'interior': { revenue: 0, expenses: 0 }
  }
  
  entries.forEach(entry => {
    const division = entry.invoice?.order?.division
    if (division && (division === 'sewing' || division === 'interior')) {
      if (entry.account_type === 'revenue') {
        divisionData[division].revenue += entry.amount
      } else if (entry.account_type === 'expense') {
        divisionData[division].expenses += entry.amount
      }
    }
  })
  
  // Calculate profit and return formatted data
  return Object.keys(divisionData).map(division => {
    const { revenue, expenses } = divisionData[division]
    return {
      division,
      revenue,
      expenses,
      profit: revenue - expenses,
      profit_margin: revenue > 0 ? ((revenue - expenses) / revenue * 100).toFixed(2) : '0.00'
    }
  })
}

// Helper function to generate customer revenue report
function generateCustomerRevenueReport(entries: any[]) {
  // Group entries by customer
  const customerData: Record<string, { 
    customer_id: string, 
    customer_name: string, 
    company: string | null,
    revenue: number 
  }> = {}
  
  entries.forEach(entry => {
    if (entry.account_type === 'revenue' && entry.invoice?.order?.customer) {
      const customer = entry.invoice.order.customer
      const customerId = customer.id
      
      if (!customerData[customerId]) {
        customerData[customerId] = {
          customer_id: customerId,
          customer_name: customer.name,
          company: customer.company,
          revenue: 0
        }
      }
      
      customerData[customerId].revenue += entry.amount
    }
  })
  
  // Convert to array and sort by revenue (descending)
  return Object.values(customerData)
    .sort((a, b) => b.revenue - a.revenue)
    .map(customer => ({
      customer_id: customer.customer_id,
      customer_name: customer.customer_name,
      company: customer.company,
      revenue: customer.revenue
    }))
}
