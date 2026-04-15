'use client'
import { useState, useMemo } from 'react'
import tricks from '../../data/tricks.json'
import Link from 'next/link'

const allDomains = ['All', ...Array.from(new Set(tricks.map(t => t.domain)))]

export default function TricksPage() {
  const [search, setSearch] = useState('')
  const [domain, setDomain] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = useMemo(() => {
    let list = tricks
    if (domain !== 'All') list = list.filter(t => t.domain === domain)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.domain.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.includes(q))
      )
    }
    return list
  }, [search, domain])

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* Top nav bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        padding: '12px 24px', display: 'flex', alignItems: 'center',
        gap: '16px', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700 }}>
            <span style={{ color: '#2d8a4e' }}>The </span>
            <span style={{ color: '#c8970a' }}>Unscroll</span>
          </span>
        </Link>
        <span style={{ color: '#d1d5db', fontSize: '18px' }}>/</span>
        <span style={{ fontWeight: 600, fontSize: '14px', color: '#374151' }}>Tricks & Tips</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <a
            href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '12px', padding: '6px 14px', borderRadius: '7px',
              border: '1px solid #2d8a4e', color: '#2d8a4e',
              textDecoration: 'none', fontWeight: 600,
            }}
          >
            + Submit a trick
          </a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#fff', padding: '36px 24px 28px', borderBottom: '1px solid #f3f4f6', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
          {tricks.length} tricks and counting
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#2d8a4e' }}>Tricks</span> the internet{' '}
          <span style={{ color: '#c8970a' }}>never taught you</span> ✦
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, maxWidth: '520px', lineHeight: 1.7 }}>
          Hidden shortcuts, browser hacks, and surprisingly powerful tricks — each one takes 10 seconds to learn
          and saves you hours over a lifetime.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 24px' }}>

        {/* Search + domain filter */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search tricks... e.g. excel, chrome, shortcut"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: '200px', padding: '9px 14px',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              fontSize: '13px', background: '#fff', outline: 'none', color: '#111',
            }}
          />
        </div>

        {/* Domain pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {allDomains.map(d => (
            <button key={d} onClick={() => setDomain(d)} style={{
              padding: '5px 14px', borderRadius: '20px', fontSize: '12px',
              fontWeight: domain === d ? 600 : 400,
              background: domain === d ? '#2d8a4e' : '#fff',
              color: domain === d ? '#fff' : '#6b7280',
              border: `1px solid ${domain === d ? '#2d8a4e' : '#e5e7eb'}`,
              cursor: 'pointer', transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}>
              {d}
            </button>
          ))}
        </div>

        {/* Count */}
        <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>
          Showing {filtered.length} of {tricks.length} tricks
        </div>

        {/* Tricks list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(trick => {
            const isOpen = expanded === trick.id
            return (
              <div
                key={trick.id}
                style={{
                  background: '#fff',
                  border: `1px solid ${isOpen ? trick.domainColor + '50' : '#e5e7eb'}`,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                  boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.07)' : 'none',
                }}
              >
                {/* Header — always visible */}
                <button
                  onClick={() => setExpanded(isOpen ? null : trick.id)}
                  style={{
                    width: '100%', padding: '16px 20px',
                    display: 'flex', alignItems: 'center', gap: '14px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  {/* Domain badge */}
                  <span style={{
                    background: trick.domainColor + '18',
                    color: trick.domainColor,
                    fontSize: '10px', fontWeight: 700,
                    padding: '3px 10px', borderRadius: '20px',
                    whiteSpace: 'nowrap', flexShrink: 0,
                    border: `1px solid ${trick.domainColor}30`,
                  }}>
                    {trick.domain}
                  </span>

                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#111', flex: 1, lineHeight: 1.3 }}>
                    {trick.title}
                  </span>

                  <span style={{
                    fontSize: '18px', color: '#9ca3af', flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                    lineHeight: 1,
                  }}>
                    ⌄
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f3f4f6' }}>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '14px 0 16px', lineHeight: 1.6 }}>
                      {trick.description}
                    </p>

                    {/* Steps */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                        Steps
                      </div>
                      <ol style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
                        {trick.steps.map((step, i) => (
                          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <span style={{
                              width: '22px', height: '22px', flexShrink: 0,
                              background: trick.domainColor + '18',
                              color: trick.domainColor,
                              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '11px', fontWeight: 700,
                            }}>
                              {i + 1}
                            </span>
                            <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5, paddingTop: '2px' }}>
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Result */}
                    <div style={{
                      background: '#f0fdf4', border: '1px solid #bbf7d0',
                      borderRadius: '8px', padding: '12px 14px',
                      fontSize: '13px', color: '#166534', lineHeight: 1.5,
                    }}>
                      <span style={{ fontWeight: 600 }}>Result: </span>
                      {trick.result}
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {trick.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '11px', padding: '2px 8px', borderRadius: '12px',
                          background: '#f3f4f6', color: '#6b7280',
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
            <div style={{ fontSize: '14px' }}>No tricks match. Try a different keyword!</div>
          </div>
        )}

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px' }}>
            Know a trick worth sharing? Submit it as a GitHub issue.
          </p>
          <a
            href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '13px', fontWeight: 600, color: '#2d8a4e',
              textDecoration: 'none',
            }}
          >
            + Submit a trick on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}
