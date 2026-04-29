-- Run this in Supabase SQL Editor

-- 1. Create orders table
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  order_id      text not null,
  customer_name text not null,
  customer_email text,
  total_amount  numeric(10, 2) not null default 0,
  status        text not null default 'pending' check (status in ('pending', 'completed')),
  created_at    timestamptz not null default now()
);

-- 2. Index for fast user-specific lookups
create index if not exists orders_customer_email_idx on public.orders (customer_email);

-- 3. Row Level Security
alter table public.orders enable row level security;

-- Allow admins (service role) full access — already bypasses RLS
-- Allow users to read only their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (customer_email = auth.jwt() ->> 'email');

-- 4. Seed example data (only if table is empty)
insert into public.orders (order_id, customer_name, customer_email, total_amount, status)
select * from (values
  ('UK89178', 'Example Customer', 'demo@example.com', 99.00,  'completed'),
  ('UK55046', 'Example Customer', 'demo@example.com', 298.00, 'pending')
) as v(order_id, customer_name, customer_email, total_amount, status)
where not exists (select 1 from public.orders limit 1);
