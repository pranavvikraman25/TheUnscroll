'use client'
import { useState, useMemo } from 'react'
import books from '../../data/books.json'
import Link from 'next/link'

const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))]

const catColors: Record<string, string> = {
  philosophy: '#7c3aed', fiction: '#ec4899', science: '#0ea5e9',
  strategy: '#f97316', 'self-help': '#22c55e'
}

export default function BooksPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const filtered = useMemo(() => {
    let list = cat === 'All' ? books : books.filter(b => b.category === cat)
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)) }
    return list
  }, [cat, search])

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>📖 Books</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..." style={{ marginLeft: 'auto', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', width: '240px' }} />
      </nav>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{books.length} books · all free · all legal</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}><span style={{ color: '#2d8a4e' }}>Classic books</span> that shaped <span style={{ color: '#c8970a' }}>human thought</span></h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Every book here is in the public domain — free, legal, beautifully typeset at Standard Ebooks and Project Gutenberg.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '5px 14px', borderRadius: '20px', border: `1px solid ${cat === c ? (catColors[c] || '#2d8a4e') : '#e5e7eb'}`, background: cat === c ? (catColors[c] || '#2d8a4e') + '18' : '#fff', color: cat === c ? (catColors[c] || '#2d8a4e') : '#6b7280', fontWeight: cat === c ? 600 : 400, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {filtered.map(book => {
            const color = catColors[book.category] || '#2d8a4e'
            return (
              <a key={book.id} href={book.freeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.09)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                <div style={{ height: '6px', background: color }} />
                <div style={{ padding: '16px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, background: color + '18', color, padding: '2px 8px', borderRadius: '20px', textTransform: 'capitalize' }}>{book.category}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{book.readTime}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#111', marginBottom: '4px', lineHeight: 1.3 }}>{book.title}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>{book.author} · {book.year < 0 ? `${Math.abs(book.year)} BC` : book.year}</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{book.description}</p>
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>Free to read ↗</span>
                  <span style={{ fontSize: '10px', color: '#9ca3af' }}>Standard Ebooks</span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
