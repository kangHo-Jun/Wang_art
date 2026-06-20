import type { Artwork } from '../types'
import { gsap, Flip } from './animation'

let currentIndex = 0
let artworkList: Artwork[] = []

export function setViewerList(artworks: Artwork[]): void {
  artworkList = artworks
  currentIndex = 0
}

export function initViewer(artworks: Artwork[]): void {
  artworkList = artworks

  const base   = (document.body.dataset.assetBase ?? '.').replace(/\/$/, '')
  const viewer = document.getElementById('glassViewer')
  const backdrop   = document.getElementById('glassBackdrop')
  const closeBtn   = document.getElementById('glassClose')
  const img        = document.getElementById('glassImg')        as HTMLImageElement
  const title      = document.getElementById('glassTitle')
  const titleKr    = document.getElementById('glassTitleKr')
  const year       = document.getElementById('glassYear')
  const medium     = document.getElementById('glassMedium')
  const size       = document.getElementById('glassSize')
  const collection = document.getElementById('glassCollection')
  const note       = document.getElementById('glassNote')
  const prevBtn    = document.getElementById('glassPrev')       as HTMLButtonElement
  const nextBtn    = document.getElementById('glassNext')       as HTMLButtonElement
  const dotsWrap   = document.getElementById('glassDots')
  if (!viewer) return

  // ── ZOOM ──
  const zoomOverlay = document.getElementById('zoomOverlay')
  const zoomImg     = document.getElementById('zoomImg')      as HTMLImageElement
  const zoomClose   = document.getElementById('zoomClose')
  const zoomBtn     = document.getElementById('glassZoomBtn')

  function openZoom(): void {
    if (!zoomOverlay || !zoomImg) return
    zoomImg.src = img.src
    zoomImg.alt = img.alt
    zoomOverlay.removeAttribute('hidden')
    document.body.style.overflow = 'hidden'
    zoomClose?.focus()
  }

  function closeZoom(): void {
    zoomOverlay?.setAttribute('hidden', '')
  }

  img.style.cursor = 'zoom-in'
  img.addEventListener('click', openZoom)
  zoomBtn?.addEventListener('click', openZoom)
  zoomOverlay?.addEventListener('click', closeZoom)
  zoomClose?.addEventListener('click', (e) => {
    e.stopPropagation()
    closeZoom()
  })

  // ── 뷰어 ──
  function renderDots(): void {
    if (!dotsWrap) return
    dotsWrap.innerHTML = ''
    if (artworkList.length > 20) return
    artworkList.forEach((_, i) => {
      const btn = document.createElement('button')
      btn.className = 'glass-dot' + (i === currentIndex ? ' active' : '')
      btn.setAttribute('aria-label', `${i + 1}번 작품`)
      btn.addEventListener('click', () => show(i))
      dotsWrap.appendChild(btn)
    })
  }

  function show(idx: number): void {
    currentIndex = Math.max(0, Math.min(idx, artworkList.length - 1))
    const art = artworkList[currentIndex]

    const clickedCard = document.querySelector<HTMLElement>(
      `[data-artwork-id="${art.id}"]`
    )
    const clickedImg = clickedCard?.querySelector<HTMLImageElement>('img')

    // 이미지 정보 채우기
    img.src = `${base}/${art.imageSrc}`
    img.alt = art.year != null ? `${art.titleEn}, ${art.year}` : art.titleEn
    if (title)      title.textContent      = art.titleEn
    if (titleKr)    titleKr.textContent    = art.titleKr
    if (year)       year.textContent       = art.year != null && art.year > 0 ? String(art.year) : ''
    if (medium)     medium.textContent     = art.mediumKr ?? art.medium ?? ''
    if (size)       size.textContent       = art.size    ?? ''
    if (collection) collection.textContent = art.collectionKr ?? '작가 보유'
    if (note)       note.textContent       = art.noteKr  ?? ''

    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex === artworkList.length - 1
    renderDots()

    viewer!.removeAttribute('hidden')
    document.body.style.overflow = 'hidden'

    // GSAP Flip — 카드 이미지 → 뷰어 확장
    if (clickedImg) {
      const state = Flip.getState(clickedImg)
      Flip.from(state, {
        targets: img,
        duration: 0.65,
        ease: 'power3.inOut',
        absolute: true,
      })
    } else {
      gsap.fromTo(img,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
      )
    }

    // 패널 등장
    gsap.fromTo('#glassPanel',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
    )

    closeBtn?.focus()
  }

  function close(): void {
    gsap.to('#glassPanel', {
      opacity: 0,
      y: 10,
      duration: 0.28,
      ease: 'power3.in',
      onComplete: () => {
        viewer!.setAttribute('hidden', '')
        document.body.style.overflow = ''
        gsap.set('#glassPanel', { clearProps: 'all' })
      }
    })
  }

  viewer.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusable = viewer.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
  })

  backdrop?.addEventListener('click', close)
  closeBtn?.addEventListener('click', close)
  prevBtn.addEventListener('click', () => show(currentIndex - 1))
  nextBtn.addEventListener('click', () => show(currentIndex + 1))

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!zoomOverlay?.hasAttribute('hidden') && e.key === 'Escape') {
      closeZoom()
      return
    }
    if (viewer.hasAttribute('hidden')) return
    if (e.key === 'Escape')     close()
    if (e.key === 'ArrowLeft')  show(currentIndex - 1)
    if (e.key === 'ArrowRight') show(currentIndex + 1)
  })

  document.addEventListener('click', (e: MouseEvent) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-artwork-id]')
    if (!btn) return
    const id  = btn.dataset.artworkId
    const idx = artworkList.findIndex(a => a.id === id)
    if (idx >= 0) show(idx)
  })
}
