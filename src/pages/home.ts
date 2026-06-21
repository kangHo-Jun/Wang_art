import { FEATURED }    from '../data/artworks'
import { navigateTo } from '../shared/animation'
import { t } from '../shared/i18n-engine'

const HERO_CATEGORIES = [
  { slug: '2jung', label: 'Double Structure' },
  { slug: '2026', label: 'Deconstruction' },
  { slug: 'blue', label: 'Blue' },
  { slug: 'ink', label: 'Ink' },
  { slug: 'red', label: 'Red' },
] as const

export function initHome(): void {
  renderMainVisual()
  renderSeries()
  renderWall()
  initSubscribe()
}

// ── 메인 비주얼 (Hero) ──
function renderMainVisual(): void {
  const container = document.getElementById('mainVisual')
  if (!container) return
  container.innerHTML = ''

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const firstFeatured = FEATURED[0]
  if (!firstFeatured) return

  const visualList = document.createElement('div')
  visualList.className = 'main-visual'
  visualList.setAttribute('role', 'list')

  const item = document.createElement('div')
  item.className = 'main-visual-item w-dyn-item'
  item.setAttribute('role', 'listitem')

  const link = document.createElement('a')
  link.href = `${base}/works/?series=${firstFeatured.series}`
  link.className = 'main-visual-link'

  const img = document.createElement('img')
  img.src = `${base}/${firstFeatured.imageSrc}`
  img.alt = firstFeatured.titleEn
  img.className = 'main-visual-image'
  img.setAttribute('loading', 'eager')

  const label = document.createElement('div')
  label.className = 'label home'

  const nameWrapper = document.createElement('div')
  nameWrapper.className = 'label-name-wrapper'
  
  const name = document.createElement('span')
  name.className = 'label-name'
  name.textContent = firstFeatured.titleEn

  const comma = document.createTextNode(', ')

  const year = document.createElement('span')
  year.className = 'label-year'
  year.textContent = firstFeatured.year != null ? String(firstFeatured.year) : ''

  nameWrapper.appendChild(name)
  nameWrapper.appendChild(comma)
  nameWrapper.appendChild(year)

  const medium = document.createElement('div')
  medium.className = 'label-medium'
  medium.textContent = firstFeatured.medium ?? ''

  const size = document.createElement('div')
  size.className = 'label-size'
  size.textContent = firstFeatured.size ?? ''

  label.appendChild(nameWrapper)
  label.appendChild(medium)
  label.appendChild(size)

  link.appendChild(img)
  link.appendChild(label)
  item.appendChild(link)
  visualList.appendChild(item)
  container.appendChild(visualList)
}

// ── 시리즈 섹션 ──
function renderSeries(): void {
  const list = document.getElementById('seriesList')
  if (!list) return
  list.innerHTML = ''

  list.className = 'series-list hero-category-titlebar'

  HERO_CATEGORIES.forEach((cat, index) => {
    const item = document.createElement('span')
    item.className = 'hero-category-item'

    const label = document.createElement('span')
    label.className = 'hero-category-token'
    label.dataset.series = cat.slug
    label.textContent = cat.label
    item.appendChild(label)

    const isLast = index === HERO_CATEGORIES.length - 1

    if (!isLast) {
      const sep = document.createElement('span')
      sep.className = 'type-menu-separator hero-category-dot'
      sep.textContent = '·'
      item.appendChild(sep)
    }

    list.appendChild(item)
  })
}

// ── Wall 그리드 ──
function renderWall(): void {
  const grid = document.getElementById('wallGrid')
  if (!grid) return
  grid.innerHTML = ''

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  FEATURED.forEach((art) => {
    const item = document.createElement('div')
    item.className = 'wall-item'
    item.setAttribute('role', 'listitem')
    item.setAttribute('tabindex', '0')
    item.setAttribute('aria-label', `${art.titleKr}, ${art.year}`)
    item.dataset.artworkId = art.id

    const img = document.createElement('img')
    img.src     = `${base}/${art.imageSrc}`
    img.alt     = art.titleEn
    img.loading = 'lazy'
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
}

// ── 뉴스레터 ──
function initSubscribe(): void {
  const form  = document.getElementById('subscribeForm')
  const input = document.getElementById('subscribeEmail') as HTMLInputElement
  const msg   = document.getElementById('subscribeMsg')
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!input?.validity.valid) {
      if (msg) msg.textContent = t('subscribe.invalid')
      return
    }
    if (msg) msg.textContent = t('subscribe.pending')
  })
}
