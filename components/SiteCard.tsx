'use client'
import { useState } from 'react'

const categoryConfig: Record<string, { label: string; bg: string; color: string; border: string }> = {
  travel:     { label: 'Travel',      bg: '#eef6fc', color: '#006ccc', border: 'rgba(0, 108, 204, 0.2)' },
  creativity: { label: 'Creativity',  bg: '#fdf2f2', color: '#c54444', border: 'rgba(197, 68, 68, 0.2)' },
  science:    { label: 'Science',     bg: '#f5f3ff', color: '#7c3aed', border: 'rgba(124, 58, 237, 0.2)' },
  games:      { label: 'Games',       bg: '#fff7d4', color: '#b45309', border: 'rgba(180, 83, 9, 0.2)' },
  chill:      { label: 'Chill',       bg: '#e8f8ee', color: '#08b54d', border: 'rgba(8, 181, 77, 0.2)' },
  learning:   { label: 'Learning',    bg: '#e8f8ee', color: '#28a745', border: 'rgba(40, 167, 69, 0.2)' },
  tools:      { label: 'Tools',       bg: '#f1f5f9', color: '#334155', border: 'rgba(51, 65, 85, 0.2)' },
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
        background: '#ffffff',
        border: `1px solid ${hovered ? cat.color : '#e5e7eb'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 10px 24px -4px rgba(10, 10, 10, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Clickable Thumbnail ── */}
      <div
        onClick={openSite}
        style={{
          width: '100%', height: '140px',
          background: cat.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Top brand color indicator bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: cat.color, opacity: 0.8,
        }} />

        {(!site.screenshot || imgError) ? (
          <span style={{
            fontSize: '42px', fontWeight: 800, color: cat.color,
            opacity: 0.25, userSelect: 'none', letterSpacing: '-1px',
            fontFamily: 'Inter, sans-serif'
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

        {/* Hover overlay */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10, 10, 10, 0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}>
            <span style={{
              fontSize: '12px', fontWeight: 700, color: '#ffffff',
              padding: '6px 14px', borderRadius: '50px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.4)',
              letterSpacing: '0.02em',
              display: 'inline-flex', alignItems: 'center', gap: '4px'
            }}>
              Explore Site ↗
            </span>
          </div>
        )}

        {/* Save/Favorite toggle button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(site.id) }}
          aria-label={isSaved ? "Remove from saved" : "Save site"}
          style={{
            position: 'absolute', top: '8px', right: '8px',
            background: isSaved ? '#08b54d' : 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '50%',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', cursor: 'pointer',
            color: isSaved ? '#ffffff' : '#383838',
            zIndex: 2,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.15s ease',
          }}
        >
          {isSaved ? '✓' : '♡'}
        </button>
      </div>

      {/* ── Card Body ── */}
      <div
        onClick={openSite}
        style={{ padding: '14px 16px', cursor: 'pointer', flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px', gap: '8px',
        }}>
          <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#0a0a0a', margin: 0, lineHeight: 1.3 }}>
            {site.name}
          </h3>
          <span style={{
            fontSize: '10px', fontWeight: 700, padding: '2px 8px',
            borderRadius: '50px', background: cat.bg, color: cat.color,
            whiteSpace: 'nowrap', flexShrink: 0,
            border: `1px solid ${cat.border}`,
            textTransform: 'uppercase',
            letterSpacing: '0.03em'
          }}>
            {cat.label}
          </span>
        </div>

        <div style={{
          fontSize: '11.5px', color: '#08b54d', marginBottom: '8px',
          fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px',
        }}>
          {site.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
          <span style={{ fontSize: '10px' }}>↗</span>
        </div>

        <p style={{ fontSize: '12.5px', color: '#525252', lineHeight: '1.5', margin: 0, flex: 1 }}>
          {site.description}
        </p>
      </div>
    </div>
  )
}
