import { gsap }              from 'gsap'
import { ARTWORKS }          from '../data/artworks'
import { initFadeUp }        from '../shared/animation'
import { navigateTo }        from '../shared/animation'
import { CATEGORIES }        from '../shared/categories'
import { applySeriesActive } from '../shared/seriesActive'
import type { ArtworkCategory, Artwork } from '../types'

const PAGE_SIZE = 30

const VALID_CATS = new Set<string>(CATEGORIES.map(c => c.slug))

// 모듈 레벨 상태
let currentFiltered: Artwork[] = []
let rendered = 0

export function initWorks(): void {
  initFadeUp()
  initDirectoryMenu()
}

function initDirectoryMenu(): void {
  const container = document.getElementById('directoryMenu')
  if (!container) return
  container.innerHTML = ''

  const params = new URLSearchParams(location.search)
  const rawCat = params.get('series') || 'all'
  const currentCat = VALID_CATS.has(rawCat) ? rawCat : 'all'

  // ── inner: label col + series grid ──
  const inner = document.createElement('div')
  inner.className = 'series-directory-inner'

  // label col
  const labelCol = document.createElement('div')
  labelCol.className = 'series-dir-label-col'

  const label = document.createElement('a')
  label.href = '#'
  label.className = 'series-dir-label'
  label.dataset.series = 'all'
  label.textContent = 'Series /'
  labelCol.appendChild(label)
  inner.appendChild(labelCol)

  // series grid
  const grid = document.createElement('div')
  grid.className = 'series-dir-grid'

  CATEGORIES.forEach(cat => {
    const count = ARTWORKS.filter(a => a.category === cat.slug).length
    if (count === 0) return

    const link = document.createElement('a')
    link.href = '#'
    link.className = 'series-dir-link'
    link.dataset.series = cat.slug
    link.appendChild(document.createTextNode(cat.label))

    const countSpan = document.createElement('span')
    countSpan.className = 'series-dir-count'
    countSpan.textContent = String(count)
    link.appendChild(countSpan)
    grid.appendChild(link)
  })

  inner.appendChild(grid)
  container.appendChild(inner)

  // ── All Works 보조 링크 ──
  const allRow = document.createElement('div')
  allRow.className = 'series-dir-all-row'

  const allLink = document.createElement('a')
  allLink.href = '#'
  allLink.className = 'series-dir-all-link'
  allLink.dataset.series = 'all'
  allLink.textContent = `All Works ${ARTWORKS.length}`
  allRow.appendChild(allLink)
  container.appendChild(allRow)

  // 초기 active 적용 (aria-current 포함)
  applySeriesActive(container, currentCat)

  // ── click handlers ──
  container.querySelectorAll<HTMLElement>('[data-series]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault()
      const slug = el.dataset.series || 'all'
      applySeriesActive(container, slug)
      const newUrl = slug === 'all' ? location.pathname : `${location.pathname}?series=${slug}`
      history.pushState(null, '', newUrl)
      filterAndRender(slug)
    })
  })

  filterAndRender(currentCat)
}

function filterAndRender(slug: string): void {
  currentFiltered = (slug === 'all' || !VALID_CATS.has(slug))
    ? [...ARTWORKS]
    : ARTWORKS.filter(a => a.category === (slug as ArtworkCategory))

  rendered = 0
  const grid = document.getElementById('wallGrid')
  if (grid) grid.innerHTML = ''
  removeLoadMore()
  renderNextBatch()
}

function renderNextBatch(): void {
  const batch = currentFiltered.slice(rendered, rendered + PAGE_SIZE)
  if (batch.length === 0) return
  appendToWall(batch)
  rendered += batch.length
  updateLoadMore()
}

function appendToWall(artworks: Artwork[]): void {
  const grid = document.getElementById('wallGrid')
  if (!grid) return

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const frag = document.createDocumentFragment()

  artworks.forEach(art => {
    const item = document.createElement('div')
    item.className = 'wall-item'
    item.setAttribute('role', 'listitem')
    item.setAttribute('tabindex', '0')
    item.setAttribute('aria-label', art.titleEn)
    item.dataset.artworkId = art.id

    const img = document.createElement('img')
    img.src     = `${base}/${art.imageSrc}`
    img.alt     = art.titleEn
    img.loading  = 'lazy'
    img.decoding = 'async'

    item.appendChild(img)
    item.addEventListener('click', () => navigateTo(`${base}/artwork/?id=${art.id}`))
    item.addEventListener('keydown', e => { if (e.key === 'Enter') item.click() })
    frag.appendChild(item)
  })

  grid.appendChild(frag)

  // 새로 추가된 항목만 animate
  const newItems = [...grid.querySelectorAll<HTMLElement>('.wall-item:not(.appeared)')]
  if (newItems.length === 0) return
  newItems.forEach(el => el.classList.add('appeared'))
  gsap.fromTo(newItems,
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.02 }
  )
}

function updateLoadMore(): void {
  removeLoadMore()
  const remaining = currentFiltered.length - rendered
  if (remaining <= 0) return

  const wrap = document.createElement('div')
  wrap.id = 'wallLoadMore'
  wrap.className = 'wall-load-more'

  const link = document.createElement('a')
  link.href = '#'
  link.className = 'wall-load-more-link'
  link.textContent = `Load More — ${remaining}`
  link.addEventListener('click', e => { e.preventDefault(); renderNextBatch() })

  wrap.appendChild(link)
  document.getElementById('wallGrid')?.insertAdjacentElement('afterend', wrap)
}

function removeLoadMore(): void {
  document.getElementById('wallLoadMore')?.remove()
}
