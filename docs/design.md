# 왕열 Wang Yeul — 전면 재설계 설계 문서
> DESIGN.md v1.0 | 2026-06 | Art Director: Zart | Reference: pierrickcalvez.com

---

## 1. 설계 철학 (Design Philosophy)

### 핵심 방향
> "움직임보다 여백. 장식보다 작품 자체."

Pierrick Calvez 사이트의 본질은 **극단적 미니멀리즘**이다.
텍스트는 얇고 넓게 퍼지고, 이미지는 숨 쉴 공간을 가지며,
인터랙션은 과장 없이 정밀하다.

왕열 사이트는 이 구조를 이식하되 —
**먹·금·크림의 동양화 감성**을 DNA로 유지한다.

### 기억에 남는 단 하나
> 작품을 클릭하는 순간, 그림이 화면 전체를 채우며 천천히 숨을 쉰다.

---

## 2. 디자인 토큰 (Design Tokens)

### 색상
```css
--color-bg:          #f7f4ee;   /* Pierrick #F3F3F3 → 왕열 크림으로 매핑 */
--color-bg-dark:     #1e1508;   /* 먹색 — 뷰어 배경 */
--color-ink:         #1a1208;   /* 본문 텍스트 */
--color-ink-muted:   rgba(26,18,8,0.45);
--color-ink-faint:   rgba(26,18,8,0.15);
--color-gold:        #c4a265;   /* 포인트 — 액티브, 강조 */
--color-gold-faint:  rgba(196,162,101,0.15);
--color-red:         #c8523a;   /* 붉은 산수 */
--color-blue:        #2e6db5;   /* 코발트 */
```

### 타이포그래피
```css
/* Pierrick 핵심: 극도로 얇은 웨이트 + 넓은 자간 */
--font-serif:        'Cormorant Garamond', Georgia, serif;
--font-serif-kr:     'Noto Serif KR', serif;
--font-sans:         'Noto Sans KR', sans-serif;

/* 웨이트 */
--fw-thin:    200;
--fw-light:   300;
--fw-regular: 400;

/* 자간 */
--ls-title:   0.18em;
--ls-nav:     0.22em;
--ls-label:   0.28em;
--ls-body:    0.04em;

/* 폰트 스케일 (fluid) */
--text-hero:  clamp(3.5rem, 8vw,  8rem);    /* 초대형 배경 타이틀 */
--text-xl:    clamp(2rem,   4vw,  3.5rem);  /* 섹션 제목 */
--text-lg:    clamp(1.4rem, 2vw,  2rem);    /* 작품 제목 */
--text-md:    clamp(1rem,   1.4vw,1.3rem);  /* 서브 제목 */
--text-base:  clamp(0.85rem,1vw,  1rem);    /* 본문 */
--text-sm:    clamp(0.72rem,0.8vw,0.82rem); /* 메타 */
--text-xs:    clamp(0.62rem,0.7vw,0.72rem); /* 라벨 */
```

### 폰트 렌더링 (필수)
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```
> weight 200~300 얇은 서체는 안티앨리어싱 없으면 윈도우에서 깨짐.
> 반드시 전역 적용 필수.

### 다국어 자간 예외 처리 (필수)
영문 자간(0.18~0.22em)을 한자/일본어에 그대로 적용하면
글자가 찢어져 가독성 파괴. 언어별 예외 규칙 필수:

```css
/* 한국어 — 자간 축소 */
:lang(ko) .ls-title  { letter-spacing: 0.06em; }
:lang(ko) .ls-nav    { letter-spacing: 0.08em; }

/* 일본어 */
:lang(ja) .ls-title  { letter-spacing: 0.04em; }
:lang(ja) .ls-nav    { letter-spacing: 0.06em; }

/* 중국어 — 자간 없앰 */
:lang(zh) .ls-title  { letter-spacing: 0; }
:lang(zh) .ls-nav    { letter-spacing: 0; }
```

i18n-engine.ts에서 언어 변경 시 `<html lang="">` 속성도 함께 변경할 것.
```ts
document.documentElement.lang = lang  // 'ko' | 'en' | 'ja' | 'zh'
```

### 여백 (Pierrick 핵심)
```css
/* Pierrick: 넓은 여백이 럭셔리함을 만든다 */
--pad-page:   clamp(24px, 5vw, 72px);   /* 페이지 좌우 여백 */
--pad-sec:    clamp(64px, 8vw, 128px);  /* 섹션 상하 여백 */
--gap-grid:   clamp(4px,  0.5vw, 8px);  /* 그리드 간격 */
--col-max:    1320px;                    /* 최대 컨테이너 폭 */
--col-narrow: clamp(480px, 60vw, 720px);/* 좁은 중앙 컬럼 */
```

### 모션
```css
/* Pierrick: 짧고 정밀한 easing */
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
--ease-inout:  cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

--dur-fast:  0.25s;
--dur-base:  0.45s;
--dur-slow:  0.7s;
--dur-page:  0.6s;   /* 페이지 전환 */
```

### Glass (뷰어용)
```css
--glass-bg:     rgba(247, 244, 238, 0.08);
--glass-border: rgba(247, 244, 238, 0.14);
--glass-blur:   blur(40px) saturate(150%);
--glass-dark:   rgba(26, 18, 8, 0.78);
```

---

## 3. 레이아웃 구조 (Layout Architecture)

### Pierrick에서 이식할 핵심 구조

```
┌─────────────────────────────────────────┐
│  .site-header  (fixed, transparent)     │ ← 극도로 얇은 네비
│  logo 좌측 / menu 중앙 / lang 우측      │
├─────────────────────────────────────────┤
│                                         │
│  .page-hero  (100svh 풀스크린)          │ ← 작품 1점 전체화면
│  작품 이미지 + 하단 라벨                │
│                                         │
├─────────────────────────────────────────┤
│  .page-content (좁은 중앙 컬럼)         │ ← 세로 갤러리 스택
│  작품들이 세로로 쌓임                   │
│  클릭 → 상세 뷰어                       │
│                                         │
├─────────────────────────────────────────┤
│  .g-float-nav (하단 고정 pill)          │ ← 기존 유지
└─────────────────────────────────────────┘
```

### 페이지별 레이아웃

#### index.html — 홈
- 100svh 히어로 (Ken Burns 슬라이드쇼)
- 초대형 배경 타이포 "WANG YEUL" (opacity 0.04)
- 대표작품 세로 스택 (좁은 컬럼)
- 작품세계 3개 카드
- 작가 소개 (텍스트 중심)
- 소장처 (텍스트 리스트)

#### works/index.html — 작품 전체
- 좁은 중앙 컬럼 + 큰 여백
- 작품 세로 스택 (Pierrick 방식)
- 각 작품: 이미지 + 하단 메타 (번호, 제목, 연도)
- hover: 나머지 opacity 0.35 dimming
- 클릭: 풀스크린 뷰어

#### 나머지 페이지
- 동일한 헤더/네비 구조
- 각 페이지 콘텐츠만 다름

---

## 4. 컴포넌트 설계

### 4-1. 헤더 `.site-header`
```
구조: position fixed | width 100% | z-index 100
배경: transparent → scroll 시 rgba(247,244,238,0.85) blur
높이: 52px (Pierrick: 얇게)
좌: 로고 (王烈 · Wang Yeul) — font-weight 300, letter-spacing 0.18em
중: 네비 링크 — font-weight 200, letter-spacing 0.22em, uppercase
우: 언어 버튼 — font-size xs
스크롤 다운: translateY(-100%) opacity 0 (0.35s ease)
스크롤 업: 복원
```

### 4-2. 히어로 `.page-hero`
```
구조: height 100svh | position relative | overflow hidden
이미지: position absolute | inset 0 | object-fit cover
Ken Burns: scale 1 → 1.05 (12s ease-out) — GSAP
라벨: 하단 좌측 — 작품명 + 연도 + 매체 + 크기
슬라이드쇼: 5초 간격 | crossfade 1.2s
dot 인디케이터: 하단 중앙 | 금빛
```

### 4-3. 갤러리 스택 `.gallery-stack`
```
구조: max-width var(--col-narrow) | margin 0 auto
각 아이템: .stack-item
  - 번호: 작은 세리프 (01, 02...)
  - 이미지: 100% 폭 | 실제 비율 유지 (aspect-ratio)
  - 하단: 제목(en) + 제목(kr) + 연도 | 항상 표시
  - hover: 나머지 items opacity 0.35 | scale 1.01
  - 클릭: 풀스크린 뷰어 열기
간격: padding-bottom clamp(64px, 8vw, 128px) per item
```

### 비대칭 배치 규칙 (Pierrick 핵심)
Masonry columns만으로는 Pierrick 감성이 안 남.
각 아이템에 불규칙한 여백을 줘서 "편집된 느낌" 연출:

```css
.wall-item:nth-child(3n+1) { margin-top: 0; }
.wall-item:nth-child(3n+2) { margin-top: 40px; }
.wall-item:nth-child(3n+3) { margin-top: 80px; }
```

데이터 레벨에서도 제어:
artworks.ts Artwork 타입에 아래 필드 추가:
```ts
layoutAlign?: 'left' | 'right' | 'center'  // 기본값: center
layoutWeight?: 'large' | 'medium' | 'small' // 그리드 내 크기 가중치
```

### 4-4. 풀스크린 뷰어 `.fullscreen-viewer`
```
구조: position fixed | inset 0 | z-index 9999
배경: #1e1508 (먹색)
이미지: max-width 100% | max-height 100vh | object-fit contain
정보 토글: 하단 "작품 정보" 버튼 클릭 시 패널 슬라이드업
패널: 제목/연도/재료/크기/소장/노트
닫기: ESC | 배경 클릭 | X 버튼
이동: ←→ 키보드 | 터치 스와이프
등장: GSAP Flip (카드 → 풀스크린 확장)
```

### 4-5. 플로팅 네비 `.g-float-nav`
```
기존 구조 유지
먹색 glass pill | 하단 고정 | 스크롤 다운 숨김
```

---

## 5. 인터랙션 명세 (Motion Specification)

### 페이지 진입
| 요소 | 애니메이션 | duration | easing |
|------|-----------|----------|--------|
| 로딩 인트로 | SVG ring 회전 + 퍼센트 | 최소 2.5s | — |
| 히어로 이미지 | fade in + Ken Burns | 1.2s | power3.out |
| 히어로 라벨 | translateY(20px)→0 | 0.8s | power3.out |
| 배경 타이포 | fade in | 1.5s | — |

### 스크롤
| 요소 | 애니메이션 | trigger |
|------|-----------|---------|
| .stack-item | opacity 0→1 + translateY(32px)→0 | top 85% |
| 섹션 제목 | opacity 0→1 + translateY(16px)→0 | top 90% |
| stagger | 0.08s per item | — |

### hover
| 요소 | 애니메이션 | duration |
|------|-----------|----------|
| 갤러리 카드 진입 | 나머지 opacity → 0.35 | 0.3s |
| 갤러리 카드 이탈 | 전체 opacity → 1 복원 | 0.35s |
| 카드 이미지 | scale 1→1.02 | 0.5s |
| 커서 | VIEW 원형 등장 (scale 0.4→1) | 0.25s |

### 클릭 (뷰어)
| 단계 | 애니메이션 | duration |
|------|-----------|----------|
| 카드 → 뷰어 | GSAP Flip 확장 | 0.65s power3.inOut |
| 배경 | fade in | 0.4s |
| 정보 패널 | translateY(100%)→0 | 0.45s power3.out |
| 닫기 | fade out + scale 0.97 | 0.3s |

### 모바일 터치 환경 대응
hover dimming은 데스크탑 전용. 모바일에서는 다르게 처리:

```ts
// cursor.ts + works.ts 공통 적용
const isTouch = window.matchMedia('(pointer: coarse)').matches

if (isTouch) {
  // hover dimming 비활성화
  // 대신: 탭 시 해당 카드만 scale(0.97) 피드백
} else {
  // 기존 GSAP dimming 로직
}
```

모바일 전용 토큰:
```css
@media (pointer: coarse) {
  --pad-page: clamp(16px, 4vw, 24px);
  --gap-grid: 2px;
  .wall { columns: 2; }
  .series { font-size: var(--text-base); }
}
```

### 스크롤 (Lenis)
> 기구현 — animation.ts 참고 (Smooth Scroll 및 GSAP 연동)

---

## 6. HTML 구조 템플릿

### 공통 헤더
```html
<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <a href="/Wang_art/" class="header-logo">
      <span class="logo-cn">王烈</span>
      <span class="logo-en">Wang Yeul</span>
    </a>
    <nav class="header-nav" aria-label="메인 네비게이션">
      <a href="/Wang_art/" data-nav="home">Works</a>
      <a href="/Wang_art/worlds/" data-nav="worlds">Worlds</a>
      <a href="/Wang_art/artist/" data-nav="artist">Artist</a>
      <a href="/Wang_art/collections/" data-nav="collections">Collections</a>
    </nav>
    <div class="header-lang">
      <button data-lang="ko" class="lang-btn active">KO</button>
      <button data-lang="en" class="lang-btn">EN</button>
      <button data-lang="ja" class="lang-btn">JP</button>
      <button data-lang="zh" class="lang-btn">ZH</button>
    </div>
  </div>
</header>
```

### 풀스크린 뷰어
```html
<div class="fullscreen-viewer" id="fsViewer" hidden role="dialog" aria-modal="true">
  <div class="fsv-backdrop" id="fsvBackdrop"></div>
  <div class="fsv-stage">
    <img class="fsv-img" id="fsvImg" src="" alt="">
    <button class="fsv-close" id="fsvClose" aria-label="닫기">✕</button>
    <button class="fsv-prev" id="fsvPrev" aria-label="이전">←</button>
    <button class="fsv-next" id="fsvNext" aria-label="다음">→</button>
    <button class="fsv-info-toggle" id="fsvInfoToggle">작품 정보</button>
  </div>
  <div class="fsv-info" id="fsvInfo">
    <p class="fsv-num" id="fsvNum"></p>
    <h2 class="fsv-title" id="fsvTitle"></h2>
    <p class="fsv-title-kr" id="fsvTitleKr"></p>
    <div class="fsv-meta">
      <div class="fsv-meta-row"><span class="fsv-label">연도</span><span id="fsvYear"></span></div>
      <div class="fsv-meta-row"><span class="fsv-label">재료</span><span id="fsvMedium"></span></div>
      <div class="fsv-meta-row"><span class="fsv-label">크기</span><span id="fsvSize"></span></div>
      <div class="fsv-meta-row"><span class="fsv-label">소장</span><span id="fsvCollection"></span></div>
    </div>
    <p class="fsv-note" id="fsvNote"></p>
  </div>
</div>
```

---

## 7. 파일 변경 계획

### 삭제 (기존)
```
css/style.css           → 완전 교체
index.html              → HTML 구조 재작성
works/index.html        → HTML 구조 재작성
worlds/index.html       → HTML 구조 재작성
artist/index.html       → HTML 구조 재작성
collections/index.html  → HTML 구조 재작성
src/shared/viewer.ts    → fsViewer.ts로 교체
```

### 신규 생성
```
src/styles/reset.css        → 전역 리셋
src/styles/design-system.css → 토큰 (기존 업데이트)
src/styles/layout.css       → 공통 레이아웃
src/styles/components.css   → 컴포넌트 스타일
src/styles/animations.css   → 애니메이션
src/shared/fsViewer.ts      → 풀스크린 뷰어
src/shared/header.ts        → 헤더 스크롤 로직
```

### 유지
```
src/types.ts
src/data/artworks.ts
src/data/worlds.ts
src/data/collections.ts
src/data/i18n.ts
src/shared/loading.ts
src/shared/nav.ts
src/shared/cursor.ts
src/shared/animation.ts
src/shared/i18n-engine.ts
src/pages/*.ts             → 내부 로직 일부 수정
```

---

## 8. 구현 순서 (에이전시 작업 순서)

### Phase 1 — CSS 기반 구축 (1일)
1. `reset.css` 작성
2. `design-system.css` 토큰 업데이트
3. `layout.css` — 헤더/히어로/스택/뷰어 레이아웃
4. `components.css` — 각 컴포넌트 스타일
5. `animations.css` — 키프레임 + 트랜지션

### Phase 2 — HTML 재작성 (1일)
1. `index.html` — 새 구조로 재작성
2. `works/index.html`
3. `worlds/index.html`
4. `artist/index.html`
5. `collections/index.html`

### Phase 3 — TS 로직 수정 (1일)
1. `src/shared/fsViewer.ts` — 풀스크린 뷰어 신규
2. `src/shared/header.ts` — 헤더 스크롤 로직
3. `src/pages/home.ts` — 갤러리 스택 렌더링
4. `src/pages/works.ts` — 스택 렌더링 + 뷰어 연결
5. `src/pages/worlds.ts` — 재작성
6. `src/pages/collections.ts` — 재작성

### Phase 4 — 통합 + QA (1일)
1. 로컬 전체 확인
2. 모바일 반응형 점검
3. 빌드 + GitHub Pages 배포
4. `docs/TS설명.md` 업데이트

---

## 9. QA 체크리스트

### 기능
- [ ] 로딩 인트로 2.5초 이상
- [ ] 히어로 슬라이드쇼 5초 자동 전환
- [ ] 갤러리 스택 세로 배열
- [ ] hover dimming 작동
- [ ] VIEW 커서 등장/이탈
- [ ] 클릭 → 풀스크린 뷰어 (GSAP Flip)
- [ ] 뷰어 ←→ 키보드 이동
- [ ] 뷰어 ESC 닫기
- [ ] 작품 정보 토글 패널
- [ ] 언어 전환 KO/EN/JP/ZH
- [ ] 플로팅 네비 active + 스크롤 숨김
- [ ] 모바일 터치 스와이프

### 성능
- [ ] 이미지 lazy loading
- [ ] 첫 화면 LCP < 2.5s
- [ ] 콘솔 에러 0
- [ ] prefers-reduced-motion 대응

### 접근성
- [ ] focus-visible 스타일
- [ ] aria-label 전체
- [ ] 키보드 포커스 트랩 (뷰어)
- [ ] 색상 대비 4.5:1 이상

---

*이 문서는 에이전시 작업 전 감독(Art Director)이 승인한 설계 기준입니다.*
*코딩 시작 전 반드시 이 문서를 숙지하고 진행할 것.*