import { COLLECTIONS } from '../data/collections'
import { initFadeUp }  from '../shared/animation'
import { gsap }        from 'gsap'

export function initCollections(): void {
  initFadeUp()
  renderCollections()
}

function renderCollections(): void {
  const list = document.getElementById('collectionsList')
  if (!list) return
  list.innerHTML = ''

  const typeLabel: Record<string, string> = {
    museum: '미술관', gallery: '갤러리',
    university: '대학교', government: '정부기관',
  }

  COLLECTIONS.forEach((col, i) => {
    const item = document.createElement('div')
    item.style.cssText = `
      padding: 24px 0;
      border-bottom: 0.5px solid var(--color-ink-faint);
      display: grid;
      grid-template-columns: 120px 1fr 1fr;
      gap: 24px;
      align-items: baseline;
      opacity: 0;
      transform: translateY(16px);
    `

    item.innerHTML = `
      <span style="font-family:var(--font-sans);font-size:var(--text-xs);
        letter-spacing:var(--ls-label);color:var(--color-gold);
        text-transform:uppercase;">${typeLabel[col.type]}</span>
      <span style="font-family:var(--font-serif);font-weight:var(--fw-light);
        font-size:var(--text-lg);letter-spacing:var(--ls-title);
        color:var(--color-ink);">${col.nameKr}</span>
      <span style="font-family:var(--font-sans);font-weight:var(--fw-light);
        font-size:var(--text-xs);letter-spacing:var(--ls-label);
        color:var(--color-ink-muted);text-transform:uppercase;">
        ${col.city} · ${col.country}</span>
    `

    list.appendChild(item)

    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: i * 0.08,
    })
  })
}
