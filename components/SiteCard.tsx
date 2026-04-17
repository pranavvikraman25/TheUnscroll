'use client'
import { useState } from 'react'

const categoryConfig: Record<string, { label: string; bg: string; color: string }> = {
  travel:     { label: 'Travel',      bg: '#f0f9ff', color: '#0ea5e9' },
  creativity: { label: 'Creativity',  bg: '#fdf2f8', color: '#ec4899' },
  science:    { label: 'Science',     bg: '#f5f3ff', color: '#8b5cf6' },
  games:      { label: 'Games',       bg: '#fff7ed', color: '#f97316' },
  chill:      { label: 'Chill',       bg: '#f0fdfa', color: '#14b8a6' },
  learning:   { label: 'Learning',    bg: '#f0fdf4', color: '#22c55e' },
  tools:      { label: 'Tools',       bg: '#f8fafc', color: '#64748b' },
}

type Site = {
  id: number; name: string; url: string;
  description: string; category: string; screenshot: string;
}

export default function SiteCard({ site, isSaved, onToggleSave }: {
  site: Site; isSaved: boolean; onToggleSave: (id: number) => void
}) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cat = categoryConfig[site.category] || categoryConfig.tools

  const openSite = () => window.open(site.url, '_blank', 'noopener,noreferrer')

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.09)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
        borderColor: hovered ? cat.color + '55' : '#e5e7eb',
      }}
    >
      {/* ── Clickable thumbnail ── */}
      <div
        onClick={openSite}
        style={{
          width: '100%', height: '130px',
          background: cat.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Top color accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: cat.color, opacity: 0.7,
        }} />

        {(!site.screenshot || imgError) ? (
          <span style={{
            fontSize: '40px', fontWeight: 800, color: cat.color,
            opacity: 0.18, userSelect: 'none', letterSpacing: '-2px',
          }}>
            {site.name.charAt(0)}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.screenshot} alt={site.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay with "Visit →" */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.32)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(1px)',
          }}>
            <span style={{
              fontSize: '12px', fontWeight: 600, color: '#fff',
              padding: '6px 16px', borderRadius: '20px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.35)',
              letterSpacing: '0.02em',
            }}>
              Visit site ↗
            </span>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(site.id) }}
          style={{
            position: 'absolute', top: '8px', right: '8px',
            background: isSaved ? '#2d8a4e' : 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '50%',
            width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', cursor: 'pointer',
            color: isSaved ? '#fff' : '#555',
            zIndex: 2,
            transition: 'all 0.15s',
          }}
        >
          {isSaved ? '✓' : '♡'}
        </button>
      </div>

      {/* ── Card body ── */}
      <div
        onClick={openSite}
        style={{ padding: '12px 14px', cursor: 'pointer' }}
      >
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '4px', gap: '8px',
        }}>
          <span style={{ fontWeight: 600, fontSize: '14px', color: '#111', lineHeight: 1.3 }}>
            {site.name}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 600, padding: '2px 8px',
            borderRadius: '20px', background: cat.bg, color: cat.color,
            whiteSpace: 'nowrap', flexShrink: 0,
            border: `1px solid ${cat.color}22`,
          }}>
            {cat.label}
          </span>
        </div>

        <div style={{
          fontSize: '11px', color: '#2d8a4e', marginBottom: '7px',
          display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          {site.url.replace(/^https?:\/\//, '')}
          <span style={{ fontSize: '10px' }}>↗</span>
        </div>

        <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.55', margin: 0 }}>
          {site.description}
        </p>
      </div>
    </div>
  )
}
