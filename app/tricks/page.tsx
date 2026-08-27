'use client'
import { useState, useMemo } from 'react'
import tricks from '../../data/tricks.json'
import Link from 'next/link'
import { IconTricks, IconSearch } from '../../components/Icons'

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
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'Inter, sans-serif', color: '#141414' }}>

      {/* Top nav bar */}
      <div style={{
        background: '#ffffff', borderBottom: '1px solid #e0e1e1',
        padding: '14px 28px', display: 'flex', alignItems: 'center',
        gap: '12px', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#08b54d' }}>The </span>
          <span style={{ color: '#141414' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#cacaca' }}>/</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px', color: '#b45309' }}>
          <IconTricks size={16} color="#b45309" />
          <span>Tricks & Power Tips</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <a
            href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '12.5px', padding: '8px 16px', borderRadius: '6px',
              border: '1px solid #08b54d', color: '#08b54d',
              textDecoration: 'none', fontWeight: 700, background: '#ffffff'
            }}
          >
            + Submit a trick
          </a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#ffffff', padding: '40px 28px 30px', borderBottom: '1px solid #e0e1e1', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#08b54d', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
          {tricks.length} TRICKS & SHORTCUTS
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
          <span style={{ color: '#08b54d' }}>Power Tricks</span> to master your <span style={{ color: '#141414' }}>digital workflow</span>
        </h1>
        <p style={{ fontSize: '14.5px', color: '#525252', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Hidden shortcuts, browser hacks, and surprisingly powerful tricks — each one takes 10 seconds to learn and saves hours over a lifetime.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 28px' }}>

        {/* Search + domain filter */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search tricks... e.g. excel, chrome, shortcut"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: '220px', padding: '10px 16px',
              border: '1px solid #e0e1e1', borderRadius: '6px',
              fontSize: '13.5px', background: '#ffffff', outline: 'none', color: '#141414',
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#08b54d'}
            onBlur={e => e.currentTarget.style.borderColor = '#e0e1e1'}
          />
        </div>

        {/* Domain pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {allDomains.map(d => (
            <button key={d} onClick={() => setDomain(d)} style={{
              padding: '7px 16px', borderRadius: '50px', fontSize: '13px',
              fontWeight: domain === d ? 700 : 600,
              background: domain === d ? '#08b54d' : '#ffffff',
              color: domain === d ? '#ffffff' : '#525252',
              border: `1px solid ${domain === d ? '#08b54d' : '#e0e1e1'}`,
              cursor: 'pointer', transition: 'all 0.15s ease',
              fontFamily: 'inherit',
            }}>
              {d}
            </button>
          ))}
        </div>

        {/* Count */}
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#666666', marginBottom: '16px' }}>
          Showing {filtered.length} of {tricks.length} tricks
        </div>

        {/* Tricks list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(trick => {
            const isOpen = expanded === trick.id
            return (
              <div
                key={trick.id}
                style={{
                  background: '#ffffff',
                  border: `1px solid ${isOpen ? '#08b54d' : '#e0e1e1'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease',
                  boxShadow: isOpen ? '0 8px 24px rgba(10,10,10,0.06)' : 'none',
                }}
              >
                {/* Header — always visible */}
                <button
                  onClick={() => setExpanded(isOpen ? null : trick.id)}
                  style={{
                    width: '100%', padding: '18px 20px',
                    display: 'flex', alignItems: 'center', gap: '14px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  {/* Domain badge */}
                  <span style={{
                    background: trick.domainColor + '15',
                    color: trick.domainColor,
                    fontSize: '11px', fontWeight: 800,
                    padding: '4px 12px', borderRadius: '50px',
                    whiteSpace: 'nowrap', flexShrink: 0,
                    border: `1px solid ${trick.domainColor}30`,
                  }}>
                    {trick.domain}
                  </span>

                  <span style={{ fontWeight: 800, fontSize: '15.5px', color: '#141414', flex: 1, lineHeight: 1.3 }}>
                    {trick.title}
                  </span>

                  <span style={{
                    fontSize: '18px', color: '#666666', flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                    lineHeight: 1,
                    fontWeight: 700,
                  }}>
                    ⌄
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f0f0f0' }}>
                    <p style={{ fontSize: '13.5px', color: '#525252', margin: '16px 0 18px', lineHeight: 1.6 }}>
                      {trick.description}
                    </p>

                    {/* Steps */}
                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#08b54d', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                        STEPS TO EXECUTE
                      </div>
                      <ol style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
                        {trick.steps.map((step, i) => (
                          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <span style={{
                              width: '24px', height: '24px', flexShrink: 0,
                              background: '#e8f8ee',
                              color: '#08b54d',
                              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '11.5px', fontWeight: 800,
                            }}>
                              {i + 1}
                            </span>
                            <span style={{ fontSize: '13.5px', color: '#141414', lineHeight: 1.5, paddingTop: '2px' }}>
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Result */}
                    <div style={{
                      background: '#e8f8ee', border: '1px solid rgba(8, 181, 77, 0.3)',
                      borderRadius: '8px', padding: '12px 16px',
                      fontSize: '13px', color: '#08b54d', lineHeight: 1.5, fontWeight: 600,
                    }}>
                      <strong style={{ fontWeight: 800, color: '#141414' }}>Result: </strong>
                      {trick.result}
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                      {trick.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '11px', padding: '3px 10px', borderRadius: '50px',
                          background: '#fafafa', border: '1px solid #e0e1e1', color: '#666666', fontWeight: 600
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
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#666666' }}>
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
              <IconSearch size={32} color="#666666" />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>No tricks match. Try a different keyword!</div>
          </div>
        )}

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e0e1e1', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#666666', marginBottom: '12px' }}>
            Know a trick worth sharing? Submit it as a GitHub issue.
          </p>
          <a
            href="https://github.com/pranavvikraman25/tabbreaker/issues/new"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '13px', fontWeight: 700, color: '#08b54d',
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
