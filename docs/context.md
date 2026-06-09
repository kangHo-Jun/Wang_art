# 왕열 Wang Yeul — 프로젝트 컨텍스트
> 최종 업데이트: 2026-06-09
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
