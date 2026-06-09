import { COLLECTIONS } from '../data/collections'
import { initFadeUp }  from '../shared/animation'
import { gsap }        from 'gsap'

export function initCollections(): void {
  initFadeUp()
  renderCollections()
  animateCollections()
}

function renderCollections(): void {
  const container = document.getElementById('collectionsContainer')
  if (!container) return
  container.innerHTML = ''

  // Split collections into Column 1 (Museums) and Column 2 (Others)
  const col1Data = COLLECTIONS.filter(c => c.type === 'museum')
  const col2Data = COLLECTIONS.filter(c => c.type !== 'museum')

  // Create Column 1
  const block1 = document.createElement('div')
  block1.className = 'contact-block'

  const cat1 = document.createElement('div')
  cat1.className = 'contact-category'
  cat1.textContent = 'Public Museums'
  block1.appendChild(cat1)

  col1Data.forEach(col => {
    const link = document.createElement('div')
    link.className = 'location-link'
    
    const title = document.createElement('div')
    title.className = 'location-title'
    title.textContent = col.nameEn
    
    const meta = document.createElement('div')
    meta.className = 'location-meta'
    meta.textContent = `${col.nameKr} · ${col.city}, ${col.country}`
    
    link.appendChild(title)
    link.appendChild(meta)
    block1.appendChild(link)
  })

  // Create Column 2
  const block2 = document.createElement('div')
  block2.className = 'contact-block'

  const cat2 = document.createElement('div')
  cat2.className = 'contact-category'
  cat2.textContent = 'Public & Institutional Collections'
  block2.appendChild(cat2)

  col2Data.forEach(col => {
    const link = document.createElement('div')
    link.className = 'location-link'
    
    const title = document.createElement('div')
    title.className = 'location-title'
    title.textContent = col.nameEn
    
    const meta = document.createElement('div')
    meta.className = 'location-meta'
    meta.textContent = `${col.nameKr} · ${col.city}, ${col.country}`
    
    link.appendChild(title)
    link.appendChild(meta)
    block2.appendChild(link)
  })

  container.appendChild(block1)
  container.appendChild(block2)
}

function animateCollections(): void {
  gsap.fromTo(
    '.contact-block',
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.2
    }
  )
}
