# Pierrick Calvez — 왕열 Wang Yeul 완전 이식 정밀 설계서 (v3.0 Complete)

이 문서는 `https://www.pierrickcalvez.com/` 사이트를 실측 분석한 데이터를 기반으로 작성된 완전 이식 명세서입니다. 본 설계서는 왕열 작가의 포트폴리오 사이트가 원본의 정보구조, 여백, 타이포그래피, 네비게이션, 작품 그리드(Wall Grid), 그리고 소개(Resume) 및 소장처(Collections) 페이지까지 완벽하게 동일한 시각적/구조적 규칙을 따르도록 강제합니다.

---

## 1. 페이지 1:1 매핑 테이블

| 왕열 Wang_art 페이지 경로 | Pierrick Calvez 원본 페이지 경로 | 페이지 역할 및 마크업 구조 |
| :--- | :--- | :--- |
| `/` (홈) | `/` (Home) | 메인 비주얼 이미지, 시리즈 목록(Apercu Pro Mono 원형 / Wang_art에서는 Space Mono 대체), 3열 작품 그리드 |
| `/works/` | `/selected-works` | 작품 카테고리 필터링 디렉토리 메뉴, 3열 작품 그리드 |
| `/artist/` | `/resume` | 1열 작가 이력 레이아웃 (좌측 여백 256px, Download 우측 플로팅) |
| `/collections/` | (원본 `/contact` 스타일 차용) | 소장처 목록 (원본 `/contact` 의 2열 정보 레이아웃, 여백, 타이포 문법을 차용하여 구성) |
| `/artwork/` | `/artwork/:slug` | 작품 상세 뷰어 (이전/다음 투명 클릭 영역, 키보드 탐색) |
| `/worlds/` | (자체 구현 v3.0) | Pierrick 스타일의 여백과 폰트를 적용한 작품세계 소개 |

---

## 2. 홈 구조에서 대표작 메인 비주얼 표현 기준

*   **원본 분석**:
    - `https://www.pierrickcalvez.com/` 홈 화면 최상단에는 대표작 단일 이미지(`.main-visual-image`)가 위치하며, 그 하단 우측에 캡션(`.label.home`)이 놓입니다.
    - 그 아래에 `Series /` 라벨과 monospaced 폰트로 된 시리즈 링크 목록(`.series`)이 배치되고, 마지막으로 3열 작품 그리드(`.wall`)가 나타납니다.
*   **결정 사항**:
    - **일반적인 브랜드 배너 형식의 히어로 영역 표현을 배제하고, 원본과 동일하게 단일 대표작 메인 비주얼 및 우측 정렬 캡션 구조로 통일합니다.**
    - 기존의 텍스트 타이포 전용 섹션인 `.hero-type` 및 `.type-hero-link`를 전면 제거하고, `.main-visual-image` 및 `.label.home` 구조로 교체하여 시리즈 섹션으로 부드럽게 흐르는 구조를 만듭니다.

---

## 3. Selected Works 페이지 정밀 스펙

*   **시리즈 디렉토리 구조**:
    - 페이지 상단 네비바 바로 아래에 가로 형태의 필터 메뉴 `.directory-menu`가 위치합니다.
    - 필터 메뉴 항목: `All`, `Utopia`, `Ink & Landscape`, `Acrylic Landscape`, `Landscape`, `Horse`
    - 액티브 링크 스타일: `.directory-link.active` 시 텍스트 불투명도 `1` (기본 상태는 `opacity: 0.5`로 흐림).
*   **시리즈별 작품 수 표시**:
    - 원본의 디렉토리 스타일을 따릅니다. 카테고리 링크 우측에 별도의 브래킷이나 괄호 없이 깔끔하게 텍스트 링크 형태로만 나열합니다.
*   **그리드 및 이미지 여백 실측**:
    - **그리드 시작 Y축 위치**: 네비바 높이(80px) + 디렉토리 메뉴 높이 및 여백(약 120px) 아래인 `top: 200px` 부근부터 그리드가 시작됩니다.
    - **컬럼 구성**: 데스크톱 기준 `columns: 3; column-gap: 8px;`
    - **이미지 하단 마진**: `.wall-item` 간 세로 마진은 **`75px`**로 고정합니다. (모바일은 `20px`)

---

## 4. Resume (Artist) 페이지 정밀 스펙

*   **레이아웃 및 정렬**:
    - 컨테이너 너비: **`896px`**
    - 좌측 마진: **`256px`** (`margin: 40px 0px 40px 256px`)로 설정하여 화면 우측으로 편향된 Pierrick 특유의 비대칭 레이아웃을 정밀 재현합니다.
*   **Download 버튼**:
    - 우측 상단 플로팅: `.download` 클래스는 `float: right; width: 120px; margin: 0 128px 0 0; padding: 2px 0 16px;` 속성을 가집니다.
    - 타이포그래피: `font-size: 15px; font-weight: 200; letter-spacing: 0.3px;`
*   **콘텐츠 섹션 구성 및 간격**:
    - **기본 정보**: `.resume-text` 내부에서 `Born in... Resides and works in...`을 기본 본문 글꼴로 배치합니다.
    - **섹션 카테고리 제목 (`.resume-category`)**: `Education`, `Selected Exhibitions`, `Selected Public Collections` 등
      - 스타일: `font-size: 18px; font-weight: 500; letter-spacing: 0.3px; margin: 70px 0px 20px;`
    - **섹션 본문 (`.resume-text`)**:
      - 스타일: `font-size: 15px; font-weight: 200; letter-spacing: 0.3px; line-height: 21px;`
      - 전람회나 학력 내 핵심 텍스트(예: 전시회명, 학교명)는 `<span class="text-span-bold">` (두께 500) 및 `<span class="text-span-italic-bold">`를 통해 볼드 처리합니다.

---

## 5. Contact 스타일을 적용한 소장처(Collections) 페이지 정밀 스펙

*   **레이아웃 및 구조 (원본 `/contact` 스타일 차용)**:
    - 컨테이너 너비: **`1024px`** (`margin: 0px 128px 40px`, `display: flex;`)
    - 좌우 2열 비대칭 배치:
      - **좌측 열 (`.contact-block` 1)**: `Public Museums` 정보 (너비 `384px`, 마진 `0px 0px 0px 128px`)
      - **우측 열 (`.contact-block` 2)**: `Public & Institutional Collections` 정보 (너비 `384px`, 마진 `0px 0px 0px 128px`)
*   **소장처 데이터 구성**:
    - 카테고리 제목: `.contact-category` (`font-size: 18px; font-weight: 500; margin-bottom: 20px;`)
    - 소장처 주소/기관 목록: `.location-link` 및 `.contact-link` 형태의 2열 정보 레이아웃, 여백, 타이포 문법을 빌려서 표현합니다.

---

## 6. 반응형 및 모바일 기준 수치화

*   **브레이크포인트**:
    - **768px 이하 (태블릿 및 모바일)**
    - **480px 이하 (소형 모바일)**
*   **수치적 반응형 규칙**:
    - **네비바 높이**: 모바일 화면에서는 `120px`로 대폭 확장하여 로고 가독성을 높입니다.
    - **네비 오버레이 드로어**: 우측 상단 햄버거 버튼 클릭 시 화면 전체를 덮는 오버레이(`.nav-menu.open`)가 열리며, 본문 스크롤은 강제 차단(`overflow: hidden`)됩니다.
    - **Wall 그리드 열 수**:
      - `768px` 이하: `columns: 2` (좌우 패딩 20px, 이미지 하단 마진 20px)
      - `480px` 이하: `columns: 1`
    - **시리즈 텍스트 크기**: 모바일에서 `.type-hero-link`는 `font-size: 38px; letter-spacing: -1.5px; line-height: 40px;`로 스케일 아웃됩니다.
    - **구분 기호 크기**: 모바일에서 `.type-menu-separator` 역시 `font-size: 38px;` 및 `margin: 0 4px;`로 동기화됩니다.
    - **푸터 정렬**: 모바일에서는 `justify-content: flex-start; padding: 60px 20px 32px;` 구조로 변경되고, 모바일 전용 인스타그램 링크(`.ig-mobile`)가 활성화됩니다.

---

## 7. 완전 복제 체크리스트

- [ ] **배경색**: 모든 페이지의 배경색이 크림회색 톤인 `#fafafa`로 통일되었는지 확인합니다.
- [ ] **네비바 사양**: 투명 배경에 구분선(Border)이 일절 배제된 고정식 80px 헤더가 정착되었는지 검증합니다.
- [ ] **웹폰트 로드**: 모든 HTML 파일에서 `Noto Sans KR` 및 모노스페이스 서체인 `Space Mono`를 올바르게 로드하는지 확인합니다.
- [ ] **시리즈 목록**: 가로 스크롤 방식이 아닌 줄바꿈을 허용하는 `display: inline` 흐름에 monospaced 폰트 및 골드 period(`.`) 장식이 들어갔는지 확인합니다.
- [ ] **Wall 그리드**: 데스크톱 3열, 모바일 2열/1열 구조에 개별 아이템 세로 마진 `75px`가 빈틈없이 적용되었는지 체크합니다.
- [ ] **이미지 호버 감쇠**: 그리드 전체 호버 시 나머지 작품들이 `opacity: 0.5`로 흐려지고, 호버 대상만 `100%` 선명해지는 모션이 작동하는지 검사합니다.
- [ ] **Resume/Artist 비대칭 정렬**: Artist 페이지 레이아웃이 너비 `896px` 및 좌측 마진 `256px` 비대칭 구조를 정확히 따르는지 대조합니다.
- [ ] **Collections/소장처 2열 배치**: Collections 페이지의 소장처 정보가 원본 `/contact` 레이아웃을 차용한 2열 비대칭 블록으로 분할 배치되는지 검증합니다.
- [ ] **모바일 오버레이 드로어**: 햄버거 메뉴 및 X 닫기 전환 and stagger 트랜지션 모션이 부드럽게 돌아가는지 확인합니다.
- [ ] **경로 설계**: 모든 파일 및 앵커의 베이스 경로가 `/Wang_art/` 구조에 맞추어 유기적으로 연동되는지 체크합니다.

---

## 8. Navigation States (네비게이션 상태 설계)

### 8-1. Pierrick 원본 실측 (1440px 기준)

**컨테이너**
- 요소: `div.navbar.w-nav`
- `position: relative` — **스크롤 시 뷰포트 위로 사라짐 (NOT fixed)**
- DOM 측정 전체 높이: **300px** — Webflow가 숨겨진 모바일 오버레이 메뉴를 같은 컨테이너 안에 보유하므로 DOM 높이가 300px으로 측정됨
- **데스크톱에서 시각적으로 유효한 구조는 y=120~200 (80px stripe)** — 그 외 영역은 transparent 빈 공간 또는 숨겨진 요소
- 배경: `transparent`
- border-bottom: 없음
- z-index: 1000

**로고**
- 위치: 가시 영역 좌측, x=144px (1440 뷰포트 기준)
- 타이포: `22px / fw:200 / ls:0.4px / Apercu Pro / color:#333`
- 링크: `/` (홈)

**페이지 링크 (우측 정렬)**
- 링크 목록: Selected Works → Resume → Contact (3개)
- 타이포: 로고와 동일 `22px / fw:200 / ls:0.4px`
- 링크 간 간격: `margin-left: 50px`
- 우측 끝 x ≈ 1291px (우측 여백 ≈ 149px)
- 클릭 영역 높이: 80px (padding으로 확장)

**소셜 링크 (페이지 링크 우측)**
- Instagram, 小红书, Email
- 더 작은 폰트·낮은 opacity로 시각적 분리

---

### 8-2. Home vs Subpage navigation

원본 결론: 홈과 모든 서브페이지(works, resume, contact)의 nav 구조·링크·스타일이 완전히 동일.
변화 없음 — **단일 공통 nav 규칙 적용.**

---

### 8-3. Scroll navigation 동작

원본 동작: nav가 `position: relative`이므로 스크롤 시 상단으로 사라짐.
별도 fixed 스티키 헤더 없음. scroll-up 시 float nav나 별도 장치 없음 —
사용자가 맨 위로 직접 스크롤해야 nav에 접근 가능.

---

### 8-4. Wang_art 적용 규칙

#### 4-1. Nav position: `relative` (원본 동일)
- Wang_art nav도 Pierrick 원본과 동일하게 `position: relative` 적용
- 스크롤 시 nav가 뷰포트 위로 사라짐 — fixed 고정 헤더 없음
- 원본과의 1:1 이식 원칙에 따른 결정

#### 4-2. Nav 블록 높이 구조

**Pierrick 원본 DOM 측정값:** `~300px`
- Webflow 구조상 숨겨진 모바일 메뉴 요소가 같은 컨테이너에 포함되어 DOM 전체 높이가 300px으로 측정됨
- 데스크톱에서 실제 의미 있는 영역: `y=120~200` (80px visible stripe)

**Wang_art 구현값:** `200px` (시각 재현 우선)
- `padding-top: 120px` — 로고/링크 stripe 전 투명 여백
- navbar-container height: `80px` — 실제 링크 표시 영역
- **합계: 120 + 80 = 200px**
- 300px의 나머지 100px은 Webflow 모바일 메뉴 오버헤드로, 데스크톱 시각 재현에 불필요하여 포함하지 않음
- 메인 비주얼은 이 200px nav block 이후 시작 (nav와 겹치지 않음)
- Pierrick의 보이는 nav 위치(y=120~200)를 정확히 재현하기 위한 구현 결정

#### 4-3. 메뉴 항목

| 위치 | 링크 텍스트 | 경로 |
|------|------------|------|
| 로고 (좌측) | 왕열 Wang Yeul | `/` |
| 페이지 링크 (우측) | Selected Works | `/works/` |
| | 작품세계 | `/worlds/` |
| | 작가 | `/artist/` |
| | 소장처 | `/collections/` |

- 로고 포함 총 5개 링크 (원본 4개에서 1개 증가 — 페이지 수 차이)
- 모든 링크 동일 타이포: `22px / fw:200 / ls:0.4px`

#### 4-4. Instagram / Email 처리
- 원본처럼 소셜 링크를 별도 스타일로 분리 배치하는 것이 1차 기준
- 단, **우측 잘림(overflow clipping)이 발생하거나 Pierrick 특유의 여백감을 해치는 경우 상단 nav에서 제거**하고 footer 또는 float nav로 이동
- 분리 시 스타일: 페이지 링크보다 작은 폰트(`18px / fw:300`), 우측 여백 확보 필수

#### 4-5. 홈 / 서브페이지 nav
- 홈과 모든 서브페이지 동일한 nav 구조 적용 (원본 동일)
- 예외 없음

#### 4-6. Float nav (Wang_art 의도적 확장)
- **원본 Pierrick에는 없는 기능** — Wang_art 고유 보조 요소
- `position: fixed` bottom pill 형태로 유지
- 역할: 상단 nav가 스크롤로 사라진 뒤 페이지 이동 보조
- 설계서상 "Wang_art 확장" 항목으로 명시, Pierrick 이식 범위에 포함하지 않음

#### 4-7. 모바일 nav (768px 이하)
- 높이: `120px`
- **원본 Pierrick 데스크톱 nav의 300px/80px stripe 구조와 다른 Wang_art 반응형 최적화 예외**
  - 모바일 화면에서 300px 여백 구조는 콘텐츠 가시 영역을 과도하게 침범하므로 단축
  - 로고 가독성 및 터치 타깃 확보 목적
- hamburger → `nav-menu.open` 전체화면 드로어 (원본 모바일 패턴 이식)
- Float nav는 모바일에서도 유지 (Wang_art 확장)
