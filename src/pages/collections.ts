import { COLLECTIONS } from '../data/collections'
import { initFadeUp } from '../shared/animation'

export function initCollections(): void {
  initFadeUp()
  renderCollections()
}

function renderCollections(): void {
  const grid = document.querySelector('.collections-grid')
  if (!grid) return
  grid.innerHTML = ''

  const typeLabel: Record<string, string> = {
    museum:     '미술관',
    gallery:    '갤러리',
    university: '대학교',
    government: '정부기관',
  }

  COLLECTIONS.forEach((col, i) => {
    const item = document.createElement('div')
    item.className = 'collection-item fade-up'
    item.style.transitionDelay = `${i * 0.08}s`

    item.innerHTML = `
      <div class="collection-item-inner">
        <span class="collection-type">${typeLabel[col.type] ?? col.type}</span>
        <p class="collection-name-kr">${col.nameKr}</p>
        <p class="collection-name-en">${col.nameEn}</p>
        <p class="collection-location">${col.city} · ${col.country}</p>
      </div>
    `

    grid.appendChild(item)
  })
}
