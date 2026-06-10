export function initMenuOverlay(): void {
  const btn  = document.getElementById('menuBtnMobile') as HTMLButtonElement | null
  const menu = document.querySelector<HTMLElement>('.nav-menu')
  if (!btn || !menu) return

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open')
    btn.classList.toggle('active', isOpen)
    btn.setAttribute('aria-expanded', String(isOpen))
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open')
      btn.classList.remove('active')
      btn.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    }
  })
}
