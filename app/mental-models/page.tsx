'use client'
import { useState } from 'react'
import models from '../../data/mentalmodels.json'
import Link from 'next/link'

export default function MentalModelsPage() {
  const [open, setOpen] = useState<number | null>(null)
  const [cat, setCat] = useState('All')
  const categories = ['All', ...Array.from(new Set(models.map(m => m.category)))]
  const filtered = cat === 'All' ? models : models.filter(m => m.category === cat)
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <nav style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}><span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span></Link>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>🧠 Mental Models</span>
      </nav>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{models.length} mental models · used by the sharpest minds</div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}>
          <span style={{ color: '#2d8a4e' }}>Mental models</span> that will <span style={{ color: '#c8970a' }}>sharpen your thinking</span>
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>The frameworks used by the world's best investors, scientists, and thinkers. Learn them once, use them forever.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.map(c => <button key={c} onClick={() => setCat(c)} style={{ padding: '5px 14px', borderRadius: '20px', border: `1px solid ${cat === c ? '#2d8a4e' : '#e5e7eb'}`, background: cat === c ? '#f0fdf4' : '#fff', color: cat === c ? '#2d8a4e' : '#6b7280', fontWeight: cat === c ? 600 : 400, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{c}</button>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(model => (
            <div key={model.id} style={{ background: '#fff', border: `1px solid ${open === model.id ? model.color + '55' : '#e5e7eb'}`, borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }} onClick={() => setOpen(open === model.id ? null : model.id)}>
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: model.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: model.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111', marginBottom: '2px' }}>{model.title}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>{model.tagline}</div>
                </div>
                <span style={{ color: '#9ca3af', fontSize: '13px', transform: open === model.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {open === model.id && (
                <div style={{ padding: '0 20px 20px', borderTop: `1px solid ${model.color}22` }}>
                  <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, margin: '14px 0 12px' }}>{model.description}</p>
                  <div style={{ background: model.color + '08', border: `1px solid ${model.color}22`, borderRadius: '10px', padding: '14px 16px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: model.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Real-world example</div>
                    <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, margin: 0 }}>{model.example}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>USED BY </span>
                      <span style={{ fontSize: '12px', color: '#374151' }}>{model.whoUses}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#f97316', background: '#fff7ed', padding: '8px 12px', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                    ⚠️ <strong>Watch out:</strong> {model.watchOut}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
