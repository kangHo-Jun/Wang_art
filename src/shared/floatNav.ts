import type { PageId } from '../types'

export function initFloatNav(): void {
  const existing = document.getElementById('gFloatNav')
  if (existing) existing.remove()

  const base = import.meta.env.BASE_URL          // '/Wang_art/'
  const page = document.body.dataset.page as PageId

  const links: { id: PageId; label: string; href: string }[] = [
    { id: 'home',        label: '대표작품', href: base                    },
    { id: 'works',       label: '작품',     href: `${base}works/`         },
    { id: 'worlds',      label: '작품세계', href: `${base}worlds/`        },
    { id: 'artist',      label: '작가',     href: `${base}artist/`        },
    { id: 'collections', label: '소장처',   href: `${base}collections/`   },
  ]

  const nav = document.createElement('nav')
  nav.id = 'gFloatNav'
  nav.className = 'g-float-nav'
  nav.setAttribute('aria-label', '플로팅 네비게이션')

  links.forEach((item, i) => {
    const a = document.createElement('a')
    a.href = item.href
    a.className = 'g-float-link' + (item.id === page ? ' active' : '')
    a.textContent = item.label
    nav.appendChild(a)

    if (i < links.length - 1) {
      const sep = document.createElement('div')
      sep.className = 'g-float-divider'
      nav.appendChild(sep)
    }
  })

  document.body.appendChild(nav)

  let lastY = window.scrollY
  let ticking = false
  window.addEventListener('scroll', () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const y = window.scrollY
      if      (y > lastY + 10 && y > 80) nav.classList.add('hidden')
      else if (y < lastY - 10)           nav.classList.remove('hidden')
      lastY   = y
      ticking = false
    })
  }, { passive: true })
}
