# 🚀 Seeit Studio — Claude Code Instructions

## ⚠️ STRICT RULES (NEVER VIOLATE)
- DO NOT redesign any existing UI unless explicitly asked
- DO NOT change folder structure without asking
- DO NOT touch auth system unless explicitly asked
- DO NOT use email-based role checks
- DO NOT create client-side auth for security
- DO NOT bypass RLS
- ALWAYS use server-side Supabase client for sensitive operations
- ALWAYS validate role in API routes
- ALWAYS use service role key for admin API routes

---

## 🎨 BRAND COLORS (STRICTLY USE THESE)

| Purpose | Color |
|---|---|
| Primary Navy | #092145 |
| Secondary Navy | #00527d |
| Accent Blue | #0088cc |
| CTA Button | #f0a500 |
| CTA Hover | #d4890a |
| Light Tint | #e0f0f8 |
| Page Background | #F7F9FA |
| Dark Text | #092145 |
| Body Text | #64748B |
| Border | #e2e8f0 |

### Color Replacement Rules (Old → New)
- #D9534F → #f0a500 (CTA buttons)
- #c9302c → #d4890a (CTA hover)
- #0F172A → #092145 (dark backgrounds)
- #1e293b → #00527d (secondary dark)
- text #D9534F → #0088cc (links)
- hover text #c9302c → #00527d (link hover)
- rose-50 → blue-50 (focus rings)

### Typography
- Font: Inter (inherit from site)
- Headings: font-bold, tracking-tight, #092145
- Body: #64748B
- Labels: #374151

---

## 🏗️ PROJECT ARCHITECTURE

### Stack
- Next.js 15 (App Router)
- Supabase (Auth + Database + RLS + Storage)
- Tailwind CSS
- @uiw/react-md-editor (for rich text)

### Folder Structure
- /app → pages, layouts, API routes
- /components → reusable UI components
- /components/admin → admin-specific components
- /lib → utilities (supabase, helpers)

❌ NEVER create components inside /app
✅ ALWAYS use /components for reusable UI

---

## 🔐 AUTH SYSTEM

### Routes
- /login
- /signup
- /forgot-password

### Rules
- Use @supabase/ssr
- Server client: /lib/supabase/server.ts
- Client client: /lib/supabase/client.ts
- Same UI layout for all auth pages
- DO NOT redesign UI

### Redirect Logic
- Admin → /admin
- Normal user → /dashboard

---

## 👤 ROLE SYSTEM

### Profiles Table
- id (UUID = auth.users.id)
- email (text)
- role (text: 'admin' | 'user')
- full_name (text)

### Rules
- ALWAYS fetch role from profiles table
- NEVER use email-based role check
- Admin APIs must use service role client

---

## 🔒 RLS STATUS
- profiles: ✅ RLS enabled
- products: ✅ RLS enabled
- orders: ✅ RLS enabled
- services: ✅ RLS enabled
- leads: ✅ RLS enabled
- training_courses: ✅ RLS enabled
- product_categories: ❌ RLS not checked

---

## 🗄️ DATABASE SCHEMA

### profiles
- id, email, role, full_name, created_at

### products
- id, title, slug, price, original_price, discount_percent, is_on_sale, is_featured, image_url, description, created_at

### orders
- id, order_id, customer_name, customer_email, total_amount, products (jsonb), status, created_at

### services
- id, title, slug, description, content, image_url, created_at

### leads
- id, full_name, email, phone, company, message, service, inquiry_type, status, created_at

### training_courses
- id, title, slug, description, content, image_url, duration, is_featured, created_at

---

## 🔐 MIDDLEWARE
File: /middleware.ts
- Block /dashboard if not logged in
- Block /admin if not logged in
- Allow /admin only if role = admin
- Redirect logged-in users away from /login and /signup

---

## 🔐 API SECURITY
- All admin APIs → use service role client
- Check user session first with regular client
- Check role from profiles table
- Use SUPABASE_SERVICE_ROLE_KEY for DB operations

### Pattern:
```typescript
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
if (!user) return 401

const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
if (profile?.role !== 'admin') return 403

const serviceClient = createServiceClient(URL, SERVICE_ROLE_KEY)
// do DB operations
```

---

## ✅ COMPLETED FEATURES
- Auth system (login/signup/forgot password)
- Role system (admin/user)
- Middleware protection
- Admin dashboard with stats
- Orders Management (status change)
- User Management (role change)
- Products Management (image upload, markdown, featured, slug)
- Training Management (image upload, markdown, featured)
- Services Management
- Leads Management (status tracking)
- Supabase Storage (product-images, course-images buckets)
- Service pages (/services/rendering-services, /3d-modelling, /ai-consulting, /web-development)
- User dashboard (orders, profile settings, password change)
- Checkout flow (email linked to logged-in user)
- Homepage featured products/training

## 🚧 IN PROGRESS
- Design/branding update (new color scheme)

## ❌ NOT STARTED
- Analytics/Revenue dashboard
- Subscription Management
- Deploy to Vercel

# 🎨 PREMIUM UI/UX & UK DESIGN RULES

## 🇬🇧 UK DESIGN STYLE

### Design Direction
- Use modern UK agency-style design
- Professional and trustworthy aesthetic
- Clean enterprise SaaS feel
- Premium but minimal layouts
- Elegant whitespace usage
- Conversion-focused structure
- High-end professional presentation
- Modern but restrained visual style

### Avoid
- Flashy startup UI
- Overdesigned sections
- Neon colors
- Loud gradients
- Cartoonish design
- Crypto-style aesthetics
- Crowded layouts
- Template-looking sections

---

# 🍎 APPLE-INSPIRED DESIGN SYSTEM

### Core Philosophy
- Apple-inspired visual cleanliness
- Minimal and elegant layouts
- Spacious but balanced section spacing
- Strong typography hierarchy
- Refined premium appearance
- Editorial-style composition
- Smooth visual rhythm
- High-end UI polish

### IMPORTANT
- Combine Apple minimalism with UK professional SaaS usability
- Maintain strong conversion-focused UX
- Preserve readability and trust
- Keep CTA sections visually strong
- Do not make layouts overly empty
- Focus on clarity and professionalism

---

# 🧱 UI STRUCTURE RULES

### Layout Rules
- Use consistent 8px spacing system
- Prefer spacious layouts over crowded layouts
- Maintain strong alignment consistency
- Use clean content flow between sections
- Use generous section spacing
- Ensure visual balance throughout the page

### Card Design
- Modern premium card styling
- Soft subtle shadows only
- Elegant border radius (rounded-2xl preferred)
- Clean hover interactions
- Spacious internal padding
- Minimal visual clutter

### Typography Rules
- Strong heading hierarchy
- Large bold headings
- Comfortable paragraph width
- Clear readability
- Avoid dense text blocks
- Use elegant spacing between headings and content

### CTA Rules
- Strong visual hierarchy
- Professional CTA sections
- Clean button styling
- Clear conversion-focused layouts
- Premium hover states
- Trust-focused design

---

# 🎞️ FRAMER MOTION RULES

### Animation Style
- Use subtle premium animations only
- Smooth fade-up reveals
- Gentle stagger animations
- Soft hover transitions
- Smooth mobile menu animations
- Elegant section transitions

### Motion Philosophy
- Motion should feel premium and restrained
- Avoid excessive animations
- Avoid distracting movement
- Animations should enhance UX, not dominate it
- Follow Apple-style smoothness

### Preferred Effects
- opacity + y transitions
- staggerChildren
- whileHover scale effects (subtle only)
- smooth easing
- viewport-triggered reveals

---

# 📱 RESPONSIVE & UX RULES

### Mobile First
- Always design mobile-first
- Ensure clean tablet layouts
- Maintain spacing consistency on all devices
- Prevent visual overcrowding on mobile

### UX Priorities
1. Trust
2. Clarity
3. Professionalism
4. Readability
5. Conversion
6. Premium feel

---

# ⚠️ IMPORTANT FRONTEND RULES

- Improve UI quality while preserving structure unless explicitly asked to redesign
- Do not generate generic Tailwind-style layouts
- Do not overuse gradients or effects
- Focus on premium SaaS polish
- Maintain professional UK business aesthetic
- Keep visual consistency across all pages
- Use Framer Motion only where it improves user experience
- Prioritize clean spacing and typography over excessive decoration