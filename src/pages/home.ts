import { FEATURED }              from '../data/artworks'
import { initViewer }            from '../shared/viewer'
import { initFadeUp, kenBurns } from '../shared/animation'

export function initHome(): void {
  initFadeUp()
  renderFeaturedGrid()
  initViewer(FEATURED)
  initHeroSlideshow()
}

function renderFeaturedGrid(): void {
  const grid = document.getElementById('selectedWorksGrid')
  if (!grid) return

  const base = (document.body.dataset.assetBase ?? '.').replace(/\/$/, '')
  grid.innerHTML = ''
  grid.removeAttribute('aria-busy')

  FEATURED.forEach(art => {
    const card = document.createElement('article')
    card.className = 'selected-work-card'
    card.setAttribute('role', 'listitem')
    card.dataset.artworkId = art.id
    card.innerHTML = `
      <div class="selected-work-media">
        <img
          src="${base}/${art.imageSrc}"
          alt="${art.titleEn}"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="selected-work-label">
        <p class="selected-work-title">${art.titleKr}</p>
        <p class="selected-work-meta">${art.year} · ${art.mediumKr}</p>
      </div>
    `
    grid.appendChild(card)
  })
}

function initHeroSlideshow(): void {
  if (!FEATURED.length) return

  const base     = (document.body.dataset.assetBase ?? '.').replace(/\/$/, '')
  const imgEl    = document.getElementById('heroFeatureImage') as HTMLImageElement
  const titleEl  = document.getElementById('heroTitleEn')
  const yearEl   = document.getElementById('heroYear')
  const mediumEl = document.getElementById('heroMedium')
  const sizeEl   = document.getElementById('heroSize')
  if (!imgEl) return

  let current = 0
  let timer: ReturnType<typeof setTimeout>

  function goTo(idx: number): void {
    current = (idx + FEATURED.length) % FEATURED.length
    const art = FEATURED[current]

    imgEl.style.opacity = '0'
    setTimeout(() => {
      imgEl.src = `${base}/${art.imageSrc}`
      imgEl.alt = `${art.titleEn}, ${art.year}, ${art.mediumKr}, ${art.size}`
      if (titleEl)  titleEl.textContent  = art.titleEn
      if (yearEl)   yearEl.textContent   = String(art.year)
      if (mediumEl) mediumEl.textContent = art.medium
      if (sizeEl)   sizeEl.textContent   = art.size
      imgEl.style.opacity = '1'
      kenBurns(imgEl)
      updateDots()
    }, 600)
  }

  function updateDots(): void {
    document.querySelectorAll('.hero-slide-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current)
    })
  }

  function startTimer(): void {
    clearTimeout(timer)
    timer = setTimeout(() => {
      goTo(current + 1)
      startTimer()
    }, 5000)
  }

  goTo(0)
  startTimer()

  const hero = document.getElementById('hero')
  hero?.addEventListener('mouseenter', () => clearTimeout(timer))
  hero?.addEventListener('mouseleave', startTimer)
}
