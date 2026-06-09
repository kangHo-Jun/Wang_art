import { FEATURED } from '../data/artworks'
import { navigateTo }    from '../shared/animation'

const SERIES = [
  { slug: 'utopia',    label: '유토피아' },
  { slug: 'ink',       label: '먹과 산수' },
  { slug: 'acrylic',   label: '아크릴 산수' },
  { slug: 'landscape', label: '풍경' },
  { slug: 'horse',     label: '말' },
]

export function initHome(): void {
  renderSeries()
  renderWall()
  initSubscribe()
  initNavActive()
}

// ── 시리즈 섹션 ──
function renderSeries(): void {
  const list = document.getElementById('seriesList')
  if (!list) return

  SERIES.forEach((s, i) => {
    const item = document.createElement('div')
    item.className = 'series-item'

    const a = document.createElement('a')
    a.href      = `${import.meta.env.BASE_URL}works/?series=${s.slug}`
    a.textContent = s.label
    item.appendChild(a)

    if (i < SERIES.length - 1) {
      const sep = document.createElement('span')
      sep.className   = 'series-separator'
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
    if (!input?.value?.includes('@')) {
      if (msg) msg.textContent = '올바른 이메일 주소를 입력해주세요.'
      return
    }
    if (msg) msg.textContent = '구독해 주셔서 감사합니다.'
    if (input) input.value = ''
  })
}

// ── 네비 active ──
function initNavActive(): void {
  const page = document.body.dataset.page
  document.querySelectorAll<HTMLAnchorElement>('.navbar-link').forEach(a => {
    if (a.dataset.nav === page) {
      a.style.opacity = '0.5'
    }
  })
}
