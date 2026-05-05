'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Product = {
  id: number
  title: string
  slug: string
  price: number
  original_price: number | null
  discount_percent: number | null
  is_on_sale: boolean
  is_featured: boolean
  image_url: string | null
  description: string | null
  created_at: string
}

const empty = {
  title: '',
  slug: '',
  price: '',
  original_price: '',
  discount_percent: '',
  is_on_sale: false,
  is_featured: false,
  image_url: '',
  description: '',
}

const generateSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function ProductsManager({ products }: { products: Product[] }) {
  const [data, setData] = useState<Product[]>(products ?? [])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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

  const handleSubmit = async () => {
    setLoading(true)
    const image_url = await uploadImage()
    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      discount_percent: form.discount_percent ? Number(form.discount_percent) : null,
      is_on_sale: form.is_on_sale,
      is_featured: form.is_featured,
      image_url,
      description: form.description || null,
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
      is_featured: p.is_featured,
      image_url: p.image_url ?? '',
      description: p.description ?? '',
    })
    setImagePreview(p.image_url ?? null)
    setImageFile(null)
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

  return (
    <div className="space-y-8">
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold mb-4">
          {editId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm(f => ({
              ...f,
              title: e.target.value,
              slug: generateSlug(e.target.value)
            }))}
            className="border px-3 py-2 rounded text-sm"
          />
          <input
            placeholder="Slug (auto-generated)"
            value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
            className="border px-3 py-2 rounded text-sm bg-gray-50"
          />
          <input placeholder="Price (£)" type="number" value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />
          <input placeholder="Original Price (£)" type="number" value={form.original_price}
            onChange={e => setForm(f => ({ ...f, original_price: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />
          <input placeholder="Discount %" type="number" value={form.discount_percent}
            onChange={e => setForm(f => ({ ...f, discount_percent: e.target.value }))}
            className="border px-3 py-2 rounded text-sm" />
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_on_sale}
                onChange={e => setForm(f => ({ ...f, is_on_sale: e.target.checked }))} />
              On Sale
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured}
                onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} />
              Featured on Homepage
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <div data-color-mode="light">
            <MDEditor
              value={form.description}
              onChange={val => setForm(f => ({ ...f, description: val ?? '' }))}
              height={300}
              preview="live"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Use <code className="bg-gray-100 px-1 rounded">## Heading</code> for headings,{' '}
            <code className="bg-gray-100 px-1 rounded">- item</code> for bullets,{' '}
            <code className="bg-gray-100 px-1 rounded">**text**</code> for bold
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{form.description.length} characters</p>
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
            <button onClick={() => { setForm(empty); setEditId(null); setImagePreview(null); setImageFile(null) }}
              className="border px-4 py-2 rounded text-sm hover:bg-gray-50">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
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
                    ? <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Featured</span>
                    : <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">No</span>
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