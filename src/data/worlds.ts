export interface WorldArtworkRef {
  titleKr: string
  artworkId: string
  imageSrc: string
  alt: string
  medium: string
  widthCm: string
  heightCm: string
  yearText: string
  objectPosition?: string
  axisLabel?: string
}

export interface WorldParagraphSection {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  paragraphs: string[]
}

export interface WorldAxisItem {
  title: string
  body: string
}

export interface WorldAxisSection extends WorldParagraphSection {
  artworks: WorldArtworkRef[]
  items: WorldAxisItem[]
  ctaLabel: string
  layout?: 'text-first' | 'figure-first'
}

export interface WorldsPageData {
  originQuoteHtml: string
  originArtwork: WorldArtworkRef
  summary: WorldParagraphSection
  axesEyebrow: string
  world: WorldAxisSection
  signs: WorldAxisSection
  language: WorldAxisSection
  conclusion: WorldParagraphSection
  returnEyebrow: string
  returnTitle: string
  returnBody?: string
  worksHref: string
}

const HERO_ARTWORK: WorldArtworkRef = {
  titleKr: '신무릉도원 명상',
  artworkId: '2026-2025-utopia-meditation-acrylic-on-canvas-280cmx140cm',
  imageSrc: 'images/2026/2025-utopia-meditation-acrylic-on-canvas-280cmx140cm-1200w.webp',
  alt: '신무릉도원 명상, 2025, acrylic on canvas, 280x140cm 작품 이미지',
  medium: 'Acrylic on canvas',
  widthCm: '280',
  heightCm: '140',
  yearText: '2025',
  objectPosition: '50% 48%',
}

const HORSE_ARTWORK: WorldArtworkRef = {
  titleKr: '신무릉도원 동행',
  artworkId: 'ink-09-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-224x224cm2012',
  imageSrc: 'images/ink/09-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-224x224cm2012.jpg',
  alt: '신무릉도원 동행, 2012, ink stick and acrylic on canvas, 224x224cm 작품 이미지',
  medium: 'Ink stick and acrylic on canvas',
  widthCm: '224',
  heightCm: '224',
  yearText: '2012',
  objectPosition: '50% 50%',
}

const LANGUAGE_PRIMARY_ARTWORK: WorldArtworkRef = {
  titleKr: '신무릉도원 동행',
  artworkId: 'ink-16-utopia-a-companion-ink-stick-and-acrylic-on-canvas411x200cm2006-3eok-won-bi-mae-pum',
  imageSrc: 'images/ink/16-utopia-a-companion-ink-stick-and-acrylic-on-canvas411x200cm2006-3eok-won-bi-mae-pum.jpg',
  alt: '신무릉도원 동행, 2006, ink stick and acrylic on canvas, 411x200cm 작품 이미지',
  medium: 'Ink stick and acrylic on canvas',
  widthCm: '411',
  heightCm: '200',
  yearText: '2006',
  objectPosition: '50% 54%',
  axisLabel: '먹 INK',
}

const LANGUAGE_BLUE_ARTWORK: WorldArtworkRef = {
  titleKr: '유토피아 명상',
  artworkId: 'sw-08-blue-utopia-meditation-2025-wide',
  imageSrc: 'images/blue/8-utopia-meditation-acrylic-on-canvas-280cmx140cm-2025-2000man-won.jpg',
  alt: '유토피아 명상, 2025, acrylic on canvas, 280x140cm 작품 이미지',
  medium: 'Acrylic on canvas',
  widthCm: '280',
  heightCm: '140',
  yearText: '2025',
  objectPosition: '50% 50%',
  axisLabel: '파랑 BLUE',
}

const LANGUAGE_SECONDARY_ARTWORK: WorldArtworkRef = {
  titleKr: '유토피아 명상',
  artworkId: '39-utopia-a-meditation-ink-stick-and-acrylic-on-canvas-222x222cm2023',
  imageSrc: 'images/red/39-utopia-a-meditation-ink-stick-and-acrylic-on-canvas-222x222cm2023.jpg',
  alt: '유토피아 명상, 2023, ink stick and acrylic on canvas, 222x222cm 작품 이미지',
  medium: 'Ink stick and acrylic on canvas',
  widthCm: '222',
  heightCm: '222',
  yearText: '2023',
  objectPosition: '50% 50%',
  axisLabel: '빨강 RED',
}

export const WORLDS_PAGE: WorldsPageData = {
  originQuoteHtml: '왕열은 무릉도원을 그린다.<br />그리고, <span>무릉도원은 없다고 말한다.</span>',
  originArtwork: HERO_ARTWORK,
  summary: {
    id: 'summary',
    eyebrow: '',
    title: '',
    paragraphs: [
      '유토피아(Utopia)라는 말은 본래 \'없다(ou)\'와 \'장소(topos)\'가 합쳐진 단어다. 처음부터 존재하지 않는 곳이라는 뜻이다. 왕열은 평생 무릉도원을 그려왔지만, 그가 그린 것은 도달할 수 있는 낙원이 아니었다. <strong>그는 이상향이 실재하지 않음을 알면서도, 바로 그 \'없음\' 위에서 우리 삶을 응시한다.</strong>',
      '<strong>그래서 그의 산수는 보는 그림이 아니라, 머무는 공간이다.</strong> 화면 속 산과 물, 운무와 새는 자연의 외형을 설명하지 않는다. 그것들은 거친 현대를 살아가는 우리 자신의 자리이며, 관람자는 그 앞에서 풍경을 바라보는 대신 그 안으로 천천히 걸어 들어간다. 이 글은 그 세계를 세 개의 축을 따라 걷는다. 어디에 서 있는가, 누가 함께 있는가, 무엇으로 그 자리가 만들어졌는가.',
    ],
  },
  axesEyebrow: 'Three Axes',
  world: {
    id: 'world',
    eyebrow: '01 / 03',
    title: 'WORLD',
    subtitle: '존재하지 않는 장소 — 무릉도원이라는 역설',
    paragraphs: [
      '도연명이 「도화원기」에 적은 무릉도원은, 한 어부가 우연히 닿았다가 다시는 찾지 못한 마을이었다. 길을 표시해두고 떠났지만 누구도 그곳으로 돌아가지 못했다. 이 오래된 이야기의 핵심은 낙원이 아름답다는 것이 아니라, <strong>끝내 닿을 수 없다는 것</strong>에 있다.',
      '왕열은 이 역설을 정면으로 받아들인다. 그는 환상적인 이상향을 짓는 대신, 이상향이 없다는 사실과 마주한다. 미술사가 김웅기의 말처럼, 산수화가는 자연을 그리는 것이 아니라 그 자연을 바라보는 자기 자신을 그린다. 왕열의 화면 앞에서 우리가 보는 것은 결국 산이 아니라, 그 산을 응시하는 우리 마음이다.',
    ],
    artworks: [HERO_ARTWORK],
    items: [
      {
        title: '무릉도원 — 없는 장소',
        body: '도달할 낙원이 아니라, 닿을 수 없음을 아는 자리.',
      },
      {
        title: '응시의 산수',
        body: '자연을 그리는 그림이 아니라, 바라보는 자신을 그리는 그림.',
      },
      {
        title: '머무름',
        body: '풍경 바깥에 서지 않고, 그 안으로 걸어 들어가 잠시 머무는 경험.',
      },
    ],
    ctaLabel: '작품 보기 →',
    layout: 'text-first',
  },
  signs: {
    id: 'signs',
    eyebrow: '02 / 03',
    title: 'SIGNS',
    subtitle: '날아가지 못하는 새 — 갇힌 자유로서의 인간',
    paragraphs: [
      '새의 가장 큰 특징은 난다는 것이다. 땅에 발을 붙이고 사는 인간에게, 하늘로 솟아오르는 새는 곧 자유의 형상이다. 그런데 왕열의 새는, <strong>날지 않는다</strong>. 평론가 전애완이 짚었듯, 날개를 펴고도 솟아오르지 못하고 목을 길게 빼 하늘을 향하지만 끝내 그 자리에 머문다. 그래서 그의 새는 자유로운 존재가 아니라, 새가 되지 못한 인간이다.',
      '작가 스스로도 새를 인간의 상징이라 말한다. 홀로 나는 새는 외롭고, 무리 지은 새는 현대 도시의 군중을 닮았다. 여기에 산수 속에 가만히 선 말이 더해진다. 새가 갈망 속의 좌절이라면, 말은 멈춤 속의 응시다.',
    ],
    artworks: [HORSE_ARTWORK],
    items: [
      {
        title: '새 — 날지 못하는 자유',
        body: '솟아오르길 갈망하나 그 자리에 갇힌, 새가 되지 못한 인간.',
      },
      {
        title: '말 — 머무는 존재',
        body: '풍경을 소유하지 않고 그 안에 서서, 인간의 자리를 대신하는 형상.',
      },
      {
        title: '고독과 동행',
        body: '홀로 난 새와 무리 진 새 사이, 도시를 살아가는 우리의 자화상.',
      },
    ],
    ctaLabel: '작품 보기 →',
    layout: 'figure-first',
  },
  language: {
    id: 'language',
    eyebrow: '03 / 03',
    title: 'LANGUAGE',
    subtitle: '갇힘의 빨강, 닿을 수 없는 파랑 — 색이 곧 역설이다',
    paragraphs: [
      '왕열의 산수에서 먹은 출발점이다. 먹은 산과 구름, 안개와 물길을 만들고 화면의 깊이와 호흡을 연다. 전통 수묵의 정신을 바탕으로 하되 과거의 형식에 가두지 않고 아크릴·캔버스와 충돌시킨다. 이때 먹은 옛것의 표지가 아니라, <strong>작가가 세계를 사유하는 가장 근원적인 언어</strong>다.',
      '<strong>빨강은 앞으로 튀어나와 깊이를 지워버린다.</strong> 그래서 붉은 화면 속 새는 날개를 펴고도 갇힌 듯 보인다. 작가에게 이 붉은 공간은 동시에 명상을 위한 정신의 자리다. 반대로 파랑은 뒤로 물러나며 깊이를 알 수 없게 만든다. 닿을 수 없는 무한의 거리이자, 결코 도달하지 못할 이상향의 색이다.',
    ],
    artworks: [LANGUAGE_PRIMARY_ARTWORK, LANGUAGE_BLUE_ARTWORK, LANGUAGE_SECONDARY_ARTWORK],
    items: [
      {
        title: '먹 — 근원의 언어',
        body: '형상 이전의 바탕이자, 세계를 사유하는 가장 근원적인 매체.',
      },
      {
        title: '빨강 — 갇힘과 명상',
        body: '깊이를 지우며 앞으로 나서는, 좌절이자 동시에 정신의 공간인 색.',
      },
      {
        title: '파랑 — 닿을 수 없음',
        body: '뒤로 물러나 깊이를 감추는, 결코 도달하지 못할 이상의 색.',
      },
    ],
    ctaLabel: '작품 보기 →',
    layout: 'text-first',
  },
  conclusion: {
    id: 'conclusion',
    eyebrow: '',
    title: '',
    paragraphs: [
      '인간은 어디에 머물 수 있는가. 왕열의 산수는 답하지 않는다. 다만 마음이 머물 수 있는 한 장소를 펼쳐 보이고, <strong>그 안을 걷게 할 뿐이다.</strong>',
    ],
  },
  returnEyebrow: '작품세계 · 회귀',
  returnTitle: '한 점의 먹이, 끝내 닿을 수 없는 하나의 유토피아가 된다.',
  returnBody: '',
  worksHref: 'works/',
}
