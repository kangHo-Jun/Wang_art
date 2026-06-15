import { WORLDS_PAGE, type WorldArtworkRef, type WorldChapter } from '../data/worlds'

export function initWorlds(): void {
  const root = document.getElementById('worldsRoot')
  if (!root) return

  renderWorldsPage(root)
  initOriginSequence(root)
  initWorldsReveal(root)
}

function renderWorldsPage(root: HTMLElement): void {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  root.innerHTML = `
    <section class="worlds-origin" id="worldsOrigin">
      <div class="worlds-origin-stage">
        <div class="worlds-origin-dot" id="worldsOriginDot" aria-hidden="true">
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <filter id="worldsInkNoise" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.014 0.018" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="64" />
            </filter>
            <g filter="url(#worldsInkNoise)">
              <circle cx="300" cy="300" r="150" fill="#1b1b1d" opacity=".06" />
              <circle cx="296" cy="304" r="118" fill="#1b1b1d" opacity=".14" />
              <circle cx="302" cy="298" r="86" fill="#1b1b1d" opacity=".82" />
              <circle cx="290" cy="306" r="58" fill="#111113" />
            </g>
          </svg>
        </div>
        <div class="worlds-origin-artwork-shell" id="worldsOriginArtworkShell" aria-hidden="true">
          <img
            class="worlds-origin-artwork"
            id="worldsOriginArtwork"
            src="${assetSrc(base, WORLDS_PAGE.originArtwork.imageSrc)}"
            alt=""
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style="object-position:${WORLDS_PAGE.originArtwork.objectPosition ?? '50% 50%'}"
          />
        </div>
        <div class="worlds-origin-summary" id="worldsOriginSummary">
          <h1>${WORLDS_PAGE.originQuote}</h1>
        </div>
        <div class="worlds-origin-cue" id="worldsOriginCue">
          <span class="worlds-origin-cue-text">Scroll</span>
          <span class="worlds-origin-cue-arrow" aria-hidden="true"></span>
        </div>
      </div>
    </section>
    <div class="worlds-origin-spacer" id="worldsOriginSpacer" aria-hidden="true"></div>
    <section class="worlds-summary worlds-reveal" id="${WORLDS_PAGE.summary.id}">
      <div class="worlds-copy-block">
        <p class="worlds-eyebrow">${WORLDS_PAGE.summary.eyebrow}</p>
        <h2 class="worlds-section-title">${WORLDS_PAGE.summary.title}</h2>
        ${WORLDS_PAGE.summary.subtitle ? `<p class="worlds-subtitle">${WORLDS_PAGE.summary.subtitle}</p>` : ''}
        ${paragraphsHtml(WORLDS_PAGE.summary.paragraphs)}
      </div>
    </section>
    <div class="worlds-axes-label worlds-reveal">
      <span class="worlds-axes-label-text">${WORLDS_PAGE.axesEyebrow}</span>
      <span class="worlds-axes-label-line" aria-hidden="true"></span>
    </div>
    ${chapterHtml(WORLDS_PAGE.world, base)}
    <section class="worlds-signs worlds-reveal" id="${WORLDS_PAGE.signs.id}">
      <div class="worlds-signs-copy">
        <p class="worlds-eyebrow">${WORLDS_PAGE.signs.eyebrow}</p>
        <h2 class="worlds-section-title">${WORLDS_PAGE.signs.title}</h2>
        ${WORLDS_PAGE.signs.subtitle ? `<p class="worlds-subtitle">${WORLDS_PAGE.signs.subtitle}</p>` : ''}
        ${paragraphsHtml(WORLDS_PAGE.signs.paragraphs)}
        <div class="worlds-signs-statements">
          <p class="worlds-signs-statement">${WORLDS_PAGE.signs.statement.horse}</p>
          <p class="worlds-signs-statement">${WORLDS_PAGE.signs.statement.bird}</p>
        </div>
      </div>
      <div class="worlds-signs-grid">
        ${signFigureHtml(WORLDS_PAGE.signs.artworks[0], base, 'horse')}
        ${signFigureHtml(WORLDS_PAGE.signs.artworks[1], base, 'bird')}
      </div>
    </section>
    <section class="worlds-language worlds-reveal" id="${WORLDS_PAGE.language.id}">
      <div class="worlds-language-copy">
        <p class="worlds-eyebrow">${WORLDS_PAGE.language.eyebrow}</p>
        <h2 class="worlds-section-title">${WORLDS_PAGE.language.title}</h2>
        ${WORLDS_PAGE.language.subtitle ? `<p class="worlds-subtitle">${WORLDS_PAGE.language.subtitle}</p>` : ''}
        ${paragraphsHtml(WORLDS_PAGE.language.paragraphs)}
      </div>
      <figure class="worlds-language-figure">
        <img
          class="worlds-language-image"
          src="${assetSrc(base, WORLDS_PAGE.language.artwork.imageSrc)}"
          alt="${WORLDS_PAGE.language.artwork.alt}"
          loading="lazy"
          decoding="async"
          style="object-position:${WORLDS_PAGE.language.artwork.objectPosition ?? '50% 50%'}"
        />
        <figcaption class="worlds-figure-caption">
          <span class="worlds-figure-title">${WORLDS_PAGE.language.artwork.titleKr}</span>
          <span class="worlds-spec-line">${formatSpec(WORLDS_PAGE.language.artwork)}</span>
          <a class="worlds-link worlds-figure-link" href="${artworkHref(base, WORLDS_PAGE.language.artwork.artworkId)}">작품 보기 →</a>
        </figcaption>
      </figure>
      <div class="worlds-language-blocks">
        ${WORLDS_PAGE.language.blocks.map(block => `
          <article class="worlds-language-block">
            <p class="worlds-language-index">${block.eyebrow}</p>
            <h3 class="worlds-language-title">${block.title}</h3>
            <p class="worlds-language-desc">${block.body}</p>
          </article>
        `).join('')}
      </div>
    </section>
    <section class="worlds-conclusion worlds-reveal" id="${WORLDS_PAGE.conclusion.id}">
      <div class="worlds-copy-block">
        <p class="worlds-eyebrow">${WORLDS_PAGE.conclusion.eyebrow}</p>
        <h2 class="worlds-section-title">${WORLDS_PAGE.conclusion.title}</h2>
        ${WORLDS_PAGE.conclusion.subtitle ? `<p class="worlds-subtitle">${WORLDS_PAGE.conclusion.subtitle}</p>` : ''}
        ${paragraphsHtml(WORLDS_PAGE.conclusion.paragraphs)}
      </div>
    </section>
    <section class="worlds-return worlds-reveal">
      <div class="worlds-return-mark" aria-hidden="true"></div>
      <p class="worlds-eyebrow">${WORLDS_PAGE.returnEyebrow}</p>
      <h2 class="worlds-return-title">${WORLDS_PAGE.returnTitle}</h2>
      <p class="worlds-return-body">${WORLDS_PAGE.returnBody}</p>
      <a class="worlds-link worlds-return-link" href="${base}/${WORLDS_PAGE.worksHref}">관련 작품 보기 →</a>
    </section>
  `
}

function chapterHtml(chapter: WorldChapter, base: string): string {
  const reverseClass = chapter.layout === 'figure-first' ? ' worlds-chapter--reverse' : ''

  return `
    <section class="worlds-chapter worlds-reveal${reverseClass}" id="${chapter.id}">
      <div class="worlds-copy-block">
        <p class="worlds-eyebrow">${chapter.eyebrow}</p>
        <h2 class="worlds-section-title">${chapter.title}</h2>
        ${chapter.subtitle ? `<p class="worlds-subtitle">${chapter.subtitle}</p>` : ''}
        ${paragraphsHtml(chapter.paragraphs)}
        ${chapter.note ? `<p class="worlds-note">${chapter.note}</p>` : ''}
      </div>
      <figure class="worlds-chapter-figure">
        <img
          class="worlds-chapter-image"
          src="${assetSrc(base, chapter.artwork.imageSrc)}"
          alt="${chapter.artwork.alt}"
          loading="lazy"
          decoding="async"
          style="object-position:${chapter.artwork.objectPosition ?? '50% 50%'}"
        />
        <figcaption class="worlds-figure-caption">
          <span class="worlds-figure-title">${chapter.artwork.titleKr}</span>
          <span class="worlds-spec-line">${formatSpec(chapter.artwork)}</span>
          <a class="worlds-link worlds-figure-link" href="${artworkHref(base, chapter.artwork.artworkId)}">${chapter.ctaLabel}</a>
        </figcaption>
      </figure>
    </section>
  `
}

function signFigureHtml(artwork: WorldArtworkRef, base: string, kind: 'horse' | 'bird'): string {
  const motionClass = kind === 'bird' ? ' worlds-sign-card--bird' : ''
  return `
    <figure class="worlds-sign-card${motionClass}">
      <img
        class="worlds-sign-image"
        src="${assetSrc(base, artwork.imageSrc)}"
        alt="${artwork.alt}"
        loading="lazy"
        decoding="async"
        style="object-position:${artwork.objectPosition ?? '50% 50%'}"
      />
      <figcaption class="worlds-figure-caption">
        <span class="worlds-figure-title">${artwork.titleKr}</span>
        <span class="worlds-spec-line">${formatSpec(artwork)}</span>
        <a class="worlds-link worlds-figure-link" href="${artworkHref(base, artwork.artworkId)}">작품 보기 →</a>
      </figcaption>
    </figure>
  `
}

function paragraphsHtml(paragraphs: string[]): string {
  return paragraphs.map(paragraph => `<p class="worlds-paragraph">${paragraph}</p>`).join('')
}

function formatSpec(artwork: WorldArtworkRef): string {
  return `${artwork.medium} · L:${artwork.widthCm}cm H:${artwork.heightCm}cm · ${artwork.yearText}`
}

function assetSrc(base: string, path: string): string {
  return `${base}/${path}`
}

function artworkHref(base: string, artworkId: string): string {
  return `${base}/artwork/?id=${artworkId}`
}

function initOriginSequence(root: HTMLElement): void {
  const origin = root.querySelector<HTMLElement>('#worldsOrigin')
  const dot = root.querySelector<SVGElement>('#worldsOriginDot')
  const artworkShell = root.querySelector<HTMLElement>('#worldsOriginArtworkShell')
  const summary = root.querySelector<HTMLElement>('#worldsOriginSummary')
  const cue = root.querySelector<HTMLElement>('#worldsOriginCue')
  const summarySection = root.querySelector<HTMLElement>('#summary')
  if (!origin || !dot || !artworkShell || !summary || !cue) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    origin.classList.add('is-reduced')
    artworkShell.classList.add('is-visible')
    summary.classList.add('is-visible')
    cue.classList.add('is-visible')
    return
  }

  document.documentElement.classList.add('worlds-lock')
  document.body.classList.add('worlds-lock')

  let released = false

  window.setTimeout(() => {
    dot.style.transform = 'translate(-50%, -50%) scale(2.2)'
  }, 200)

  window.setTimeout(() => {
    artworkShell.classList.add('is-visible')
    dot.classList.add('is-fading')
  }, 1800)

  window.setTimeout(() => {
    artworkShell.classList.add('is-muted')
    summary.classList.add('is-visible')
  }, 2900)

  window.setTimeout(() => {
    cue.classList.add('is-visible')
    document.documentElement.classList.remove('worlds-lock')
    document.body.classList.remove('worlds-lock')
    released = true
  }, 4000)

  const dismiss = (): void => {
    if (origin.classList.contains('is-gone')) return
    origin.classList.add('is-gone')
  }

  const onScroll = (): void => {
    if (!released) return
    if (window.scrollY > 40) {
      dismiss()
      window.removeEventListener('scroll', onScroll)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  origin.addEventListener('click', () => {
    if (!released) return
    if (!summarySection) return
    summarySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function initWorldsReveal(root: HTMLElement): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const items = Array.from(root.querySelectorAll<HTMLElement>('.worlds-reveal'))

  if (reduced) {
    items.forEach(item => item.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -10% 0px',
  })

  items.forEach(item => observer.observe(item))
}
