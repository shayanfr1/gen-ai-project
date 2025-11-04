"use client"

import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')
  const [imageB64, setImageB64] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setImageB64(null)
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: text }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Failed to generate image')
      } else {
        setImageB64(data.image as string)
      }
    } catch (err: any) {
      setError(err?.message || 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Elder Care Meal Image Generator</h1>
      <p className="text-sm text-gray-600 mb-6">Enter a food description. We will refine your prompt with facility-appropriate standards and generate a photorealistic image using Gemini.</p>

      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., grilled salmon with steamed vegetables, low-sodium"
          className="w-full h-28 resize-vertical rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate Image'}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-6 animate-pulse text-sm text-gray-600">Creating a photorealistic image…</div>
      )}

      {imageB64 && (
        <div className="mt-6">
          <img
            src={`data:image/png;base64,${imageB64}`}
            alt="Generated elder care meal"
            className="w-full rounded-md border border-gray-200"
          />
        </div>
      )}
    </main>
  )
}


