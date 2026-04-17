'use client'
import { useState } from 'react'
import holes from '../../data/rabbitholes.json'
import Link from 'next/link'

const diffColors: Record<string, string> = { 'Mind-bending': '#7c3aed', 'Deep': '#ec4899', 'Fascinating': '#f97316', 'Accessible': '#22c55e' }

export default function RabbitHolesPage() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#f9fafb' }}>
      <nav style={{ background: '#0f1117', borderBottom: '1px solid #1f2937', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}><span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span></Link>
        <span style={{ color: '#374151' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#9ca3af' }}>🕳️ Rabbit Holes</span>
      </nav>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '36px 24px' }}>
        <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{holes.length} rabbit holes · estimated {holes.reduce((s, h) => s + parseInt(h.estimatedTime), 0)}+ hours of curiosity</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.2 }}>
          Start somewhere.<br /><span style={{ color: '#c8970a' }}>End up somewhere unexpected.</span>
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '32px' }}>Click any rabbit hole to see the chain of topics — then click the first one and let your curiosity do the rest. Don't say we didn't warn you.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {holes.map(hole => (
            <div key={hole.id} style={{ background: '#161b22', border: '1px solid #1f2937', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setOpen(open === hole.id ? null : hole.id)}>
              <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>🕳️</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: '#f9fafb' }}>{hole.title}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px', background: (diffColors[hole.difficulty] || '#22c55e') + '22', color: diffColors[hole.difficulty] || '#22c55e' }}>{hole.difficulty}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>⏱ {hole.estimatedTime} · {hole.chain.length} stops</div>
                </div>
                <span style={{ color: '#6b7280', fontSize: '14px', transform: open === hole.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {open === hole.id && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid #1f2937' }}>
                  <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6, margin: '14px 0' }}>{hole.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {hole.chain.map((stop, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                        <span style={{ fontSize: '12px', background: '#1f2937', color: '#d1d5db', padding: '4px 12px', borderRadius: '20px', fontWeight: 500 }}>{stop}</span>
                        {i < hole.chain.length - 1 && <span style={{ color: '#374151', padding: '0 4px', fontSize: '14px' }}>→</span>}
                      </span>
                    ))}
                  </div>
                  <a href={hole.startUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#c8970a', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
                    Enter the rabbit hole ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
