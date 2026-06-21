const LOCATION_LABEL = 'LOCATION'
const CONTACT_LABEL = 'CONTACT'

const ADDRESS_KR = [
  '경기도 평택시 진위면 진위2산단로 140',
  '더퍼스트타워평택 830호',
]

const ADDRESS_EN = [
  'Room 830, The First Tower Pyeongtaek,',
  '140 Jinwi 2 Sandan-ro, Jinwi-myeon,',
  'Pyeongtaek-si, Gyeonggi-do, Korea',
]

const NAVER_MAP_URL =
  'https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%ED%8F%89%ED%83%9D%EC%8B%9C%20%EC%A7%84%EC%9C%84%EB%A9%B4%20%EC%A7%84%EC%9C%842%EC%82%B0%EB%8B%A8%EB%A1%9C%20140%20%EB%8D%94%ED%8D%BC%EC%8A%A4%ED%8A%B8%ED%83%80%EC%9B%8C%ED%8F%89%ED%83%9D%20830%ED%98%B8'

const EMAIL = 'wangyeul2963296@gmail.com'
const EMAIL_HREF = `https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=Wang%20Yeul%20Inquiry`
const EMAIL_LABEL = 'Email'
const INSTAGRAM_LABEL = 'Instagram @wang_yeul'
const INSTAGRAM_URL = 'https://www.instagram.com/wang_yeul/'
const NEWSLETTER_LABEL = 'Newsletter'
const NEWSLETTER_URL = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/#newsletter`

const CONTACT_IMAGES = [
  {
    id: 'horse',
    className: 'contact-slide--horse',
    src: '/images/contact/studio-horse.jpg',
    alt: '흰 말 조형물이 놓인 왕열 작업실',
  },
  {
    id: 'studio',
    className: 'contact-slide--studio',
    src: '/images/contact/studio-view.jpg',
    alt: '밝은 창가가 보이는 왕열 작업실 전경',
  },
]

export function initContact(): void {
  renderContact()
  initContactLinkStates()
  initSlider()
}

function renderContact(): void {
  const container = document.getElementById('contactContainer')
  if (!container) return

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  container.innerHTML = `
    <section class="contact-page">
      <section class="contact-container contact-info">
        <div class="contact-block contact-block--location">
          <p class="contact-label">${LOCATION_LABEL}</p>
          <a
            href="${NAVER_MAP_URL}"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-address"
          >
            <span class="contact-address-block contact-address-ko">
              <span class="contact-address-ko-line">${ADDRESS_KR[0].replace(' 진위2산단로 140', '')}</span>
              <span class="contact-address-ko-line">진위2산단로 140</span>
              <span class="contact-address-ko-line">${ADDRESS_KR[1]}</span>
            </span>
            <span class="contact-address-block contact-address-en">
              <span>${ADDRESS_EN[0]}</span>
              <span>${ADDRESS_EN[1]}</span>
              <span>${ADDRESS_EN[2]}</span>
            </span>
          </a>
        </div>

        <div class="contact-block contact-block--contact">
          <p class="contact-label">${CONTACT_LABEL}</p>
          <div class="contact-lines">
            <a href="${EMAIL_HREF}" target="_blank" class="contact-row contact-email-link">${EMAIL_LABEL}</a>
            <a
              href="${INSTAGRAM_URL}"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-row contact-link"
            >${INSTAGRAM_LABEL}</a>
            <a
              href="${NEWSLETTER_URL}"
              class="contact-row contact-link"
            >${NEWSLETTER_LABEL}</a>
          </div>
        </div>
      </section>

      <section
        class="contact-studio"
        id="contactSlider"
        aria-label="작업실 이미지"
      >
        <div class="contact-studio-slider">
        ${CONTACT_IMAGES.map((image, index) => `
          <figure class="contact-studio-slide contact-slide ${image.className}${index === 0 ? ' is-active' : ''}" data-slide="${index}">
            <img
              src="${base}${image.src}"
              alt="${image.alt}"
              class="contact-slide-image"
              loading="${index === 0 ? 'eager' : 'lazy'}"
              decoding="async"
            />
          </figure>
        `).join('')}
        </div>
      </section>
    </section>
  `
}

function initContactLinkStates(): void {
  const address = document.querySelector<HTMLAnchorElement>('.contact-address')
  if (address) {
    address.addEventListener('pointerenter', () => address.classList.add('is-hovered'))
    address.addEventListener('pointerleave', () => address.classList.remove('is-hovered'))
    address.addEventListener('focus', () => address.classList.add('is-hovered'))
    address.addEventListener('blur', () => address.classList.remove('is-hovered'))
  }
}

function initSlider(): void {
  const slider = document.getElementById('contactSlider')
  if (!slider) return

  const slides = Array.from(slider.querySelectorAll<HTMLElement>('.contact-slide'))
  if (slides.length < 2) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let activeIndex = 0
  let timer: number | null = null
  let paused = false

  function showSlide(nextIndex: number): void {
    slides[activeIndex]?.classList.remove('is-active')
    activeIndex = nextIndex
    slides[activeIndex]?.classList.add('is-active')
  }

  function advance(): void {
    showSlide((activeIndex + 1) % slides.length)
  }

  function stopTimer(): void {
    if (timer != null) {
      window.clearInterval(timer)
      timer = null
    }
  }

  function startTimer(): void {
    if (prefersReducedMotion.matches || paused) return
    stopTimer()
    timer = window.setInterval(advance, 6000)
  }

  slider.addEventListener('mouseenter', () => {
    paused = true
    stopTimer()
  })

  slider.addEventListener('mouseleave', () => {
    paused = false
    startTimer()
  })

  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
      stopTimer()
      return
    }
    startTimer()
  })

  startTimer()
}
