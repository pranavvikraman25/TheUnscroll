'use client'
import Link from 'next/link'
import {
  IconDaily,
  IconTricks,
  IconBooks,
  IconFilm,
  IconMedical,
  IconPodcast,
  IconCourses,
  IconRabbitHole,
  IconMentalModel
} from './Icons'

const categories = [
  { key: 'travel',     label: 'Virtual Travel',  color: '#006ccc' },
  { key: 'creativity', label: 'Creativity',       color: '#c54444' },
  { key: 'science',    label: 'Science & Data',   color: '#7c3aed' },
  { key: 'games',      label: 'Games & Fun',      color: '#b45309' },
  { key: 'chill',      label: 'Chill & Read',     color: '#08b54d' },
  { key: 'learning',   label: 'Learning',         color: '#28a745' },
  { key: 'tools',      label: 'Tools & Utils',    color: '#383838' },
]

export default function Sidebar({ active, onSelect, total, savedCount }: {
  active: string; onSelect: (k: string) => void; total: number; savedCount: number
}) {
  return (
    <aside style={{
      width: '220px',
      flexShrink: 0,
      background: '#ffffff',
      borderRight: '1px solid #e0e1e1',
      padding: '24px 0 20px',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* Logo Section */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* FOSS Vitalize Green SVG Icon Mark */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#141414"/>
            <path d="M9 7 L9 19 Q9 25 16 25 Q23 25 23 19 L23 9"
              stroke="#08b54d" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M16 25 Q23 25 23 19 L23 9"
              stroke="#ffc107" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M23 9 Q23 5 26 6 Q28.5 7.5 26.5 10"
              stroke="#ffc107" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
          {/* Wordmark */}
          <div>
            <div style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.4px', lineHeight: 1 }}>
              <span style={{ color: '#08b54d' }}>The </span>
              <span style={{ color: '#141414' }}>Unscroll</span>
            </div>
            <div style={{ fontSize: '10px', color: '#666666', marginTop: '4px', fontWeight: 600 }}>
              Cure endless scrolling
            </div>
          </div>
        </div>
      </div>

      {/* Category Nav */}
      <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>

        {/* All sites button */}
        <button
          onClick={() => onSelect('all')}
          style={{
            padding: '9px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
            fontSize: '13.5px',
            fontWeight: active === 'all' ? 700 : 500,
            color: active === 'all' ? '#141414' : '#525252',
            background: active === 'all' ? '#f0f0f0' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '6px',
            transition: 'all 0.15s ease'
          }}
        >
          <span style={{
            width: '20px', height: '20px', borderRadius: '4px',
            background: active === 'all' ? '#08b54d' : '#e0e1e1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', flexShrink: 0, transition: 'all 0.15s ease',
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="0" y="0" width="4" height="4" rx="1" fill={active === 'all' ? '#ffffff' : '#525252'} />
              <rect x="6" y="0" width="4" height="4" rx="1" fill={active === 'all' ? '#ffffff' : '#525252'} />
              <rect x="0" y="6" width="4" height="4" rx="1" fill={active === 'all' ? '#ffffff' : '#525252'} />
              <rect x="6" y="6" width="4" height="4" rx="1" fill={active === 'all' ? '#ffffff' : '#525252'} />
            </svg>
          </span>
          All sites
          <span style={{
            marginLeft: 'auto', fontSize: '11px', fontWeight: 700,
            color: active === 'all' ? '#08b54d' : '#666666',
          }}>{total}</span>
        </button>

        {/* Divider */}
        <div style={{ height: '1px', background: '#e0e1e1', margin: '2px 4px 6px' }} />

        {/* Category list */}
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => onSelect(cat.key)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: active === cat.key ? 700 : 500,
              color: active === cat.key ? cat.color : '#525252',
              background: active === cat.key ? cat.color + '15' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.15s ease',
              outline: 'none',
            }}
          >
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: active === cat.key ? cat.color : '#cacaca',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }} />
            {cat.label}
          </button>
        ))}

        {/* Saved */}
        {savedCount > 0 && (
          <>
            <div style={{ height: '1px', background: '#e0e1e1', margin: '6px 4px' }} />
            <button
              onClick={() => onSelect('saved')}
              style={{
                padding: '8px 12px', borderRadius: '6px', border: 'none',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: active === 'saved' ? 700 : 500,
                color: active === 'saved' ? '#08b54d' : '#525252',
                background: active === 'saved' ? '#e8f8ee' : 'transparent',
                display: 'flex', alignItems: 'center', gap: '10px',
                outline: 'none',
              }}
            >
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: active === 'saved' ? '#08b54d' : '#cacaca',
                flexShrink: 0,
              }} />
              Saved
              <span style={{
                marginLeft: 'auto', fontSize: '11px', fontWeight: 700,
                background: '#e8f8ee', color: '#08b54d',
                padding: '2px 8px', borderRadius: '50px',
                border: '1px solid rgba(8, 181, 77, 0.2)'
              }}>{savedCount}</span>
            </button>
          </>
        )}
      </div>

      {/* Explore More section */}
      <div style={{ padding: '0 12px', marginTop: '16px' }}>
        <div style={{ height: '1px', background: '#e0e1e1', marginBottom: '12px' }} />
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 4px', marginBottom: '8px' }}>
          Explore Modules
        </div>
        {([
          { href: '/daily', label: "Today's Pick", icon: IconDaily, badge: 'DAILY' },
          { href: '/tricks', label: 'Tricks & Tips', icon: IconTricks },
          { href: '/books', label: 'Books', icon: IconBooks },
          { href: '/documentaries', label: 'Documentaries', icon: IconFilm },
          { href: '/movies', label: 'Movies & Cinema', icon: IconFilm, badge: 'NEW' },
          { href: '/medical', label: 'Medical & Science', icon: IconMedical, badge: 'NEW' },
          { href: '/podcasts', label: 'Podcasts', icon: IconPodcast },
          { href: '/courses', label: 'Courses', icon: IconCourses },
          { href: '/rabbit-holes', label: 'Rabbit Holes', icon: IconRabbitHole, badge: 'NEW' },
          { href: '/mental-models', label: 'Mental Models', icon: IconMentalModel, badge: 'NEW' },
        ] as {href:string;label:string;icon:React.ComponentType<{size?:number;color?:string}>;badge?:string}[]).map(item => {
          const IconComp = item.icon
          return (
            <Link key={item.href} href={item.href} style={{
              padding: '8px 10px', borderRadius: '6px',
              color: '#383838', display: 'flex', alignItems: 'center', gap: '10px',
              textDecoration: 'none', fontSize: '12.5px', fontWeight: 600, marginBottom: '2px',
              transition: 'all 0.15s ease'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#666666' }}>
                <IconComp size={15} color="#525252" />
              </span>
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: 'auto', fontSize: '9px', fontWeight: 700,
                  background: item.badge === 'DAILY' ? '#ffc107' : '#08b54d',
                  color: item.badge === 'DAILY' ? '#141414' : '#ffffff',
                  padding: '2px 6px', borderRadius: '4px'
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '0 20px', marginTop: 'auto', paddingTop: '20px' }}>
        <div style={{ fontSize: '11px', color: '#666666', marginBottom: '4px' }}>
          {total} sites · FOSS United design
        </div>
        <a
          href="https://github.com/pranavvikraman25/tabbreaker"
          target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '11px', color: '#08b54d', textDecoration: 'none', fontWeight: 700 }}
        >
          Open source ↗
        </a>
      </div>
    </aside>
  )
}
