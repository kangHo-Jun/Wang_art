import { ARTWORKS } from '../data/artworks'
import { initViewer } from '../shared/viewer'
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

// 12컬럼 기준 — [col-start, col-end, row-start, row-end]
const GRID_PATTERNS = [
  [1,  6,  1, 3],   // 01 — 대형 좌측
  [6,  9,  1, 2],   // 02 — 중형 우상
  [9,  13, 1, 2],   // 03 — 중형 우상
  [6,  10, 2, 4],   // 04 — 중형 우하
  [10, 13, 2, 3],   // 05 — 소형
  [1,  4,  3, 4],   // 06 — 소형 좌하
  [4,  6,  3, 4],   // 07 — 소형
  [10, 13, 3, 4],   // 08 — 소형 우하
] as const

export function initWorks(): void {
  initFadeUp()
  const base = (document.body.dataset.assetBase ?? '.').replace(/\/$/, '')
  initViewer(ARTWORKS)
  renderAsymGrid(ARTWORKS, base)
  initColorFilter()
}

function renderAsymGrid(artworks: Artwork[], base: string): void {
  const grid = document.getElementById('worksGrid')
  if (!grid) return
  grid.innerHTML = ''
  grid.className = 'works-asym-grid'

  artworks.forEach((art, i) => {
    const pattern = GRID_PATTERNS[i % GRID_PATTERNS.length]
    const card    = document.createElement('div')
    card.className = 'asym-card'
    card.setAttribute('role', 'listitem')
    card.setAttribute('tabindex', '0')
    card.setAttribute('aria-label', `${art.titleKr}, ${art.year}`)
    card.dataset.artworkId = art.id
    card.dataset.folder    = folderOf(art)

    card.style.gridColumn = `${pattern[0]} / ${pattern[1]}`
    card.style.gridRow    = `${pattern[2]} / ${pattern[3]}`
    card.style.animationDelay = `${i * 0.07}s`

    card.innerHTML = `
      <img
        class="asym-img"
        src="${base}/${art.imageSrc}"
        alt="${art.titleEn}, ${art.year}, ${art.mediumKr}, ${art.size}"
        loading="${i < 4 ? 'eager' : 'lazy'}"
        decoding="async"
      />
      <div class="asym-overlay">
        <div class="asym-info">
          <p class="asym-num">${String(i + 1).padStart(2, '0')}</p>
          <p class="asym-title">${art.titleEn}</p>
          <p class="asym-meta">${art.year} · ${art.size}</p>
        </div>
      </div>
    `

    card.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') card.click()
    })

    grid.appendChild(card)
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

    document.querySelectorAll<HTMLElement>('.asym-card').forEach(card => {
      const cardFolder = card.dataset.folder ?? ''
      const visible    = folder === 'all' || cardFolder === folder
      card.style.opacity       = visible ? '1' : '0.12'
      card.style.pointerEvents = visible ? '' : 'none'
      card.style.transition    = 'opacity 0.35s ease'
    })
  })
}
