'use client'

const categories = [
    { key: 'all', label: '🌐 All sites' },
    { key: 'fun', label: '🎉 Fun' },
    { key: 'knowledge', label: '📚 Knowledge' },
    { key: 'learning', label: '🧠 Learning' },
]

export default function Sidebar({ active, onSelect, total, savedCount }: {
    active: string; onSelect: (k: string) => void; total: number; savedCount: number
}) {
    return (
        <aside style={{
            width: '210px', flexShrink: 0, background: '#fff',
            borderRight: '1px solid #e5e7eb', padding: '20px 12px',
            display: 'flex', flexDirection: 'column', gap: '4px', minHeight: '100vh',
        }}>
            {/* Logo */}
            <div style={{ marginBottom: '20px', paddingLeft: '8px' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                    <span style={{ color: '#2d8a4e' }}>Tab</span>
                    <span style={{ color: '#c8970a' }}>Breaker</span>
                </div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                    Break the reel loop ✦
                </div>
            </div>

            <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', padding: '0 8px', marginBottom: '4px' }}>
                CATEGORIES
            </div>

            {categories.map(cat => (
                <button key={cat.key} onClick={() => onSelect(cat.key)} style={{
                    padding: '9px 12px', borderRadius: '8px', fontSize: '13px',
                    cursor: 'pointer', border: 'none', textAlign: 'left',
                    fontWeight: active === cat.key ? 600 : 400,
                    background: active === cat.key ? '#edf7f0' : 'transparent',
                    color: active === cat.key ? '#2d8a4e' : '#374151',
                }}>
                    {cat.label}
                </button>
            ))}

            {savedCount > 0 && (
                <button onClick={() => onSelect('saved')} style={{
                    padding: '9px 12px', borderRadius: '8px', fontSize: '13px',
                    cursor: 'pointer', border: 'none', textAlign: 'left',
                    fontWeight: active === 'saved' ? 600 : 400,
                    background: active === 'saved' ? '#fef9e7' : 'transparent',
                    color: active === 'saved' ? '#c8970a' : '#374151',
                }}>
                    ⭐ Saved ({savedCount})
                </button>
            )}

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>{total} sites listed</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Open source · GitHub</div>
            </div>
        </aside>
    )
}
