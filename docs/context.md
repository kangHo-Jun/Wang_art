# 왕열 Wang Yeul — 프로젝트 컨텍스트
> 최종 업데이트: 2026-06-20
> 작업 브랜치: ui/pierrick-v3
> 로컬 경로: /Users/zart/Library/Mobile Documents/com~apple~CloudDocs/프로젝트/Wang_art

---

## 1. 프로젝트 개요

**목표**: https://www.pierrickcalvez.com/ UI를 왕열 작가 콘텐츠로 1:1 이식
**호스팅**: GitHub Pages (kangho-jun.github.io/Wang_art/)
**기술 스택**: Vite + TypeScript + GSAP + Lenis
**배포 규칙**: 로컬 테스트 통과 후에만 GitHub 푸시

---

## 2. 브랜치 구조

| 브랜치 | 내용 |
|--------|------|
| main | 왕열 자체 v3.2 (안정 버전) |
| ui/self-v2 | 왕열 고유 디자인 — 완성 |
| ui/pierrick-v3 | Pierrick 완전 복제 — 현재 작업 중 |

---

## 3. 핵심 규칙

1. **푸시 금지**: 로컬 테스트 통과 전까지 git push 절대 금지
2. **커밋만**: 작업 완료 시 commit만, push는 감독님 승인 후
3. **임의 코딩 금지**: 감독님 지시 없이 디자인 변경 절대 금지
4. **분석 요청 → 분석만**: 코딩 지시가 없으면 코딩하지 말 것
5. **DESIGN_v3_complete.md 기준**: 모든 수치는 이 문서 기준

---

## 4. 설계 문서 위치

| 문서 | 경로 | 내용 |
|------|------|------|
| DESIGN_v3_complete.md | docs/ | Pierrick 실측 기반 완전 설계서 |
| context.md | docs/ | 이 파일 — 프로젝트 맥락 |

---

## 5. Pierrick 실측 핵심 수치

### 색상
```css
--color-bg:       #fafafa;   /* 차갑고 깔끔한 흰색 */
--color-ink:      #333333;
--color-ink-dark: #222222;
```

### 네비바
```css
height: 80px;
background: #fafafa (투명처럼 보임);
border: none;

.navbar-link.logo {
  font-size: 22px; font-weight: 200;
  letter-spacing: 0.4px;
  padding: 25px 0 20px 5px;
}
.navbar-link.big {
  font-size: 22px; font-weight: 200;
  margin-left: 50px;
  padding: 25px 0 20px;
}
.navbar-link-small {
  font-size: 18px; font-weight: 300;
  margin-left: 50px;
}
```

### 히어로 이미지
```css
/* 좌우 여백 있음 — 화면 꽉 채우지 않음 */
margin: 40px auto 0;
max-width: calc(100% - 151.2px);  /* 양쪽 75.6px */
```

### 시리즈
```css
font-size: 126px; font-weight: 400;
letter-spacing: -5px; line-height: 0.9;
padding: 0 144px 0 136.8px;
margin: 80px 0 140px;
overflow-x: auto; flex-wrap: nowrap;
```

### Wall 그리드
```css
columns: 3; column-gap: 8px;
margin: 0 75.6px 100px;
.wall-item { margin-bottom: 75px; }
```

### 작품 상세
```css
.artwork-container { margin: 0 180px; }
.artwork-image { margin: 0 0 40px; }
.label.artwork { margin: 60px 0 40px; font-size: 15px; font-weight: 200; }
/* 캡션: inline 나열 — label-name, comma, year, medium, size */
```

### 푸터
```css
padding: 120px 288px 40px;
font-size: 14px; font-weight: 400;
border: none;
```

---

## 6. 현재 파일 구조

```
Wang_art/
├── index.html                ← 홈 (수정 완료)
├── works/index.html          ← 작품 목록
├── worlds/index.html         ← 작품세계
├── artist/index.html         ← 작가
├── collections/index.html    ← 소장처
├── artwork/index.html        ← 작품 상세
├── public/
│   └── images/               ← 작품 이미지
├── src/
│   ├── main.ts               ← 진입점 + 공통 초기화
│   ├── types.ts              ← TypeScript 타입
│   ├── styles/
│   │   ├── reset.css
│   │   ├── design-system.css ← 디자인 토큰 전체
│   │   ├── navbar.css        ← 네비바
│   │   ├── hero.css          ← 히어로
│   │   ├── wall.css          ← 시리즈 + 그리드
│   │   ├── artwork.css       ← 작품 상세
│   │   ├── footer.css        ← 푸터
│   │   └── animations.css    ← 페이지 전환 + Lenis
│   ├── data/
│   │   ├── artworks.ts       ← 작품 데이터 (ARTWORKS, FEATURED)
│   │   ├── worlds.ts         ← 작품세계 데이터
│   │   ├── collections.ts    ← 소장처 데이터
│   │   └── i18n.ts           ← 다국어
│   ├── shared/
│   │   ├── animation.ts      ← GSAP + Lenis + 페이지 전환
│   │   ├── header.ts         ← 스크롤 숨김
│   │   ├── cursor.ts         ← VIEW 커서
│   │   └── menuOverlay.ts    ← 모바일 메뉴
│   └── pages/
│       ├── home.ts           ← 홈 로직
│       ├── works.ts          ← 작품 목록
│       ├── worlds.ts         ← 작품세계
│       ├── artist.ts         ← 작가
│       ├── collections.ts    ← 소장처
│       └── artwork.ts        ← 작품 상세
└── docs/
    ├── DESIGN_v3_complete.md ← 설계 문서
    └── context.md            ← 이 파일
```

---

## 7. 현재까지 완료된 것

| 항목 | 상태 |
|------|------|
| CSS 토큰 (design-system.css) | ✅ 완료 |
| 네비바 HTML/CSS | ✅ 완료 (여백 미세 조정 필요) |
| 히어로 이미지 | ✅ 구현 (좌우 margin 조정 필요) |
| 시리즈 섹션 | ✅ 구현 |
| Wall 그리드 | ✅ 구현 |
| 작품 상세 | ✅ 구현 |
| 페이지 전환 fade | ✅ 구현 |
| Lenis 스크롤 | ✅ 구현 |
| 푸터 | ✅ 구현 |

---

## 8. 현재 남은 작업 (우선순위)

1. **배경색** — reset.css 또는 design-system.css에서 크림빛 → #fafafa 확인
2. **네비바 여백** — 로고가 화면 중간 높이쯤 오도록 padding 조정
3. **히어로 이미지 좌우 margin** — 화면 꽉 채우지 말고 75.6px 여백
4. **전체 페이지 HTML 통일** — works/worlds/artist/collections 네비+푸터 동일하게
5. **로컬 전체 테스트** — 감독님 직접 확인 후 통과 시 GitHub 푸시

---

## 9. 개발 명령어

```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# 배포 (로컬 테스트 통과 후에만)
npm run deploy
```

---

## 10. 참고

- **Pierrick 원본**: https://www.pierrickcalvez.com/
- **왕열 라이브**: https://kangho-jun.github.io/Wang_art/
- **폰트**: Noto Sans KR (Apercu Pro 대체), Space Mono (모노 서체)
- **이미지**: public/images/ 폴더 (blue/, red/, ink/, 2026/ 등)

---

## 11. 최근 결정 사항

1. **공통 nav active 표시는 레드 고정**
   - 현재 페이지 nav 링크는 Wang_art 기준 레드 `#c8442e`로 상시 표시한다.
   - hover도 동일 레드 계열을 사용하되, active는 마우스를 떼어도 유지한다.
   - 로고는 active 대상이 아니며 기본색을 유지한다.

2. **공통 nav 타이포 복구**
   - 로고와 페이지 링크는 전 페이지 공통으로 `22px / fw200 / ls0.4px`를 유지한다.
   - 모바일 햄버거 드로어 안의 메뉴 링크도 동일 수치를 유지한다.

3. **범위 제한**
   - 이번 수정은 공통 nav에 한정한다.
   - 전역 인터랙션 레드는 `#c8442e`로 통일하고, nav active/hover도 같은 값을 사용한다.

4. **`/worlds/` 구조는 그룹 A 기준으로 고정**
   - LANGUAGE는 좌우 2단이 아니라 상단 헤더 띠 + 하단 3색 가로 그리드 구조로 분리했다.
   - 총론은 `720px` 중앙 블록 + 좌측 정렬로 고정했다.
   - WORLD/SIGNS는 기존 2단 교차 구조를 유지하고, 공통 nav/footer 및 타 페이지는 건드리지 않았다.

5. **`/worlds/` 도입 시퀀스는 성능 정리 완료**
   - SVG 먹점 필터는 초반 인상만 남기고 시퀀스 중 제거한다.
   - `unlock()`/`cleanup()`으로 scroll lock 해제와 `will-change` 정리를 단순화했다.
   - reduced-motion에서는 자동재생 없이 작품/요약문만 즉시 표시한다.

6. **`/worlds/` 타이포 시스템은 Noto + Space Mono로 정리**
   - `worlds/index.html`에서 `Gowun Batang`, `Cormorant Garamond` 로드를 제거했다.
   - `/worlds/` 내부에서는 `--font-serif`를 `'Noto Serif KR', serif`로 재정의해 라틴 serif 잔재를 차단한다.
   - 축 제목과 한글 부제는 `Noto Sans KR` 계열로 통일하고, 제목-부제 위계는 간격/크기/보조색으로 분리했다.
   - 도입 문구는 `Noto Serif KR`, `font-weight: 300`, `clamp(30px, 4.6vw, 54px)`로 조정했다.

7. **`/worlds/` 현재 검수 상태**
   - `npm run build`는 최근 변경 기준 통과했다.
   - `/worlds/` 대상 파일 범위에서 `rg "Gowun|Cormorant"`는 0건이다.
   - 아직 남은 검수는 실브라우저 3뷰포트(1440 / 768 / 390) 시각 비교, console error 0, overflow 0, 목업(`v20~v24`) 1:1 대조다.

8. **체크포인트**
   - 현재 HEAD는 `ed78c38`이다.
   - 이전 저장 태그 `작품세계_수정전`은 별도 체크포인트로 존재한다.
