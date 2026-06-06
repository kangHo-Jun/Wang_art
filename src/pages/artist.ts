import { initFadeUp } from '../shared/animation'
import { gsap } from 'gsap'

export function initArtist(): void {
  initFadeUp()
  initArtistHero()
}

function initArtistHero(): void {
  // 작가 소개 텍스트 스태거 등장
  gsap.fromTo(
    '.about-archival-block > *',
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 0.3,
    }
  )
}
