import { initFadeUp } from '../shared/animation'
import { gsap } from 'gsap'

const ARTIST_NAME = '왕열 Wang Yeul'

const ARTIST_META = 'b. 1960 · 한국화 Korean Painting · 미술 교과서 등재'

const ARTIST_INTRO_ONE = `
  1960년 출생. <span class="text-span-bold">단국대학교 예술대학 교수 역임(1994–2020)</span>했으며, 서울을 기반으로 작업하고 있다.
  그의 작품은 <span class="text-span-bold">중·고등학교 미술 교과서에 등재</span>되어 한국 현대미술의 한 위치를 점하고 있다.
`

const ARTIST_INTRO_TWO = `
  전통 수묵의 정신을 현대 회화의 언어로 확장하며, 무릉도원이라는 역설을 평생의 주제로 그려왔다.
  그의 화면에서 산수와 말, 새와 색은 단순한 소재가 아니라 인간이 머물고자 하는 내면의 장소를 향한 상징으로 작동한다.
`

const EDUCATION = [
  '홍익대학교 미술대학 및 대학원 동양화과 졸업',
  '홍익대학교 대학원 미술학 박사',
  '남대전고등학교 졸업',
]

const EXHIBITIONS = [
  '<span class="resume-year">2026</span><span class="resume-detail"><span class="text-span-bold">개인전 87회</span> — 한국·중국·일본·독일·미국·프랑스 등</span>',
  '<span class="resume-year"></span><span class="resume-detail">단체전 600여 회 참여</span>',
  '<span class="resume-year">1994–2020</span><span class="resume-detail"><span class="text-span-bold">단국대학교 예술대학 교수 역임</span></span>',
  '<span class="resume-year"></span><span class="resume-detail">대한민국미술대전 심사위원 역임</span>',
]

const AWARDS = [
  '한국미술평론가협회 작가상 — 한국미술평론가협회',
  '동아미술제 동아미술상 — 동아일보사',
  '한국미술작가대상 — 한국미술작가대상 운영위원회',
  '대한민국미술대전 특선 3회',
]

const PUBLIC_MUSEUMS = [
  '국립현대미술관',
  '경기도미술관',
  '대전시립미술관',
  '천안시립미술관',
  '성곡미술관',
  '성남아트센터',
  '워커힐 미술관',
]

const INSTITUTIONAL_COLLECTIONS = [
  '청와대',
  '홍익대학교 현대미술관',
  '고려대학교 박물관',
  '한국은행 · 한국해외홍보처',
  '한국종합예술학교',
  '갤러리 상 · 호텔프리마',
  '천안시청 · 한남더힐 등',
]

export function initArtist(): void {
  initFadeUp()
  renderArtist()
  animateArtist()
}

function renderArtist(): void {
  const container = document.getElementById('artistBody')
  if (!container) return
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  container.innerHTML = `
    <section class="resume-shell">
      <a href="#" class="download" aria-disabled="true">Download CV</a>

      <section class="resume-top">
        <div class="resume-top-copy">
          <div class="resume-text resume-text--name">${ARTIST_NAME}</div>
          <div class="resume-text resume-text--meta">${ARTIST_META}</div>
          <div class="resume-category resume-category--intro">작가</div>
          <div class="resume-text resume-text--lead">${ARTIST_INTRO_ONE}</div>
          <div class="resume-text resume-text--lead resume-text--lead-secondary">${ARTIST_INTRO_TWO}</div>
        </div>
        <figure class="resume-photo">
          <img
            src="${base}/images/artist/wang-yeul-studio.jpg"
            alt="작업실에서 붓을 들고 있는 왕열 작가"
            class="resume-photo-image"
            loading="eager"
            decoding="async"
          />
        </figure>
      </section>

      ${categoryHtml('Education', EDUCATION)}
      ${categoryHtml('Exhibitions & Career', EXHIBITIONS, true)}
      ${categoryHtml('Awards', AWARDS)}

      <section class="collections-section">
        <h2 class="resume-category">Public & Institutional Collections</h2>
        <div class="collections-grid">
          ${collectionColumnHtml('Public Museums', PUBLIC_MUSEUMS)}
          ${collectionColumnHtml('Institutional & Corporate', INSTITUTIONAL_COLLECTIONS)}
        </div>
      </section>
    </section>
  `
}

function categoryHtml(title: string, items: string[], isTimeline = false): string {
  return `
    <section class="resume-section">
      <h2 class="resume-category">${title}</h2>
      <div class="resume-stack${isTimeline ? ' resume-stack--timeline' : ''}">
        ${items.map(item => `<div class="resume-text">${item}</div>`).join('')}
      </div>
    </section>
  `
}

function collectionColumnHtml(title: string, items: string[]): string {
  return `
    <section class="collection-block">
      <h3 class="collection-category">${title}</h3>
      <div class="collection-list">
        ${items.map(item => `<div class="collection-item">${item}</div>`).join('')}
      </div>
    </section>
  `
}

function animateArtist(): void {
  gsap.fromTo(
    '.resume-shell > *',
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.06,
      delay: 0.2,
    },
  )
}
