import { gsap }      from 'gsap'
import { ARTWORKS }  from '../data/artworks'
import { navigateTo } from '../shared/animation'

export function initArtwork(): void {
  const params = new URLSearchParams(location.search)
  const id     = params.get('id')
  const base   = import.meta.env.BASE_URL.replace(/\/$/, '')

  if (!id) {
    if (ARTWORKS[0]) navigateTo(`${base}/artwork/?id=${ARTWORKS[0].id}`)
    return
  }

  const idx = ARTWORKS.findIndex(a => a.id === id)
  if (idx < 0) { navigateTo(`${base}/works/`); return }

  renderArtwork(idx, base)
  initNav(base)
  initKeyboard(base)
  initSwipe(base)
}

function renderArtwork(idx: number, base: string): void {
  const art = ARTWORKS[idx]
  document.title = `${art.titleEn} — 왕열 Wang Yeul`

  const img = document.getElementById('artworkImg') as HTMLImageElement
  if (img) {
    img.src = `${base}/${art.imageSrc}`
    img.alt = art.titleEn
    gsap.fromTo(img,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }

  // 캡션 — Pierrick inline 방식
  const name   = document.getElementById('labelName')
  const year   = document.getElementById('labelYear')
  const medium = document.getElementById('labelMedium')
  const size   = document.getElementById('labelSize')

  if (name)   name.textContent   = art.titleEn
  if (year)   year.textContent   = String(art.year)
  if (medium) medium.textContent = art.medium
  if (size)   size.textContent   = art.size

  // 캡션 fade in
  gsap.fromTo('#artworkLabel',
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.2 }
  )

  // Prev/Next 버튼 상태
  const prev = document.getElementById('artworkPrev')
  const next = document.getElementById('artworkNext')
  if (prev) prev.style.pointerEvents = idx === 0                   ? 'none' : 'auto'
  if (next) next.style.pointerEvents = idx === ARTWORKS.length - 1 ? 'none' : 'auto'
  if (prev) prev.style.opacity       = idx === 0                   ? '0'    : ''
  if (next) next.style.opacity       = idx === ARTWORKS.length - 1 ? '0'    : ''
}

function goTo(idx: number, base: string): void {
  if (idx < 0 || idx >= ARTWORKS.length) return
  gsap.to('#artworkImg, #artworkLabel', {
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      history.pushState(null, '', `${base}/artwork/?id=${ARTWORKS[idx].id}`)
      renderArtwork(idx, base)
    }
  })
}

function getCurrentIdx(): number {
  const id = new URLSearchParams(location.search).get('id')
  return ARTWORKS.findIndex(a => a.id === id)
}

function initNav(base: string): void {
  document.getElementById('artworkPrev')
    ?.addEventListener('click', () => goTo(getCurrentIdx() - 1, base))
  document.getElementById('artworkNext')
    ?.addEventListener('click', () => goTo(getCurrentIdx() + 1, base))
}

function initKeyboard(base: string): void {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(getCurrentIdx() - 1, base)
    if (e.key === 'ArrowRight') goTo(getCurrentIdx() + 1, base)
    if (e.key === 'Escape')     navigateTo(`${base}/works/`)
  })
}

function initSwipe(base: string): void {
  let startX = 0
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
  }, { passive: true })
  document.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX
    if (diff >  50) goTo(getCurrentIdx() + 1, base)
    if (diff < -50) goTo(getCurrentIdx() - 1, base)
  })
}
