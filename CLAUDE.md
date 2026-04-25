# 🎯 PROJECT: SEELT STUDIO (UK MARKET)

This is a **professional, production-grade web application** targeting UK-based businesses and professionals.

---

## ⚠️ ACTIVE TASK CONTROL

* Only implement what is asked
* Do NOT add extra features
* Do NOT redesign UI
* Do NOT modify unrelated files

---

## 🇬🇧 UK MARKET RULES (STRICT)

* Always use **GBP (£)** currency
* Use **UK English spelling** (e.g. "colour", "organisation")
* Tone must be:

  * Professional
  * Trustworthy
  * Calm and confident

❌ Never use:

* Hype language
* Aggressive tone
* Clickbait

---

## 🎨 UI / DESIGN SYSTEM

* Clean, minimal layout
* Grid-based structure
* Strong whitespace
* Clear hierarchy

### Colors:

* Primary: `#d9534f`
* Neutral: White, greys, soft black

### Typography:

* Clean and readable
* No decorative fonts

---

## 🧠 UX PRINCIPLES

* Clarity over creativity
* Every page must answer:

  * What is this?
  * Why trust it?
  * What to do next?

---

## 🛍️ E-COMMERCE RULES

* Price format: `£XX.XX`
* Show:

  * Product title
  * Price
  * Image
  * Category
* Keep layout clean

---

## 🔌 DATABASE RULES (SUPABASE ONLY)

* Use Supabase for ALL dynamic data
* Do NOT use Sanity
* Do NOT use GROQ
* Use existing client: `lib/supabase.ts`

### Tables:

* products
* product_categories
* services
* training_courses
* training_categories

### Rules:

* Always fetch from Supabase
* No hardcoded data
* Keep queries minimal

---

## 💸 PRODUCT OFFER SYSTEM

Products may include:

* original_price (numeric)
* discount_percent (int)
* is_on_sale (boolean)
* offer_text (text)

### UI Rules:

If `is_on_sale = true`:

* Show original_price (line-through)
* Show price (bold)
* Show discount badge (top-left)
* Show offer_text below title

If false:

* Show only price

⚠️ Do NOT redesign card layout
⚠️ Only enhance existing UI

---

## 🧩 COMPONENT RULES

* Keep components reusable
* Separate UI & data logic
* Avoid large components

---

## 🚫 UI SAFETY (VERY STRICT)

* Do NOT change header/footer
* Do NOT change spacing/colors
* Do NOT redesign components
* Do NOT remove classes

---

## 🧼 CODE QUALITY

* Clean TypeScript
* No `any`
* Proper naming
* No unnecessary logic

---

## 📦 OUTPUT RULES

* Return only changed files
* No explanation
* Minimal response

---

## ⚡ PERFORMANCE

* Smallest working code
* Avoid heavy imports

---

## ❗ UNCERTAINTY RULE

If unclear → ASK
Do NOT assume

---

## 🚨 FAIL CONDITION

If task requires:

* UI redesign
* Major refactor

→ STOP and ask
