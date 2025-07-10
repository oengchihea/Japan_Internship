-- Iwate DX Unified Business Management System
-- Database Schema to solve the three main problems:
-- 1. Data Silos (unified database)
-- 2. Manual Data Re-entry (automated workflows)
-- 3. No Accounting Integration (automated accounting entries)

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO '1TH9u3NLoMtZFYALZo4lCHSz8B08+D5oxSNwLCXJrq7oBaCfh4fuBA/VUwrdX9BsgYQ1w1D+P9aOJqvnsfaniA==';

-- Customers table (unified for both divisions)
CREATE TABLE customers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    company VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table (supports both sewing and interior products)
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(20) CHECK (category IN ('sewing', 'interior')) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    unit VARCHAR(50) DEFAULT 'piece',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table (unified for both divisions)
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    division VARCHAR(20) CHECK (division IN ('sewing', 'interior')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('draft', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'draft',
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices table (auto-generated from orders)
CREATE TABLE invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('draft', 'sent', 'paid', 'overdue')) DEFAULT 'draft',
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accounting entries table (auto-generated from invoices)
CREATE TABLE accounting_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    entry_type VARCHAR(20) CHECK (entry_type IN ('revenue', 'expense', 'asset', 'liability')) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    debit_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    credit_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    description TEXT,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_division ON orders(division);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_invoices_order_id ON invoices(order_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_accounting_entries_invoice_id ON accounting_entries(invoice_id);
CREATE INDEX idx_accounting_entries_entry_date ON accounting_entries(entry_date);

-- Functions to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-calculate order total
CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders 
    SET total_amount = (
        SELECT COALESCE(SUM(total_price), 0) 
        FROM order_items 
        WHERE order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-calculate order total when items change
CREATE TRIGGER calculate_order_total_trigger 
    AFTER INSERT OR UPDATE OR DELETE ON order_items 
    FOR EACH ROW EXECUTE FUNCTION calculate_order_total();

-- Function to auto-generate invoice from order
CREATE OR REPLACE FUNCTION auto_generate_invoice()
RETURNS TRIGGER AS $$
DECLARE
    invoice_num VARCHAR(50);
BEGIN
    -- Only generate invoice when order status changes to 'confirmed'
    IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
        -- Generate invoice number
        invoice_num := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(EXTRACT(EPOCH FROM NOW())::TEXT, 10, '0');
        
        -- Create invoice
        INSERT INTO invoices (
            order_id,
            invoice_number,
            issue_date,
            due_date,
            subtotal,
            tax_amount,
            total_amount
        ) VALUES (
            NEW.id,
            invoice_num,
            CURRENT_DATE,
            CURRENT_DATE + INTERVAL '30 days',
            NEW.total_amount,
            NEW.total_amount * 0.1, -- 10% tax
            NEW.total_amount * 1.1
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-generate invoice
CREATE TRIGGER auto_generate_invoice_trigger 
    AFTER UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION auto_generate_invoice();

-- Function to auto-generate accounting entries
CREATE OR REPLACE FUNCTION auto_generate_accounting_entries()
RETURNS TRIGGER AS $$
BEGIN
    -- Only generate entries when invoice status changes to 'paid'
    IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
        -- Debit: Accounts Receivable
        INSERT INTO accounting_entries (
            invoice_id,
            entry_type,
            account_name,
            debit_amount,
            credit_amount,
            description
        ) VALUES (
            NEW.id,
            'asset',
            'Accounts Receivable',
            NEW.total_amount,
            0,
            'Payment received for invoice ' || NEW.invoice_number
        );
        
        -- Credit: Revenue
        INSERT INTO accounting_entries (
            invoice_id,
            entry_type,
            account_name,
            debit_amount,
            credit_amount,
            description
        ) VALUES (
            NEW.id,
            'revenue',
            'Sales Revenue',
            0,
            NEW.subtotal,
            'Revenue from invoice ' || NEW.invoice_number
        );
        
        -- Credit: Tax Payable
        INSERT INTO accounting_entries (
            invoice_id,
            entry_type,
            account_name,
            debit_amount,
            credit_amount,
            description
        ) VALUES (
            NEW.id,
            'liability',
            'Tax Payable',
            0,
            NEW.tax_amount,
            'Tax collected from invoice ' || NEW.invoice_number
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-generate accounting entries
CREATE TRIGGER auto_generate_accounting_entries_trigger 
    AFTER UPDATE ON invoices 
    FOR EACH ROW EXECUTE FUNCTION auto_generate_accounting_entries();

-- Insert sample data
INSERT INTO customers (name, email, phone, company) VALUES
('田中太郎', 'tanaka@example.com', '090-1234-5678', '田中商事'),
('佐藤花子', 'sato@example.com', '090-2345-6789', '佐藤工業'),
('山田次郎', 'yamada@example.com', '090-3456-7890', '山田デザイン');

INSERT INTO products (name, description, category, price, unit) VALUES
('カーテン縫製', '高品質カーテンの縫製サービス', 'sewing', 15000, 'm'),
('クッション製作', 'オーダーメイドクッション', 'sewing', 8000, 'piece'),
('壁紙施工', 'インテリア壁紙の施工', 'interior', 25000, 'm²'),
('フローリング施工', '高級フローリングの施工', 'interior', 35000, 'm²');

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_entries ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - can be restricted later)
CREATE POLICY "Allow all operations on customers" ON customers FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on orders" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all operations on order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Allow all operations on invoices" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow all operations on accounting_entries" ON accounting_entries FOR ALL USING (true);
