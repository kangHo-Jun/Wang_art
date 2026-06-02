import type { PageId } from '../types'

export function initFloatNav(): void {
  const existing = document.getElementById('gFloatNav')
  if (existing) existing.remove()

  const path = location.pathname
  const isRoot = path.endsWith('/Wang_art/')
               || path.endsWith('/Wang_art/index.html')
               || path === '/'

  const base = isRoot ? './' : '../'

  const links: { nav: PageId; label: string }[] = [
    { nav: 'home',        label: '대표작품' },
    { nav: 'works',       label: '작품'     },
    { nav: 'worlds',      label: '작품세계' },
    { nav: 'artist',      label: '작가'     },
    { nav: 'collections', label: '소장처'   },
  ]

  const navEl = document.createElement('nav')
  navEl.id = 'gFloatNav'
  navEl.className = 'g-float-nav'
  navEl.setAttribute('aria-label', '플로팅 네비게이션')

  const page = document.body.dataset.page as PageId

  links.forEach((item, i) => {
    const a = document.createElement('a')
    const href = item.nav === 'home'
      ? base
      : `${base}${item.nav}/`
    a.href = href
    a.className = 'g-float-link' + (item.nav === page ? ' active' : '')
    a.dataset.nav = item.nav
    a.textContent = item.label
    navEl.appendChild(a)

    if (i < links.length - 1) {
      const div = document.createElement('div')
      div.className = 'g-float-divider'
      navEl.appendChild(div)
    }
  })

  document.body.appendChild(navEl)

  let lastY = window.scrollY
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    if      (y > lastY + 10) navEl.classList.add('hidden')
    else if (y < lastY - 10) navEl.classList.remove('hidden')
    lastY = y
  }, { passive: true })
}
