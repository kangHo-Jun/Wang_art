import { gsap }     from 'gsap'
import { ARTWORKS } from '../data/artworks'

export function initArtwork(): void {
  // URL에서 작품 ID 파싱
  // /Wang_art/artwork/?id=utopia-meditation-2025-acrylic-280x140
  const params  = new URLSearchParams(location.search)
  const id      = params.get('id')
  const base    = import.meta.env.BASE_URL.replace(/\/$/, '')

  if (!id) {
    // ID 없으면 첫 번째 작품으로
    const first = ARTWORKS[0]
    if (first) location.replace(`${base}/artwork/?id=${first.id}`)
    return
  }

  const idx = ARTWORKS.findIndex(a => a.id === id)
  if (idx < 0) {
    location.replace(`${base}/works/`)
    return
  }

  renderArtwork(idx, base)
  initKeyboard(base)
  initSwipe(base)
}

function renderArtwork(idx: number, base: string): void {
  const art = ARTWORKS[idx]

  // 페이지 타이틀
  document.title = `${art.titleEn} — 왕열 Wang Yeul`

  // 이미지
  const img = document.getElementById('artworkImg') as HTMLImageElement
  if (img) {
    img.src = `${base}/${art.imageSrc}`
    img.alt = `${art.titleEn}, ${art.year}, ${art.mediumKr}, ${art.size}`

    // GSAP 등장
    gsap.fromTo(img,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    )
  }

  // 캡션
  const num        = document.getElementById('artworkNum')
  const title      = document.getElementById('artworkTitle')
  const titleKr    = document.getElementById('artworkTitleKr')
  const year       = document.getElementById('artworkYear')
  const medium     = document.getElementById('artworkMedium')
  const size       = document.getElementById('artworkSize')
  const collection = document.getElementById('artworkCollection')

  if (num)        num.textContent        = String(idx + 1).padStart(2, '0')
  if (title)      title.textContent      = art.titleEn
  if (titleKr)    titleKr.textContent    = art.titleKr
  if (year)       year.textContent       = String(art.year)
  if (medium)     medium.textContent     = art.mediumKr
  if (size)       size.textContent       = art.size
  if (collection) collection.textContent = art.collectionKr || '작가 보유'

  // 캡션 등장
  gsap.fromTo('#artworkCaption, #artworkNav',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.2, stagger: 0.1 }
  )

  // Prev/Next 버튼
  const prevBtn = document.getElementById('artworkPrev') as HTMLButtonElement
  const nextBtn = document.getElementById('artworkNext') as HTMLButtonElement

  if (prevBtn) {
    prevBtn.disabled = idx === 0
    prevBtn.addEventListener('click', () => goTo(idx - 1, base))
  }
  if (nextBtn) {
    nextBtn.disabled = idx === ARTWORKS.length - 1
    nextBtn.addEventListener('click', () => goTo(idx + 1, base))
  }
}

function goTo(idx: number, base: string): void {
  if (idx < 0 || idx >= ARTWORKS.length) return
  const art = ARTWORKS[idx]

  // 페이드 아웃 후 URL 변경
  gsap.to('#artworkImg, #artworkCaption', {
    opacity: 0,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      history.pushState(null, '', `${base}/artwork/?id=${art.id}`)
      renderArtwork(idx, base)
    }
  })
}

function initKeyboard(base: string): void {
  document.addEventListener('keydown', (e) => {
    const current = getCurrentIdx()
    if (e.key === 'ArrowLeft')  goTo(current - 1, base)
    if (e.key === 'ArrowRight') goTo(current + 1, base)
    if (e.key === 'Escape')     history.back()
  })
}

function initSwipe(base: string): void {
  let startX = 0
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
  }, { passive: true })
  document.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX
    const current = getCurrentIdx()
    if (diff >  50) goTo(current + 1, base)
    if (diff < -50) goTo(current - 1, base)
  })
}

function getCurrentIdx(): number {
  const id = new URLSearchParams(location.search).get('id')
  return ARTWORKS.findIndex(a => a.id === id)
}
