'use client'
import { useState } from 'react'

const categoryConfig: Record<string, { label: string; bg: string; color: string }> = {
    fun: { label: 'Fun', bg: '#fef9e7', color: '#c8970a' },
    knowledge: { label: 'Knowledge', bg: '#edf7f0', color: '#2d8a4e' },
    learning: { label: 'Learning', bg: '#eef3fe', color: '#3b5bdb' },
}

const categoryEmoji: Record<string, string> = {
    fun: '🎨', knowledge: '🌌', learning: '⚡',
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
    const cat = categoryConfig[site.category] || categoryConfig.fun

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: '#fff', border: '1px solid #e5e7eb', borderRadius: '14px',
                overflow: 'hidden', cursor: 'pointer',
                boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.10)' : 'none',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'box-shadow 0.2s, transform 0.2s',
            }}
        >
            {/* Thumbnail */}
            <div style={{
                width: '100%', height: '130px', background: cat.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '48px', position: 'relative',
            }}>
                {(!site.screenshot || imgError) ? (
                    <span>{categoryEmoji[site.category] || '🌐'}</span>
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px', color: '#111' }}>{site.name}</span>
                    <span style={{
                        fontSize: '10px', fontWeight: 600, padding: '2px 8px',
                        borderRadius: '20px', background: cat.bg, color: cat.color,
                    }}>{cat.label}</span>
                </div>
                <a
                    href={site.url} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontSize: '11px', color: '#2d8a4e', textDecoration: 'none', display: 'block', marginBottom: '6px' }}
                >
                    {site.url.replace('https://', '')} ↗
                </a>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
                    {site.description}
                </p>
            </div>
        </div>
    )
}
