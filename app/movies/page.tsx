'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import movies from '../../data/movies.json'
import moments from '../../data/moviemoments.json'
import watchmovies from '../../data/watchmovies.json'
import doomsdayData from '../../data/doomsday.json'
import { IconFilm, IconGlobe, IconStar } from '../../components/Icons'

type TabType = 'watch' | 'doomsday' | 'tools' | 'moments'

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('watch')
  const [search, setSearch] = useState('')
  const [doomsdayCategory, setDoomsdayCategory] = useState<string>('All')
  const [watchedItems, setWatchedItems] = useState<number[]>([])
  const [copySuccess, setCopySuccess] = useState(false)
  const [showTextView, setShowTextView] = useState(false)

  // Load watched doomsday items from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('unscroll-doomsday-watched')
      if (stored) setWatchedItems(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('unscroll-doomsday-watched', JSON.stringify(watchedItems))
    } catch { /* ignore */ }
  }, [watchedItems])

  const toggleWatched = (id: number) => {
    setWatchedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  // Filtered Watch Movies
  const filteredWatch = useMemo(() => {
    if (activeTab !== 'watch') return []
    if (!search.trim()) return watchmovies
    const q = search.toLowerCase()
    return watchmovies.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tag.toLowerCase().includes(q)
    )
  }, [activeTab, search])

  // Doomsday categories
  const doomsdaySections = useMemo(() => {
    return ['All', ...Array.from(new Set(doomsdayData.watchlist.map(item => item.section)))]
  }, [])

  // Filtered Doomsday Watchlist
  const filteredDoomsday = useMemo(() => {
    if (activeTab !== 'doomsday') return []
    let list = doomsdayData.watchlist
    if (doomsdayCategory !== 'All') {
      list = list.filter(item => item.section === doomsdayCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.id.toString() === q
      )
    }
    return list
  }, [activeTab, doomsdayCategory, search])

  // Filtered Discovery Tools
  const filteredTools = useMemo(() => {
    if (activeTab !== 'tools') return []
    if (!search.trim()) return movies
    const q = search.toLowerCase()
    return movies.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    )
  }, [activeTab, search])

  // Filtered Cinema Moments
  const filteredMoments = useMemo(() => {
    if (activeTab !== 'moments') return []
    if (!search.trim()) return moments
    const q = search.toLowerCase()
    return moments.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.movie.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.significance.toLowerCase().includes(q) ||
      m.year.includes(q)
    )
  }, [activeTab, search])

  // Formatted Text List for copying
  const formattedTextWatchlist = useMemo(() => {
    const sections = Array.from(new Set(doomsdayData.watchlist.map(item => item.section)))
    let text = `AVENGERS: DOOMSDAY — COMPLETE WATCHLIST\n`
    sections.forEach(sec => {
      text += `\n${sec}\n`
      const items = doomsdayData.watchlist.filter(i => i.section === sec)
      items.forEach(item => {
        text += `${item.id}. ${item.title}\n`
      })
    })
    return text.trim()
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedTextWatchlist)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2500)
  }

  const doomsdayProgress = Math.round((watchedItems.length / doomsdayData.watchlist.length) * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'Inter, sans-serif', color: '#141414' }}>
      {/* Top Navbar */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e0e1e1', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: '16px', fontWeight: 800 }}>
          <span style={{ color: '#08b54d' }}>The </span><span style={{ color: '#141414' }}>Unscroll</span>
        </Link>
        <span style={{ color: '#cacaca' }}>/</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '14px', color: '#c54444' }}>
          <IconFilm size={16} color="#c54444" />
          <span>Movies & Cinema</span>
        </div>
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder={
            activeTab === 'watch' ? "Search streaming sites..." :
            activeTab === 'doomsday' ? "Search MCU titles or phases..." :
            activeTab === 'tools' ? "Search discovery tools..." : "Search moments..."
          } 
          style={{ marginLeft: 'auto', padding: '9px 16px', border: '1px solid #e0e1e1', borderRadius: '6px', fontSize: '13px', outline: 'none', width: '260px', background: '#fafafa' }} 
          onFocus={e => e.currentTarget.style.borderColor = '#08b54d'}
          onBlur={e => e.currentTarget.style.borderColor = '#e0e1e1'}
        />
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 28px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 700, color: '#08b54d', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            FOSS Cinema Directory
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', color: '#141414', letterSpacing: '-0.5px' }}>
            Movies, Streaming & <span style={{ color: '#c54444' }}>Road to Doomsday</span>
          </h1>
          <p style={{ fontSize: '14.5px', color: '#525252', margin: 0, lineHeight: 1.6 }}>
            Explore global movie streaming sites, track the complete 66-item MCU Doomsday Watchlist, discover interactive film tools, and relive 20 iconic moments in cinema history.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e0e1e1', paddingBottom: '1px', marginBottom: '32px', overflowX: 'auto' }}>
          <button 
            onClick={() => { setActiveTab('watch'); setSearch(''); }}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'watch' ? '3px solid #c54444' : '3px solid transparent',
              color: activeTab === 'watch' ? '#c54444' : '#525252',
              fontWeight: activeTab === 'watch' ? 800 : 600,
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <IconFilm size={16} color={activeTab === 'watch' ? '#c54444' : '#525252'} />
            Watch Movies ({watchmovies.length})
          </button>
          
          <button 
            onClick={() => { setActiveTab('doomsday'); setSearch(''); }}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'doomsday' ? '3px solid #08b54d' : '3px solid transparent',
              color: activeTab === 'doomsday' ? '#08b54d' : '#525252',
              fontWeight: activeTab === 'doomsday' ? 800 : 600,
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <IconStar size={16} color={activeTab === 'doomsday' ? '#08b54d' : '#525252'} />
            Road to Doomsday ({doomsdayData.watchlist.length})
          </button>

          <button 
            onClick={() => { setActiveTab('tools'); setSearch(''); }}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'tools' ? '3px solid #006ccc' : '3px solid transparent',
              color: activeTab === 'tools' ? '#006ccc' : '#525252',
              fontWeight: activeTab === 'tools' ? 800 : 600,
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <IconGlobe size={16} color={activeTab === 'tools' ? '#006ccc' : '#525252'} />
            Discovery Tools ({movies.length})
          </button>

          <button 
            onClick={() => { setActiveTab('moments'); setSearch(''); }}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'moments' ? '3px solid #ffc107' : '3px solid transparent',
              color: activeTab === 'moments' ? '#141414' : '#525252',
              fontWeight: activeTab === 'moments' ? 800 : 600,
              fontSize: '14px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease'
            }}
          >
            Cinema Moments ({moments.length})
          </button>
        </div>

        {/* TAB 1: WATCH MOVIES */}
        {activeTab === 'watch' && (
          <div>
            <div style={{ marginBottom: '24px', padding: '16px 20px', background: '#fdf2f2', border: '1px solid rgba(197, 68, 68, 0.2)', borderRadius: '8px', color: '#c54444', fontSize: '14px', lineHeight: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <strong style={{ fontWeight: 800 }}>Watch Movies Category:</strong> Direct access to premier movie & series streaming portals to stream films worldwide.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '22px' }}>
              {filteredWatch.map(site => (
                <a 
                  key={site.id} 
                  href={site.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    textDecoration: 'none', 
                    background: '#ffffff', 
                    border: '1px solid #e0e1e1', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    transition: 'all 0.2s ease' 
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(10, 10, 10, 0.08)'; 
                    e.currentTarget.style.transform = 'translateY(-2px)'; 
                    e.currentTarget.style.borderColor = '#c54444';
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.boxShadow = 'none'; 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.borderColor = '#e0e1e1';
                  }}
                >
                  <div style={{ width: '100%', height: '150px', background: '#141414', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={site.screenshot} 
                      alt={site.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#141414', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px' }}>
                      {site.tag}
                    </div>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#141414', margin: '0 0 8px 0' }}>
                      {site.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.6, margin: 0, flex: 1 }}>
                      {site.description}
                    </p>
                  </div>

                  <div style={{ padding: '12px 20px', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
                    <span style={{ fontSize: '13px', color: '#c54444', fontWeight: 700 }}>Stream Now ↗</span>
                    <span style={{ fontSize: '11px', color: '#666666' }}>{site.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                  </div>
                </a>
              ))}
              {filteredWatch.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#666666' }}>
                  No streaming sites match your search.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ROAD TO DOOMSDAY */}
        {activeTab === 'doomsday' && (
          <div>
            {/* Road to Doomsday Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #141414 0%, #171717 100%)',
              borderRadius: '16px',
              padding: '32px',
              color: '#ffffff',
              marginBottom: '32px',
              boxShadow: '0 12px 32px rgba(10, 10, 10, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #383838'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(8, 181, 77, 0.2)', color: '#08b54d', padding: '4px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', border: '1px solid rgba(8, 181, 77, 0.3)' }}>
                    Official MCU Doomsday Hub
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 12px 0', color: '#ffffff', letterSpacing: '-0.5px' }}>
                    {doomsdayData.site.name}
                  </h2>
                  <p style={{ fontSize: '14.5px', color: '#e0e1e1', lineHeight: 1.6, margin: '0 0 20px 0', maxWidth: '640px' }}>
                    {doomsdayData.site.description} Watch all 66 entries to fully prepare for Avengers: Doomsday.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a 
                      href={doomsdayData.site.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#08b54d',
                        color: '#ffffff',
                        padding: '12px 22px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 800,
                        fontSize: '14px',
                        transition: 'all 0.15s ease',
                        boxShadow: '0 4px 14px rgba(8, 181, 77, 0.3)'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#06963f')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#08b54d')}
                    >
                      Visit Roadtodoomsday.com ↗
                    </a>
                    
                    <button
                      onClick={copyToClipboard}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#ffffff',
                        padding: '12px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {copySuccess ? 'Copied Watchlist!' : 'Copy Full Text Watchlist'}
                    </button>

                    <button
                      onClick={() => setShowTextView(!showTextView)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#e0e1e1',
                        padding: '12px 18px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '13px',
                        fontFamily: 'inherit'
                      }}
                    >
                      {showTextView ? 'Hide Raw Text' : 'View Raw Text Format'}
                    </button>
                  </div>
                </div>

                {/* Progress Circle / Box */}
                <div style={{
                  background: '#0a0a0a',
                  border: '1px solid #383838',
                  borderRadius: '12px',
                  padding: '24px 28px',
                  textAlign: 'center',
                  minWidth: '170px'
                }}>
                  <div style={{ fontSize: '34px', fontWeight: 900, color: '#ffc107', lineHeight: 1 }}>
                    {doomsdayProgress}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#e0e1e1', marginTop: '6px', fontWeight: 600 }}>
                    {watchedItems.length} of 66 Watched
                  </div>
                  <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
                    <div style={{ width: `${doomsdayProgress}%`, background: '#ffc107', height: '100%', transition: 'width 0.3s' }} />
                  </div>
                </div>
              </div>

              {/* Raw Text Output Box */}
              {showTextView && (
                <div style={{ marginTop: '24px', background: '#0a0a0a', padding: '20px', borderRadius: '8px', border: '1px solid #383838', overflowX: 'auto' }}>
                  <div style={{ fontSize: '11px', color: '#08b54d', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>
                    Plain Text Watchlist (Copyable)
                  </div>
                  <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', color: '#e0e1e1', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {formattedTextWatchlist}
                  </pre>
                </div>
              )}
            </div>

            {/* Section Filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {doomsdaySections.map(sec => (
                <button
                  key={sec}
                  onClick={() => setDoomsdayCategory(sec)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '50px',
                    border: `1px solid ${doomsdayCategory === sec ? '#08b54d' : '#e0e1e1'}`,
                    background: doomsdayCategory === sec ? '#08b54d' : '#ffffff',
                    color: doomsdayCategory === sec ? '#ffffff' : '#525252',
                    fontWeight: doomsdayCategory === sec ? 700 : 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {sec} {sec === 'All' ? `(${doomsdayData.watchlist.length})` : ''}
                </button>
              ))}
            </div>

            {/* Grid of MCU Watchlist items */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '14px' }}>
              {filteredDoomsday.map(item => {
                const isWatched = watchedItems.includes(item.id)
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleWatched(item.id)}
                    style={{
                      background: isWatched ? '#e8f8ee' : '#ffffff',
                      border: `1px solid ${isWatched ? 'rgba(8, 181, 77, 0.3)' : '#e0e1e1'}`,
                      borderRadius: '10px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      userSelect: 'none'
                    }}
                  >
                    {/* Checkbox */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      border: `2px solid ${isWatched ? '#08b54d' : '#e0e1e1'}`,
                      background: isWatched ? '#08b54d' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 900,
                      flexShrink: 0
                    }}>
                      {isWatched && '✓'}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#08b54d' }}>
                          #{item.id}
                        </span>
                        <span style={{ fontSize: '10px', fontWeight: 700, background: 'rgba(8, 181, 77, 0.1)', color: '#08b54d', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                          {item.section}
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: isWatched ? '#08b54d' : '#141414', textDecoration: isWatched ? 'line-through' : 'none' }}>
                        {item.title}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {filteredDoomsday.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#666666' }}>
                No MCU titles match your search.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DISCOVERY TOOLS */}
        {activeTab === 'tools' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '22px' }}>
            {filteredTools.map(tool => (
              <a 
                key={tool.id} 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  textDecoration: 'none', 
                  background: '#ffffff', 
                  border: '1px solid #e0e1e1', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  transition: 'all 0.2s ease' 
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.boxShadow = '0 10px 24px -4px rgba(10, 10, 10, 0.08)'; 
                  e.currentTarget.style.transform = 'translateY(-2px)'; 
                  e.currentTarget.style.borderColor = '#006ccc';
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.boxShadow = 'none'; 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.borderColor = '#e0e1e1';
                }}
              >
                <div style={{ width: '100%', height: '145px', background: '#f0f0f0', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={tool.screenshot} 
                    alt={tool.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: '#eef6fc', color: '#006ccc', padding: '3px 10px', borderRadius: '50px', border: '1px solid rgba(0, 108, 204, 0.2)' }}>
                      {tool.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#141414', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                    {tool.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.6, margin: 0, flex: 1 }}>
                    {tool.description}
                  </p>
                </div>

                <div style={{ padding: '12px 18px', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
                  <span style={{ fontSize: '13px', color: '#006ccc', fontWeight: 700 }}>Visit site ↗</span>
                  <span style={{ fontSize: '11px', color: '#666666' }}>{tool.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                </div>
              </a>
            ))}
            {filteredTools.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#666666' }}>
                No tools match your search.
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CINEMA MOMENTS */}
        {activeTab === 'moments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {filteredMoments.map((moment) => (
              <div 
                key={moment.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e0e1e1',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  gap: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '58px',
                  height: '58px',
                  background: '#fff7d4',
                  color: '#141414',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 193, 7, 0.4)',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 800 }}>#{moment.id}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#08b54d' }}>{moment.year}</span>
                    <span style={{ color: '#cacaca', fontSize: '12px' }}>•</span>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#525252', fontStyle: 'italic' }}>{moment.movie}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#141414', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                    {moment.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#383838', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                    {moment.description}
                  </p>
                  
                  <div style={{ 
                    background: '#fafafa', 
                    borderLeft: '3px solid #08b54d', 
                    padding: '10px 16px', 
                    borderRadius: '0 8px 8px 0',
                    fontSize: '13px',
                    color: '#525252',
                    lineHeight: 1.5
                  }}>
                    <strong style={{ color: '#141414', fontWeight: 800 }}>Why it matters:</strong> {moment.significance}
                  </div>
                </div>
              </div>
            ))}
            {filteredMoments.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#666666' }}>
                No cinematic moments match your search.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
