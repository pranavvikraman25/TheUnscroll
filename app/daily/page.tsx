'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { getDailyPick, getRandomPick, getTodayFormatted, DailyPick } from '../../lib/dailyPick'

export default function DailyPickPage() {
  const initialPick = useMemo(() => getDailyPick(), [])
  const [pick, setPick] = useState<DailyPick>(initialPick)
  const today = useMemo(() => getTodayFormatted(), [])
  const [wheelRotation, setWheelRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return
    setIsSpinning(true)
    
    // Animate the wheel
    const newRotation = wheelRotation + (360 * 5 + Math.random() * 360)
    setWheelRotation(newRotation)
    
    // Change the pick halfway through the spin
    setTimeout(() => {
      setPick(getRandomPick())
    }, 500)

    setTimeout(() => setIsSpinning(false), 1000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${pick.color}08 0%, #f9fafb 60%)`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      transition: 'background 0.5s ease',
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
        
        {/* Spin Wheel Area */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '100px', height: '100px', margin: '0 auto 16px',
            position: 'relative', borderRadius: '50%',
            background: '#fff', border: '2px solid #e5e7eb',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: isSpinning ? 'default' : 'pointer',
          }} onClick={spinWheel}>
            <div style={{
              fontSize: '42px', 
              transition: isSpinning ? 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
              transform: `rotate(${wheelRotation}deg)`,
            }}>
              🎲
            </div>
          </div>
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            style={{
              padding: '8px 16px',
              background: '#fff',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '20px',
              fontWeight: 600,
              fontSize: '13px',
              cursor: isSpinning ? 'not-allowed' : 'pointer',
              opacity: isSpinning ? 0.7 : 1,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!isSpinning) e.currentTarget.style.background = '#f9fafb' }}
            onMouseLeave={e => { if (!isSpinning) e.currentTarget.style.background = '#fff' }}
          >
            Spin for a random pick
          </button>
        </div>

        {/* Date badge */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#fff', border: '1px solid #e5e7eb',
            borderRadius: '20px', padding: '5px 14px',
            fontSize: '12px', color: '#6b7280', fontWeight: 500,
          }}>
            <span>📅</span> {today}
          </div>

          {/* Type label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: pick.color + '18',
            border: `1px solid ${pick.color}33`,
            borderRadius: '20px', padding: '5px 14px',
            fontSize: '12px', fontWeight: 700, color: pick.color,
          }}>
            <span>{pick.emoji}</span> {pick.label}
          </div>
        </div>

        {/* Main card */}
        <div style={{
          background: '#fff',
          border: `2px solid ${pick.color}33`,
          borderRadius: '20px',
          padding: '36px',
          marginBottom: '24px',
          boxShadow: `0 20px 60px ${pick.color}18`,
          transition: 'all 0.5s ease',
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
          Click the dice to discover something completely different. ✨
        </div>
      </div>
    </div>
  )
}
