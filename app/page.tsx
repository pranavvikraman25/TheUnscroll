'use client'
import { useState, useMemo, useEffect } from 'react'
import allSites from '../data/sites.json'
import SiteCard from '../components/SiteCard'
import Sidebar from '../components/Sidebar'

const sites = allSites.filter(s => s.name.trim() !== '')

export default function Home() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<number[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Load saved sites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('unscroll-saved')
      if (stored) setSaved(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('unscroll-saved', JSON.stringify(saved))
    } catch { /* ignore */ }
  }, [saved])

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  // On mobile: selecting a category closes the sidebar
  const handleSelect = (key: string) => {
    setCategory(key)
    if (isMobile) setSidebarOpen(false)
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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f9fafb', position: 'relative' }}>

      {/* ── MOBILE: dark overlay when sidebar is open ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
            zIndex: 40, backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <div style={{
        // Mobile: fixed drawer sliding in from left
        // Desktop: static sidebar in the flex row
        ...(isMobile ? {
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          zIndex: 50,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: sidebarOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
        } : {
          position: 'relative',
          flexShrink: 0,
        }),
      }}>
        <Sidebar
          active={category}
          onSelect={handleSelect}
          total={sites.length}
          savedCount={saved.length}
        />
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: '#f9fafb', minWidth: 0 }}>

        {/* Top bar */}
        <div style={{
          padding: '10px 14px', borderBottom: '1px solid #e5e7eb',
          background: '#fff', display: 'flex', alignItems: 'center', gap: '10px',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          {/* Hamburger — shown on mobile only */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(o => !o)}
              style={{
                width: '36px', height: '36px', flexShrink: 0,
                border: '1px solid #e5e7eb', borderRadius: '8px',
                background: sidebarOpen ? '#f0fdf4' : '#fff',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '4px',
                padding: '0',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: '16px', height: '2px', borderRadius: '2px',
                  background: sidebarOpen ? '#2d8a4e' : '#374151',
                  display: 'block',
                  transition: 'background 0.15s',
                }} />
              ))}
            </button>
          )}

          <input
            type="text"
            placeholder="Search sites..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '9px 12px', border: '1px solid #e5e7eb',
              borderRadius: '8px', fontSize: '13px', background: '#f9fafb',
              outline: 'none', color: '#111', minWidth: 0,
            }}
          />

          {/* Submit button — hide on mobile to save space */}
          {!isMobile && (
            <a
              href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: '9px 18px', borderRadius: '8px', fontSize: '13px',
                border: '1px solid #2d8a4e', color: '#2d8a4e',
                textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap',
              }}
            >
              + Submit a site
            </a>
          )}
        </div>

        {/* Hero */}
        <div style={{ padding: isMobile ? '18px 14px 14px' : '28px 24px 20px', borderBottom: '1px solid #f3f4f6', background: '#fff' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            {category === 'all' ? `${sites.length} sites across 7 categories` : `${filtered.length} sites in this category`}
          </div>
          <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.3 }}>
            <span style={{ color: '#2d8a4e' }}>The Unscroll</span> — your cure for{' '}
            <span style={{ color: '#c8970a' }}>endless scrolling</span> ✦
          </h1>
          {!isMobile && (
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Every site earns your attention the honest way — wonder, learning, or pure joy. No algorithm.
            </p>
          )}
        </div>

        {/* Grid — 2 cols on mobile, auto on desktop */}
        <div style={{
          padding: isMobile ? '14px 10px' : '20px 24px',
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: isMobile ? '10px' : '16px',
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
              <div style={{ fontSize: '14px' }}>No sites match. Try another keyword!</div>
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

        {/* Mobile footer with submit link */}
        {isMobile && (
          <div style={{ padding: '16px 14px', borderTop: '1px solid #f3f4f6', background: '#fff', textAlign: 'center' }}>
            <a
              href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '13px', color: '#2d8a4e', textDecoration: 'none', fontWeight: 600 }}
            >
              + Submit a site on GitHub
            </a>
          </div>
        )}

      </div>
    </div>
  )
}