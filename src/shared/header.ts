export function initHeader(): void {
  const navbar = document.getElementById('navbar')
  if (!navbar) return

  let lastY    = window.scrollY
  let ticking  = false

  window.addEventListener('scroll', () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const y = window.scrollY
      if (y > lastY + 10 && y > 80) {
        navbar.classList.add('hidden')
      } else if (y < lastY - 10) {
        navbar.classList.remove('hidden')
      }
      lastY   = y
      ticking = false
    })
  }, { passive: true })
}
