'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Course = {
  id: number
  title: string
  slug: string
  description: string | null
  content: string | null
  image_url: string | null
  duration: string | null
  is_featured: boolean
  created_at: string
}

const empty = {
  title: '',
  slug: '',
  description: '',
  content: '',
  image_url: '',
  duration: '',
  is_featured: false,
}

const generateSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function TrainingManager({ courses }: { courses: Course[] }) {
  const [data, setData] = useState<Course[]>(courses ?? [])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const supabase = createClient()

  const refresh = async () => {
    const res = await fetch('/api/admin/training')
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
      .from('course-images')
      .upload(path, imageFile, { upsert: true })
    if (error) { console.error('Upload error:', error); return null }
    const { data } = supabase.storage.from('course-images').getPublicUrl(path)
    return data.publicUrl
  }

  const handleSubmit = async () => {
    setLoading(true)
    const image_url = await uploadImage()
    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      description: form.description || null,
      content: form.content || null,
      image_url,
      duration: form.duration || null,
      is_featured: form.is_featured,
    }

    if (editId) {
      await fetch('/api/admin/training', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, ...payload }),
      })
    } else {
      await fetch('/api/admin/training', {
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

  const handleEdit = (c: Course) => {
    setEditId(c.id)
    setForm({
      title: c.title,
      slug: c.slug,
      description: c.description ?? '',
      content: c.content ?? '',
      image_url: c.image_url ?? '',
      duration: c.duration ?? '',
      is_featured: c.is_featured,
    })
    setImagePreview(c.image_url ?? null)
    setImageFile(null)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this course?')) return
    await fetch('/api/admin/training', {
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
          {editId ? 'Edit Course' : 'Add New Course'}
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
          <input
            placeholder="Duration (e.g. 4 Weeks)"
            value={form.duration}
            onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
            className="border px-3 py-2 rounded text-sm"
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_featured}
              onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} />
            Featured on Homepage
          </label>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <textarea
            placeholder="Brief description shown in listings..."
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={3}
            className="w-full border px-3 py-2 rounded text-sm resize-y"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
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

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Content (Markdown)</label>
          <div data-color-mode="light">
            <MDEditor
              value={form.content}
              onChange={val => setForm(f => ({ ...f, content: val ?? '' }))}
              height={300}
              preview="live"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Use ## for headings, - for bullets, **text** for bold</p>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={handleSubmit} disabled={loading}
            className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 disabled:opacity-50">
            {loading ? 'Saving...' : editId ? 'Update Course' : 'Add Course'}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  {c.image_url
                    ? <img src={c.image_url} alt={c.title} className="h-12 w-12 object-cover rounded-lg border" />
                    : <div className="h-12 w-12 bg-gray-100 rounded-lg border flex items-center justify-center text-xs text-gray-400">No img</div>
                  }
                </td>
                <td className="px-6 py-3 font-medium">{c.title}</td>
                <td className="px-6 py-3 text-gray-500">{c.duration ?? '-'}</td>
                <td className="px-6 py-3">
                  {c.is_featured
                    ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Featured</span>
                    : <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Not Featured</span>
                  }
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(c)}
                      className="text-blue-600 hover:underline text-xs">Edit</button>
                    <button onClick={() => handleDelete(c.id)}
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