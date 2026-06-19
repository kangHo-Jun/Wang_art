import { FEATURED }    from '../data/artworks'
import { navigateTo } from '../shared/animation'
import { CATEGORIES } from '../shared/categories'

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

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  CATEGORIES.forEach((cat) => {
    const item = document.createElement('div')
    item.className = 'series-item w-dyn-item'
    item.setAttribute('role', 'listitem')

    const a = document.createElement('a')
    a.href = `${base}/works/?series=${cat.slug}`
    a.className = 'type-hero-link'
    a.dataset.series = cat.slug
    a.textContent = cat.label
    a.addEventListener('click', (e) => {
      e.preventDefault()
      navigateTo(`${base}/works/?series=${cat.slug}`)
    })
    item.appendChild(a)

    const sep = document.createElement('div')
    sep.className = 'type-menu-separator'
    sep.textContent = '.'
    item.appendChild(sep)

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
    if (!input?.value?.includes('@')) {
      if (msg) msg.textContent = '올바른 이메일 주소를 입력해주세요.'
      return
    }
    if (msg) msg.textContent = '구독해 주셔서 감사합니다.'
    if (input) input.value = ''
  })
}

