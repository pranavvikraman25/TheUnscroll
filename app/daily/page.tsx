'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { getDailyPick, getTodayFormatted } from '../../lib/dailyPick'

export default function DailyPickPage() {
  const pick = useMemo(() => getDailyPick(), [])
  const today = useMemo(() => getTodayFormatted(), [])

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${pick.color}08 0%, #f9fafb 60%)`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
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
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>☀️ Daily Pick</span>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Date badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '20px', padding: '5px 14px',
          fontSize: '12px', color: '#6b7280', fontWeight: 500,
          marginBottom: '28px',
        }}>
          <span>📅</span> {today}
        </div>

        {/* Type label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: pick.color + '18',
          border: `1px solid ${pick.color}33`,
          borderRadius: '20px', padding: '6px 16px',
          fontSize: '13px', fontWeight: 700, color: pick.color,
          marginBottom: '20px',
        }}>
          <span>{pick.emoji}</span> {pick.label}
        </div>

        {/* Main card */}
        <div style={{
          background: '#fff',
          border: `2px solid ${pick.color}33`,
          borderRadius: '20px',
          padding: '36px',
          marginBottom: '24px',
          boxShadow: `0 20px 60px ${pick.color}18`,
        }}>
          <h1 style={{
            fontSize: '28px', fontWeight: 800, color: '#111',
            lineHeight: 1.2, marginBottom: '10px',
          }}>{pick.title}</h1>
          <div style={{
            fontSize: '13px', color: pick.color, fontWeight: 600,
            marginBottom: '18px',
          }}>{pick.subtitle}</div>
          <p style={{
            fontSize: '15px', color: '#374151', lineHeight: 1.75,
            marginBottom: '28px',
          }}>{pick.description}</p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={pick.url} target="_blank" rel="noopener noreferrer" style={{
              padding: '12px 28px', borderRadius: '10px',
              background: pick.color, color: '#fff',
              textDecoration: 'none', fontSize: '14px', fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              {pick.emoji} Open now ↗
            </a>
            {pick.route && pick.route !== pick.url && (
              <Link href={pick.route} style={{
                padding: '12px 20px', borderRadius: '10px',
                background: pick.color + '12', color: pick.color,
                textDecoration: 'none', fontSize: '13px', fontWeight: 600,
                border: `1px solid ${pick.color}33`,
              }}>
                Browse all {pick.type === 'rabbit-hole' ? 'rabbit holes' : pick.type + 's'} →
              </Link>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div style={{
          textAlign: 'center', fontSize: '12px', color: '#9ca3af', lineHeight: 1.6,
        }}>
          Today's pick is drawn from <strong style={{ color: '#374151' }}>260+ curated items</strong> across 8 categories.<br />
          Comes back tomorrow with something completely different. ✨
        </div>
      </div>
    </div>
  )
}
