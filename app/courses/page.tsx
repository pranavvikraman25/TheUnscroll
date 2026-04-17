'use client'
import { useState, useMemo } from 'react'
import courses from '../../data/courses.json'
import Link from 'next/link'

const catColors: Record<string, string> = { technology: '#0ea5e9', mindset: '#7c3aed', science: '#22c55e', business: '#f97316', creativity: '#ec4899' }

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))]
  const filtered = useMemo(() => {
    let list = cat === 'All' ? courses : courses.filter(c => c.category === cat)
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(c => c.title.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q)) }
    return list
  }, [cat, search])
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}><span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span></Link>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>🎓 Courses</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." style={{ marginLeft: 'auto', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', width: '240px' }} />
      </nav>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{courses.length} courses · 100% free · zero excuses</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}><span style={{ color: '#2d8a4e' }}>World-class education.</span> <span style={{ color: '#c8970a' }}>Completely free.</span></h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>MIT, Harvard, Yale, Google — the best learning institutions on Earth have put their courses online for free. No excuses.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: '5px 14px', borderRadius: '20px', border: `1px solid ${cat === c ? (catColors[c] || '#2d8a4e') : '#e5e7eb'}`, background: cat === c ? (catColors[c] || '#2d8a4e') + '18' : '#fff', color: cat === c ? (catColors[c] || '#2d8a4e') : '#6b7280', fontWeight: cat === c ? 600 : 400, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{c}</button>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filtered.map(course => {
            const color = catColors[course.category] || '#2d8a4e'
            return (
              <a key={course.id} href={course.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.09)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
                <div style={{ height: '5px', background: course.providerColor }} />
                <div style={{ padding: '16px', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, background: color + '18', color, padding: '2px 8px', borderRadius: '20px', textTransform: 'capitalize' }}>{course.category}</span>
                    <span style={{ fontSize: '10px', background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: '20px' }}>{course.level}</span>
                    <span style={{ fontSize: '10px', background: '#f0fdf4', color: '#22c55e', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>FREE</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111', marginBottom: '4px', lineHeight: 1.3 }}>{course.title}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '10px', fontWeight: 500 }}>{course.provider} · {course.duration}</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{course.description}</p>
                </div>
                <div style={{ padding: '10px 16px', borderTop: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: '11px', color: '#2d8a4e', fontWeight: 600 }}>Start learning ↗</span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
