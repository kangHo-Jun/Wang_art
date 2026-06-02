export function initFadeUp(): void {
  const els = document.querySelectorAll<HTMLElement>('.fade-up')
  if (!els.length) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    els.forEach(el => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  els.forEach(el => observer.observe(el))
}

export function kenBurns(el: HTMLElement, duration = 12000): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  el.style.transition = `transform ${duration}ms ease-out`
  el.style.transform  = 'scale(1)'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.transform = 'scale(1.04)'
    })
  })
}

export function countUp(el: HTMLElement, target: number, duration = 1500): void {
  const start = performance.now()
  function step(now: number) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    el.textContent = String(Math.round(ease * target))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
