import { gsap }      from 'gsap'
import { ARTWORKS }  from '../data/artworks'
import { initFadeUp } from '../shared/animation'
import { navigateTo } from '../shared/animation'
import type { Artwork } from '../types'

const SERIES = [
  { slug: 'all',       label: 'All' },
  { slug: 'utopia',    label: 'Utopia' },
  { slug: 'ink',       label: 'Ink & Landscape' },
  { slug: 'acrylic',   label: 'Acrylic Landscape' },
  { slug: 'landscape', label: 'Landscape' },
  { slug: 'horse',     label: 'Horse' },
]

export function initWorks(): void {
  initFadeUp()
  initDirectoryMenu()
}

function initDirectoryMenu(): void {
  const container = document.getElementById('directoryMenu')
  if (!container) return
  container.innerHTML = ''

  const params = new URLSearchParams(location.search)
  let currentSeries = params.get('series') || 'all'

  // If the query parameter is not valid, default to 'all'
  if (!SERIES.some(s => s.slug === currentSeries)) {
    currentSeries = 'all'
  }

  // If the selected series has 0 artworks, fall back to 'all'
  if (currentSeries !== 'all') {
    const hasArtworks = ARTWORKS.some(art => art.series === currentSeries)
    if (!hasArtworks) currentSeries = 'all'
  }

  // Render directory links — skip 0-count categories (except 'all')
  SERIES.forEach((s) => {
    const count = s.slug === 'all'
      ? ARTWORKS.length
      : ARTWORKS.filter(art => art.series === s.slug).length

    if (s.slug !== 'all' && count === 0) return

    const a = document.createElement('a')
    a.href = '#'
    a.className = 'directory-link' + (s.slug === currentSeries ? ' active' : '')

    a.innerHTML = `${s.label}<span class="directory-count">${count}</span>`
    a.dataset.series = s.slug

    a.addEventListener('click', (e) => {
      e.preventDefault()
      // Update active state in UI
      container.querySelectorAll('.directory-link').forEach(link => {
        link.classList.remove('active')
      })
      a.classList.add('active')

      // Update URL query parameter without reloading page
      const newUrl = s.slug === 'all' 
        ? `${location.pathname}` 
        : `${location.pathname}?series=${s.slug}`
      history.pushState(null, '', newUrl)

      // Filter and render wall
      filterAndRender(s.slug)
    })

    container.appendChild(a)
  })

  // Initial render
  filterAndRender(currentSeries)
}

function filterAndRender(slug: string): void {
  const filtered = slug === 'all' 
    ? ARTWORKS 
    : ARTWORKS.filter(art => art.series === slug)
  
  renderWall(filtered)
}

function renderWall(artworks: Artwork[]): void {
  const grid = document.getElementById('wallGrid')
  if (!grid) return
  grid.innerHTML = ''

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  artworks.forEach((art) => {
    const item = document.createElement('div')
    item.className = 'wall-item'
    item.setAttribute('role', 'listitem')
    item.setAttribute('tabindex', '0')
    item.setAttribute('aria-label', `${art.titleKr}, ${art.year}`)
    item.dataset.artworkId = art.id

    const img = document.createElement('img')
    img.src      = `${base}/${art.imageSrc}`
    img.alt      = `${art.titleEn}, ${art.year}`
    img.loading  = 'lazy'
    img.decoding = 'async'

    item.appendChild(img)

    item.addEventListener('click', () => {
      navigateTo(`${base}/artwork/?id=${art.id}`)
    })

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') item.click()
    })

    grid.appendChild(item)
  })

  // GSAP stagger 등장 애니메이션
  gsap.fromTo('.wall-item',
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.04,
    }
  )
}
