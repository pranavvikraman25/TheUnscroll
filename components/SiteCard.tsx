'use client'
import { useState } from 'react'

const categoryConfig: Record<string, { label: string; bg: string; color: string }> = {
    travel: { label: 'Travel', bg: '#f0f9ff', color: '#0ea5e9' },
    creativity: { label: 'Creativity', bg: '#fdf2f8', color: '#ec4899' },
    science: { label: 'Science', bg: '#f5f3ff', color: '#8b5cf6' },
    games: { label: 'Games', bg: '#fff7ed', color: '#f97316' },
    chill: { label: 'Chill', bg: '#f0fdfa', color: '#14b8a6' },
    learning: { label: 'Learning', bg: '#f0fdf4', color: '#22c55e' },
    tools: { label: 'Tools', bg: '#f8fafc', color: '#64748b' },
}

const fallbackLetter: Record<string, string> = {
    travel: 'T', creativity: 'C', science: 'S',
    games: 'G', chill: '~', learning: 'L', tools: 'U',
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
    const cat = categoryConfig[site.category] || categoryConfig.tools

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px',
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.10)' : 'none',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
                borderColor: hovered ? cat.color + '60' : '#e5e7eb',
            }}
        >
            {/* Thumbnail */}
            <div style={{
                width: '100%', height: '130px', background: cat.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '48px', position: 'relative', overflow: 'hidden',
            }}>
                {/* Thin top color bar */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: cat.color, opacity: 0.7,
                }} />

                {(!site.screenshot || imgError) ? (
                    <span style={{
                        fontSize: '40px', fontWeight: 800, color: cat.color,
                        opacity: 0.25, userSelect: 'none', letterSpacing: '-2px',
                    }}>
                        {fallbackLetter[site.category] || '?'}
                    </span>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={site.screenshot} alt={site.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={() => setImgError(true)}
                    />
                )}

                <button
                    onClick={(e) => { e.stopPropagation(); onToggleSave(site.id) }}
                    style={{
                        position: 'absolute', top: '8px', right: '8px',
                        background: isSaved ? '#2d8a4e' : 'rgba(255,255,255,0.9)',
                        border: '1px solid #e5e7eb', borderRadius: '50%',
                        width: '30px', height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', cursor: 'pointer', color: isSaved ? '#fff' : '#666',
                    }}
                >
                    {isSaved ? '✓' : '♡'}
                </button>
            </div>

            {/* Body */}
            <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', gap: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: '#111', lineHeight: 1.3 }}>{site.name}</span>
                    <span style={{
                        fontSize: '10px', fontWeight: 600, padding: '2px 8px',
                        borderRadius: '20px', background: cat.bg, color: cat.color,
                        whiteSpace: 'nowrap', flexShrink: 0,
                    }}>{cat.label}</span>
                </div>
                <a
                    href={site.url} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize: '11px', color: '#2d8a4e', textDecoration: 'none', display: 'block', marginBottom: '6px' }}
                >
                    {site.url.replace('https://', '').replace('http://', '')} ↗
                </a>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                    {site.description}
                </p>
            </div>
        </div>
    )
}
