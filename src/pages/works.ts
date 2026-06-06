import { gsap } from 'gsap'
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

const GRID_PATTERNS = [
  [1,  6,  1, 3],
  [6,  9,  1, 2],
  [9,  13, 1, 2],
  [6,  10, 2, 4],
  [10, 13, 2, 3],
  [1,  4,  3, 4],
  [4,  6,  3, 4],
  [10, 13, 3, 4],
] as const

export function initWorks(): void {
  initFadeUp()
  initViewer(ARTWORKS)
  renderAsymGrid(ARTWORKS)
  initColorFilter()
  initDimming()
}

function renderAsymGrid(artworks: Artwork[]): void {
  const grid = document.getElementById('worksGrid')
  if (!grid) return
  grid.innerHTML = ''
  grid.className = 'works-asym-grid'

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  artworks.forEach((art, i) => {
    const pattern    = GRID_PATTERNS[i % GRID_PATTERNS.length]
    const rowOffset  = Math.floor(i / GRID_PATTERNS.length) * 3
    const card       = document.createElement('div')

    card.className = 'asym-card'
    card.setAttribute('role', 'listitem')
    card.setAttribute('tabindex', '0')
    card.setAttribute('aria-label', `${art.titleKr}, ${art.year}`)
    card.dataset.artworkId = art.id
    card.dataset.folder    = folderOf(art)

    card.style.gridColumn = `${pattern[0]} / ${pattern[1]}`
    card.style.gridRow    = `${pattern[2] + rowOffset} / ${pattern[3] + rowOffset}`

    card.innerHTML = `
      <div class="asym-img-wrap">
        <img
          class="asym-img"
          src="${base}/${art.imageSrc}"
          alt="${art.titleEn}, ${art.year}, ${art.mediumKr}, ${art.size}"
          loading="${i < 4 ? 'eager' : 'lazy'}"
          decoding="async"
        />
      </div>
      <div class="asym-card-body">
        <div class="asym-card-left">
          <p class="asym-title">${art.titleEn}</p>
          <p class="asym-title-kr">${art.titleKr}</p>
        </div>
        <div class="asym-card-right">
          <span class="asym-tag">${art.year}</span>
          <span class="asym-tag">${art.series}</span>
        </div>
      </div>
    `

    card.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') card.click()
    })

    grid.appendChild(card)
  })

  // GSAP 카드 스태거 등장
  gsap.fromTo('.asym-card',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.06,
    }
  )
}

// ── Dimming 효과 ──────────────────────────────────
function initDimming(): void {
  const grid = document.getElementById('worksGrid')
  if (!grid) return

  grid.addEventListener('mouseenter', () => {
    // 그리드 진입 시 전체 dimming 준비
  })

  grid.addEventListener('mouseleave', () => {
    // 그리드 이탈 시 전체 복원
    gsap.to('.asym-card', {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
  })

  document.addEventListener('mouseover', (e: MouseEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.asym-card')
    if (!card) return

    // 나머지 카드 dimming
    gsap.to('.asym-card', {
      opacity: 0.15,
      duration: 0.3,
      ease: 'power2.out',
    })
    // 현재 카드만 선명하게
    gsap.to(card, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
  })
}

// ── 색채 필터 ─────────────────────────────────────
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
      const visible = folder === 'all' || card.dataset.folder === folder
      gsap.to(card, {
        opacity: visible ? 1 : 0.08,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: visible ? 'auto' : 'none',
      })
    })
  })
}
