import { initFadeUp } from '../shared/animation'
import { gsap } from 'gsap'

export function initArtist(): void {
  initFadeUp()
  renderResume()
  animateResume()
}

function renderResume(): void {
  const container = document.getElementById('artistBody')
  if (!container) return
  container.innerHTML = ''

  // 1. Download Link
  const downloadLink = document.createElement('a')
  downloadLink.href = '#'
  downloadLink.className = 'download'
  
  const downloadText = document.createElement('div')
  downloadText.className = 'download-text'
  downloadText.textContent = 'Download CV'
  downloadLink.appendChild(downloadText)
  container.appendChild(downloadLink)

  // 2. Profile Intro
  const intro = document.createElement('div')
  intro.className = 'resume-text'
  intro.innerHTML = `Born in 1957, Korea<br>B.F.A, M.F.A, Ph.D in Fine Arts, Hongik University<br>Resides and works in Seoul, Korea`
  container.appendChild(intro)

  // 3. Education
  createCategory(container, 'Education')
  createEntry(container, 'Ph.D. in Fine Arts, Graduate School of Hongik University, Seoul, Korea')
  createEntry(container, 'M.F.A. in Fine Arts, Graduate School of Hongik University, Seoul, Korea')
  createEntry(container, 'B.F.A. in Fine Arts, Hongik University, Seoul, Korea')

  // 4. Exhibitions — placeholder until verified data is provided
  createCategory(container, 'Selected Exhibitions')
  createEntry(container, 'Exhibition history will be updated.')
}

function createCategory(parent: HTMLElement, name: string): void {
  const cat = document.createElement('div')
  cat.className = 'resume-category'
  cat.textContent = name
  parent.appendChild(cat)
}

function createEntry(parent: HTMLElement, html: string): void {
  const text = document.createElement('div')
  text.className = 'resume-text'
  text.innerHTML = html
  parent.appendChild(text)
}

function animateResume(): void {
  gsap.fromTo(
    '.resume > *',
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 0.2
    }
  )
}
