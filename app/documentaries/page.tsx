'use client'
import { useState, useMemo } from 'react'
import docs from '../../data/documentaries.json'
import Link from 'next/link'

const categories = ['All', ...Array.from(new Set(docs.map(d => d.category)))]
const catColors: Record<string, string> = { society: '#7c3aed', technology: '#0ea5e9', nature: '#22c55e', science: '#f97316', design: '#ec4899', history: '#c8970a' }

export default function DocumentariesPage() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => {
    let list = cat === 'All' ? docs : docs.filter(d => d.category === cat)
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(d => d.title.toLowerCase().includes(q) || d.director.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) }
    return list
  }, [cat, search])

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>🎬 Documentaries</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documentaries..." style={{ marginLeft: 'auto', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', width: '240px' }} />
      </nav>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{docs.length} documentaries · all free on YouTube</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}><span style={{ color: '#2d8a4e' }}>Documentaries</span> worth <span style={{ color: '#c8970a' }}>every minute</span></h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Curated from free YouTube releases — each one guaranteed to change how you see something about the world.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: '5px 14px', borderRadius: '20px', border: `1px solid ${cat === c ? (catColors[c] || '#2d8a4e') : '#e5e7eb'}`, background: cat === c ? (catColors[c] || '#2d8a4e') + '18' : '#fff', color: cat === c ? (catColors[c] || '#2d8a4e') : '#6b7280', fontWeight: cat === c ? 600 : 400, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{c}</button>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(doc => {
            const color = catColors[doc.category] || '#2d8a4e'
            const ytId = doc.watchUrl.includes('v=') ? doc.watchUrl.split('v=')[1]?.split('&')[0] : null
            return (
              <a key={doc.id} href={doc.watchUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden', display: 'flex', gap: '0', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.08)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                {ytId && <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt={doc.title} style={{ width: '200px', height: '130px', objectFit: 'cover', flexShrink: 0 }} onError={e => (e.currentTarget.style.display = 'none')} />}
                <div style={{ padding: '16px', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, background: color + '18', color, padding: '2px 8px', borderRadius: '20px', textTransform: 'capitalize' }}>{doc.category}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{doc.year} · {doc.duration}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#111', marginBottom: '4px' }}>{doc.title}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>Dir. {doc.director}</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{doc.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
