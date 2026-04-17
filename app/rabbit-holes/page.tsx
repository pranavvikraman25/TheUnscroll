'use client'
import { useState } from 'react'
import holes from '../../data/rabbitholes.json'
import Link from 'next/link'

const diffColors: Record<string, string> = {
  'Mind-bending': '#7c3aed',
  'Deep': '#ec4899',
  'Fascinating': '#f97316',
  'Accessible': '#22c55e',
}

export default function RabbitHolesPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* Nav */}
      <nav style={{
        background: '#fff', borderBottom: '1px solid #f0f0f0',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#2d8a4e' }}>The </span><span style={{ color: '#c8970a' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#d1d5db' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>🕳️ Rabbit Holes</span>
      </nav>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '28px 24px' }}>
        <div style={{ marginBottom: '6px', fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {holes.length} rabbit holes · start somewhere, end up everywhere
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.2 }}>
          <span style={{ color: '#2d8a4e' }}>Start somewhere.</span>{' '}
          <span style={{ color: '#c8970a' }}>End up somewhere unexpected.</span>
        </h1>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '28px' }}>
          Click any rabbit hole to see the chain of topics — then dive in and let curiosity do the rest. Don't say we didn't warn you.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {holes.map(hole => {
            const color = diffColors[hole.difficulty] || '#22c55e'
            const isOpen = open === hole.id
            return (
              <div
                key={hole.id}
                style={{
                  background: '#fff',
                  border: `1px solid ${isOpen ? color + '44' : '#e5e7eb'}`,
                  borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: isOpen ? `0 4px 20px ${color}18` : 'none',
                }}
                onClick={() => setOpen(isOpen ? null : hole.id)}
              >
                {/* Top accent */}
                <div style={{ height: '3px', background: color, opacity: 0.6 }} />

                {/* Header row */}
                <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: color + '14', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '20px', flexShrink: 0,
                  }}>🕳️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '3px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '15px', color: '#111' }}>{hole.title}</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: color + '18', color }}>{hole.difficulty}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>⏱ {hole.estimatedTime} · {hole.chain.length} stops</div>
                  </div>
                  <span style={{ color: '#9ca3af', fontSize: '13px', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>▼</span>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding: '0 18px 20px', borderTop: `1px solid ${color}22` }}>
                    <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.7, margin: '14px 0 14px' }}>
                      {hole.description}
                    </p>

                    {/* Topic chain */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap', marginBottom: '18px', rowGap: '6px' }}>
                      {hole.chain.map((stop, i) => (
                        <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{
                            fontSize: '12px', background: color + '12',
                            color: '#374151', padding: '4px 12px',
                            borderRadius: '20px', fontWeight: 500,
                            border: `1px solid ${color}22`,
                          }}>{stop}</span>
                          {i < hole.chain.length - 1 && (
                            <span style={{ color: '#d1d5db', padding: '0 4px', fontSize: '14px' }}>→</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <a
                      href={hole.startUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '7px',
                        padding: '10px 22px', background: color, color: '#fff',
                        borderRadius: '9px', textDecoration: 'none',
                        fontSize: '13px', fontWeight: 700,
                      }}
                    >
                      🕳️ Enter the rabbit hole ↗
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
