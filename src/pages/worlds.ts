import { WORLDS_PAGE, type WorldArtworkRef, type WorldAxisSection } from '../data/worlds'

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
            <g id="worldsOriginInkGroup" filter="url(#worldsInkNoise)">
              <circle cx="300" cy="300" r="150" fill="currentColor" opacity=".06" />
              <circle cx="296" cy="304" r="118" fill="currentColor" opacity=".14" />
              <circle cx="302" cy="298" r="86" fill="currentColor" opacity=".82" />
              <circle cx="290" cy="306" r="58" fill="currentColor" />
            </g>
          </svg>
        </div>
        <div class="worlds-origin-artwork-shell" id="worldsOriginArtworkShell" aria-hidden="true">
          <img
            class="worlds-origin-artwork"
            src="${assetSrc(base, WORLDS_PAGE.originArtwork.imageSrc)}"
            alt=""
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style="object-position:${WORLDS_PAGE.originArtwork.objectPosition ?? '50% 50%'}"
          />
        </div>
        <div class="worlds-origin-summary" id="worldsOriginSummary">
          <h1>${WORLDS_PAGE.originQuoteHtml}</h1>
        </div>
        <div class="worlds-origin-cue" id="worldsOriginCue">
          <span class="worlds-origin-cue-text">Scroll</span>
          <span class="worlds-origin-cue-arrow" aria-hidden="true"></span>
        </div>
      </div>
    </section>
    <div class="worlds-origin-spacer" aria-hidden="true"></div>
    <section class="worlds-summary worlds-reveal r-quiet" id="${WORLDS_PAGE.summary.id}">
      <div class="worlds-copy-block">
        ${WORLDS_PAGE.summary.title ? `<h2 class="worlds-section-title">${WORLDS_PAGE.summary.title}</h2>` : ''}
        ${summaryHtml(WORLDS_PAGE.summary.paragraphs)}
      </div>
    </section>
    <div class="worlds-axes-label worlds-reveal r-quiet">
      <span class="worlds-axes-label-text">${WORLDS_PAGE.axesEyebrow}</span>
      <span class="worlds-axes-label-line" aria-hidden="true"></span>
    </div>
    ${axisSectionHtml(WORLDS_PAGE.world, base)}
    ${axisSectionHtml(WORLDS_PAGE.signs, base)}
    ${languageSectionHtml(WORLDS_PAGE.language, base)}
    <section class="worlds-conclusion worlds-reveal r-quiet" id="${WORLDS_PAGE.conclusion.id}">
      <div class="worlds-copy-block">
        ${WORLDS_PAGE.conclusion.title ? `<h2 class="worlds-section-title">${WORLDS_PAGE.conclusion.title}</h2>` : ''}
        ${paragraphsHtml(WORLDS_PAGE.conclusion.paragraphs)}
      </div>
    </section>
    <section class="worlds-return worlds-reveal r-quiet">
      <div class="worlds-return-line" aria-hidden="true"></div>
      <div class="worlds-return-mark" aria-hidden="true"></div>
      <p class="worlds-eyebrow">${WORLDS_PAGE.returnEyebrow}</p>
      <h2 class="worlds-return-title">${WORLDS_PAGE.returnTitle}</h2>
      ${WORLDS_PAGE.returnBody ? `<p class="worlds-return-body">${WORLDS_PAGE.returnBody}</p>` : ''}
      <a class="worlds-link worlds-return-link" href="${base}/${WORLDS_PAGE.worksHref}">관련 작품 보기 →</a>
    </section>
  `
}

function axisSectionHtml(section: WorldAxisSection, base: string): string {
  const reverseClass = section.layout === 'figure-first' ? ' worlds-axis--reverse' : ''
  const sectionClass = `worlds-axis worlds-axis--${section.id}${reverseClass}`
  const config = axisRevealConfig(section.id)

  return `
    <section class="${sectionClass}" id="${section.id}">
      <div class="worlds-copy-block">
        <p class="worlds-eyebrow worlds-reveal r-quiet"${revealStyle(config.eyebrowDelay)}>${section.eyebrow}</p>
        <h2 class="worlds-section-title worlds-reveal r-strong"${revealStyle(config.titleDelay)}>${section.title}</h2>
        ${section.subtitle ? `<p class="worlds-subtitle worlds-reveal r-quiet"${revealStyle(config.subtitleDelay)}>${section.subtitle}</p>` : ''}
        ${paragraphsHtml(section.paragraphs, config.paragraphDelay, config.paragraphStep)}
        <div class="worlds-axis-items worlds-reveal r-quiet"${revealStyle(config.itemsDelay)}>
          <p class="worlds-axis-items-title">이 축을 이루는 것들</p>
          ${section.items.map(item => `
            <article class="worlds-axis-item">
              <h3 class="worlds-axis-item-title">${item.title}</h3>
              <p class="worlds-axis-item-body">${item.body}</p>
            </article>
          `).join('')}
        </div>
      </div>
      <div class="worlds-axis-media${section.artworks.length > 1 ? ' worlds-axis-media--stack' : ''}">
        ${section.artworks.map((artwork, index) => artworkFigureHtml(artwork, base, section.ctaLabel, section.id, config.mediaDelay + (config.mediaStep * index))).join('')}
      </div>
    </section>
  `
}

function languageSectionHtml(section: WorldAxisSection, base: string): string {
  return `
    <section class="worlds-language" id="${section.id}">
      <div class="worlds-language-head">
        <div class="worlds-language-lead">
          <p class="worlds-eyebrow worlds-reveal r-quiet">${section.eyebrow}</p>
          <h2 class="worlds-section-title worlds-reveal r-strong"${revealStyle(0.04)}>${section.title}</h2>
          ${section.subtitle ? `<p class="worlds-subtitle worlds-reveal r-quiet"${revealStyle(0.08)}>${section.subtitle}</p>` : ''}
        </div>
        <div class="worlds-language-copy">
          ${paragraphsHtml(section.paragraphs, 0.14, 0.08)}
        </div>
      </div>
      <div class="worlds-language-grid">
        ${section.artworks.map((artwork, index) => languageCellHtml(artwork, section.items[index], base, section.ctaLabel, index)).join('')}
      </div>
    </section>
  `
}

function artworkFigureHtml(
  artwork: WorldArtworkRef,
  base: string,
  ctaLabel: string,
  sectionId: string,
  delay: number,
): string {
  const languageClass = sectionId === 'language' ? ' worlds-axis-figure--language' : ''

  return `
    <figure class="worlds-axis-figure worlds-reveal r-strong${languageClass}"${revealStyle(delay)}>
      ${artwork.axisLabel ? `<p class="worlds-axis-image-label">${artwork.axisLabel}</p>` : ''}
      <img
        class="worlds-axis-image"
        src="${assetSrc(base, artwork.imageSrc)}"
        alt="${artwork.alt}"
        loading="lazy"
        decoding="async"
        style="object-position:${artwork.objectPosition ?? '50% 50%'}"
      />
      <figcaption class="worlds-figure-caption">
        <span class="worlds-figure-title">${artwork.titleKr}</span>
        <span class="worlds-figure-separator" aria-hidden="true">/</span>
        <span class="worlds-spec-line">${formatSpec(artwork)}</span>
        <a class="worlds-link worlds-figure-link" href="${artworkHref(base, artwork.artworkId)}">${ctaLabel}</a>
      </figcaption>
    </figure>
  `
}

function languageCellHtml(
  artwork: WorldArtworkRef,
  item: WorldAxisSection['items'][number] | undefined,
  base: string,
  ctaLabel: string,
  index: number,
): string {
  return `
    <article class="worlds-language-cell worlds-reveal r-strong"${revealStyle(index * 0.1)}>
      ${artwork.axisLabel ? `<p class="worlds-axis-image-label">${formatAxisLabel(artwork.axisLabel)}</p>` : ''}
      <img
        class="worlds-language-image"
        src="${assetSrc(base, artwork.imageSrc)}"
        alt="${artwork.alt}"
        loading="lazy"
        decoding="async"
        style="object-position:${artwork.objectPosition ?? '50% 50%'}"
      />
      <div class="worlds-language-caption">
        <span class="worlds-figure-title">${artwork.titleKr}</span>
        <span class="worlds-figure-separator" aria-hidden="true">/</span>
        <span class="worlds-spec-line">${formatSpec(artwork)}</span>
      </div>
      ${item ? `
        <div class="worlds-language-note">
          <h3 class="worlds-axis-item-title">${item.title}</h3>
          <p class="worlds-axis-item-body">${item.body}</p>
        </div>
      ` : ''}
      <a class="worlds-link worlds-language-link" href="${artworkHref(base, artwork.artworkId)}">${ctaLabel}</a>
    </article>
  `
}

function formatAxisLabel(label: string): string {
  const match = label.match(/^(.*)\s+([A-Z]+)$/)
  if (!match) return label
  return `${match[1]} <em>${match[2]}</em>`
}

function summaryHtml(paragraphs: string[]): string {
  if (paragraphs.length === 0) return ''

  const [lede, ...body] = paragraphs

  return `
    <p class="worlds-paragraph worlds-summary-lede">${lede}</p>
    ${body.length > 0 ? `
      <div class="worlds-summary-body">
        ${body.map(paragraph => `<p class="worlds-paragraph">${paragraph}</p>`).join('')}
      </div>
    ` : ''}
  `
}

function paragraphsHtml(paragraphs: string[], baseDelay = 0, step = 0): string {
  return paragraphs.map((paragraph, index) => `
    <p class="worlds-paragraph worlds-reveal r-quiet"${revealStyle(baseDelay + (step * index))}>${paragraph}</p>
  `).join('')
}

function revealStyle(delay: number): string {
  return delay > 0 ? ` style="--reveal-delay:${delay.toFixed(2)}s"` : ''
}

function axisRevealConfig(sectionId: string): {
  eyebrowDelay: number
  titleDelay: number
  subtitleDelay: number
  paragraphDelay: number
  paragraphStep: number
  itemsDelay: number
  mediaDelay: number
  mediaStep: number
} {
  switch (sectionId) {
    case 'world':
      return {
        eyebrowDelay: 0,
        titleDelay: 0.04,
        subtitleDelay: 0.08,
        paragraphDelay: 0.12,
        paragraphStep: 0.1,
        itemsDelay: 0.22,
        mediaDelay: 0.34,
        mediaStep: 0,
      }
    case 'signs':
      return {
        eyebrowDelay: 0.15,
        titleDelay: 0.19,
        subtitleDelay: 0.23,
        paragraphDelay: 0.27,
        paragraphStep: 0.1,
        itemsDelay: 0.41,
        mediaDelay: 0,
        mediaStep: 0,
      }
    case 'language':
      return {
        eyebrowDelay: 0,
        titleDelay: 0.04,
        subtitleDelay: 0.08,
        paragraphDelay: 0.14,
        paragraphStep: 0.08,
        itemsDelay: 0.3,
        mediaDelay: 0,
        mediaStep: 0.1,
      }
    default:
      return {
        eyebrowDelay: 0,
        titleDelay: 0.04,
        subtitleDelay: 0.08,
        paragraphDelay: 0.12,
        paragraphStep: 0.08,
        itemsDelay: 0.22,
        mediaDelay: 0.12,
        mediaStep: 0,
      }
  }
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
  const inkGroup = root.querySelector<SVGGElement>('#worldsOriginInkGroup')
  const artworkShell = root.querySelector<HTMLElement>('#worldsOriginArtworkShell')
  const summary = root.querySelector<HTMLElement>('#worldsOriginSummary')
  const cue = root.querySelector<HTMLElement>('#worldsOriginCue')
  const worldSection = root.querySelector<HTMLElement>('#world')
  if (!origin || !dot || !artworkShell || !summary || !cue) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    artworkShell.classList.add('is-visible')
    summary.classList.add('is-visible')
    cue.classList.add('is-visible')
    return
  }

  document.documentElement.classList.add('worlds-lock')
  document.body.classList.add('worlds-lock')
  dot.classList.add('is-animating')
  artworkShell.classList.add('is-animating')

  let released = false
  let cleaned = false

  const unlock = (): void => {
    document.documentElement.classList.remove('worlds-lock')
    document.body.classList.remove('worlds-lock')
  }

  const cleanup = (): void => {
    if (cleaned) return
    dot.classList.remove('is-animating')
    artworkShell.classList.remove('is-animating')
    dot.classList.add('is-complete')
    cleaned = true
  }

  const removeInkFilter = (): void => {
    inkGroup?.removeAttribute('filter')
  }

  // Step 1: ink expands.
  window.setTimeout(() => {
    dot.style.transform = 'translate(-50%, -50%) scale(2.2)'
  }, 200)

  // Step 2: crossfade to artwork and drop the heavy SVG filter.
  window.setTimeout(() => {
    removeInkFilter()
    artworkShell.classList.add('is-visible')
    dot.classList.add('is-fading')
  }, 1700)

  // Step 3: surface the lede while the artwork recedes.
  window.setTimeout(() => {
    artworkShell.classList.add('is-muted')
    summary.classList.add('is-visible')
  }, 2700)

  // Step 4: release scroll and remove transient rendering hints.
  window.setTimeout(() => {
    cue.classList.add('is-visible')
    unlock()
    cleanup()
    released = true
  }, 3800)

  const onScroll = (): void => {
    if (!released) return
    if (window.scrollY > 40) {
      origin.classList.add('is-gone')
      window.removeEventListener('scroll', onScroll)
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  origin.addEventListener('click', () => {
    if (!released || !worldSection) return
    worldSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
