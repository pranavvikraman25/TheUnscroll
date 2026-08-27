'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { getDailyPick, getRandomPick, getTodayFormatted, DailyPick } from '../../lib/dailyPick'
import { IconDaily, IconSparkles } from '../../components/Icons'

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
      background: `#fafafa`,
      fontFamily: 'Inter, sans-serif',
      color: '#141414',
      transition: 'background 0.5s ease',
    }}>
      {/* Nav */}
      <nav style={{
        background: '#ffffff', borderBottom: '1px solid #e0e1e1',
        padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '12px',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#08b54d' }}>The </span><span style={{ color: '#141414' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#cacaca' }}>/</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px', color: '#08b54d' }}>
          <IconDaily size={16} color="#08b54d" />
          <span>Daily Featured Pick</span>
        </div>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>
        
        {/* Spin Wheel Area */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px', height: '80px', margin: '0 auto 16px',
            position: 'relative', borderRadius: '50%',
            background: '#ffffff', border: '2px solid #e0e1e1',
            boxShadow: '0 8px 24px rgba(10,10,10,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: isSpinning ? 'default' : 'pointer',
          }} onClick={spinWheel}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#08b54d',
              transition: isSpinning ? 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
              transform: `rotate(${wheelRotation}deg)`,
            }}>
              <IconSparkles size={36} color="#08b54d" />
            </div>
          </div>
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            style={{
              padding: '10px 20px',
              background: '#08b54d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: isSpinning ? 'not-allowed' : 'pointer',
              opacity: isSpinning ? 0.7 : 1,
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(8, 181, 77, 0.25)'
            }}
            onMouseEnter={e => { if (!isSpinning) e.currentTarget.style.background = '#06963f' }}
            onMouseLeave={e => { if (!isSpinning) e.currentTarget.style.background = '#08b54d' }}
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
            background: '#ffffff', border: '1px solid #e0e1e1',
            borderRadius: '50px', padding: '6px 16px',
            fontSize: '12px', color: '#525252', fontWeight: 600,
          }}>
            {today}
          </div>

          {/* Type label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: pick.color + '15',
            border: `1px solid ${pick.color}33`,
            borderRadius: '50px', padding: '6px 16px',
            fontSize: '12px', fontWeight: 800, color: pick.color,
          }}>
            {pick.label}
          </div>
        </div>

        {/* Main card */}
        <div style={{
          background: '#ffffff',
          border: `1px solid ${pick.color}`,
          borderRadius: '16px',
          padding: '36px',
          marginBottom: '24px',
          boxShadow: `0 12px 32px rgba(10, 10, 10, 0.08)`,
          transition: 'all 0.3s ease',
        }}>
          <h1 style={{
            fontSize: '28px', fontWeight: 900, color: '#141414',
            lineHeight: 1.2, marginBottom: '10px', letterSpacing: '-0.5px'
          }}>{pick.title}</h1>
          <div style={{
            fontSize: '13.5px', color: pick.color, fontWeight: 700,
            marginBottom: '18px',
          }}>{pick.subtitle}</div>
          <p style={{
            fontSize: '15px', color: '#525252', lineHeight: 1.7,
            marginBottom: '28px',
          }}>{pick.description}</p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={pick.url} target="_blank" rel="noopener noreferrer" style={{
              padding: '12px 28px', borderRadius: '6px',
              background: pick.color, color: '#ffffff',
              textDecoration: 'none', fontSize: '14px', fontWeight: 800,
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              Open Platform ↗
            </a>
            {pick.route && pick.route !== pick.url && (
              <Link href={pick.route} style={{
                padding: '12px 20px', borderRadius: '6px',
                background: '#ffffff', color: pick.color,
                textDecoration: 'none', fontSize: '13px', fontWeight: 700,
                border: `1px solid ${pick.color}`,
              }}>
                Browse all {pick.type === 'rabbit-hole' ? 'rabbit holes' : (pick.type === 'movie' || pick.type === 'movie-moment') ? 'movies' : pick.type + 's'} →
              </Link>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div style={{
          textAlign: 'center', fontSize: '12.5px', color: '#666666', lineHeight: 1.6,
        }}>
          Today's pick is drawn from <strong style={{ color: '#141414', fontWeight: 700 }}>280+ curated resources</strong> across 10 categories.<br />
          Click the spin button to discover something completely different.
        </div>
      </div>
    </div>
  )
}
