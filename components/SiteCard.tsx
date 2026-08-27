'use client'
import { useState } from 'react'
import {
  IconTravel,
  IconCreativity,
  IconScience,
  IconGames,
  IconChill,
  IconLearning,
  IconTools,
} from './Icons'

const categoryMap: Record<string, { label: string; icon: React.ComponentType<{ size?: number; color?: string }>; color: string }> = {
  travel:     { label: 'Travel',      icon: IconTravel,     color: '#006ccc' },
  creativity: { label: 'Creativity',  icon: IconCreativity, color: '#c54444' },
  science:    { label: 'Science',     icon: IconScience,    color: '#7c3aed' },
  games:      { label: 'Games',       icon: IconGames,      color: '#b45309' },
  chill:      { label: 'Chill',       icon: IconChill,      color: '#08b54d' },
  learning:   { label: 'Learning',    icon: IconLearning,   color: '#28a745' },
  tools:      { label: 'Tools',       icon: IconTools,      color: '#383838' },
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
  const cat = categoryMap[site.category] || categoryMap.tools
  const CategoryIcon = cat.icon

  const openSite = () => window.open(site.url, '_blank', 'noopener,noreferrer')
  const cleanDomain = site.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: `1px solid ${hovered ? '#08b54d' : '#e0e1e1'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 12px 28px -6px rgba(10, 10, 10, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Clickable Thumbnail ── */}
      <div
        onClick={openSite}
        style={{
          width: '100%', height: '145px',
          background: '#f8faf9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          cursor: 'pointer',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        {/* Top brand accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: hovered ? '#08b54d' : cat.color, transition: 'background 0.2s ease',
        }} />

        {(!site.screenshot || imgError) ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
          }}>
            <span style={{
              fontSize: '44px', fontWeight: 900, color: '#141414',
              opacity: 0.15, userSelect: 'none', letterSpacing: '-1px',
              fontFamily: 'Inter, sans-serif'
            }}>
              {site.name.charAt(0)}
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.screenshot} alt={site.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        )}

        {/* Category Badge overlay on thumbnail top-left */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#141414', color: '#ffffff',
          padding: '4px 10px', borderRadius: '4px',
          fontSize: '10.5px', fontWeight: 800,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 2,
        }}>
          <CategoryIcon size={12} color="#08b54d" />
          <span>{cat.label}</span>
        </div>

        {/* Hover overlay */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(20, 20, 20, 0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(2px)',
            zIndex: 3,
          }}>
            <span style={{
              fontSize: '12.5px', fontWeight: 800, color: '#ffffff',
              padding: '8px 18px', borderRadius: '6px',
              background: '#08b54d',
              boxShadow: '0 4px 12px rgba(8, 181, 77, 0.3)',
              letterSpacing: '0.02em',
              display: 'inline-flex', alignItems: 'center', gap: '6px'
            }}>
              Open {site.name} ↗
            </span>
          </div>
        )}

        {/* Save/Favorite toggle button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(site.id) }}
          aria-label={isSaved ? "Remove from saved" : "Save site"}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            background: isSaved ? '#08b54d' : '#ffffff',
            border: '1px solid #e0e1e1',
            borderRadius: '50%',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', cursor: 'pointer',
            color: isSaved ? '#ffffff' : '#383838',
            zIndex: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.15s ease',
            fontWeight: 800
          }}
        >
          {isSaved ? '✓' : '♡'}
        </button>
      </div>

      {/* ── Card Body ── */}
      <div
        onClick={openSite}
        style={{ padding: '16px 18px', cursor: 'pointer', flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px', gap: '8px',
        }}>
          <h3 style={{ fontWeight: 900, fontSize: '16px', color: '#141414', margin: 0, lineHeight: 1.3, letterSpacing: '-0.3px' }}>
            {site.name}
          </h3>
        </div>

        <div style={{
          fontSize: '12px', color: '#08b54d', marginBottom: '10px',
          fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px',
        }}>
          <span>{cleanDomain}</span>
          <span style={{ fontSize: '11px' }}>↗</span>
        </div>

        <p style={{ fontSize: '13px', color: '#525252', lineHeight: '1.6', margin: 0, flex: 1, fontWeight: 500 }}>
          {site.description}
        </p>
      </div>
    </div>
  )
}
