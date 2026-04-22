import sites from '../data/sites.json'
import books from '../data/books.json'
import tricks from '../data/tricks.json'
import docs from '../data/documentaries.json'
import podcasts from '../data/podcasts.json'
import courses from '../data/courses.json'
import holes from '../data/rabbitholes.json'
import models from '../data/mentalmodels.json'

export type PickType = 'site' | 'book' | 'trick' | 'documentary' | 'podcast' | 'course' | 'rabbit-hole' | 'mental-model'

export interface DailyPick {
  type: PickType
  label: string
  emoji: string
  color: string
  title: string
  subtitle: string
  description: string
  url: string
  route?: string
}

const typeConfig: Record<PickType, { label: string; emoji: string; color: string }> = {
  'site':         { label: 'Site of the Day',          emoji: '🌐', color: '#0ea5e9' },
  'book':         { label: 'Book of the Day',          emoji: '📖', color: '#7c3aed' },
  'trick':        { label: 'Trick of the Day',         emoji: '💡', color: '#f97316' },
  'documentary':  { label: 'Documentary of the Day',   emoji: '🎬', color: '#ec4899' },
  'podcast':      { label: 'Listen of the Day',        emoji: '🎙️', color: '#22c55e' },
  'course':       { label: 'Course of the Day',        emoji: '🎓', color: '#c8970a' },
  'rabbit-hole':  { label: 'Rabbit Hole of the Day',   emoji: '🕳️', color: '#8b5cf6' },
  'mental-model': { label: 'Think of the Day',         emoji: '🧠', color: '#14b8a6' },
}

// Build a combined pool of all content
function buildPool(): DailyPick[] {
  const pool: DailyPick[] = []

  sites.forEach(s => pool.push({
    type: 'site', ...typeConfig['site'],
    title: s.name,
    subtitle: s.url.replace(/^https?:\/\//, ''),
    description: s.description,
    url: s.url,
    route: '/',
  }))

  books.forEach(b => pool.push({
    type: 'book', ...typeConfig['book'],
    title: b.title,
    subtitle: `${b.author} · ${b.year < 0 ? Math.abs(b.year) + ' BC' : b.year} · ${b.readTime}`,
    description: b.description,
    url: b.freeUrl,
    route: '/books',
  }))

  tricks.forEach(t => pool.push({
    type: 'trick', ...typeConfig['trick'],
    title: t.title,
    subtitle: t.domain,
    description: t.description,
    url: '/tricks',
    route: '/tricks',
  }))

  docs.forEach(d => pool.push({
    type: 'documentary', ...typeConfig['documentary'],
    title: d.title,
    subtitle: `${d.director} · ${d.year} · ${d.duration}`,
    description: d.description,
    url: d.watchUrl,
    route: '/documentaries',
  }))

  podcasts.forEach(p => pool.push({
    type: 'podcast', ...typeConfig['podcast'],
    title: p.title,
    subtitle: `${p.podcast} · ${p.host} · ${p.duration}`,
    description: p.description,
    url: p.url,
    route: '/podcasts',
  }))

  courses.forEach(c => pool.push({
    type: 'course', ...typeConfig['course'],
    title: c.title,
    subtitle: `${c.provider} · ${c.duration} · ${c.level}`,
    description: c.description,
    url: c.url,
    route: '/courses',
  }))

  holes.forEach(h => pool.push({
    type: 'rabbit-hole', ...typeConfig['rabbit-hole'],
    title: h.title,
    subtitle: `${h.difficulty} · ${h.estimatedTime}`,
    description: h.description,
    url: h.startUrl,
    route: '/rabbit-holes',
  }))

  models.forEach(m => pool.push({
    type: 'mental-model', ...typeConfig['mental-model'],
    title: m.title,
    subtitle: m.tagline,
    description: m.description,
    url: '/mental-models',
    route: '/mental-models',
  }))

  return pool
}

// Deterministic pick based on current date — same for all users on the same day
export function getDailyPick(): DailyPick {
  const pool = buildPool()
  const today = new Date()
  // Use days since epoch as seed
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24))
  const index = daysSinceEpoch % pool.length
  return pool[index]
}

// Random pick from the entire pool
export function getRandomPick(): DailyPick {
  const pool = buildPool()
  return pool[Math.floor(Math.random() * pool.length)]
}

// Get today's date formatted nicely
export function getTodayFormatted(): string {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}
