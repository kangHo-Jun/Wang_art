import { gsap } from 'gsap'

export function initMenuOverlay(): void {
  const hamburger = document.getElementById('navHamburger')
  const overlay   = document.getElementById('menuOverlay')
  if (!hamburger || !overlay) return
  const $hamburger = hamburger as HTMLElement
  const $overlay   = overlay as HTMLElement

  const menuLinks = $overlay.querySelectorAll<HTMLElement>('.menu-main a')
  let isOpen = false

  function open(): void {
    isOpen = true
    $overlay.classList.add('open')
    $hamburger.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'

    // 메뉴 항목 stagger 등장
    gsap.fromTo(menuLinks,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.1,
      }
    )
    // 햄버거 → X 변환
    $hamburger.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" stroke-width="1.2"/>
        <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" stroke-width="1.2"/>
      </svg>
    `
    $hamburger.style.color = 'rgba(249,246,237,0.8)'
    $hamburger.setAttribute('aria-label', '메뉴 닫기')

    // 포커스 첫 링크로 이동
    setTimeout(() => menuLinks[0]?.focus(), 300)
  }

  function close(): void {
    isOpen = false
    $overlay.classList.remove('open')
    $hamburger.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''

    // 햄버거 복원
    $hamburger.innerHTML = `
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <line x1="0" y1="1"  x2="20" y2="1"  stroke="currentColor" stroke-width="1.2"/>
        <line x1="0" y1="7"  x2="20" y2="7"  stroke="currentColor" stroke-width="1.2"/>
        <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" stroke-width="1.2"/>
      </svg>
    `
    $hamburger.style.color = ''
    $hamburger.setAttribute('aria-label', '메뉴 열기')
    $hamburger.focus()
  }

  $hamburger.addEventListener('click', () => isOpen ? close() : open())

  // ESC 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close()
  })

  // 현재 페이지 active 표시
  const page = document.body.dataset.page
  $overlay.querySelectorAll<HTMLAnchorElement>('.menu-main a').forEach(a => {
    if (a.dataset.nav === page) {
      a.style.color = 'var(--color-gold)'
    }
  })
}
