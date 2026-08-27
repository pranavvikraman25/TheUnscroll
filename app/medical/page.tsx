'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import medicalData from '../../data/medical.json'
import { IconMedical } from '../../components/Icons'

export default function MedicalPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(medicalData.map(m => m.category)))]
  }, [])

  const filtered = useMemo(() => {
    let list = category === 'All' ? medicalData : medicalData.filter(m => m.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      )
    }
    return list
  }, [category, search])

  const flagship = medicalData.find(m => m.url.includes('servier.com')) || medicalData[0]

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'Inter, sans-serif', color: '#141414' }}>
      {/* Top Navbar */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e0e1e1', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#08b54d' }}>The </span><span style={{ color: '#141414' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#cacaca' }}>/</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px', color: '#006ccc' }}>
          <IconMedical size={16} color="#006ccc" />
          <span>Medical & Science Section</span>
        </div>
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search medical tools..." 
          style={{ marginLeft: 'auto', padding: '9px 16px', border: '1px solid #e0e1e1', borderRadius: '6px', fontSize: '13px', outline: 'none', width: '260px', background: '#fafafa' }} 
          onFocus={e => e.currentTarget.style.borderColor = '#08b54d'}
          onBlur={e => e.currentTarget.style.borderColor = '#e0e1e1'}
        />
      </nav>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 28px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 700, color: '#006ccc', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Scientific Resource Directory
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', color: '#141414', letterSpacing: '-0.5px' }}>
            Medical & <span style={{ color: '#08b54d' }}>Science Section</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#525252', margin: 0, lineHeight: 1.6, maxWidth: '720px' }}>
            Discover essential databases, free vector illustrations, 3D anatomical models, and literature portals for healthcare professionals, researchers, and students.
          </p>
        </div>

        {/* Flagship Hero Banner: Servier Medical Art */}
        {flagship && (
          <div style={{
            background: 'linear-gradient(135deg, #141414 0%, #171717 100%)',
            borderRadius: '16px',
            padding: '32px',
            color: '#ffffff',
            marginBottom: '36px',
            boxShadow: '0 12px 32px rgba(10, 10, 10, 0.12)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #383838'
          }}>
            <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '240px', height: '240px', background: 'radial-gradient(circle, rgba(8,181,77,0.25) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }} />
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(8, 181, 77, 0.2)', color: '#08b54d', padding: '4px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px', border: '1px solid rgba(8, 181, 77, 0.3)' }}>
              Flagship Medical Resource
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '28px', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '0 0 12px 0', color: '#ffffff' }}>
                  {flagship.name}
                </h2>
                <p style={{ fontSize: '14.5px', color: '#e0e1e1', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  {flagship.description}
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {['3000+ Vectors', 'CC-BY License', 'Anatomy & Cells', 'Editable PPT/AI'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', fontSize: '12px', padding: '5px 12px', borderRadius: '6px', fontWeight: 700 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a 
                  href={flagship.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#08b54d',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 800,
                    fontSize: '14px',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 4px 14px rgba(8, 181, 77, 0.3)'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#06963f')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#08b54d')}
                >
                  Explore Servier Medical Art ↗
                </a>
              </div>

              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #383838', background: '#0a0a0a', height: '180px' }}>
                <img 
                  src={flagship.screenshot} 
                  alt={flagship.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '50px',
                border: `1px solid ${category === cat ? '#08b54d' : '#e0e1e1'}`,
                background: category === cat ? '#08b54d' : '#ffffff',
                color: category === cat ? '#ffffff' : '#525252',
                fontWeight: category === cat ? 700 : 600,
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Medical & Science Platforms */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '22px' }}>
          {filtered.map(item => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                background: '#ffffff',
                border: '1px solid #e0e1e1',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(10, 10, 10, 0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = '#08b54d'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = '#e0e1e1'
              }}
            >
              <div style={{ width: '100%', height: '145px', background: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={item.screenshot} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, background: '#eef6fc', color: '#006ccc', padding: '3px 10px', borderRadius: '50px', border: '1px solid rgba(0, 108, 204, 0.2)' }}>
                    {item.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '17.5px', fontWeight: 800, color: '#141414', margin: '0 0 8px 0' }}>
                  {item.name}
                </h3>

                <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.6, margin: 0, flex: 1 }}>
                  {item.description}
                </p>
              </div>

              <div style={{ padding: '12px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
                <span style={{ fontSize: '13px', color: '#08b54d', fontWeight: 700 }}>Open Platform ↗</span>
                <span style={{ fontSize: '11px', color: '#666666' }}>{item.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
