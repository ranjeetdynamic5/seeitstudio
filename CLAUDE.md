## 🔐 AUTH SYSTEM (STRICT)

Authentication must use separate pages:

Routes:

* /login
* /signup
* /forgot-password

Rules:

1. All pages must use SAME UI layout (reuse login card design)
2. DO NOT redesign UI
3. Only change inner content

### LOGIN:

* Email
* Password
* "Forgot password?" → /forgot-password
* "Create account" → /signup
* Optional: Google login

### SIGNUP:

* Email
* Password
* Confirm Password (required)
* Validate passwords match
* Redirect to /dashboard after signup

### FORGOT PASSWORD:

* Email input
* Send reset link via Supabase
* Redirect to /login after success

### REDIRECT LOGIC:

* Admin → /admin
* Normal user → /dashboard

❌ Do NOT mix pages
❌ Do NOT change UI structure
✔ Only reuse and adapt

---

## 🏗️ PROJECT ARCHITECTURE (STRICT)

### Folder Structure Rules

- /app → ONLY pages, layouts, routes
- /components → reusable UI components
- /lib → utilities (supabase clients, helpers)

❌ NEVER create components inside /app/_components  
❌ NEVER mix UI components inside route folders  
✅ ALWAYS use /components for reusable UI

---

## 🔐 SUPABASE AUTH (STRICT)

- Use @supabase/ssr
- Server client must be async
- Always use:
  - /lib/supabase/server.ts
  - /lib/supabase/client.ts

❌ DO NOT create multiple Supabase clients  
❌ DO NOT use deprecated auth methods  

---

## 👤 ROLE SYSTEM

- Roles stored in `profiles` table
- Roles:
  - admin
  - user

- Admin pages:
  - /admin (protected)
- User pages:
  - /dashboard

❌ DO NOT use email-based admin check  
✅ ALWAYS fetch role from database

---

## 🔘 COMPONENT RULES

- LogoutButton must be a client component
- Place in: /components/LogoutButton.tsx

Usage:
import LogoutButton from '@/components/LogoutButton'

❌ DO NOT inline logout logic in pages  
❌ DO NOT duplicate logout code  

---

## 🚫 STRICT NO-CHANGE RULES

- DO NOT redesign UI
- DO NOT break existing auth system
- DO NOT modify middleware unless asked

---

## 🎯 CURRENT TASK CONTEXT

- Fix component structure
- Move /app/_components → /components
- Fix all imports
- Ensure LogoutButton works in dashboard and admin

---

## 🧾 OUTPUT RULES

- Show updated folder structure
- Show changed imports
- Keep code minimal
- Do NOT refactor unrelated files