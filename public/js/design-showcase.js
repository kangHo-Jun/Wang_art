'use strict';

(function initShowcase() {
  const root = document.querySelector('[data-showcase-root]');
  if (!root) return;

  const variant = root.dataset.variant;
  const config = getVariantConfig(variant);
  const state = {
    works: [],
    currentIndex: 0
  };

  bootstrap().catch((error) => {
    console.error('Design showcase bootstrap failed:', error);
    const target = document.querySelector('[data-works]');
    if (target) {
      target.innerHTML = '<p style="color:var(--muted);">작품 데이터를 불러오지 못했습니다.</p>';
    }
  });

  async function bootstrap() {
    const response = await fetch('../data/artworks.json');
    const artworks = await response.json();
    state.works = curateWorks(artworks, config.selection);
    renderStaticCopy(config, state.works[0]);
    renderWorks(config, state.works);
    renderArchives(config);
    bindGlobalEvents(config);
    initializeDetailSurface(config, state.works, 0);
  }

  function renderStaticCopy(variantConfig, heroWork) {
    text('[data-page-title]', variantConfig.pageTitle);
    text('[data-page-desc]', variantConfig.pageDescription);
    text('[data-hero-eyebrow]', variantConfig.heroEyebrow);
    text('[data-hero-title]', variantConfig.heroTitle);
    text('[data-hero-summary]', variantConfig.heroSummary);
    text('[data-hero-meta-title]', cleanTitle(heroWork.title));
    text('[data-hero-meta-sub]', formatCategory(heroWork.category));
    text('[data-works-kicker]', variantConfig.worksKicker);
    text('[data-works-title]', variantConfig.worksTitle);
    text('[data-works-text]', variantConfig.worksText);
    text('[data-archive-title]', variantConfig.archiveTitle);
    text('[data-archive-text]', variantConfig.archiveText);

    const heroImg = document.querySelector('[data-hero-image]');
    if (heroImg) {
      heroImg.src = '../' + heroWork.image;
      heroImg.alt = cleanTitle(heroWork.title);
    }

    const noteBlocks = document.querySelector('[data-hero-notes]');
    if (noteBlocks) {
      noteBlocks.innerHTML = variantConfig.notes.map((note) => `
        <article class="${note.kind}">
          <h3>${note.heading}</h3>
          <p>${note.body}</p>
        </article>
      `).join('');
    }
  }

  function renderWorks(variantConfig, works) {
    const container = document.querySelector('[data-works]');
    if (!container) return;

    container.innerHTML = works.map((work, index) => `
      <button class="work-card" type="button" data-work-index="${index}">
        <div class="work-figure">
          <img src="../${work.image}" alt="${escapeHtml(cleanTitle(work.title))}" loading="lazy" />
        </div>
        <div class="work-body">
          <span class="work-index">${String(index + 1).padStart(2, '0')} / ${formatCategory(work.category)}</span>
          <h3 class="work-title">${escapeHtml(cleanTitle(work.title))}</h3>
          <div class="work-meta">${escapeHtml(buildMeta(work, variantConfig))}</div>
          <div class="work-entry">
            <span class="entry-link">${variantConfig.entryLabel}</span>
            <span>${variantConfig.entryModeLabel}</span>
          </div>
        </div>
      </button>
    `).join('');
  }

  function renderArchives(variantConfig) {
    const container = document.querySelector('[data-archive-grid]');
    if (!container) return;
    container.innerHTML = variantConfig.archiveCards.map((card) => `
      <article class="archive-item">
        <h3>${card.title}</h3>
        <p>${card.body}</p>
      </article>
    `).join('');
  }

  function bindGlobalEvents(variantConfig) {
    const worksEl = document.querySelector('[data-works]');
    if (worksEl) {
      worksEl.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-work-index]');
        if (!trigger) return;
        const index = Number(trigger.dataset.workIndex);
        openWork(variantConfig, index);
      });
    }

    document.querySelectorAll('[data-detail-nav]').forEach((button) => {
      button.addEventListener('click', () => {
        const delta = Number(button.dataset.detailNav);
        const nextIndex = (state.currentIndex + delta + state.works.length) % state.works.length;
        openWork(variantConfig, nextIndex);
      });
    });

    const modal = document.querySelector('[data-modal]');
    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target.matches('[data-close-modal]') || event.target === modal) {
          closeModal();
        }
      });
    }

    const sheet = document.querySelector('[data-sheet]');
    if (sheet) {
      sheet.addEventListener('click', (event) => {
        if (event.target.matches('[data-close-sheet]') || event.target === sheet) {
          closeSheet();
        }
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
        closeSheet();
      }
    });
  }

  function initializeDetailSurface(variantConfig, works, index) {
    if (!works.length) return;
    if (variantConfig.detailMode === 'inline') {
      fillInlinePanel(works[index], index, variantConfig);
    }
  }

  function openWork(variantConfig, index) {
    state.currentIndex = index;
    const work = state.works[index];

    if (variantConfig.detailMode === 'modal') {
      fillModal(work, index, variantConfig);
      const modal = document.querySelector('[data-modal]');
      if (modal) {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    if (variantConfig.detailMode === 'inline') {
      fillInlinePanel(work, index, variantConfig);
      const panel = document.querySelector('[data-detail-panel]');
      if (panel) {
        panel.hidden = false;
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (variantConfig.detailMode === 'sheet') {
      fillSheet(work, index, variantConfig);
      const sheet = document.querySelector('[data-sheet]');
      if (sheet) {
        sheet.hidden = false;
        document.body.style.overflow = 'hidden';
      }
    }
  }

  function fillModal(work, index, variantConfig) {
    text('[data-modal-kicker]', `${String(index + 1).padStart(2, '0')} / ${formatCategory(work.category)}`);
    text('[data-modal-title]', cleanTitle(work.title));
    text('[data-modal-meta]', buildMeta(work, variantConfig));
    text('[data-modal-description]', buildDescription(work, variantConfig));
    setImage('[data-modal-image]', work);
  }

  function fillInlinePanel(work, index, variantConfig) {
    text('[data-detail-kicker-text]', `${String(index + 1).padStart(2, '0')} / ${formatCategory(work.category)}`);
    text('[data-detail-title-text]', cleanTitle(work.title));
    text('[data-detail-meta-text]', buildMeta(work, variantConfig));
    text('[data-detail-description-text]', buildDescription(work, variantConfig));
    setImage('[data-detail-image]', work);
  }

  function fillSheet(work, index, variantConfig) {
    text('[data-sheet-kicker]', `${String(index + 1).padStart(2, '0')} / ${formatCategory(work.category)}`);
    text('[data-sheet-title]', cleanTitle(work.title));
    text('[data-sheet-meta]', buildMeta(work, variantConfig));
    text('[data-sheet-description]', buildDescription(work, variantConfig));
    setImage('[data-sheet-image]', work);
  }

  function closeModal() {
    const modal = document.querySelector('[data-modal]');
    if (modal) modal.hidden = true;
    document.body.style.overflow = '';
  }

  function closeSheet() {
    const sheet = document.querySelector('[data-sheet]');
    if (sheet) sheet.hidden = true;
    document.body.style.overflow = '';
  }

  function setImage(selector, work) {
    const image = document.querySelector(selector);
    if (!image) return;
    image.src = '../' + work.image;
    image.alt = cleanTitle(work.title);
  }

  function curateWorks(allWorks, selection) {
    const pool = [];
    selection.forEach(({ category, count }) => {
      const matches = allWorks.filter((work) => work.category === category).slice(0, count);
      pool.push(...matches);
    });
    return pool;
  }

  function buildMeta(work, variantConfig) {
    if (variantConfig.metaMode === 'minimal-series') {
      const year = extractYear(work.title);
      const series = formatCategory(work.category);
      return [year, series].filter(Boolean).join(' · ');
    }

    const year = extractYear(work.title);
    const bits = [formatCategory(work.category)];
    if (year) bits.push(year);
    bits.push(variantConfig.metaTone);
    return bits.join(' · ');
  }

  function buildDescription(work, variantConfig) {
    const descriptions = {
      blue: '푸른 기운과 여백이 먼저 읽히는 화면. 시안의 목적은 작품 자체의 호흡을 가장 앞에 두는 것이다.',
      red: '붉은 계열의 밀도와 화면의 긴장을 강조하되, 인터페이스는 물러서 있어야 한다.',
      ink: '재료감과 정적이 살아 있는 작품군으로, 텍스트보다 표면과 농담의 차이를 우선 감상하도록 구성한다.',
      '2026': '해체와 재배치의 감각이 강한 작업군. 큰 이미지와 느린 전환을 통해 개별 작품의 존재감을 우선한다.',
      '2jung': '구조와 겹침의 감각이 드러나는 작업군. 아카이브형 내비게이션과 함께 읽히는 것이 중요하다.'
    };

    return descriptions[work.category] || variantConfig.defaultDescription;
  }

  function cleanTitle(title) {
    return String(title || '').trim().replace(/\s+/g, ' ');
  }

  function extractYear(title) {
    const match = String(title || '').match(/(19|20)\d{2}/);
    return match ? match[0] : '';
  }

  function formatCategory(category) {
    return {
      '2026': '2026 Deconstruction',
      '2jung': 'Dual Structure',
      blue: 'Blue Series',
      ink: 'Ink Series',
      red: 'Red Series'
    }[category] || category;
  }

  function text(selector, value) {
    const target = document.querySelector(selector);
    if (target) target.textContent = value;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function getVariantConfig(name) {
    const variants = {
      a: {
        pageTitle: 'Design A — Gallery Minimal',
        pageDescription: '작품 중심, 흰 여백, 텍스트 최소화',
        heroEyebrow: 'design a / gallery minimal',
        heroTitle: '작품이 먼저 보이는 가장 조용한 벽',
        heroSummary: '설명보다 작품을 먼저 보여주는 조용한 갤러리 화면.',
        notes: [
          { kind: 'meta-card', heading: 'Palette', body: 'Warm ivory, pale paper beige, muted ink contrast. White space is doing most of the design work.' },
          { kind: 'quote-card', heading: 'Intent', body: 'The page behaves like a white gallery wall. Almost no visual noise, almost no narrative interruption.' }
        ],
        worksKicker: 'Selected Works',
        worksTitle: 'Minimal hanging, quiet labels, image-first browsing.',
        worksText: '작품과 작은 라벨만 남긴다.',
        archiveTitle: 'A larger image, a smaller label.',
        archiveText: '',
        archiveCards: [],
        selection: [
          { category: 'blue', count: 3 },
          { category: 'red', count: 2 },
          { category: 'ink', count: 2 },
          { category: '2026', count: 2 },
          { category: '2jung', count: 1 }
        ],
        detailMode: 'inline',
        entryLabel: '',
        entryModeLabel: '',
        metaTone: 'wall label',
        metaMode: 'minimal-series',
        defaultDescription: '큰 이미지와 작은 라벨로만 남기는 감상 중심 프리뷰.',
      },
      b: {
        pageTitle: 'Design B — Editorial Artist',
        pageDescription: '작품 + 작가 서사, 아트북/전시 리플렛 느낌',
        heroEyebrow: 'design b / editorial artist',
        heroTitle: '작품과 서사가 나란히 읽히는 전시 리플렛',
        heroSummary: '작품만 전면에 세우지 않고, 작가의 문장과 시리즈 맥락을 함께 읽게 하는 시안. 상세 진입은 화면 안쪽의 인라인 읽기 패널로 연결된다.',
        notes: [
          { kind: 'meta-card', heading: 'Narrative', body: '작품 이미지와 짧은 글이 균형을 이루며, 시리즈 해설과 감상 흐름이 함께 간다.' },
          { kind: 'story-card', heading: 'Density', body: '아트북이나 전시 소책자처럼 약간 더 높은 텍스트 밀도를 허용하되, 여전히 작품을 먼저 본다.' }
        ],
        worksKicker: 'Works & Notes',
        worksTitle: 'An editorial sequence that gives each work a small amount of context.',
        worksText: '작품, 짧은 맥락, 다음 감상으로 이어지는 편집형 구조. 작가 세계를 읽고 싶은 방문자에게 적합하다.',
        archiveTitle: 'Editorial reading path',
        archiveText: '작품 감상과 작가 서사를 함께 읽게 하는 방식. 홈페이지와 도록 사이 어딘가에 있는 시안이다.',
        archiveCards: [
          { title: 'Strength', body: '작가 세계관과 작품 맥락을 동시에 전달하기 좋다.' },
          { title: 'Risk', body: '텍스트 밀도가 올라가면 작품 중심성이 약해질 수 있다.' },
          { title: 'Best use', body: 'Artist / Statement / Selected Works를 묶는 메인 경험에 적합하다.' }
        ],
        selection: [
          { category: '2026', count: 3 },
          { category: '2jung', count: 2 },
          { category: 'ink', count: 2 },
          { category: 'blue', count: 2 }
        ],
        detailMode: 'inline',
        entryLabel: 'Read Work',
        entryModeLabel: 'Inline',
        metaTone: 'editorial archive note',
        defaultDescription: '작품과 해설이 나란히 읽히는 인라인 디테일 구조.',
      },
      c: {
        pageTitle: 'Design C — Museum Luxury',
        pageDescription: '고급 갤러리/전시장 느낌, 큰 여백, 느린 흐름',
        heroEyebrow: 'design c / museum luxury',
        heroTitle: '전시장 입구처럼 천천히 작품 앞에 서게 하는 화면',
        heroSummary: '설명보다 규모와 정적이 먼저 읽히는 방향.',
        notes: [
          { kind: 'meta-card', heading: 'Room', body: '한 화면에 많은 작품을 넣지 않고, 작품마다 더 많은 공기와 거리를 남긴다.' },
          { kind: 'museum-card', heading: 'Pace', body: '고급감은 장식이 아니라 여백, 규모, 느린 시선 이동에서 나온다.' }
        ],
        worksKicker: 'Museum Sequence',
        worksTitle: 'Larger works, slower sequence, quieter labels.',
        worksText: '많이 보여주기보다, 크게 보여주고 오래 머물게 한다.',
        archiveTitle: 'Wall label, side room, slow transition.',
        archiveText: '상세는 별도 상품 페이지가 아니라 전시장 옆 방으로 이동하는 감각에 가깝다.',
        archiveCards: [
          { title: 'Scale', body: '작품 하나가 더 커지고, 화면 안의 결정 수는 줄어든다.' },
          { title: 'Pacing', body: '방문자가 탐색보다 감상에 가까운 속도로 움직이게 한다.' },
          { title: 'Tone', body: '어둡지 않지만 깊이가 있고, 광고 같지 않지만 고급스럽다.' }
        ],
        selection: [
          { category: 'red', count: 3 },
          { category: '2026', count: 2 },
          { category: 'blue', count: 2 },
          { category: 'ink', count: 1 },
          { category: '2jung', count: 1 }
        ],
        detailMode: 'sheet',
        entryLabel: 'View Work',
        entryModeLabel: 'Side Sheet',
        metaTone: 'wall label',
        defaultDescription: '큰 이미지와 작은 라벨로 전시장 벽면에 작품이 걸린 감각을 유지하는 측면 프리뷰 구조.',
      }
    };

    return variants[name];
  }
})();
