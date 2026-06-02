import { ARTWORKS } from '../data/artworks'
import { initViewer, setViewerList } from '../shared/viewer'
import { initFadeUp } from '../shared/animation'
import type { Artwork } from '../types'

function folderOf(art: Artwork): string {
  const parts = art.imageSrc.split('/')
  return parts[parts.length - 2] ?? ''
}

const FILTER_MAP: Record<string, string> = {
  'all':  'all',
  'ink':  'ink',
  'gold': '2026',
  'red':  'red',
  'blue': 'blue',
}

export function initWorks(): void {
  initFadeUp()
  const base = (document.body.dataset.assetBase ?? '.').replace(/\/$/, '')
  initViewer(ARTWORKS)
  renderAccordion(ARTWORKS, base)
  initColorFilter()
}

function renderAccordion(artworks: Artwork[], base: string): void {
  const grid = document.getElementById('worksGrid')
  if (!grid) return
  grid.innerHTML = ''
  grid.className = 'works-accordion'

  artworks.forEach((art, i) => {
    const strip = document.createElement('div')
    strip.className = 'accordion-strip' + (i === 0 ? ' active' : '')
    strip.dataset.artworkId = art.id
    strip.dataset.folder    = folderOf(art)

    strip.innerHTML = `
      <img
        class="accordion-img"
        src="${base}/${art.imageSrc}"
        alt="${art.titleEn}, ${art.year}, ${art.mediumKr}, ${art.size}"
        loading="${i < 3 ? 'eager' : 'lazy'}"
        decoding="async"
      />
      <div class="accordion-overlay">
        <div class="accordion-label">
          <p class="accordion-title">${art.titleEn}</p>
          <p class="accordion-meta">${art.year} · ${art.size}</p>
        </div>
      </div>
      <div class="accordion-index">${String(i + 1).padStart(2, '0')}</div>
    `

    strip.addEventListener('mouseenter', () => {
      document.querySelectorAll('.accordion-strip')
        .forEach(s => s.classList.remove('active'))
      strip.classList.add('active')
    })

    grid.appendChild(strip)
  })
}

function initColorFilter(): void {
  const filterWrap = document.getElementById('colorFilter')
  if (!filterWrap) return

  filterWrap.addEventListener('click', (e: MouseEvent) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.color-btn')
    if (!btn) return

    filterWrap.querySelectorAll('.color-btn')
      .forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    const filter = btn.dataset.filter ?? 'all'
    const folder = FILTER_MAP[filter] ?? 'all'
    const strips = document.querySelectorAll<HTMLElement>('.accordion-strip')

    strips.forEach(strip => {
      const cardFolder = strip.dataset.folder ?? ''
      const visible    = folder === 'all' || cardFolder === folder
      strip.style.display = visible ? '' : 'none'
    })

    const first = document.querySelector<HTMLElement>('.accordion-strip:not([style*="none"])')
    document.querySelectorAll('.accordion-strip').forEach(s => s.classList.remove('active'))
    first?.classList.add('active')

    const filtered = ARTWORKS.filter((a: Artwork) => folder === 'all' || folderOf(a) === folder)
    setViewerList(filtered)
  })
}
