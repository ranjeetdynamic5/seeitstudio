'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Product = {
  id: number
  title: string
  slug: string
  price: number
  original_price: number | null
  discount_percent: number | null
  is_on_sale: boolean
  is_featured: boolean
  category_id: number | null
  image_url: string | null
  created_at: string
}

type Category = {
  id: number
  name: string
  slug: string
}

const empty = {
  title: '',
  slug: '',
  price: '',
  original_price: '',
  discount_percent: '',
  is_on_sale: false,
  is_featured: false,
  category_id: '',
  image_url: '',
}

export default function ProductsManager({
  products,
  categories: initialCategories,
}: {
  products: Product[]
  categories: Category[]
}) {
  const [data, setData] = useState<Product[]>(products ?? [])
  const [categories, setCategories] = useState<Category[]>(initialCategories ?? [])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // New category state
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [categoryLoading, setCategoryLoading] = useState(false)

  const supabase = createClient()

  const refresh = async () => {
    const res = await fetch('/api/admin/products')
    const json = await res.json()
    setData(Array.isArray(json) ? json : [])
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return form.image_url || null
    const ext = imageFile.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from('product-images')
      .upload(path, imageFile, { upsert: true })
    if (error) { console.error('Upload error:', error); return null }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    return data.publicUrl
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return
    setCategoryLoading(true)
    const slug = newCategoryName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategoryName.trim(), slug }),
    })
    const newCat = await res.json()
    if (newCat?.id) {
      setCategories(prev => [...prev, newCat])
      setForm(f => ({ ...f, category_id: String(newCat.id) }))
      setNewCategoryName('')
      setShowNewCategory(false)
    }
    setCategoryLoading(false)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.price) {
      alert('Title, slug and price are required.')
      return
    }
    setLoading(true)
    const image_url = await uploadImage()
    const payload = {
      title: form.title,
      slug: form.slug,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      discount_percent: form.discount_percent ? Number(form.discount_percent) : null,
      is_on_sale: form.is_on_sale,
      is_featured: form.is_featured,
      category_id: form.category_id ? Number(form.category_id) : null,
      image_url,
    }

    if (editId) {
      await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, ...payload }),
      })
    } else {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }

    setForm(empty)
    setEditId(null)
    setImageFile(null)
    setImagePreview(null)
    setShowNewCategory(false)
    await refresh()
    setLoading(false)
  }

  const handleEdit = (p: Product) => {
    setEditId(p.id)
    setForm({
      title: p.title,
      slug: p.slug,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : '',
      discount_percent: p.discount_percent ? String(p.discount_percent) : '',
      is_on_sale: p.is_on_sale,
      is_featured: p.is_featured ?? false,
      category_id: p.category_id ? String(p.category_id) : '',
      image_url: p.image_url ?? '',
    })
    setImagePreview(p.image_url ?? null)
    setImageFile(null)
    setShowNewCategory(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return
    await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await refresh()
  }

  const getCategoryName = (id: number | null) => {
    if (!id) return '—'
    return categories.find(c => c.id === id)?.name ?? '—'
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold mb-4">
          {editId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Title *" value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />
          <input placeholder="Slug * (e.g. sketchup-pro)" value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />
          <input placeholder="Price (£) *" type="number" value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />
          <input placeholder="Original Price (£)" type="number" value={form.original_price}
            onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />
          <input placeholder="Discount %" type="number" value={form.discount_percent}
            onChange={e => setForm(f => ({ ...f, discount_percent: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2">
              <select
                value={form.category_id}
                onChange={e => {
                  if (e.target.value === '__new__') {
                    setShowNewCategory(true)
                  } else {
                    setForm(f => ({ ...f, category_id: e.target.value }))
                    setShowNewCategory(false)
                  }
                }}
                className="flex-1 border px-3 py-2 rounded text-sm text-gray-700"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
                ))}
                <option value="__new__">+ New Category</option>
              </select>
            </div>
            {showNewCategory && (
              <div className="flex gap-2">
                <input
                  placeholder="New category name"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  className="flex-1 border px-3 py-2 rounded text-sm"
                />
                <button
                  onClick={handleCreateCategory}
                  disabled={categoryLoading || !newCategoryName.trim()}
                  className="px-3 py-2 bg-[#0066FF] text-white rounded text-sm hover:bg-[#0052cc] disabled:opacity-50"
                >
                  {categoryLoading ? '...' : 'Create'}
                </button>
                <button
                  onClick={() => { setShowNewCategory(false); setNewCategoryName('') }}
                  className="px-3 py-2 border rounded text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6 mt-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.is_on_sale}
              onChange={e => setForm(f => ({ ...f, is_on_sale: e.target.checked }))} />
            On Sale
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.is_featured}
              onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} />
            Featured (show on homepage)
          </label>
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input type="file" accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded file:border file:text-sm file:bg-gray-50 hover:file:bg-gray-100" />
          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border" />
              <button onClick={() => { setImagePreview(null); setImageFile(null); setForm(f => ({ ...f, image_url: '' })) }}
                className="mt-1 text-xs text-red-500 hover:underline">
                Remove image
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={handleSubmit} disabled={loading}
            className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 disabled:opacity-50">
            {loading ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
          </button>
          {editId && (
            <button onClick={() => { setForm(empty); setEditId(null); setImagePreview(null); setImageFile(null); setShowNewCategory(false) }}
              className="border px-4 py-2 rounded text-sm hover:bg-gray-50">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sale</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  {p.image_url
                    ? <img src={p.image_url} alt={p.title} className="h-12 w-12 object-cover rounded-lg border" />
                    : <div className="h-12 w-12 bg-gray-100 rounded-lg border flex items-center justify-center text-xs text-gray-400">No img</div>
                  }
                </td>
                <td className="px-6 py-3 font-medium">{p.title}</td>
                <td className="px-6 py-3 text-gray-500">{getCategoryName(p.category_id)}</td>
                <td className="px-6 py-3">
                  £{p.price}
                  {p.original_price && (
                    <span className="ml-2 text-xs text-gray-400 line-through">£{p.original_price}</span>
                  )}
                </td>
                <td className="px-6 py-3">
                  {p.is_on_sale
                    ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">On Sale</span>
                    : <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Regular</span>
                  }
                </td>
                <td className="px-6 py-3">
                  {p.is_featured
                    ? <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Featured</span>
                    : <span className="px-2 py-1 bg-gray-100 text-gray-400 rounded-full text-xs">No</span>
                  }
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:underline text-xs">Edit</button>
                    <button onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline text-xs">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}