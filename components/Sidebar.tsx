'use client'

const sectionGroups = [
    {
        label: 'Explore',
        categories: [
            { key: 'travel', label: 'Virtual Travel' },
        ],
    },
    {
        label: 'Create',
        categories: [
            { key: 'creativity', label: 'Creativity' },
        ],
    },
    {
        label: 'Discover',
        categories: [
            { key: 'science', label: 'Science & Data' },
        ],
    },
    {
        label: 'Play',
        categories: [
            { key: 'games', label: 'Games & Fun' },
        ],
    },
    {
        label: 'Unwind',
        categories: [
            { key: 'chill', label: 'Chill & Read' },
        ],
    },
    {
        label: 'Grow',
        categories: [
            { key: 'learning', label: 'Learning' },
        ],
    },
    {
        label: 'Use',
        categories: [
            { key: 'tools', label: 'Tools & Utils' },
        ],
    },
]

const catColors: Record<string, string> = {
    travel: '#0ea5e9',
    creativity: '#ec4899',
    science: '#8b5cf6',
    games: '#f97316',
    chill: '#14b8a6',
    learning: '#22c55e',
    tools: '#94a3b8',
}

export default function Sidebar({ active, onSelect, total, savedCount }: {
    active: string; onSelect: (k: string) => void; total: number; savedCount: number
}) {
    return (
        <aside style={{
            width: '200px',
            flexShrink: 0,
            background: '#fff',
            borderRight: '1px solid #e5e7eb',
            padding: '18px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
        }}>
            {/* Logo */}
            <div style={{ marginBottom: '20px', paddingLeft: '10px' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                    <span style={{ color: '#2d8a4e' }}>The </span>
                    <span style={{ color: '#c8970a' }}>Unscroll</span>
                </div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                    Your cure for endless scrolling ✦
                </div>
            </div>

            {/* All sites */}
            <button onClick={() => onSelect('all')} style={{
                padding: '8px 10px', borderRadius: '7px', fontSize: '13px',
                cursor: 'pointer', border: 'none', textAlign: 'left',
                fontWeight: active === 'all' ? 600 : 400,
                background: active === 'all' ? '#f0fdf4' : 'transparent',
                color: active === 'all' ? '#2d8a4e' : '#374151',
                marginBottom: '8px',
            }}>
                All sites
            </button>

            {/* Grouped categories */}
            {sectionGroups.map(group => (
                <div key={group.label} style={{ marginBottom: '4px' }}>
                    <div style={{
                        fontSize: '9px', fontWeight: 700, color: '#d1d5db',
                        letterSpacing: '0.1em', padding: '4px 10px 2px',
                        textTransform: 'uppercase',
                    }}>
                        {group.label}
                    </div>
                    {group.categories.map(cat => (
                        <button key={cat.key} onClick={() => onSelect(cat.key)} style={{
                            padding: '7px 10px', borderRadius: '7px', fontSize: '12.5px',
                            cursor: 'pointer', border: 'none', textAlign: 'left', width: '100%',
                            fontWeight: active === cat.key ? 600 : 400,
                            background: active === cat.key ? `${catColors[cat.key]}18` : 'transparent',
                            color: active === cat.key ? catColors[cat.key] : '#6b7280',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            transition: 'background 0.15s, color 0.15s',
                        }}>
                            <span style={{
                                width: '5px', height: '5px', borderRadius: '50%',
                                background: active === cat.key ? catColors[cat.key] : '#e5e7eb',
                                flexShrink: 0, transition: 'background 0.15s',
                            }} />
                            {cat.label}
                        </button>
                    ))}
                </div>
            ))}

            {/* Saved */}
            {savedCount > 0 && (
                <>
                    <div style={{ height: '1px', background: '#f3f4f6', margin: '4px 0' }} />
                    <button onClick={() => onSelect('saved')} style={{
                        padding: '8px 10px', borderRadius: '7px', fontSize: '12.5px',
                        cursor: 'pointer', border: 'none', textAlign: 'left',
                        fontWeight: active === 'saved' ? 600 : 400,
                        background: active === 'saved' ? '#fef9e7' : 'transparent',
                        color: active === 'saved' ? '#c8970a' : '#6b7280',
                        display: 'flex', alignItems: 'center', gap: '8px',
                    }}>
                        <span style={{
                            width: '5px', height: '5px', borderRadius: '50%',
                            background: active === 'saved' ? '#c8970a' : '#e5e7eb', flexShrink: 0,
                        }} />
                        Saved ({savedCount})
                    </button>
                </>
            )}

            <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{total} sites and counting</div>
                <a
                    href="https://github.com/pranavvikraman25/tabbreaker"
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '11px', color: '#2d8a4e', textDecoration: 'none' }}
                >
                    Open source ↗
                </a>
            </div>
        </aside>
    )
}
