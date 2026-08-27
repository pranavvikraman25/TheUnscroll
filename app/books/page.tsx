'use client'
import { useState, useMemo } from 'react'
import books from '../../data/books.json'
import Link from 'next/link'
import { IconBooks } from '../../components/Icons'

const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))]

const catColors: Record<string, string> = {
  philosophy: '#7c3aed', fiction: '#c54444', science: '#006ccc',
  strategy: '#b45309', 'self-help': '#08b54d'
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
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'Inter, sans-serif', color: '#141414' }}>
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e0e1e1', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#08b54d' }}>The </span><span style={{ color: '#141414' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#cacaca' }}>/</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px', color: '#7c3aed' }}>
          <IconBooks size={16} color="#7c3aed" />
          <span>Classic Books</span>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..." style={{ marginLeft: 'auto', padding: '9px 16px', border: '1px solid #e0e1e1', borderRadius: '6px', fontSize: '13px', outline: 'none', width: '240px', background: '#fafafa' }} onFocus={e => e.currentTarget.style.borderColor = '#08b54d'} onBlur={e => e.currentTarget.style.borderColor = '#e0e1e1'} />
      </nav>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 28px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 700, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{books.length} books · all free · all legal</div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}><span style={{ color: '#08b54d' }}>Classic books</span> that shaped <span style={{ color: '#141414' }}>human thought</span></h1>
        <p style={{ fontSize: '14.5px', color: '#525252', marginBottom: '28px', lineHeight: 1.6 }}>Every book here is in the public domain — free, legal, beautifully typeset at Standard Ebooks and Project Gutenberg.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '7px 16px', borderRadius: '50px', border: `1px solid ${cat === c ? (catColors[c] || '#08b54d') : '#e0e1e1'}`, background: cat === c ? (catColors[c] || '#08b54d') : '#ffffff', color: cat === c ? '#ffffff' : '#525252', fontWeight: cat === c ? 700 : 600, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize', transition: 'all 0.15s ease' }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filtered.map(book => {
            const color = catColors[book.category] || '#08b54d'
            return (
              <a key={book.id} href={book.freeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: '#ffffff', border: '1px solid #e0e1e1', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 24px -4px rgba(10,10,10,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = color }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = '#e0e1e1' }}>
                <div style={{ height: '5px', background: color }} />
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: color + '15', color, padding: '3px 10px', borderRadius: '50px', textTransform: 'capitalize', border: `1px solid ${color}33` }}>{book.category}</span>
                    <span style={{ fontSize: '11px', color: '#666666' }}>{book.readTime}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '17px', color: '#141414', marginBottom: '4px', lineHeight: 1.3 }}>{book.title}</div>
                  <div style={{ fontSize: '12.5px', color: '#666666', marginBottom: '12px', fontWeight: 600 }}>{book.author} · {book.year < 0 ? `${Math.abs(book.year)} BC` : book.year}</div>
                  <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.6, margin: 0, flex: 1 }}>{book.description}</p>
                </div>
                <div style={{ padding: '12px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
                  <span style={{ fontSize: '13px', color: '#08b54d', fontWeight: 700 }}>Free to read ↗</span>
                  <span style={{ fontSize: '11px', color: '#666666' }}>Standard Ebooks</span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
