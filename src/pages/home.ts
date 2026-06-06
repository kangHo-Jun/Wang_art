import { FEATURED } from '../data/artworks'
import { initFadeUp, kenBurns } from '../shared/animation'

const SERIES = [
  { slug: 'utopia',    label: '유토피아' },
  { slug: 'ink',       label: '먹과 산수' },
  { slug: 'acrylic',   label: '아크릴 산수' },
  { slug: 'landscape', label: '풍경' },
  { slug: 'horse',     label: '말 시리즈' },
]

export function initHome(): void {
  initFadeUp()
  initHeroSlideshow()
  renderSeries()
  renderWall()
  initSubscribe()
}

// ── 히어로 슬라이드쇼 ──
function initHeroSlideshow(): void {
  const container = document.getElementById('mainVisualSlides')
  const titleEl   = document.getElementById('visualTitle')
  const metaEl    = document.getElementById('visualMeta')
  const dotsEl    = document.getElementById('visualDots')
  if (!container || !FEATURED.length) return

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  let current = 0
  let timer: ReturnType<typeof setTimeout>

  // 슬라이드 DOM 생성
  FEATURED.forEach((art, i) => {
    const slide = document.createElement('div')
    slide.className = 'main-visual-slide' + (i === 0 ? ' active' : '')
    slide.dataset.index = String(i)
    const img = document.createElement('img')
    img.src     = `${base}/${art.imageSrc}`
    img.alt     = art.titleEn
    img.loading = i === 0 ? 'eager' : 'lazy'
    img.decoding = 'async'
    slide.appendChild(img)
    container.appendChild(slide)
  })

  // dot 생성
  FEATURED.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.className = 'visual-dot' + (i === 0 ? ' active' : '')
    dot.setAttribute('aria-label', `${i + 1}번 슬라이드`)
    dot.addEventListener('click', () => { goTo(i); startTimer() })
    dotsEl?.appendChild(dot)
  })

  function updateLabel(i: number): void {
    const art = FEATURED[i]
    if (titleEl) titleEl.textContent = art.titleEn
    if (metaEl)  metaEl.textContent  =
      `${art.year} · ${art.medium} · ${art.size}`
  }

  function goTo(idx: number): void {
    const slides = container!.querySelectorAll<HTMLElement>('.main-visual-slide')
    const dots   = dotsEl?.querySelectorAll<HTMLElement>('.visual-dot')

    slides[current]?.classList.remove('active')
    dots?.[current]?.classList.remove('active')

    current = (idx + FEATURED.length) % FEATURED.length

    slides[current]?.classList.add('active')
    dots?.[current]?.classList.add('active')

    // Ken Burns 새 슬라이드에 적용
    const newImg = slides[current]?.querySelector<HTMLImageElement>('img')
    if (newImg) kenBurns(newImg)

    updateLabel(current)
  }

  function startTimer(): void {
    clearTimeout(timer)
    timer = setTimeout(() => {
      goTo(current + 1)
      startTimer()
    }, 5000)
  }

  // 초기
  updateLabel(0)
  const firstImg = container.querySelector<HTMLImageElement>('img')
  if (firstImg) kenBurns(firstImg)
  startTimer()

  // hover 정지
  container.addEventListener('mouseenter', () => clearTimeout(timer))
  container.addEventListener('mouseleave', startTimer)
}

// ── 시리즈 섹션 ──
function renderSeries(): void {
  const list = document.getElementById('seriesList')
  if (!list) return

  SERIES.forEach((s, i) => {
    const item = document.createElement('div')
    item.className = 'series-item'

    const a = document.createElement('a')
    a.href      = `/Wang_art/works/?series=${s.slug}`
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

// ── 작품 그리드 (Wall) ──
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
