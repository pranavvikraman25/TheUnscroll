'use client'
import { useState, useMemo } from 'react'
import podcasts from '../../data/podcasts.json'
import courses from '../../data/courses.json'
import Link from 'next/link'

export default function PodcastsPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const categories = ['All', ...Array.from(new Set(podcasts.map(p => p.category)))]
  const catColors: Record<string, string> = { health: '#22c55e', technology: '#0ea5e9', mindset: '#7c3aed', philosophy: '#f97316', productivity: '#c8970a' }
  const filtered = useMemo(() => {
    let list = cat === 'All' ? podcasts : podcasts.filter(p => p.category === cat)
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(p => p.title.toLowerCase().includes(q) || p.podcast.toLowerCase().includes(q) || p.host.toLowerCase().includes(q)) }
    return list
  }, [cat, search])
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}><span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span></Link>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>🎙️ Podcasts</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search episodes..." style={{ marginLeft: 'auto', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', width: '240px' }} />
      </nav>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{podcasts.length} episodes · handpicked · all free</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}><span style={{ color: '#2d8a4e' }}>One episode</span> that will <span style={{ color: '#c8970a' }}>change your mind</span></h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Not whole shows — just the single best episode from the best podcasters. Free on YouTube.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: '5px 14px', borderRadius: '20px', border: `1px solid ${cat === c ? (catColors[c] || '#2d8a4e') : '#e5e7eb'}`, background: cat === c ? (catColors[c] || '#2d8a4e') + '18' : '#fff', color: cat === c ? (catColors[c] || '#2d8a4e') : '#6b7280', fontWeight: cat === c ? 600 : 400, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{c}</button>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(pod => {
            const color = catColors[pod.category] || '#2d8a4e'
            return (
              <a key={pod.id} href={pod.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '16px 20px', display: 'flex', gap: '16px', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>🎙️</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, background: color + '18', color, padding: '2px 8px', borderRadius: '20px', textTransform: 'capitalize' }}>{pod.category}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{pod.podcast} · {pod.duration}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#111', marginBottom: '4px' }}>{pod.title}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>Host: {pod.host}</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{pod.description}</p>
                </div>
                <div style={{ flexShrink: 0, color: '#9ca3af', fontSize: '16px' }}>▶</div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
