import { gsap }        from 'gsap'
import { ARTWORKS }    from '../data/artworks'
import { navigateTo }  from '../shared/animation'

// 돋보기 상수
const LENS_SIZE   = 320
const LENS_RADIUS = LENS_SIZE / 2  // 160
const ZOOM        = 2

// 작품 변경 시 이전 이벤트 정리용 AbortController
let zoomController: AbortController | null = null

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
    // 이미지 로드 완료 후 magnifier 초기화 (broken image 시 스킵)
    initZoomWhenReady(img)
    gsap.fromTo(img,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }

  const name   = document.getElementById('labelName')
  const year   = document.getElementById('labelYear')
  const medium = document.getElementById('labelMedium')
  const size   = document.getElementById('labelSize')

  if (name)   name.textContent   = art.titleEn
  if (year)   year.textContent   = art.year   != null ? String(art.year) : ''
  if (medium) medium.textContent = art.medium ?? ''
  if (size)   size.textContent   = art.size   ?? ''

  gsap.fromTo('#artworkLabel',
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.2 }
  )

  const prev = document.getElementById('artworkPrev')
  const next = document.getElementById('artworkNext')
  if (prev) prev.style.pointerEvents = idx === 0                   ? 'none' : 'auto'
  if (next) next.style.pointerEvents = idx === ARTWORKS.length - 1 ? 'none' : 'auto'
  if (prev) prev.style.opacity       = idx === 0                   ? '0'    : ''
  if (next) next.style.opacity       = idx === ARTWORKS.length - 1 ? '0'    : ''
}

// ── 이미지 로드 확인 후 zoom 초기화 ──────────────────────────────
function initZoomWhenReady(img: HTMLImageElement): void {
  // 이전 작품의 이벤트 정리 + 렌즈 숨김
  zoomController?.abort()
  zoomController = null
  hideLens()

  const attach = () => {
    if (img.naturalWidth > 0) initArtworkZoom(img)
  }

  if (img.complete) {
    attach()
  } else {
    img.addEventListener('load',  attach,                       { once: true })
    img.addEventListener('error', () => { /* broken: 스킵 */ }, { once: true })
  }
}

function hideLens(): void {
  const lens = document.getElementById('artworkMagnifier')
  if (lens) lens.style.display = 'none'
}

// ── 공통 zoom 초기화 (전체 386개 작품에 적용) ────────────────────
function initArtworkZoom(img: HTMLImageElement): void {
  zoomController = new AbortController()
  const { signal } = zoomController

  const isTouch = window.matchMedia('(pointer: coarse)').matches
  if (!isTouch) {
    setupMagnifier(img, signal)
  }
  // 모바일 오버레이는 touchend가 touch 기기에서만 발화하므로 항상 등록
  setupMobileOverlay(img, signal)
}

// ── 데스크톱 원형 돋보기 ─────────────────────────────────────────
function setupMagnifier(img: HTMLImageElement, signal: AbortSignal): void {
  // magnifier는 body-level fixed overlay (overflow:hidden 영향 없음)
  const maybeLens = document.getElementById('artworkMagnifier')
  if (!maybeLens) return
  const lens = maybeLens

  function updateLens(e: MouseEvent): void {
    const rect = img.getBoundingClientRect()
    const imgW = rect.width
    const imgH = rect.height

    /*
     * [렌즈 화면 위치] — viewport 기준 (position:fixed)
     * 마우스 좌표를 그대로 중심으로 사용. clamp 없음.
     * 이미지 모서리에서 렌즈 절반이 이미지 밖으로 자연스럽게 돌출됨.
     */
    lens.style.left = `${e.clientX - LENS_RADIUS}px`
    lens.style.top  = `${e.clientY - LENS_RADIUS}px`

    /*
     * [확대 이미지 위치] — 이미지 내부 마우스 좌표 기준. clamp 없음.
     * mouseX=0, mouseY=0 (이미지 왼쪽 위 모서리) →
     *   bg-position = (160, 160) → 이미지 최상단-좌 픽셀이 렌즈 중앙에 표시.
     * formula: bg-position = lensRadius - mouseInImage * zoom
     */
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    lens.style.backgroundSize     = `${imgW * ZOOM}px ${imgH * ZOOM}px`
    lens.style.backgroundPosition = `${LENS_RADIUS - mouseX * ZOOM}px ${LENS_RADIUS - mouseY * ZOOM}px`
  }

  img.addEventListener('mouseenter', (e: MouseEvent) => {
    lens.style.backgroundImage = `url('${img.src}')`
    lens.style.display         = 'block'
    updateLens(e)
  }, { signal })

  img.addEventListener('mousemove', updateLens, { signal })

  img.addEventListener('mouseleave', () => {
    lens.style.display = 'none'
  }, { signal })
}

// ── 모바일: tap → fullscreen overlay ─────────────────────────────
function setupMobileOverlay(img: HTMLImageElement, signal: AbortSignal): void {
  const overlay  = document.getElementById('artworkZoomOverlay') as HTMLElement
  const zoomImg  = document.getElementById('artworkZoomImg')     as HTMLImageElement
  const closeBtn = document.getElementById('artworkZoomClose')   as HTMLButtonElement
  const pan      = document.getElementById('artworkZoomPan')     as HTMLElement
  if (!overlay || !zoomImg || !closeBtn || !pan) return

  let touchStartX  = 0
  let touchStartY  = 0
  let savedScrollY = 0

  function openOverlay(): void {
    zoomImg.src = img.src
    zoomImg.alt = img.alt
    // iOS Safari body scroll lock
    savedScrollY = window.scrollY
    document.body.style.position  = 'fixed'
    document.body.style.top       = `-${savedScrollY}px`
    document.body.style.width     = '100%'
    document.body.style.overflowY = 'scroll'
    overlay.removeAttribute('hidden')
    // 2× 이미지 중앙 위치로 pan 초기화
    requestAnimationFrame(() => {
      pan.scrollLeft = (pan.scrollWidth  - pan.clientWidth)  / 2
      pan.scrollTop  = (pan.scrollHeight - pan.clientHeight) / 2
      closeBtn.focus()
    })
  }

  function closeOverlay(): void {
    overlay.setAttribute('hidden', '')
    document.body.style.position  = ''
    document.body.style.top       = ''
    document.body.style.width     = ''
    document.body.style.overflowY = ''
    window.scrollTo(0, savedScrollY)
    zoomImg.src = ''
    img.focus()
  }

  // tap 판별: touchstart ~ touchend 이동 10px 미만이면 overlay 열기
  img.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }, { signal, passive: true })

  img.addEventListener('touchend', (e: TouchEvent) => {
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartX)
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY)
    if (dx < 10 && dy < 10) openOverlay()
  }, { signal })

  closeBtn.addEventListener('click', closeOverlay, { signal })

  // overlay 열림 시 ESC (initKeyboard의 ESC와 분리)
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!overlay.hasAttribute('hidden') && e.key === 'Escape') {
      e.stopPropagation()
      closeOverlay()
    }
  }, { signal })
}

// ─────────────────────────────────────────────────────────────────

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
    const overlay = document.getElementById('artworkZoomOverlay')
    if (overlay && !overlay.hasAttribute('hidden')) return
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
    const overlay = document.getElementById('artworkZoomOverlay')
    if (overlay && !overlay.hasAttribute('hidden')) return
    const diff = startX - e.changedTouches[0].clientX
    if (diff >  50) goTo(getCurrentIdx() + 1, base)
    if (diff < -50) goTo(getCurrentIdx() - 1, base)
  })
}
