'use client'
import { useState, useMemo, useEffect } from 'react'
import allSites from '../data/sites.json'
import SiteCard from '../components/SiteCard'
import Sidebar from '../components/Sidebar'

// Filter out empty placeholder entries
const sites = allSites.filter(s => s.name.trim() !== '')

export default function Home() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<number[]>([])

  // Load saved sites from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tabbreaker-saved')
      if (stored) setSaved(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  // Save to localStorage whenever saved list changes
  useEffect(() => {
    try {
      localStorage.setItem('tabbreaker-saved', JSON.stringify(saved))
    } catch { /* ignore */ }
  }, [saved])

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const filtered = useMemo(() => {
    let list = sites
    if (category === 'saved') list = sites.filter(s => saved.includes(s.id))
    else if (category !== 'all') list = sites.filter(s => s.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    }
    return list
  }, [category, search, saved])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f9fafb' }}>
      <Sidebar
        active={category}
        onSelect={setCategory}
        total={sites.length}
        savedCount={saved.length}
      />

      {/* Right side — only this scrolls */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: '#f9fafb' }}>

        {/* Top bar */}
        <div style={{
          padding: '12px 20px', borderBottom: '1px solid #e5e7eb',
          background: '#fff', display: 'flex', alignItems: 'center', gap: '12px',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <input
            type="text"
            placeholder="🔍  Search sites... e.g. music, typing, NASA"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '9px 14px', border: '1px solid #e5e7eb',
              borderRadius: '8px', fontSize: '13px', background: '#f9fafb',
              outline: 'none', color: '#111',
            }}
          />
          <a
            href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '9px 18px', borderRadius: '8px', fontSize: '13px',
              border: '1px solid #2d8a4e', color: '#2d8a4e',
              textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap',
            }}
          >
            + Submit a site
          </a>
        </div>

        {/* Hero */}
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid #f3f4f6', background: '#fff' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>
            <span style={{ color: '#2d8a4e' }}>The Unscroll</span> — your cure for{' '}
            <span style={{ color: '#c8970a' }}>endless scrolling</span> ✦
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
            Every site here earns your attention the honest way — wonder, learning, or pure joy. No algorithm. Just the internet at its best.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          padding: '20px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontSize: '15px' }}>No sites found. Try a different search!</div>
            </div>
          ) : (
            filtered.map(site => (
              <SiteCard
                key={site.id}
                site={site}
                isSaved={saved.includes(site.id)}
                onToggleSave={toggleSave}
              />
            ))
          )}
        </div>

      </div>
    </div>
  )
}