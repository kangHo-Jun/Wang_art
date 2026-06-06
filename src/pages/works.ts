import { gsap }      from 'gsap'
import { ARTWORKS }  from '../data/artworks'
import { initFadeUp } from '../shared/animation'
import type { Artwork } from '../types'

function folderOf(art: Artwork): string {
  const parts = art.imageSrc.split('/')
  return parts[parts.length - 2] ?? ''
}

export function initWorks(): void {
  initFadeUp()
  renderWall(ARTWORKS)
}

function renderWall(artworks: Artwork[]): void {
  const grid = document.getElementById('wallGrid')
  if (!grid) return
  grid.innerHTML = ''

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  artworks.forEach((art) => {
    const item = document.createElement('div')
    item.className = 'wall-item'
    item.setAttribute('role', 'listitem')
    item.setAttribute('tabindex', '0')
    item.setAttribute('aria-label', `${art.titleKr}, ${art.year}`)
    item.dataset.artworkId = art.id
    item.dataset.folder    = folderOf(art)

    const img = document.createElement('img')
    img.src      = `${base}/${art.imageSrc}`
    img.alt      = `${art.titleEn}, ${art.year}`
    img.loading  = 'lazy'
    img.decoding = 'async'

    item.appendChild(img)

    // 클릭 → 작품 상세 (추후 artwork 페이지로 연결)
    item.addEventListener('click', () => {
      gsap.to(item, {
        opacity: 0,
        scale: 0.98,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          // 추후 artwork 상세 페이지로 라우팅
          console.log('artwork:', art.id)
          gsap.to(item, { opacity: 1, scale: 1, duration: 0 })
        }
      })
    })

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') item.click()
    })

    grid.appendChild(item)
  })

  // GSAP stagger 등장
  gsap.fromTo('.wall-item',
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.04,
    }
  )
}
