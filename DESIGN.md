# DESIGN.md v3.0 — 왕열 Wang Yeul
## Pierrick Calvez 구조 정밀 복제 기반 재설계

> 크롤링 측정값 기반 (2026-06-06). 추측 없이 실측값만 기재.

> 변경 이력 (2026-06-15): `Gowun Batang`를 `/worlds/` 제목 전용 디스플레이 페이스로 디렉터 승인 하에 추가. 공통 토큰은 유지하고 `/worlds/` 스코프에서만 사용.

---

## 1. 색상 시스템

```css
/* Pierrick 실측 */
--bg:           #FDFBFB;   /* rgb(253,251,251) — 극히 따뜻한 화이트 */
--ink:          #222222;   /* rgb(34,34,34) — 주 텍스트 */
--ink-muted:    #333333;   /* rgb(51,51,51) — 보조 텍스트 */
--accent:       #FF3333;   /* rgb(255,51,51) — active/hover 강조 */

/* 왕열 추가 (동양 작가 정체성) */
--ink-warm:     #1A1208;   /* 기존 유지 — 히어로 배경 등 */
--gold:         #C4A265;   /* 기존 유지 — 한국화 포인트 */
```

---

## 2. 폰트 시스템

### Pierrick 실측
| 용도 | 폰트 | Size | Weight | Letter-spacing |
|------|------|------|--------|----------------|
| 네비 로고 | Apercu Pro | 22px | 200 | 0.4px |
| 네비 링크 | Apercu Pro | 22px | 400 | 0.4px |
| 시리즈 타이틀 (히어로) | Apercu Pro Mono | 126px | 400 | **-5px** |
| 작품 캡션 | Apercu Pro | 15px | 200 | 0.2px |
| 푸터 링크 | Apercu Pro | 18px | 200 | 0.4px |
| 바디/레이블 | Apercu Pro | 14px | 400 | normal |

### 왕열 대체 폰트 (Apercu Pro = 유료, Google Fonts 대체)
```css
/* 1순위 대체: DM Sans — 가장 유사한 기하 sans-serif */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;1,9..40,200&family=DM+Mono:wght@300;400&display=swap');

--font-primary: 'DM Sans', sans-serif;
--font-mono:    'DM Mono', monospace;    /* 시리즈 타이틀 */
--font-kr:      'Noto Sans KR', sans-serif;  /* 한국어 전용 */
```

> 왕열 한국어 제목 병기를 위해 Noto Sans KR 유지.

---

## 3. 레이아웃 / 간격

### 실측 치수 (1440px viewport 기준)
```
컨텐츠 최대 폭:    1152px  (= 1440 × 0.8)
좌우 여백:         144px   (= (1440 - 1152) / 2)
네비바 높이:       80px
푸터 상단 패딩:    120px
푸터 좌우 패딩:    288px   (= 1440 × 0.2)
시리즈 섹션 패딩:  0 144px 0 136.8px
그리드 컬럼 gap:   8%      (series wall 실측)
```

```css
:root {
  --content-w:   1152px;
  --pad-side:    144px;
  --nav-h:       80px;
  --footer-pt:   120px;
  --footer-px:   288px;
  --wall-gap:    8px;    /* home/works wall */
  --series-gap:  8%;     /* series detail wall */
}

/* 중앙 정렬 컨테이너 */
.container {
  max-width: var(--content-w);
  margin: 0 auto;
  padding: 0 var(--pad-side);
}
```

---

## 4. 네비게이션 (실측 구조)

### Pierrick 구조
```
<div class="navbar w-nav">                         ← position:relative, full width
  <div class="navbar-container w-clearfix">        ← 1152px × 80px, display:flex
    [로고] Pierrick Calvez                          ← 22px, fw200, ls0.4px, 좌측
    [링크] Selected Works / Resume / Contact        ← 22px, fw400, ls0.4px, 우측
  </div>
  <div class="w-nav-overlay">                      ← 모바일 드로어
```

### 왕열 적용
```html
<header class="navbar">
  <div class="container">
    <a href="/" class="navbar-logo">왕열 Wang Yeul</a>
    <nav class="navbar-links">
      <a href="/works/">Selected Works</a>   <!-- 영문 우선 -->
      <a href="/worlds/">Work Philosophy</a>
      <a href="/artist/">Artist</a>
      <a href="/collections/">Collections</a>
    </nav>
    <button class="navbar-hamburger">☰</button>
  </div>
</header>
```

```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-h);       /* 80px */
  background: var(--bg);
  z-index: 100;
}
.navbar-logo {
  font-size: 22px;
  font-weight: 200;
  letter-spacing: 0.4px;
}
.navbar-links a {
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.4px;
  color: var(--ink);
}
.navbar-links a:hover,
.navbar-links a.active {
  color: var(--accent);   /* #FF3333 */
}
```

---

## 5. 홈 페이지 구조

### Pierrick 홈 실측 (1440px)
```
1. navbar (80px)
2. main-visual-wrapper  1152 × 798px  ← 단일 피처 이미지 (object-fit:fill)
   └── 이미지 위 시리즈명 오버레이:
       Apercu Pro Mono, 126px, fw400, ls=-5px
3. series (686px tall)
   padding: 0 144px 0 136.8px
   └── series-label: "Series /" 16px fw300 ls0.5px
   └── series-wrapper (시리즈 목록 수평)
4. wall (Masonry 2-3열, ~2962px)
   └── wall-collection-link (이미지 클릭 → 작품)
5. subscribe (260px)
6. footer (320px, padding:120px 288px 0)
```

### 왕열 홈 변경 사항
- **히어로**: 슬라이드쇼 → **단일 피처 이미지** (가장 큰 작품 1점)
- 시리즈명: `DM Mono`, 126px, ls=-5px — 이미지 위 오버레이
- 히어로 이미지 클릭 → 해당 작품 상세 페이지
- wall: 현재 columns:3 유지 (실측과 동일)

---

## 6. Works (Selected Works) 페이지

### Pierrick 실측
```
1. navbar
2. directory (294px)
   display: flex
   └── directory-title (144px 고정폭, 세로 텍스트 또는 작은 레이블)
   └── directory-menu-series (1080px)
       display: grid, gridTemplateColumns: 504px 504px (2열)
       각 항목: 200×160 썸네일 + 시리즈명
3. wall (전체 작품 Masonry)
4. footer
```

### 왕열 변경
- 현재 wall 단독 → 상단 `directory` 섹션 추가 (시리즈별 grid)
- 각 시리즈 카드: 썸네일 + 한글/영문 시리즈명

---

## 7. 작품 상세 페이지 (Artwork)

### Pierrick 실측 (1440px)
```
artwork-nav-container (display:flex, 1440×904px)
├── nav-artwork-container c-left  (180px × 438px)  ← Prev
├── artwork-image                 (1080px × 864px)  ← 메인 이미지
└── nav-artwork-container c-right (180px × 438px)  ← Next

artwork-container (display:flex, 1080px)
├── artwork-image    (1080px × 924px)  ← 세부 이미지 (더 크게)
└── label.artwork    (211px × 80px, fs=15px, fw=200, ls=0.2px)
    제목 · 연도 · 재료 · 크기

footer
```

### 왕열 적용 변경
- 좌우 180px nav 패널 구조 유지
- 이미지: 1080px 중앙, `object-fit: contain` (세로 작품도 잘림 없이)
- 캡션: 이미지 바로 아래, 15px fw200 ls0.2px
- 현재 인라인 flex 캡션 → Pierrick과 동일 좌하단 label 배치

---

## 8. Series 페이지

### Pierrick 실측
```
titlebar-container (display:flex, 1440×120px, padding-left:50px)
├── nav-series-container.prev (Prev series)
├── title-series-container
└── nav-series-container.next (Next series)

wall.the-series
└── wall-collection-list (columns:2, column-gap:8%)
    각 아이템: 570×456px ~ 570×760px (세로 비율 다양)
```

---

## 9. 푸터

### Pierrick 실측
```css
.footer {
  display: flex;
  padding: 120px 288px 0;    /* 상=120px, 좌우=288px */
  background: transparent;
}
```
- 링크: "Pierrick Calvez" 18px fw200 ls0.4px
- "Instagram @pierrickcalvez" 18px fw200
- "小红书" 17px fw300
- "Email" 18px fw200
- **border 없음**, 배경 투명

### 왕열 적용
```html
<footer class="footer">
  <a href="/" class="footer-name">왕열 Wang Yeul</a>
  <a href="https://www.instagram.com/실제계정/" target="_blank">Instagram @wangyeul</a>
  <a href="mailto:studio@wangyeul.com">Email</a>
</footer>
```

---

## 10. Wall 그리드 (이미지 배치)

### Pierrick 실측
| 페이지 | 방식 | 컬럼 수 | gap |
|--------|------|---------|-----|
| 홈 wall | CSS columns (Masonry) | 2~3열 | ~8px |
| works wall | CSS columns | 2~3열 | ~8px |
| series wall | CSS columns:2 | 2열 | 8% |
| works directory | CSS grid 2열 504px | 2열 | - |

```css
/* 홈/works wall — Pierrick 방식 */
.wall-list {
  columns: 2;
  column-gap: 8px;
}
.wall-item {
  break-inside: avoid;
  margin-bottom: 8px;
  cursor: pointer;
}
.wall-item img {
  display: block;
  width: 100%;
  height: auto;         /* 원본 비율 유지 */
  object-fit: fill;     /* Pierrick 실측 = fill */
}

/* hover dimming */
.wall-list:hover .wall-item img { opacity: 0.35; transition: opacity 0.3s; }
.wall-list:hover .wall-item:hover img { opacity: 1; }
```

---

## 11. 인터랙션 / 모션

### Pierrick 확인된 것
- Webflow IX2 기반 애니메이션 (`w-mod-ix`)
- 전체 요소에 `transition: all` 적용 (Webflow 기본)
- 커스텀 커서: "VIEW" 레이블
- 스크롤 시 navbar 숨김 여부: 미확인 (Webflow 스크롤 인터랙션)
- hover dimming: `.wall-list:hover` 시 나머지 어둡게

### 왕열 유지/수정
| 기능 | 상태 | 조치 |
|------|------|------|
| 커스텀 커서 "VIEW" | 버그 (selector 불일치) | cursor.ts selector → `.wall-item` |
| Lenis smooth scroll | 구현됨 | 유지 |
| 로딩 인트로 | 왕열 추가 | 유지 |
| 페이지 전환 fade | 미구현 | 추가 필요 |
| 메뉴 stagger | 구현됨 | 유지 |
| Ken Burns | 구현됨 | 히어로 단일이미지에도 적용 |

---

## 12. 재구현 우선순위

| 우선순위 | 항목 | 파일 |
|---------|------|------|
| 🔴 즉시 | cursor.ts selector 버그 | `src/shared/cursor.ts` |
| 🔴 즉시 | 히어로 단일 피처 이미지로 변경 | `src/pages/home.ts`, `index.html` |
| 🔴 즉시 | 시리즈명 Mono 126px 오버레이 | `src/pages/home.ts`, `hero.css` |
| 🟠 높음 | 폰트 → DM Sans + DM Mono | `design-system.css`, 모든 HTML |
| 🟠 높음 | 배경색 → #FDFBFB (현재 #f7f4ee) | `design-system.css` |
| 🟠 높음 | Wall 컬럼 gap → 8px | `wall.css` |
| 🟠 높음 | 푸터 패딩 → 120px 288px | `footer.css` |
| 🟡 중간 | Works 상단 directory 섹션 추가 | `works/index.html`, `src/pages/works.ts` |
| 🟡 중간 | Artwork 레이아웃 — 좌우 180px nav | `artwork/index.html`, `artwork.css` |
| 🟡 중간 | 페이지 간 fade 전환 | `src/shared/animation.ts` |
| 🟢 낮음 | Instagram 실제 URL 연결 | 모든 HTML |
| 🟢 낮음 | Artwork URL → slug 방식 | `vite.config.ts` |
