import { initFadeUp } from '../shared/animation'
import { gsap } from 'gsap'

const ARTIST_NAME = '왕열 Wang Yeul'

const ARTIST_META = 'b. 1960 · 한국화 Korean Painting · 미술 교과서 등재'

const ARTIST_INTRO_ONE = `
  1960년 출생. <span class="text-span-bold">단국대학교 예술대학 교수 역임(1994–2020)</span>했으며, 서울을 기반으로 작업하고 있다.
  그의 작품은 <span class="text-span-bold">중·고등학교 미술 교과서에 등재</span>되어 한국 현대미술의 한 위치를 점하고 있다.
`

const ARTIST_INTRO_TWO = `
  전통 수묵의 정신을 현대 회화의 언어로 확장하며, 무릉도원이라는 역설을 평생의 주제로 그려왔다.
  그의 화면에서 산수와 말, 새와 색은 단순한 소재가 아니라 인간이 머물고자 하는 내면의 장소를 향한 상징으로 작동한다.
`

const ARTIST_FILM_TITLE = 'ARTIST FILM'

const ARTIST_FILM_COPY = '작업과 작품세계를 말하는 왕열 작가'

const ARTIST_FILM_URL = 'https://www.youtube.com/watch?v=n0ndsSXbIDg'

const ARTIST_FILM_EMBED_URL =
  'https://www.youtube.com/embed/n0ndsSXbIDg?autoplay=1&rel=0'

const ARTIST_FILM_THUMBNAIL = 'https://i.ytimg.com/vi/n0ndsSXbIDg/hqdefault.jpg'

const EDUCATION = [
  '홍익대학교 미술대학 및 대학원 동양화과 졸업',
  '홍익대학교 대학원 미술학 박사',
  '남대전고등학교 졸업',
]

const EXHIBITIONS = [
  '<span class="resume-year">2026</span><span class="resume-detail"><span class="text-span-bold">개인전 87회</span> — 한국·중국·일본·독일·미국·프랑스 등</span>',
  '<span class="resume-year"></span><span class="resume-detail">단체전 600여 회 참여</span>',
  '<span class="resume-year">1994–2020</span><span class="resume-detail"><span class="text-span-bold">단국대학교 예술대학 교수 역임</span></span>',
  '<span class="resume-year"></span><span class="resume-detail">대한민국미술대전 심사위원 역임</span>',
]

const AWARDS = [
  '한국미술평론가협회 작가상 — 한국미술평론가협회',
  '동아미술제 동아미술상 — 동아일보사',
  '한국미술작가대상 — 한국미술작가대상 운영위원회',
  '대한민국미술대전 특선 3회',
]

const PUBLIC_MUSEUMS = [
  '국립현대미술관',
  '경기도미술관',
  '대전시립미술관',
  '천안시립미술관',
  '성곡미술관',
  '성남아트센터',
  '워커힐 미술관',
]

const INSTITUTIONAL_COLLECTIONS = [
  '청와대',
  '홍익대학교 현대미술관',
  '고려대학교 박물관',
  '한국은행 · 한국해외홍보처',
  '한국종합예술학교',
  '갤러리 상 · 호텔프리마',
  '천안시청 · 한남더힐 등',
]

export function initArtist(): void {
  initFadeUp()
  renderArtist()
  initArtistFilm()
  animateArtist()
}

function renderArtist(): void {
  const container = document.getElementById('artistBody')
  if (!container) return
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  container.innerHTML = `
    <section class="resume-shell">
      <section class="resume-top">
        <div class="resume-top-copy">
          <div class="resume-text resume-text--name">${ARTIST_NAME}</div>
          <div class="resume-text resume-text--meta">${ARTIST_META}</div>
          <div class="resume-category resume-category--intro">작가</div>
          <div class="resume-text resume-text--lead">${ARTIST_INTRO_ONE}</div>
          <div class="resume-text resume-text--lead resume-text--lead-secondary">${ARTIST_INTRO_TWO}</div>
        </div>
        <figure class="resume-photo">
          <img
            src="${base}/images/artist/wang-yeul-studio.jpg"
            alt="작업실에서 붓을 들고 있는 왕열 작가"
            class="resume-photo-image"
            loading="eager"
            decoding="async"
          />
        </figure>
      </section>

      <section class="resume-section artist-film-section">
        <h2 class="resume-category">${ARTIST_FILM_TITLE}</h2>
        <div class="artist-film-card">
          <button
            type="button"
            class="artist-film-trigger"
            id="artistFilmTrigger"
            aria-label="왕열 작가 소개 영상 재생"
            aria-haspopup="dialog"
            aria-controls="artistFilmOverlay"
          >
            <span class="artist-film-thumb">
              <img
                src="${ARTIST_FILM_THUMBNAIL}"
                alt=""
                class="artist-film-thumb-image"
                loading="lazy"
                decoding="async"
              />
              <span class="artist-film-play" aria-hidden="true"></span>
            </span>
          </button>
          <div class="artist-film-copy">
            <p class="resume-text artist-film-description">${ARTIST_FILM_COPY}</p>
            <a
              href="${ARTIST_FILM_URL}"
              target="_blank"
              rel="noreferrer"
              class="artist-film-link"
            >
              YouTube에서 보기 ↗
            </a>
          </div>
        </div>
      </section>

      ${categoryHtml('Education', EDUCATION)}
      ${categoryHtml('Exhibitions & Career', EXHIBITIONS, true)}
      ${categoryHtml('Awards', AWARDS)}

      <section class="collections-section">
        <h2 class="resume-category">Public & Institutional Collections</h2>
        <div class="collections-grid">
          ${collectionColumnHtml('Public Museums', PUBLIC_MUSEUMS)}
          ${collectionColumnHtml('Institutional & Corporate', INSTITUTIONAL_COLLECTIONS)}
        </div>
      </section>
    </section>

    <div
      class="artist-film-overlay"
      id="artistFilmOverlay"
      hidden
      role="dialog"
      aria-modal="true"
      aria-labelledby="artistFilmOverlayTitle"
    >
      <div class="artist-film-backdrop" data-film-close="true"></div>
      <div class="artist-film-dialog" tabindex="-1">
        <button type="button" class="artist-film-close" id="artistFilmClose">
          Close
        </button>
        <div class="artist-film-frame-wrap">
          <div class="artist-film-frame" id="artistFilmFrame"></div>
        </div>
        <p class="resume-text artist-film-caption" id="artistFilmOverlayTitle">
          ${ARTIST_FILM_COPY}
        </p>
      </div>
    </div>
  `
}

function initArtistFilm(): void {
  const overlayEl = document.getElementById('artistFilmOverlay')
  const triggerEl = document.getElementById('artistFilmTrigger') as HTMLButtonElement | null
  const closeBtnEl = document.getElementById('artistFilmClose') as HTMLButtonElement | null
  const frameEl = document.getElementById('artistFilmFrame')
  if (!overlayEl || !triggerEl || !closeBtnEl || !frameEl) return

  const overlay = overlayEl
  const trigger = triggerEl
  const closeBtn = closeBtnEl
  const frame = frameEl

  let lastFocused: HTMLElement | null = null

  function mountIframe(): void {
    frame.innerHTML = `
      <iframe
        src="${ARTIST_FILM_EMBED_URL}"
        title="왕열 작가 소개 영상"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    `
  }

  function unmountIframe(): void {
    frame.innerHTML = ''
  }

  function getFocusable(): HTMLElement[] {
    return Array.from(
      overlay.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])',
      ),
    )
  }

  function openFilm(): void {
    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : trigger
    overlay.hidden = false
    overlay.classList.add('is-open')
    document.body.classList.add('artist-film-open')
    mountIframe()
    closeBtn.focus()
  }

  function closeFilm(): void {
    overlay.classList.remove('is-open')
    overlay.hidden = true
    document.body.classList.remove('artist-film-open')
    unmountIframe()
    lastFocused?.focus()
  }

  trigger.addEventListener('click', openFilm)
  closeBtn.addEventListener('click', closeFilm)
  overlay.addEventListener('click', event => {
    const target = event.target as HTMLElement
    if (target.dataset.filmClose === 'true') {
      closeFilm()
    }
  })

  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeFilm()
      return
    }

    if (event.key !== 'Tab') return

    const focusable = getFocusable()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
      return
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  })
}

function categoryHtml(title: string, items: string[], isTimeline = false): string {
  return `
    <section class="resume-section">
      <h2 class="resume-category">${title}</h2>
      <div class="resume-stack${isTimeline ? ' resume-stack--timeline' : ''}">
        ${items.map(item => `<div class="resume-text">${item}</div>`).join('')}
      </div>
    </section>
  `
}

function collectionColumnHtml(title: string, items: string[]): string {
  return `
    <section class="collection-block">
      <h3 class="collection-category">${title}</h3>
      <div class="collection-list">
        ${items.map(item => `<div class="collection-item">${item}</div>`).join('')}
      </div>
    </section>
  `
}

function animateArtist(): void {
  gsap.fromTo(
    '.resume-shell > *',
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.06,
      delay: 0.2,
    },
  )
}
