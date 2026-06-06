import { initLoading }  from './shared/loading'
import { initFloatNav } from './shared/nav'
import { initI18n }     from './shared/i18n-engine'
import { initLenis }    from './shared/animation'
import { initCursor }   from './shared/cursor'
import { initMenuOverlay } from './shared/menuOverlay'
import { initHeader }      from './shared/header'
import './styles/reset.css'
import './styles/design-system.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/wall.css'
import './styles/artwork.css'
import './styles/footer.css'
import './styles/animations.css'

const page = document.body.dataset.page

initLoading()
initFloatNav()
initI18n()
initMenuOverlay()
initHeader()
initLenis()
initCursor()

async function route(): Promise<void> {
  switch (page) {
    case 'home': {
      const { initHome } = await import('./pages/home')
      initHome()
      break
    }
    case 'works': {
      const { initWorks } = await import('./pages/works')
      initWorks()
      break
    }
    case 'worlds': {
      const { initWorlds } = await import('./pages/worlds')
      initWorlds()
      break
    }
    case 'artist': {
      const { initArtist } = await import('./pages/artist')
      initArtist()
      break
    }
    case 'collections': {
      const { initCollections } = await import('./pages/collections')
      initCollections()
      break
    }
    case 'artwork': {
      const { initArtwork } = await import('./pages/artwork')
      initArtwork()
      break
    }
  }
}

route()
