# Seeit Studio — AI Context

## Stack
- **Next.js 15** (App Router, React Server Components)
- **Supabase** — Auth, Postgres DB, RLS, Storage (product-images, course-images buckets)
- **Tailwind CSS** — utility-first, no component library
- **Zustand** — client-side cart state (`lib/cartStore.ts`)
- **@uiw/react-md-editor** — markdown editing in admin forms

---

## Folder Structure

```
app/                  # Pages, layouts, API routes (App Router)
  admin/              # Admin panel (server-protected)
  api/admin/          # Admin API routes (service role client)
  components/         # Page-scoped components (NOT reusable — see below)
  products/[slug]/    # Dynamic product pages
  services/[slug]/    # Dynamic service pages
  dashboard/          # Authenticated user dashboard
  cart/ checkout/     # E-commerce flow

components/           # Reusable components (AdminStats, UserManager, etc.)
lib/                  # Utilities
  supabase/
    server.ts         # Server-side Supabase client (@supabase/ssr)
    client.ts         # Browser Supabase client
  cartStore.ts        # Zustand cart store
  useUser.ts          # Client hook — returns { user, role, loading }
  products.ts / services.ts / courses.ts  # Data-fetching helpers
```

> Rule: reusable UI goes in `/components`, page-scoped UI goes in `/app/components`.

---

## Auth Flow

1. Supabase email/password auth (`/login`, `/signup`, `/forgot-password`)
2. Callback at `/auth/callback` exchanges code for session
3. Middleware (`middleware.ts`) guards `/dashboard` (any auth) and `/admin` (role = admin)
4. Role is stored in `profiles.role` (`'admin' | 'user'`) — **never** derived from email
5. Client components use `useUser()` hook from `lib/useUser.ts`
6. Server components call `createClient()` from `lib/supabase/server.ts`

**Admin API pattern:**
```ts
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
if (!user) return 401
const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
if (profile?.role !== 'admin') return 403
const serviceClient = createClient(url, SERVICE_ROLE_KEY)  // for DB writes
```

---

## Database Tables

| Table | Key columns |
|---|---|
| profiles | id, email, role, full_name |
| products | id, title, slug, price, original_price, is_featured, image_url, description |
| orders | id, order_id, customer_name, customer_email, total_amount, products (jsonb), status |
| services | id, title, slug, description, content, image_url |
| leads | id, full_name, email, phone, service, inquiry_type, status |
| training_courses | id, title, slug, description, content, image_url, duration, is_featured |

RLS is enabled on all tables except `product_categories`.

---

## Brand Colors

| Token | Value |
|---|---|
| Primary dark | `#0B0F19` |
| CTA / accent blue | `#0066FF` |
| CTA hover | `#0052cc` |
| Page bg | `#f8fafc` / `#f8f9fa` |
| Body text | `#64748B` |
| Border | `#e2e8f0` / `slate-200` |

Top bar header: `bg-[#0B0F19]` with slate-300/white text.

---

## Reusable Patterns

- **Cart:** Zustand store with `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getSubtotal`, `getTotal`. Cart count shown in Header via `useCartStore`.
- **Sticky product bar:** `app/products/[slug]/StickyBar.tsx` — appears on scroll > 520px.
- **Admin stats:** `components/AdminStats.tsx` — fetches `/api/admin/stats`, shows user + product counts.
- **Markdown content:** rendered via `@uiw/react-md-editor` in admin forms; stored as raw markdown in DB.

---

## CMS Setup

No headless CMS. Content is managed via the custom `/admin` panel backed directly by Supabase:
- Products, Training Courses, Services, Leads — all CRUD via admin UI
- Images uploaded to Supabase Storage buckets
- Orders managed with status tracking

---

## Current Status

**Complete:** Auth, roles, middleware, admin panel (products, orders, users, training, leads, services), service/product pages, user dashboard, checkout flow, cart, homepage featured sections, brand color migration.

**In progress:** Design/branding refinements.

**Not started:** Analytics dashboard, subscriptions, Vercel deploy.
