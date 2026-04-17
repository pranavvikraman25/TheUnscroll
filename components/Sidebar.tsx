'use client'
import Link from 'next/link'

const categories = [
  { key: 'travel',     label: 'Virtual Travel',  color: '#0ea5e9' },
  { key: 'creativity', label: 'Creativity',       color: '#ec4899' },
  { key: 'science',    label: 'Science & Data',   color: '#8b5cf6' },
  { key: 'games',      label: 'Games & Fun',      color: '#f97316' },
  { key: 'chill',      label: 'Chill & Read',     color: '#14b8a6' },
  { key: 'learning',   label: 'Learning',         color: '#22c55e' },
  { key: 'tools',      label: 'Tools & Utils',    color: '#64748b' },
]

export default function Sidebar({ active, onSelect, total, savedCount }: {
  active: string; onSelect: (k: string) => void; total: number; savedCount: number
}) {
  return (
    <aside style={{
      width: '210px',
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid #f0f0f0',
      padding: '22px 0 20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
    }}>

      {/* Logo */}
      <div style={{ padding: '0 18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          {/* SVG Icon Mark */}
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#0f1117"/>
            {/* Left arm + bottom — green */}
            <path d="M9 7 L9 19 Q9 25 16 25 Q23 25 23 19 L23 9"
              stroke="#2d8a4e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            {/* Right side + bottom — amber overlay */}
            <path d="M16 25 Q23 25 23 19 L23 9"
              stroke="#c8970a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            {/* Scroll curl at top-right — the "unscroll" detail */}
            <path d="M23 9 Q23 5 26 6 Q28.5 7.5 26.5 10"
              stroke="#c8970a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
          {/* Wordmark */}
          <div>
            <div style={{ fontSize: '16px', fontWeight: 800, letterSpacing: '-0.4px', lineHeight: 1 }}>
              <span style={{ color: '#2d8a4e' }}>The </span>
              <span style={{ color: '#c8970a' }}>Unscroll</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '10px', color: '#b0b7c3', marginTop: '6px', letterSpacing: '0.01em' }}>
          Your cure for endless scrolling
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>

        {/* All sites */}
        <button
          onClick={() => onSelect('all')}
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
            fontSize: '13px',
            fontWeight: active === 'all' ? 600 : 400,
            color: active === 'all' ? '#111' : '#6b7280',
            background: active === 'all' ? '#f4f4f5' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span style={{
            width: '20px', height: '20px', borderRadius: '5px',
            background: active === 'all' ? '#111' : '#e4e4e7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', flexShrink: 0, transition: 'all 0.15s',
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="0" y="0" width="4" height="4" rx="1" fill={active === 'all' ? '#fff' : '#888'} />
              <rect x="6" y="0" width="4" height="4" rx="1" fill={active === 'all' ? '#fff' : '#888'} />
              <rect x="0" y="6" width="4" height="4" rx="1" fill={active === 'all' ? '#fff' : '#888'} />
              <rect x="6" y="6" width="4" height="4" rx="1" fill={active === 'all' ? '#fff' : '#888'} />
            </svg>
          </span>
          All sites
          <span style={{
            marginLeft: 'auto', fontSize: '11px', fontWeight: 500,
            color: active === 'all' ? '#374151' : '#9ca3af',
          }}>{total}</span>
        </button>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f3f4f6', margin: '2px 2px 6px' }} />

        {/* Category rows */}
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            style={{
              padding: '7px 10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: active === cat.key ? 600 : 400,
              color: active === cat.key ? cat.color : '#6b7280',
              background: active === cat.key ? cat.color + '12' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s',
              outline: 'none',
            }}
          >
            {/* Color chip */}
            <span style={{
              width: '8px', height: '8px', borderRadius: '3px',
              background: active === cat.key ? cat.color : '#d1d5db',
              flexShrink: 0,
              transition: 'all 0.15s',
            }} />
            {cat.label}
          </button>
        ))}

        {/* Saved */}
        {savedCount > 0 && (
          <>
            <div style={{ height: '1px', background: '#f3f4f6', margin: '6px 2px' }} />
            <button
              onClick={() => onSelect('saved')}
              style={{
                padding: '7px 10px', borderRadius: '8px', border: 'none',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: active === 'saved' ? 600 : 400,
                color: active === 'saved' ? '#c8970a' : '#6b7280',
                background: active === 'saved' ? '#fef9e718' : 'transparent',
                display: 'flex', alignItems: 'center', gap: '8px',
                outline: 'none',
              }}
            >
              <span style={{
                width: '8px', height: '8px', borderRadius: '3px',
                background: active === 'saved' ? '#c8970a' : '#d1d5db',
                flexShrink: 0,
              }} />
              Saved
              <span style={{
                marginLeft: 'auto', fontSize: '11px', fontWeight: 600,
                background: '#fef3c7', color: '#c8970a',
                padding: '1px 7px', borderRadius: '10px',
              }}>{savedCount}</span>
            </button>
          </>
        )}
      </div>

      {/* Tricks link */}
      <div style={{ padding: '0 10px', marginTop: '12px' }}>
        <div style={{ height: '1px', background: '#f3f4f6', marginBottom: '10px' }} />
        <Link href="/tricks" style={{
          padding: '8px 10px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #fef9e7 0%, #f0fdf4 100%)',
          color: '#374151', display: 'flex', alignItems: 'center', gap: '8px',
          textDecoration: 'none', fontSize: '13px', fontWeight: 500,
          border: '1px solid #e9ecef',
        }}>
          <span style={{ fontSize: '13px' }}>💡</span>
          Tricks & Tips
          <span style={{
            marginLeft: 'auto', fontSize: '9px', fontWeight: 700,
            background: '#2d8a4e', color: '#fff',
            padding: '2px 6px', borderRadius: '10px', letterSpacing: '0.04em',
          }}>NEW</span>
        </Link>
      </div>

      {/* Footer */}
      <div style={{ padding: '0 18px', marginTop: 'auto', paddingTop: '16px' }}>
        <div style={{ fontSize: '10.5px', color: '#c0c4cc', marginBottom: '4px' }}>
          {total} sites · always growing
        </div>
        <a
          href="https://github.com/pranavvikraman25/tabbreaker"
          target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '10.5px', color: '#2d8a4e', textDecoration: 'none' }}
        >
          Open source ↗
        </a>
      </div>
    </aside>
  )
}
