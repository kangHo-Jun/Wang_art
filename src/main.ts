import { initLoading }  from './shared/loading'
import { initFloatNav } from './shared/nav'
import { initI18n }     from './shared/i18n-engine'
import './styles/design-system.css'

const page = document.body.dataset.page

initLoading()
initFloatNav()
initI18n()

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
  }
}

route()
