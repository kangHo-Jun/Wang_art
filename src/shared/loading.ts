export function initLoading(): void {
  const loader  = document.getElementById('gLoading')
  const ring    = document.getElementById('gRingFill') as SVGCircleElement | null
  const pctText = document.getElementById('gLoadingPct')
  if (!loader || !ring || !pctText) return

  const CIRCUMFERENCE = 251.2
  const MIN_DURATION  = 2500
  const startTime     = Date.now()

  document.body.style.overflow = 'hidden'

  function setProgress(pct: number): void {
    const p = Math.min(pct, 100)
    ring!.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - p / 100))
    pctText!.textContent = Math.round(p) + '%'
  }

  function finish(): void {
    setProgress(100)
    const delay = Math.max(0, MIN_DURATION - (Date.now() - startTime))
    setTimeout(() => {
      ring!.classList.add('out')
      setTimeout(() => {
        loader!.classList.add('done')
        document.body.style.overflow = ''
      }, 500)
    }, delay)
  }

  const images = [...document.querySelectorAll<HTMLImageElement>('img[src]')]
    .map(img => img.src).filter(Boolean)

  if (images.length === 0) {
    let fake = 0
    const timer = setInterval(() => {
      fake += Math.random() * 12 + 6
      if (fake >= 100) { clearInterval(timer); finish() }
      else setProgress(fake)
    }, 150)
    return
  }

  let loaded = 0
  images.forEach(src => {
    const img = new Image()
    img.onload = img.onerror = () => {
      loaded++
      setProgress((loaded / images.length) * 100)
      if (loaded >= images.length) finish()
    }
    img.src = src
  })

  setTimeout(finish, 5000)
}
