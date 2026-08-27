import sites from '../data/sites.json'
import books from '../data/books.json'
import tricks from '../data/tricks.json'
import docs from '../data/documentaries.json'
import podcasts from '../data/podcasts.json'
import courses from '../data/courses.json'
import holes from '../data/rabbitholes.json'
import models from '../data/mentalmodels.json'
import movies from '../data/movies.json'
import moments from '../data/moviemoments.json'

export type PickType = 'site' | 'book' | 'trick' | 'documentary' | 'podcast' | 'course' | 'rabbit-hole' | 'mental-model' | 'movie' | 'movie-moment'

export interface DailyPick {
  type: PickType
  label: string
  color: string
  title: string
  subtitle: string
  description: string
  url: string
  route?: string
}

const typeConfig: Record<PickType, { label: string; color: string }> = {
  'site':         { label: 'Site of the Day',          color: '#006ccc' },
  'book':         { label: 'Book of the Day',          color: '#7c3aed' },
  'trick':        { label: 'Trick of the Day',         color: '#b45309' },
  'documentary':  { label: 'Documentary of the Day',   color: '#c54444' },
  'podcast':      { label: 'Listen of the Day',        color: '#28a745' },
  'course':       { label: 'Course of the Day',        color: '#ffc107' },
  'rabbit-hole':  { label: 'Rabbit Hole of the Day',   color: '#7c3aed' },
  'mental-model': { label: 'Think of the Day',         color: '#08b54d' },
  'movie':        { label: 'Movie Tool of the Day',    color: '#08b54d' },
  'movie-moment': { label: 'Cinema Moment of the Day',  color: '#ffc107' },
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

  movies.forEach(m => pool.push({
    type: 'movie', ...typeConfig['movie'],
    title: m.name,
    subtitle: m.url.replace(/^https?:\/\//, ''),
    description: m.description,
    url: m.url,
    route: '/movies',
  }))

  moments.forEach(mo => pool.push({
    type: 'movie-moment', ...typeConfig['movie-moment'],
    title: mo.title,
    subtitle: `${mo.movie} · ${mo.year}`,
    description: mo.description,
    url: '/movies',
    route: '/movies',
  }))

  return pool
}

export function getDailyPick(): DailyPick {
  const pool = buildPool()
  const today = new Date()
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24))
  const index = daysSinceEpoch % pool.length
  return pool[index]
}

export function getRandomPick(): DailyPick {
  const pool = buildPool()
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getTodayFormatted(): string {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}
