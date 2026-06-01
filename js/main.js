/**
 * 왕열 Wang Yeul — 메인 JavaScript
 * 아임웹 이전 안내: 이 파일의 인터랙션 로직은 아임웹 내장 기능으로 대체 가능합니다.
 */
'use strict';

console.log('✅ Wang Yeul Website — JavaScript Loaded');

const ASSET_BASE = (document.body?.dataset?.assetBase || '.').replace(/\/$/, '');

function assetPath(path) {
  const value = String(path || '').trim();
  if (!value) return '';
  if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('#')) {
    return value;
  }
  const normalized = value.replace(/^\.?\//, '');
  if (!ASSET_BASE || ASSET_BASE === '.') return normalized;
  return `${ASSET_BASE}/${normalized}`;
}

/* ══════════════════════════════════════════════════════════
   슬라이드쇼 데이터 — Ken Burns + Crossfade
   ══════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    src: 'images/2026/2025-utopia-meditation-acrylic-on-canvas-280cmx140cm.jpg',
    titleKo: '유토피아-명상', titleEn: 'Utopia Meditation',
    year: '2025', medium: 'Acrylic on canvas', size: '280 × 140 cm'
  },
  {
    src: 'images/red/39-utopia-a-meditation-ink-stick-and-acrylic-on-canvas-222x222cm2023.jpg',
    titleKo: '유토피아-명상', titleEn: 'Utopia Meditation',
    year: '2023', medium: 'Ink stick and acrylic on canvas', size: '222 × 222 cm'
  },
  {
    src: 'images/blue/10-utopia-meditation-acrylic-on-canvas-140x140cm-2023.jpg',
    titleKo: '유토피아-명상', titleEn: 'Utopia Meditation',
    year: '2023', medium: 'Acrylic on canvas', size: '140 × 140 cm'
  },
  {
    src: 'images/red/22-utopia-meditation-acrylic-on-canvas-116x91cm-2023.jpg',
    titleKo: '유토피아-명상', titleEn: 'Utopia Meditation',
    year: '2023', medium: 'Acrylic on canvas', size: '116 × 91 cm'
  },
  {
    src: 'images/2026/14-utopia-meditation-acrylic-on-canvas-140x140cm-2023-19-000.jpg',
    titleKo: '유토피아-명상', titleEn: 'Utopia Meditation',
    year: '2023', medium: 'Acrylic on canvas', size: '140 × 140 cm'
  }
];

/* ══════════════════════════════════════════════════════════
   2. 히어로 슬라이드쇼 — Ken Burns + Crossfade
   ══════════════════════════════════════════════════════════ */
(function initHeroSlideshow() {
  const hero     = document.getElementById('hero');
  const slides   = document.getElementById('heroSlides');
  const dotsEl   = document.getElementById('heroDots');
  const labelInner = document.querySelector('.hero-label-inner');
  const titleEl  = document.getElementById('heroTitleEn');
  const yearEl   = document.getElementById('heroYear');
  const mediumEl = document.getElementById('heroMedium');
  const sizeEl   = document.getElementById('heroSize');
  if (!hero || !slides) return;

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 슬라이드 1~4 DOM 생성 (슬라이드 0은 HTML에 이미 있음)
  for (let i = 1; i < HERO_SLIDES.length; i++) {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.dataset.slide = i;
    const motion = document.createElement('div');
    motion.className = 'hero-media-motion';
    const img = document.createElement('img');
    img.className = 'hero-feature-image';
    img.src = assetPath(HERO_SLIDES[i].src);
    img.alt = HERO_SLIDES[i].titleEn;
    img.loading = 'lazy';
    img.decoding = 'async';
    motion.appendChild(img);
    slide.appendChild(motion);
    slides.appendChild(slide);
  }

  // dot 인디케이터 생성
  if (dotsEl) {
    dotsEl.innerHTML = HERO_SLIDES.map((_, i) =>
      `<button class="hero-dot${i === 0 ? ' is-active' : ''}" data-index="${i}"
               type="button" aria-label="슬라이드 ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.hero-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(Number(dot.dataset.index));
        restartTimer();
      });
    });
  }

  let current = 0;
  let timer = null;

  function allSlides() { return slides.querySelectorAll('.hero-slide'); }
  function allDots()   { return dotsEl ? dotsEl.querySelectorAll('.hero-dot') : []; }

  function startKenBurns(slideEl) {
    if (reducedMotion()) return;
    const img = slideEl.querySelector('.hero-feature-image');
    if (!img) return;
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = 'heroSlowZoom 12s ease-out forwards';
  }

  function setLabels(slide) {
    if (titleEl)  titleEl.textContent  = slide.titleEn || '';
    if (yearEl)   yearEl.textContent   = slide.year    || '';
    if (mediumEl) mediumEl.textContent = slide.medium  || '';
    if (sizeEl)   sizeEl.textContent   = slide.size    || '';
  }

  function fadeLabels(slide) {
    if (!labelInner) { setLabels(slide); return; }
    labelInner.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    labelInner.style.opacity    = '0';
    labelInner.style.transform  = 'translateY(6px)';
    setTimeout(() => {
      setLabels(slide);
      labelInner.style.opacity   = '1';
      labelInner.style.transform = 'translateY(0)';
      setTimeout(() => { labelInner.style.transition = ''; }, 280);
    }, 260);
  }

  function goToSlide(index) {
    if (index === current) return;
    const sls  = allSlides();
    const dots = allDots();
    sls[current]?.classList.remove('is-active');
    dots[current]?.classList.remove('is-active');
    current = index;
    const next = sls[current];
    next?.classList.add('is-active');
    dots[current]?.classList.add('is-active');
    startKenBurns(next);
    fadeLabels(HERO_SLIDES[current]);
  }

  function startTimer()   { timer = setInterval(() => goToSlide((current + 1) % HERO_SLIDES.length), 5000); }
  function stopTimer()    { clearInterval(timer); timer = null; }
  function restartTimer() { stopTimer(); startTimer(); }

  hero.addEventListener('mouseenter', stopTimer);
  hero.addEventListener('mouseleave', () => { if (!timer) startTimer(); });

  // 초기 Ken Burns (슬라이드 0)
  startKenBurns(allSlides()[0]);

  // 초기 입장 페이드 — 슬라이드 0의 opacity 0→1
  const firstSlide = allSlides()[0];
  firstSlide.classList.remove('is-active');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    firstSlide.classList.add('is-active');
  }));

  window.__heroSlideshow = true;
  startTimer();
})();

/* ══════════════════════════════════════════════════════════
   1. 히어로 캔버스 파티클 (먹물·금빛 파티클)
   [아임웹] 이 효과는 배경 이미지 또는 비디오로 대체 권장
   ══════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  const COLORS = [
    'rgba(196, 162, 101, ',   // 금빛 (낙관색)
    'rgba(223, 192, 138, ',   // 연금빛
    'rgba(200,  82,  58, ',   // 붉은 산수빛
    'rgba(249, 246, 237, ',   // 화선지 크림빛
    'rgba( 46, 109, 181, ',   // 코발트 블루 (하늘·물)
  ];

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x     = Math.random() * canvas.width;
      this.y     = canvas.height + Math.random() * 80;
      this.size  = Math.random() * 2.5 + 0.5;
      this.speed = Math.random() * 0.6 + 0.2;
      this.drift = (Math.random() - 0.5) * 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    update() {
      this.y     -= this.speed;
      this.x     += this.drift;
      this.alpha -= 0.0008;
      if (this.y < -10 || this.alpha <= 0) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  function initParticleList(count = 90) {
    particles = Array.from({ length: count }, () => {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      return p;
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  resize();
  initParticleList();
  animate();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      resize();
      initParticleList();
      animate();
    }, 200);
  });
})();


/* ══════════════════════════════════════════════════════════
   2. 헤더 스크롤 효과
   [아임웹] 스크롤 시 헤더 배경 변경은 아임웹 헤더 설정에서 처리
   ══════════════════════════════════════════════════════════ */
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ══════════════════════════════════════════════════════════
   3. 모바일 내비게이션 토글
   [아임웹] 아임웹 기본 모바일 메뉴 기능으로 대체
   ══════════════════════════════════════════════════════════ */
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // 메뉴 링크 클릭 시 닫기
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 외부 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // ESC 키
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ══════════════════════════════════════════════════════════
   4. 스크롤 인뷰 애니메이션
   [아임웹] 아임웹 스크롤 애니메이션 기능으로 대체 가능
   ══════════════════════════════════════════════════════════ */
(function initScrollAnimation() {
  const targets = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  if (!targets.length) return;

  // 히어로 섹션 내 요소는 CSS 애니메이션으로 처리되므로 제외
  const filtered = Array.from(targets).filter(
    el => !el.closest('.hero-content')
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  filtered.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════
   Hero Parallax
   ══════════════════════════════════════════════════════════ */
(function initHeroParallax() {
  const hero = document.getElementById('hero');
  const motionLayer = document.getElementById('heroMediaMotion');
  const image = document.getElementById('heroFeatureImage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!hero || !image || !motionLayer) return;

  let mouseX = 0;
  let mouseY = 0;
  let rafId = 0;

  function isDesktopMotionAllowed() {
    return window.innerWidth > 980 && !reduceMotion.matches;
  }

  function render() {
    rafId = 0;
    motionLayer.style.setProperty('--hero-mouse-x', `${mouseX}px`);
    motionLayer.style.setProperty('--hero-mouse-y', `${mouseY}px`);
  }

  function queueRender() {
    if (rafId) return;
    rafId = requestAnimationFrame(render);
  }

  function onScroll() {
    const rect = hero.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    if (rect.bottom <= 0 || rect.top >= viewport) return;
    const travel = Math.max(0, Math.min(1, Math.abs(rect.top) / (viewport * 0.9)));
    const scrollY = travel * -14;
    const labelShift = travel * -22;
    const labelOpacity = Math.max(0, 1 - travel * 1.15);
    const hintOpacity = Math.max(0, 1 - travel * 1.6);

    motionLayer.style.setProperty('--hero-scroll-y', `${scrollY}px`);
    hero.style.setProperty('--hero-label-shift', `${labelShift}px`);
    hero.style.setProperty('--hero-label-opacity', labelOpacity.toFixed(3));
    hero.style.setProperty('--hero-hint-opacity', hintOpacity.toFixed(3));
  }

  function onMouseMove(event) {
    if (!isDesktopMotionAllowed()) return;
    const rect = hero.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX = px * 14;
    mouseY = py * 10;
    queueRender();
  }

  function resetMouseMotion() {
    mouseX = 0;
    mouseY = 0;
    queueRender();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  hero.addEventListener('mousemove', onMouseMove);
  hero.addEventListener('mouseleave', resetMouseMotion);
  window.addEventListener('resize', resetMouseMotion, { passive: true });
  reduceMotion.addEventListener?.('change', resetMouseMotion);
  onScroll();
  resetMouseMotion();
})();


/* ══════════════════════════════════════════════════════════
   5. 갤러리 필터
   [아임웹] 아임웹 포트폴리오 카테고리 필터로 대체 권장
   필터 버튼: 전체 / 말 시리즈 / 새 시리즈 / 산수 / 유토피아
   ══════════════════════════════════════════════════════════ */
// 갤러리 필터는 11번 동적 로딩 완료 후 renderGallery() 내부에서 연결됩니다.
// (initDynamicGallery 참고)


/* ══════════════════════════════════════════════════════════
   6. 갤러리 라이트박스
   [아임웹] 실제 이미지 삽입 후 이 로직 작동 / 아임웹 라이트박스 설정으로 대체 가능
   ══════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lightbox     = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMeta = document.getElementById('lightboxMeta');
  const lightboxNote = document.getElementById('lightboxNote');
  const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  if (!lightbox || !lightboxClose || !lightboxImg) return;

  let items = [];
  let currentIndex = 0;

  function renderCurrent() {
    const aw = items[currentIndex];
    if (!aw) return;

    const title = aw.title || '';
    const metaParts = [];
    if (aw.year) metaParts.push(aw.year);
    if (aw.series) metaParts.push(aw.series);
    if (aw.material) metaParts.push(aw.material);
    const meta = metaParts.join(' · ') || aw.meta || '';

    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxMeta) lightboxMeta.textContent = meta;
    if (lightboxNote) lightboxNote.textContent = aw.note || '';

    if (aw.img) {
      lightboxImg.src = aw.img;
      lightboxImg.alt = title;
      lightboxImg.style.display = 'block';
      if (lightboxPlaceholder) lightboxPlaceholder.hidden = true;
    } else {
      lightboxImg.removeAttribute('src');
      lightboxImg.style.display = 'none';
      if (lightboxPlaceholder) lightboxPlaceholder.hidden = false;
    }

    if (lightboxPrev) lightboxPrev.disabled = currentIndex === 0;
    if (lightboxNext) lightboxNext.disabled = currentIndex >= items.length - 1;
  }

  function openLightbox(payloadItems, startIndex) {
    items = Array.isArray(payloadItems) ? payloadItems : [];
    currentIndex = Math.max(0, Math.min(startIndex || 0, items.length - 1));
    renderCurrent();
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    lightbox.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      if (currentIndex === 0) return;
      currentIndex -= 1;
      renderCurrent();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      if (currentIndex >= items.length - 1) return;
      currentIndex += 1;
      renderCurrent();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex -= 1;
      renderCurrent();
    }
    if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
      currentIndex += 1;
      renderCurrent();
    }
  });

  window.__wyLightbox = { openLightbox, closeLightbox };
})();


/* ══════════════════════════════════════════════════════════
   7. 전시 탭 전환
   [아임웹] 탭 버튼: 주요 개인전 / 수상 경력 / 해외 전시
   ══════════════════════════════════════════════════════════ */
(function initTabs() {
  const tabBtns     = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = 'tab-' + btn.dataset.tab;

      // 버튼 상태
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // 콘텐츠 전환
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
          content.removeAttribute('hidden');
          // 내부 fade 요소 재활성화
          content.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        } else {
          content.classList.remove('active');
          content.setAttribute('hidden', '');
        }
      });
    });
  });
})();


/* ══════════════════════════════════════════════════════════
   8. 문의 폼 처리
   [아임웹] 아임웹 기본 폼 기능으로 대체 시 이 코드 불필요
   ══════════════════════════════════════════════════════════ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#formName')?.value.trim();
    const email   = form.querySelector('#formEmail')?.value.trim();
    const message = form.querySelector('#formMessage')?.value.trim();

    if (!name || !email || !message) {
      alert('이름, 이메일, 내용은 필수 항목입니다.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    // 실제 전송 로직은 아임웹 폼 또는 외부 서비스(Formspree 등)로 교체
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '전송 중…';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1000);
  });
})();


/* ══════════════════════════════════════════════════════════
   9. 스크롤 탑 버튼
   ══════════════════════════════════════════════════════════ */
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  // 초기 상태: 스크롤 위치 체크
  if (window.scrollY <= 400) {
    btn.setAttribute('hidden', '');
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ══════════════════════════════════════════════════════════
   10. 네비게이션 액티브 링크 하이라이트
   ══════════════════════════════════════════════════════════ */
(function initActiveNav() {
  const pageLinks = document.querySelectorAll('.nav-menu a[data-nav-page]');
  const pageId = document.body?.dataset?.page || '';
  if (pageLinks.length && pageId) {
    pageLinks.forEach(link => {
      const isCurrent = link.dataset.navPage === pageId;
      link.classList.toggle('active-link', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    return;
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active-link',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => observer.observe(sec));
})();


/* ══════════════════════════════════════════════════════════
   11. 메인 큐레이션 로딩 — featured-works.json
   Hero / Selected Works / Work Worlds
   ══════════════════════════════════════════════════════════ */
(function initFeaturedWorks() {
  const heroImage = document.getElementById('heroFeatureImage');
  const heroEyebrow = document.getElementById('heroEyebrow');
  const heroTitleEn = document.getElementById('heroTitleEn');
  const heroYear = document.getElementById('heroYear');
  const heroMedium = document.getElementById('heroMedium');
  const heroSize = document.getElementById('heroSize');
  const selectedGrid = document.getElementById('selectedWorksGrid');
  const worldsGrid = document.getElementById('worldsGrid');
  if (!heroImage && !selectedGrid && !worldsGrid) return;

  let selectedItems = [];

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function metaLine(item) {
    return [item.year, item.medium, item.size].filter(Boolean).join(' · ');
  }

  function buildLightboxPayload(items) {
    return items.map(item => ({
      img: assetPath(item.image || ''),
      title: item.title_ko || item.title_en || '',
      year: item.year || '',
      series: item.series || '',
      material: item.medium || '',
      meta: metaLine(item),
      note: item.display_note || ''
    }));
  }

  function renderHero(hero) {
    if (!hero || !heroImage) return;
    heroImage.src = assetPath(hero.image || heroImage.src);
    heroImage.alt = hero.title_en || hero.title_ko || '';
    if (window.__heroSlideshow) return; // 슬라이드쇼가 라벨을 관리
    if (heroEyebrow) heroEyebrow.textContent = 'WANGYEUL';
    if (heroTitleEn) heroTitleEn.textContent = hero.title_en || '';
    if (heroYear) heroYear.textContent = hero.year || '';
    if (heroMedium) heroMedium.textContent = hero.medium || '';
    if (heroSize) heroSize.textContent = hero.size || '';
  }

  function buildSelectedWork(item, index) {
    return `
      <article class="selected-work-card fade-up visible" role="listitem">
        <button class="selected-work-media" type="button" data-selected-index="${index}" aria-label="${escapeHtml(item.title_ko || item.title_en || '작품')} 감상하기">
          <img src="${escapeHtml(assetPath(item.image))}" alt="${escapeHtml(item.title_ko || item.title_en || '작품')}" loading="lazy">
        </button>
        <div class="selected-work-label">
          <p class="selected-work-title">${escapeHtml(item.title_ko || item.title_en || '')}</p>
          <p class="selected-work-meta">${escapeHtml([item.year, item.medium].filter(Boolean).join(' · '))}</p>
        </div>
      </article>`;
  }

  function buildWorldItem(item, index) {
    const reverse = index % 2 === 1 ? ' world-item-reverse' : '';
    return `
      <article class="world-item fade-up visible${reverse}">
        <div class="world-art">
          <figure class="world-primary">
            <img src="${escapeHtml(assetPath(item.primary_image))}" alt="${escapeHtml(item.title_ko || item.title_en || '작품세계 대표 이미지')}" loading="lazy">
          </figure>
          <figure class="world-secondary">
            <img src="${escapeHtml(assetPath(item.secondary_image))}" alt="${escapeHtml((item.title_ko || item.title_en || '작품세계') + ' 보조 이미지')}" loading="lazy">
          </figure>
        </div>
        <div class="world-copy">
          <p class="world-kicker">${escapeHtml(item.title_en || '')}</p>
          <h3 class="world-title">${escapeHtml(item.title_ko || '')}</h3>
          <p class="world-note">${escapeHtml(item.description || '')}</p>
          <p class="world-caption">${escapeHtml(item.display_note || '')}</p>
        </div>
      </article>`;
  }

  function attachSelectedLightbox() {
    if (!selectedGrid) return;
    selectedGrid.querySelectorAll('[data-selected-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        const startIndex = Number(btn.dataset.selectedIndex || 0);
        if (window.__wyLightbox && typeof window.__wyLightbox.openLightbox === 'function') {
          window.__wyLightbox.openLightbox(buildLightboxPayload(selectedItems), startIndex);
        }
      });
    });
  }

  async function loadFeaturedWorks() {
    try {
      const res = await fetch(assetPath('data/featured-works.json') + '?_t=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error('featured-works 응답 오류: ' + res.status);
      const json = await res.json();
      renderHero(json.hero || {});
      selectedItems = Array.isArray(json.selected_works) ? json.selected_works : [];
      const worldItems = Array.isArray(json.work_worlds) ? json.work_worlds : [];

      if (selectedGrid) {
        selectedGrid.innerHTML = selectedItems.length
          ? selectedItems.map(buildSelectedWork).join('')
          : '<p class="featured-empty">선별 작품이 준비되는 중입니다.</p>';
        selectedGrid.removeAttribute('aria-busy');
      }
      if (worldsGrid) {
        worldsGrid.innerHTML = worldItems.length
          ? worldItems.map(buildWorldItem).join('')
          : '<p class="featured-empty">작품세계 정보가 준비되는 중입니다.</p>';
        worldsGrid.removeAttribute('aria-busy');
      }

      attachSelectedLightbox();
    } catch (error) {
      console.error('[Featured Works] 오류:', error.message);
      if (selectedGrid) {
        selectedGrid.innerHTML = '<p class="featured-empty">선별 작품 정보를 잠시 불러오지 못했습니다.</p>';
      }
      if (worldsGrid) {
        worldsGrid.innerHTML = '<p class="featured-empty">작품세계 정보를 잠시 불러오지 못했습니다.</p>';
      }
    }
  }

  loadFeaturedWorks();
})();


/* ══════════════════════════════════════════════════════════
   12. 갤러리 동적 로딩 — 로컬 JSON (GitHub Pages)
   data/artworks.json 파일을 수정하면 갤러리가 반영됩니다.
   ══════════════════════════════════════════════════════════ */
(function initDynamicGallery() {
  const grid    = document.getElementById('galleryGrid');
  const loading = document.getElementById('gallery-loading');
  if (!grid) return;

  const CAT_LABEL = {
    "2jung": "2중구조",
    "2026": "2026해체",
    blue: "Blue",
    ink: "Ink",
    red: "Red"
  };
  const DELAYS = ['', 'delay-1', 'delay-2', 'delay-3'];
  let currentRenderedArtworks = [];

  function extractYear(text) {
    const m = String(text || '').match(/(?:19|20)\d{2}/);
    return m ? m[0] : '';
  }

  function buildSeriesName(aw, cat) {
    if (aw.series) return aw.series;
    return CAT_LABEL[cat] || cat || '';
  }

  // 플레이스홀더 기본 작품 (JSON에 데이터 없을 때 표시)
  const DEFAULT_ARTWORKS = [
    { title:'작품 정보를 불러오는 중입니다', meta:'잠시 후 다시 확인해 주세요', category:'2jung' },
  ];

  function buildItem(aw, idx) {
    const delay   = DELAYS[idx % 4];
    const cat     = (aw.category || '').trim().toLowerCase();  // 대소문자 통일
    const subcat  = (aw.subcategory || '').trim();
    const imgSrc  = (aw.image || '').trim();
    const hasImg  = imgSrc !== '';
    const year    = (aw.year || extractYear(aw.title || aw.caption || '')).trim();
    const series  = buildSeriesName(aw, cat).trim();
    const material = (aw.material || '').trim();

    // caption 우선, 없으면 재료 · 연도 조합
    const captionText = (aw.caption || '').trim();
    const parts = [];
    if (material) parts.push(material);
    if (year)     parts.push(year);
    const metaFallback = parts.join(' · ');
    const lightboxMeta = captionText || metaFallback;
    const captionParts = [];
    if (year) captionParts.push(year);
    if (series) captionParts.push(series);
    if (material) captionParts.push(material);
    const captionLine  = captionParts.join(' · ') || captionText || metaFallback;

    return `
      <div class="gallery-item fade-up ${delay} visible"
           data-category="${cat}"
           data-subcategory="${subcat}"
           role="listitem">
        <div class="gallery-img-wrap" id="wrap-${idx}">
          ${hasImg ? `
          <img src="${assetPath(imgSrc)}"
               alt="${(aw.title||'').replace(/"/g,'&quot;')}"
               loading="lazy"
               class="gallery-img-natural"
               onload="(function(img){
                 var w=img.naturalWidth, h=img.naturalHeight;
                 if(w&&h){
                   var wrap=document.getElementById('wrap-${idx}');
                   if(wrap){ wrap.style.aspectRatio=w+'/'+h; wrap.style.height='auto'; }
                 }
               })(this)"
               onerror="this.style.display='none';document.getElementById('ph-${idx}').style.display='flex'">` : ''}
          <div id="ph-${idx}" class="gallery-placeholder" role="img"
               aria-label="${(aw.title||cat)} 이미지"
               style="${hasImg ? 'display:none' : ''}">
            <i class="fas fa-image" aria-hidden="true"></i>
            <span>${CAT_LABEL[cat] || cat || '작품 이미지'}</span>
          </div>
          <div class="gallery-overlay">
            <button class="gallery-zoom" aria-label="작품 크게 보기"
              data-render-index="${idx}">
              <i class="fas fa-expand-alt" aria-hidden="true"></i>
              <span>View</span>
            </button>
          </div>
        </div>
        <div class="gallery-caption">
          <p class="gallery-title">${aw.title || '(제목 없음)'}</p>
          ${captionLine ? `<p class="gallery-caption-text">${captionLine}</p>` : ''}
        </div>
      </div>`;
  }

  /* ── 전체 작품 데이터 캐시 ── */
  let allArtworks = [];

  /* ── 필터 상태 (IIFE 스코프, 단 1개) ── */
  let currentCat = 'all';

  /* ── 현재 필터에 맞는 데이터만 렌더링 (DOM 재생성 방식 → columns 레이아웃 정확 적용) ── */
  function applyFilter() {
    const cat = currentCat.trim().toLowerCase();
    const filtered = cat === 'all'
      ? allArtworks
      : allArtworks.filter(aw => (aw.category || '').trim().toLowerCase() === cat);
    currentRenderedArtworks = filtered;
    grid.innerHTML = filtered.map((aw, i) => buildItem(aw, i)).join('');
    attachLightbox();
  }

  /* ── 라이트박스 이벤트 연결 ── */
  function attachLightbox() {
    grid.querySelectorAll('.gallery-zoom').forEach(btn => {
      btn.addEventListener('click', () => {
        const startIndex = Number(btn.dataset.renderIndex || 0);
        const payload = currentRenderedArtworks.map(aw => {
          const cat = (aw.category || '').trim().toLowerCase();
          const year = (aw.year || extractYear(aw.title || aw.caption || '')).trim();
          return {
            img: assetPath((aw.image || '').trim()),
            title: aw.title || '',
            year,
            series: buildSeriesName(aw, cat).trim(),
            material: (aw.material || '').trim(),
            meta: (aw.caption || '').trim(),
            note: ''
          };
        });
        if (window.__wyLightbox && typeof window.__wyLightbox.openLightbox === 'function') {
          window.__wyLightbox.openLightbox(payload, startIndex);
        }
      });
    });
  }

  /* ── 필터 버튼: 한 번만 등록 ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentCat = (btn.dataset.filter || 'all').trim().toLowerCase();
      applyFilter();
    });
  });

  function renderGallery(artworks) {
    allArtworks = artworks;  // 전체 데이터 캐시
    applyFilter();           // 현재 필터로 렌더링
    // 갤러리 섹션 내 fade-up 부모 요소도 즉시 visible 처리
    document.querySelectorAll('#gallery .fade-up, #gallery .fade-left, #gallery .fade-right')
      .forEach(el => el.classList.add('visible'));
  }

  async function loadFromJSON() {
    try {
      const url = assetPath('data/artworks.json') + '?_t=' + Date.now();
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('JSON 응답 오류: ' + res.status);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('artworks.json 형식 오류');
      console.log('[Gallery] 로드:', data.length, '개',
        '카테고리 목록:', [...new Set(data.map(a=>(a.category||'').toLowerCase()))].join(', '));
      renderGallery(data.length > 0 ? data : DEFAULT_ARTWORKS);
    } catch (e) {
      console.error('[Gallery] 오류:', e.message);
      renderGallery(DEFAULT_ARTWORKS);
    }
  }

  loadFromJSON();
})();
