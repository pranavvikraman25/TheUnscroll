'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import movies from '../../data/movies.json'
import moments from '../../data/moviemoments.json'

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState<'tools' | 'moments'>('tools')
  const [search, setSearch] = useState('')

  const filteredTools = useMemo(() => {
    if (activeTab !== 'tools') return []
    if (!search.trim()) return movies
    const q = search.toLowerCase()
    return movies.filter(m => 
      m.name.toLowerCase().includes(q) || 
      m.description.toLowerCase().includes(q)
    )
  }, [activeTab, search])

  const filteredMoments = useMemo(() => {
    if (activeTab !== 'moments') return []
    if (!search.trim()) return moments
    const q = search.toLowerCase()
    return moments.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.movie.toLowerCase().includes(q) || 
      m.description.toLowerCase().includes(q) ||
      m.significance.toLowerCase().includes(q) ||
      m.year.includes(q)
    )
  }, [activeTab, search])

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Navigation */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>🎬 Movies & Cinema</span>
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder={activeTab === 'tools' ? "Search tools..." : "Search moments..."} 
          style={{ marginLeft: 'auto', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', width: '240px' }} 
        />
      </nav>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '36px 24px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 700, color: '#2d8a4e', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Explore Cinema
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: '#111', letterSpacing: '-0.5px' }}>
            Cinema, Puzzles & <span style={{ color: '#c8970a' }}>Remarkable History</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
            Discover the best interactive tools to explore film soundtracks, movie details, trivia games, and 20 iconic moments that shaped film history.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', paddingBottom: '1px', marginBottom: '28px' }}>
          <button 
            onClick={() => { setActiveTab('tools'); setSearch(''); }}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'tools' ? '2px solid #2d8a4e' : '2px solid transparent',
              color: activeTab === 'tools' ? '#2d8a4e' : '#6b7280',
              fontWeight: activeTab === 'tools' ? 700 : 500,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            🌐 Discovery Tools ({movies.length})
          </button>
          <button 
            onClick={() => { setActiveTab('moments'); setSearch(''); }}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'moments' ? '2px solid #c8970a' : '2px solid transparent',
              color: activeTab === 'moments' ? '#c8970a' : '#6b7280',
              fontWeight: activeTab === 'moments' ? 700 : 500,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            🏆 Cinema Moments ({moments.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'tools' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredTools.map(tool => (
              <a 
                key={tool.id} 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  textDecoration: 'none', 
                  background: '#fff', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  transition: 'all 0.2s' 
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'; 
                  e.currentTarget.style.transform = 'translateY(-2px)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.boxShadow = 'none'; 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                }}
              >
                {/* Thumbnail */}
                <div style={{ width: '100%', height: '140px', background: '#f3f4f6', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={tool.screenshot} 
                    alt={tool.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.02)' }} />
                </div>

                {/* Body */}
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, background: '#2d8a4e12', color: '#2d8a4e', padding: '2px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>
                      {tool.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                    {tool.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#6b7280', lineHeight: 1.6, margin: 0, flex: 1 }}>
                    {tool.description}
                  </p>
                </div>

                {/* Footer link */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#2d8a4e', fontWeight: 600 }}>Visit site ↗</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{tool.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                </div>
              </a>
            ))}
            {filteredTools.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
                No tools match your search.
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredMoments.map((moment, idx) => (
              <div 
                key={moment.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Visual marker/index */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  background: '#c8970a12',
                  color: '#c8970a',
                  borderRadius: '14px',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>{moment.emoji}</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, marginTop: '2px' }}>#{moment.id}</span>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#c8970a' }}>{moment.year}</span>
                    <span style={{ color: '#d1d5db', fontSize: '12px' }}>•</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', fontStyle: 'italic' }}>{moment.movie}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                    {moment.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                    {moment.description}
                  </p>
                  
                  {/* Historical Significance Box */}
                  <div style={{ 
                    background: '#f9fafb', 
                    borderLeft: '3px solid #c8970a', 
                    padding: '10px 14px', 
                    borderRadius: '0 8px 8px 0',
                    fontSize: '12.5px',
                    color: '#6b7280',
                    lineHeight: 1.5
                  }}>
                    <strong style={{ color: '#4b5563' }}>Why it matters:</strong> {moment.significance}
                  </div>
                </div>
              </div>
            ))}
            {filteredMoments.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
                No cinematic moments match your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
