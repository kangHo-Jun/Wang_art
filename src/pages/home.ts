import { FEATURED } from '../data/artworks'
import { gsap, initFadeUp, kenBurns } from '../shared/animation'

const SERIES = [
  { slug: 'utopia',    labelEn: 'Utopia',      labelKr: '유토피아'   },
  { slug: 'ink',       labelEn: 'Ink',          labelKr: '먹과 산수'  },
  { slug: 'acrylic',   labelEn: 'Acrylic',      labelKr: '아크릴'    },
  { slug: 'landscape', labelEn: 'Landscape',    labelKr: '풍경'      },
  { slug: 'horse',     labelEn: 'Horse',        labelKr: '말 시리즈'  },
]

export function initHome(): void {
  initFadeUp()
  initHero()
  renderSeries()
  renderWall()
  initSubscribe()
}

// ── 히어로 — 단일 피처 이미지 (Pierrick 방식) ──
function initHero(): void {
  const art  = FEATURED[0]
  if (!art) return

  const base    = import.meta.env.BASE_URL.replace(/\/$/, '')
  const link    = document.getElementById('mainVisualLink')    as HTMLAnchorElement | null
  const img     = document.getElementById('mainVisualImg')     as HTMLImageElement  | null
  const titleEl = document.getElementById('visualTitle')
  const metaEl  = document.getElementById('visualMeta')

  if (!link || !img) return

  img.src  = `${base}/${art.imageSrc}`
  img.alt  = art.titleEn
  link.href = `${base}/artwork/?id=${art.id}`

  if (titleEl) titleEl.textContent = art.titleEn
  if (metaEl)  metaEl.textContent  = `${art.year} · ${art.medium} · ${art.size}`

  img.addEventListener('load', () => kenBurns(img), { once: true })
  if (img.complete) kenBurns(img)
}

// ── 시리즈 — DM Mono 126px (Pierrick 핵심) ──
function renderSeries(): void {
  const list = document.getElementById('seriesList')
  if (!list) return

  const base = import.meta.env.BASE_URL

  SERIES.forEach((s, i) => {
    const item = document.createElement('div')
    item.className = 'series-item'

    const a = document.createElement('a')
    a.href      = `${base}works/?series=${s.slug}`
    a.textContent = s.labelEn
    a.title       = s.labelKr
    item.appendChild(a)

    if (i < SERIES.length - 1) {
      const sep = document.createElement('span')
      sep.className   = 'series-separator'
      sep.textContent = '·'
      sep.setAttribute('aria-hidden', 'true')
      item.appendChild(sep)
    }

    list.appendChild(item)
  })
}

// ── 작품 그리드 ──
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
    img.src      = `${base}/${art.imageSrc}`
    img.alt      = art.titleEn
    img.loading  = 'lazy'
    img.decoding = 'async'

    item.appendChild(img)

    item.addEventListener('click', () => {
      gsap.to(item, {
        opacity: 0,
        scale: 0.98,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          window.location.href = `${base}/artwork/?id=${art.id}`
        }
      })
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
  if (!form || !input || !msg) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (!input.value || !input.value.includes('@')) {
      msg.textContent = '올바른 이메일 주소를 입력해주세요.'
      return
    }
    msg.textContent = '구독해 주셔서 감사합니다.'
    input.value = ''
  })
}
