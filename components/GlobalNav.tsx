'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sections = [
  { href: '/', label: 'All Sites', emoji: '🌐', desc: '152+ curated websites' },
  { href: '/daily', label: "Today's Pick", emoji: '☀️', desc: 'Changes every day' },
  { href: '/tricks', label: 'Tricks & Tips', emoji: '💡', desc: '42 power tricks' },
  { href: '/books', label: 'Books', emoji: '📖', desc: '15 free classics' },
  { href: '/documentaries', label: 'Documentaries', emoji: '🎬', desc: '10 free on YouTube' },
  { href: '/podcasts', label: 'Podcasts', emoji: '🎙️', desc: '10 best episodes' },
  { href: '/courses', label: 'Courses', emoji: '🎓', desc: 'MIT, Harvard, Yale' },
  { href: '/rabbit-holes', label: 'Rabbit Holes', emoji: '🕳️', desc: '8 Wikipedia chains' },
  { href: '/mental-models', label: 'Mental Models', emoji: '🧠', desc: '10 thinking frameworks' },
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
    padding: '10px 12px', borderRadius: '10px',
    textDecoration: 'none', marginBottom: '2px',
    background: isActive ? '#f0fdf4' : 'transparent',
    border: isActive ? '1px solid #2d8a4e22' : '1px solid transparent',
    transition: 'background 0.12s',
  })

  return (
    <>
      {/* ── LEFT PULL TAB ── */}
      <button
        onClick={() => setDrawerOpen(true)}
        title="Open navigation"
        style={{
          position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)',
          zIndex: 8000, width: '22px', height: '80px',
          background: '#fff', border: '1px solid #e5e7eb', borderLeft: 'none',
          borderRadius: '0 10px 10px 0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '2px 0 12px rgba(0,0,0,0.07)', padding: 0,
        }}
      >
        <span style={{ fontSize: '15px', color: '#6b7280' }}>›</span>
      </button>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.28)', zIndex: 8001, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px',
        background: '#fff', borderRight: '1px solid #f0f0f0',
        boxShadow: '4px 0 28px rgba(0,0,0,0.12)', zIndex: 8002,
        transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.26s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#0f1117"/>
                <path d="M9 7 L9 19 Q9 25 16 25 Q23 25 23 19 L23 9" stroke="#2d8a4e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <path d="M16 25 Q23 25 23 19 L23 9" stroke="#c8970a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <path d="M23 9 Q23 5 26 6 Q28.5 7.5 26.5 10" stroke="#c8970a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.4px' }}>
                <span style={{ color: '#2d8a4e' }}>The </span>
                <span style={{ color: '#c8970a' }}>Unscroll</span>
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              style={{ border: 'none', background: '#f3f4f6', borderRadius: '8px', width: '30px', height: '30px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >‹</button>
          </div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Jump to any section instantly</div>
        </div>

        {/* Links */}
        <div style={{ padding: '12px 10px', flex: 1 }}>
          {sections.map(s => {
            const isActive = pathname === s.href
            return (
              <Link key={s.href} href={s.href} onClick={() => setDrawerOpen(false)} style={navLinkStyle(isActive)}>
                <span style={{ fontSize: '20px', width: '28px', textAlign: 'center', flexShrink: 0 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontWeight: isActive ? 600 : 400, fontSize: '13px', color: isActive ? '#2d8a4e' : '#374151' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.desc}</div>
                </div>
                {isActive && <span style={{ marginLeft: 'auto', width: '7px', height: '7px', borderRadius: '50%', background: '#2d8a4e', flexShrink: 0 }} />}
              </Link>
            )
          })}
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid #f3f4f6', fontSize: '11px', color: '#c0c4cc' }}>
          The Unscroll · 9 sections · always growing
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
                position: 'absolute', bottom: '62px', right: 0,
                background: '#fff', borderRadius: '16px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.16)',
                border: '1px solid #e5e7eb', padding: '8px', width: '195px',
                animation: 'fabFadeUp 0.15s ease',
              }}>
                <div style={{ padding: '4px 10px 8px', fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Navigate to</div>
                {sections.map(s => (
                  <Link key={s.href} href={s.href} onClick={() => setFabOpen(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '7px 10px', borderRadius: '8px',
                    textDecoration: 'none', color: pathname === s.href ? '#2d8a4e' : '#374151',
                    fontSize: '13px', fontWeight: pathname === s.href ? 600 : 400,
                    background: pathname === s.href ? '#f0fdf4' : 'transparent',
                  }}>
                    <span style={{ fontSize: '15px' }}>{s.emoji}</span>
                    <span>{s.label}</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* FAB circle */}
          <div
            onMouseDown={e => { startDrag(e.clientX, e.clientY); e.preventDefault() }}
            onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onClick={() => { if (!hasMoved.current) setFabOpen(o => !o) }}
            style={{
              width: '50px', height: '50px', borderRadius: '50%',
              background: fabOpen ? '#111' : 'linear-gradient(135deg, #2d8a4e 0%, #c8970a 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: dragging ? 'grabbing' : 'grab',
              boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
              userSelect: 'none', fontSize: '19px', color: '#fff',
              transition: 'background 0.2s',
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
