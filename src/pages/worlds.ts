import { WORLDS } from '../data/worlds'
import { initFadeUp } from '../shared/animation'

export function initWorlds(): void {
  initFadeUp()
  renderWorlds()
}

function renderWorlds(): void {
  const grid = document.getElementById('worldsGrid')
  if (!grid) return
  grid.innerHTML = ''

  WORLDS.forEach((world, i) => {
    const item = document.createElement('div')
    item.className = 'world-item fade-up'
    item.style.transitionDelay = `${i * 0.1}s`

    item.innerHTML = `
      <div class="world-img-wrap">
        <img
          src="${world.imageSrc}"
          alt="${world.titleKr}"
          loading="${i === 0 ? 'eager' : 'lazy'}"
          decoding="async"
        />
      </div>
      <div class="world-info">
        <p class="world-kicker">World ${String(i + 1).padStart(2, '0')}</p>
        <h3 class="world-title-en">${world.titleEn}</h3>
        <p class="world-title-kr">${world.titleKr}</p>
        <div class="world-divider"></div>
        <p class="world-desc">${world.descKr}</p>
        <div class="world-keywords">
          ${world.keywords.map(k => `<span class="world-keyword">${k}</span>`).join('')}
        </div>
      </div>
    `

    grid.appendChild(item)
  })
}
