'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import allSites from '../data/sites.json'
import SiteCard from '../components/SiteCard'
import Sidebar from '../components/Sidebar'
import { getDailyPick } from '../lib/dailyPick'
import { IconDaily, IconSearch } from '../components/Icons'

const sites = allSites.filter(s => s.name.trim() !== '')

export default function Home() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<number[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
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
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fafafa', position: 'relative', fontFamily: 'Inter, sans-serif' }}>

      {/* ── MOBILE: dark overlay when sidebar is open ── */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.45)',
            zIndex: 40, backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <div style={{
        ...(isMobile ? {
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          zIndex: 50,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: '#fafafa', minWidth: 0 }}>

        {/* Top Bar — FOSS United Search Header */}
        <div style={{
          padding: isMobile ? '12px 14px' : '14px 24px',
          borderBottom: '1px solid #e0e1e1',
          background: '#ffffff',
          display: 'flex', alignItems: 'center', gap: '12px',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(o => !o)}
              style={{
                width: '38px', height: '38px', flexShrink: 0,
                border: '1px solid #e0e1e1', borderRadius: '6px',
                background: sidebarOpen ? '#e8f8ee' : '#ffffff',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '4px', padding: 0,
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: '16px', height: '2px', borderRadius: '1px',
                  background: sidebarOpen ? '#08b54d' : '#141414',
                  display: 'block', transition: 'background 0.15s',
                }} />
              ))}
            </button>
          )}

          {/* Search input with icon */}
          <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
            <svg
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              width="16" height="16" viewBox="0 0 20 20" fill="none"
            >
              <circle cx="8.5" cy="8.5" r="5.75" stroke="#666666" strokeWidth="1.75" />
              <path d="M13 13L17 17" stroke="#666666" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder={isMobile ? 'Search sites...' : 'Search across ' + sites.length + ' websites — try "chess", "NASA", "medical"...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 16px 11px 40px',
                border: '1px solid #e0e1e1',
                borderRadius: '6px',
                fontSize: '13.5px',
                background: '#fafafa',
                outline: 'none',
                color: '#141414',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = '#08b54d'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(8, 181, 77, 0.15)'
                e.currentTarget.style.background = '#ffffff'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = '#e0e1e1'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.background = '#fafafa'
              }}
            />
          </div>

          {/* Submit CTA */}
          {!isMobile && (
            <a
              href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: '11px 20px',
                borderRadius: '6px',
                fontSize: '13.5px',
                background: '#08b54d',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
                display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 2px 6px rgba(8, 181, 77, 0.25)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#06963f')}
              onMouseLeave={e => (e.currentTarget.style.background = '#08b54d')}
            >
              Suggest a site
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        {/* Hero Section */}
        <div style={{ padding: isMobile ? '20px 16px 16px' : '30px 28px 22px', borderBottom: '1px solid #e0e1e1', background: '#ffffff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#08b54d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            {category === 'all' ? `${sites.length} SITES ACROSS 7 CATEGORIES` : `${filtered.length} SITES IN THIS CATEGORY`}
          </div>
          <h1 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.3, color: '#141414', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#08b54d' }}>The Unscroll</span> — your cure for{' '}
            <span style={{ color: '#c54444' }}>endless scrolling</span>
          </h1>
          {!isMobile && (
            <p style={{ fontSize: '14.5px', color: '#525252', margin: '0 0 20px', lineHeight: 1.6, maxWidth: '720px' }}>
              Every site earns your attention the honest way — wonder, learning, or pure joy. No algorithm, no doomscrolling.
            </p>
          )}

          {/* Daily Pick Banner */}
          {(() => {
            const pick = getDailyPick()
            return (
              <Link href="/daily" style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: '#fff7d4',
                border: '1px solid rgba(255, 193, 7, 0.4)',
                borderRadius: '8px', padding: '14px 18px',
                textDecoration: 'none', marginTop: isMobile ? '12px' : '0',
                transition: 'transform 0.15s ease'
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '6px',
                  background: '#ffc107', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: '#141414'
                }}>
                  <IconDaily size={20} color="#141414" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#141414', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                    Daily Featured Pick
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#141414', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pick.title}</div>
                  {!isMobile && <div style={{ fontSize: '12px', color: '#525252', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pick.subtitle}</div>}
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#141414', flexShrink: 0 }}>Explore →</span>
              </Link>
            )
          })()}
        </div>

        {/* Grid of Site Cards */}
        <div style={{
          padding: isMobile ? '16px 12px' : '24px 28px',
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, 1fr)'
            : 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: isMobile ? '12px' : '20px',
        }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#666666' }}>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                <IconSearch size={36} color="#666666" />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>No sites match your search.</div>
              <div style={{ fontSize: '13px', color: '#666666', marginTop: '4px' }}>Try searching another keyword!</div>
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

        {/* Mobile Footer */}
        {isMobile && (
          <div style={{ padding: '18px 16px', borderTop: '1px solid #e0e1e1', background: '#ffffff', textAlign: 'center' }}>
            <a
              href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '13.5px', color: '#08b54d', textDecoration: 'none', fontWeight: 700 }}
            >
              + Submit a site on GitHub
            </a>
          </div>
        )}

      </div>
    </div>
  )
}