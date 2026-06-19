import { getLenis } from './animation'

// ── Preview axis data ─────────────────────────────────────────────
const AXES = [
  {
    id:        'world',
    label:     'WORLD',
    question:  '무엇을 그리는가',
    keywords:  '유토피아 · 명상 · 산수',
    href:      '#world',
    imageSrc:  'images/2026/2025-utopia-meditation-acrylic-on-canvas-280cmx140cm.jpg',
    artworkId: '2026-2025-utopia-meditation-acrylic-on-canvas-280cmx140cm',
    alt:       '신무릉도원 명상 · Acrylic on canvas · 280×140 cm · 2025',
  },
  {
    id:        'signs',
    label:     'SIGNS',
    question:  '무엇으로 말하는가',
    keywords:  '말 · 새 · 인간',
    href:      '#signs',
    imageSrc:  'images/ink/09-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-224x224cm2012.jpg',
    artworkId: 'ink-09-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-224x224cm2012',
    alt:       '신무릉도원 동행 · 천에먹 아크릴 · 224×224 cm · 2012',
  },
  {
    id:        'language',
    label:     'LANGUAGE',
    question:  '어떻게 그리는가',
    keywords:  '먹 · 파랑 · 빨강',
    href:      '#language',
    imageSrc:  'images/ink/16-utopia-a-companion-ink-stick-and-acrylic-on-canvas411x200cm2006-3eok-won-bi-mae-pum.jpg',
    artworkId: 'ink-16-utopia-a-companion-ink-stick-and-acrylic-on-canvas411x200cm2006-3eok-won-bi-mae-pum',
    alt:       '신무릉도원 동행 · 천에먹 아크릴 · 411×200 cm · 2006',
  },
] as const

type AxisId = (typeof AXES)[number]['id']

const AXIS_IDS: readonly AxisId[] = ['world', 'signs', 'language']

function findAxis(id: string | undefined): typeof AXES[number] | undefined {
  return AXES.find(a => a.id === id)
}

// ── Main export ────────────────────────────────────────────────────
export function initWorldIntro(): void {
  const rootEl = document.getElementById('worldsIntro')
  if (!rootEl) return
  const root: HTMLElement = rootEl

  const base    = import.meta.env.BASE_URL.replace(/\/$/, '')
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── build Scene 0 DOM ──────────────────────────────────
  root.innerHTML = `
    <div class="ws0">
      <div class="ws0-left">
        <p class="ws0-label">작품세계</p>
        <p class="ws0-thesis">왕열의 산수는 보이는 풍경 너머,<br>마음이 머무는 세계를 향한다.</p>
        <nav class="ws0-rows" aria-label="섹션 이동">
          ${AXES.map(a => `
            <a class="ws0-row" href="${a.href}" data-axis="${a.id}">
              <span class="ws0-axis">${a.label}</span>
              <span class="ws0-sub">
                <span class="ws0-question">${a.question}</span>
                <span class="ws0-keywords">${a.keywords}</span>
              </span>
            </a>
          `).join('')}
        </nav>
      </div>
      <div class="ws0-right">
        <a class="ws0-preview-link"
           id="ws0PreviewLink"
           href="${base}/artwork/?id=${AXES[0].artworkId}"
           aria-label="${AXES[0].alt} — 상세 보기">
          <div class="ws0-preview-wrap">
            ${AXES.map((a, i) => `
              <img
                id="ws0Img-${a.id}"
                class="ws0-img${i === 0 ? ' is-active' : ''}"
                src="${base}/${a.imageSrc}"
                alt=""
                loading="${i === 0 ? 'eager' : 'lazy'}"
                decoding="async"
                aria-hidden="true"
              />
            `).join('')}
          </div>
          <p class="ws0-preview-caption" aria-hidden="true">작품 보기 →</p>
        </a>
      </div>
    </div>
  `

  // ── interaction setup ──────────────────────────────────
  const rows          = root.querySelectorAll<HTMLAnchorElement>('.ws0-row')
  const rowsContainer = root.querySelector<HTMLElement>('.ws0-rows')
  const previewLink   = document.getElementById('ws0PreviewLink') as HTMLAnchorElement | null

  // ── shared: crossfade preview ──
  function showAxis(axisId: AxisId): void {
    const axisData = findAxis(axisId) ?? AXES[0]
    AXES.forEach(a => {
      const img = document.getElementById(`ws0Img-${a.id}`) as HTMLImageElement | null
      img?.classList.toggle('is-active', a.id === axisId)
    })
    if (previewLink) {
      previewLink.href = `${base}/artwork/?id=${axisData.artworkId}`
      previewLink.setAttribute('aria-label', `${axisData.alt} — 상세 보기`)
    }
  }

  // ── scroll-driven progress ──
  function getScrollAxis(): AxisId {
    const rect = root.getBoundingClientRect()
    const scrollableH = rect.height - window.innerHeight
    if (scrollableH <= 0) return 'world'
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableH))
    const idx = Math.min(2, Math.floor(progress * 3))
    return AXIS_IDS[idx] ?? 'world'
  }

  // ── hover state (overrides scroll when non-null) ──
  let hoverAxis: AxisId | null = null

  // ── passive scroll listener with RAF throttle ──
  let rafPending = false
  window.addEventListener('scroll', () => {
    if (rafPending) return
    rafPending = true
    requestAnimationFrame(() => {
      rafPending = false
      if (hoverAxis === null) showAxis(getScrollAxis())
    })
  }, { passive: true })

  // ── row interactions ──
  rows.forEach(row => {
    const axis = findAxis(row.dataset.axis)
    if (!axis) return

    row.addEventListener('mouseenter', () => {
      hoverAxis = axis.id
      showAxis(axis.id)
    })
    row.addEventListener('focus', () => {
      hoverAxis = axis.id
      showAxis(axis.id)
    })

    row.addEventListener('click', e => {
      const href   = row.getAttribute('href')
      if (!href?.startsWith('#')) return
      const target = document.querySelector<HTMLElement>(href)
      if (!target) return
      e.preventDefault()
      history.pushState(null, '', href)
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(target, { duration: reduced ? 0 : 1.2 })
      } else {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }
    })
  })

  // revert to scroll-driven when leaving the rows container
  rowsContainer?.addEventListener('mouseleave', () => {
    hoverAxis = null
    showAxis(getScrollAxis())
  })

  // revert when focus leaves Scene 0 entirely
  root.addEventListener('focusout', e => {
    const related = (e as FocusEvent).relatedTarget as Element | null
    if (!related || !root.contains(related)) {
      hoverAxis = null
      showAxis(getScrollAxis())
    }
  })

  // ── initial state ──
  showAxis(getScrollAxis())
}
