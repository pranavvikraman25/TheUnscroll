'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconGlobe,
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

const sections = [
  { href: '/', label: 'All Sites', icon: IconGlobe, desc: '169+ curated websites' },
  { href: '/daily', label: "Today's Pick", icon: IconDaily, desc: 'Changes every day' },
  { href: '/tricks', label: 'Tricks & Tips', icon: IconTricks, desc: '42 power tricks' },
  { href: '/books', label: 'Books', icon: IconBooks, desc: '15 free classics' },
  { href: '/documentaries', label: 'Documentaries', icon: IconFilm, desc: '10 free on YouTube' },
  { href: '/movies', label: 'Movies & Cinema', icon: IconFilm, desc: '10 tools & Doomsday watchlist' },
  { href: '/medical', label: 'Medical & Science', icon: IconMedical, desc: 'Servier vector art & 3D anatomy' },
  { href: '/podcasts', label: 'Podcasts', icon: IconPodcast, desc: '10 best episodes' },
  { href: '/courses', label: 'Courses', icon: IconCourses, desc: 'MIT, Harvard, Yale' },
  { href: '/rabbit-holes', label: 'Rabbit Holes', icon: IconRabbitHole, desc: '8 Wikipedia chains' },
  { href: '/mental-models', label: 'Mental Models', icon: IconMentalModel, desc: '10 thinking frameworks' },
]

export default function GlobalNav() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [fabPos, setFabPos] = useState<{ x: number; y: number } | null>(null)
  const [fabOpen, setFabOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const hasMoved = useRef(false)

  useEffect(() => {
    setFabPos({ x: window.innerWidth - 76, y: window.innerHeight - 80 })
  }, [])

  const startDrag = useCallback((cx: number, cy: number) => {
    if (!fabPos) return
    hasMoved.current = false
    setDragging(true)
    dragOffset.current = { x: cx - fabPos.x, y: cy - fabPos.y }
  }, [fabPos])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging) return
      hasMoved.current = true
      setFabPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y })
    }
    const onTouch = (e: TouchEvent) => {
      if (!dragging) return
      hasMoved.current = true
      const t = e.touches[0]
      setFabPos({ x: t.clientX - dragOffset.current.x, y: t.clientY - dragOffset.current.y })
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouch, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging])

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '10px 12px', borderRadius: '8px',
    textDecoration: 'none', marginBottom: '2px',
    background: isActive ? '#e8f8ee' : 'transparent',
    border: isActive ? '1px solid rgba(8, 181, 77, 0.2)' : '1px solid transparent',
    transition: 'all 0.15s ease',
  })

  return (
    <>
      {/* ── LEFT PULL TAB ── */}
      <button
        onClick={() => setDrawerOpen(true)}
        title="Open navigation"
        style={{
          position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)',
          zIndex: 8000, width: '24px', height: '80px',
          background: '#ffffff', border: '1px solid #e0e1e1', borderLeft: 'none',
          borderRadius: '0 8px 8px 0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(10,10,10,0.08)', padding: 0,
        }}
      >
        <span style={{ fontSize: '16px', color: '#08b54d', fontWeight: 800 }}>›</span>
      </button>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.35)', zIndex: 8001, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '290px',
        background: '#ffffff', borderRight: '1px solid #e0e1e1',
        boxShadow: '0 12px 36px rgba(10,10,10,0.15)', zIndex: 8002,
        transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* Header */}
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid #e0e1e1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#141414"/>
                <path d="M9 7 L9 19 Q9 25 16 25 Q23 25 23 19 L23 9" stroke="#08b54d" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <path d="M16 25 Q23 25 23 19 L23 9" stroke="#ffc107" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <path d="M23 9 Q23 5 26 6 Q28.5 7.5 26.5 10" stroke="#ffc107" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                <span style={{ color: '#08b54d' }}>The </span>
                <span style={{ color: '#141414' }}>Unscroll</span>
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              style={{ border: 'none', background: '#f0f0f0', borderRadius: '6px', width: '30px', height: '30px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#141414', fontWeight: 700 }}
            >‹</button>
          </div>
          <div style={{ fontSize: '11px', color: '#666666', marginTop: '4px' }}>FOSS United design system</div>
        </div>

        {/* Links */}
        <div style={{ padding: '12px 10px', flex: 1 }}>
          {sections.map(s => {
            const isActive = pathname === s.href
            const IconComp = s.icon
            return (
              <Link key={s.href} href={s.href} onClick={() => setDrawerOpen(false)} style={navLinkStyle(isActive)}>
                <span style={{ width: '28px', display: 'flex', justifyContent: 'center', color: isActive ? '#08b54d' : '#525252', flexShrink: 0 }}>
                  <IconComp size={18} />
                </span>
                <div>
                  <div style={{ fontWeight: isActive ? 700 : 600, fontSize: '13px', color: isActive ? '#08b54d' : '#141414' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: '#666666' }}>{s.desc}</div>
                </div>
                {isActive && <span style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: '#08b54d', flexShrink: 0 }} />}
              </Link>
            )
          })}
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid #e0e1e1', fontSize: '11px', color: '#666666' }}>
          The Unscroll · 11 sections · FOSS Edition
        </div>
      </div>

      {/* ── FLOATING DRAGGABLE FAB ── */}
      {fabPos && (
        <div style={{ position: 'fixed', left: fabPos.x, top: fabPos.y, zIndex: 9000 }}>

          {/* FAB popup */}
          {fabOpen && !dragging && (
            <>
              <div onClick={() => setFabOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />
              <div style={{
                position: 'absolute', bottom: '64px', right: 0,
                background: '#ffffff', borderRadius: '12px',
                boxShadow: '0 12px 36px rgba(10,10,10,0.18)',
                border: '1px solid #e0e1e1', padding: '8px', width: '200px',
                animation: 'fabFadeUp 0.15s ease',
                fontFamily: 'Inter, sans-serif'
              }}>
                <div style={{ padding: '4px 10px 8px', fontSize: '10px', fontWeight: 700, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Navigate to</div>
                {sections.map(s => {
                  const IconComp = s.icon
                  return (
                    <Link key={s.href} href={s.href} onClick={() => setFabOpen(false)} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 10px', borderRadius: '6px',
                      textDecoration: 'none', color: pathname === s.href ? '#08b54d' : '#141414',
                      fontSize: '13px', fontWeight: pathname === s.href ? 700 : 600,
                      background: pathname === s.href ? '#e8f8ee' : 'transparent',
                    }}>
                      <IconComp size={16} color={pathname === s.href ? '#08b54d' : '#525252'} />
                      <span>{s.label}</span>
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          {/* FAB circle */}
          <div
            onMouseDown={e => { startDrag(e.clientX, e.clientY); e.preventDefault() }}
            onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onClick={() => { if (!hasMoved.current) setFabOpen(o => !o) }}
            style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: fabOpen ? '#141414' : 'linear-gradient(135deg, #08b54d 0%, #006ccc 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: dragging ? 'grabbing' : 'grab',
              boxShadow: '0 6px 24px rgba(8, 181, 77, 0.35)',
              userSelect: 'none', fontSize: '20px', color: '#ffffff',
              transition: 'background 0.2s, transform 0.15s ease',
            }}
          >
            {fabOpen ? '✕' : '⊞'}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fabFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
