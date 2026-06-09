# Pierrick Calvez — 왕열 Wang Yeul 완전 이식 정밀 설계서 (v3.0 Complete)

이 문서는 `https://www.pierrickcalvez.com/` 사이트를 실측 분석한 데이터를 기반으로 작성된 완전 이식 명세서입니다. 본 설계서는 왕열 작가의 포트폴리오 사이트가 원본의 정보구조, 여백, 타이포그래피, 네비게이션, 작품 그리드(Wall Grid), 그리고 소개(Resume) 및 연락(Contact) 페이지까지 완벽하게 동일한 시각적/구조적 규칙을 따르도록 강제합니다.

---

## 1. 페이지 1:1 매핑 테이블

| 왕열 Wang_art 페이지 경로 | Pierrick Calvez 원본 페이지 경로 | 페이지 역할 및 마크업 구조 |
| :--- | :--- | :--- |
| `/` (홈) | `/` (Home) | 메인 비주얼 hero, 시리즈 목록(Space Mono), 3열 작품 그리드 |
| `/works/` | `/selected-works` | 작품 카테고리 필터링 디렉토리 메뉴, 3열 작품 그리드 |
| `/artist/` | `/resume` | 1열 작가 이력 레이아웃 (좌측 여백 256px, Download 우측 플로팅) |
| `/collections/` | `/contact` | 2열 연락처 및 작업실 위치 레이아웃 (Location, Contact) |
| `/artwork/` | `/artwork/:slug` | 작품 상세 뷰어 (이전/다음 투명 클릭 영역, 키보드 탐색) |
| `/worlds/` | (자체 구현 v3.0) | Pierrick 스타일의 여백과 폰트를 적용한 작품세계 소개 |

---

## 2. 홈 구조에서 "히어로 이미지" 표현 기준

*   **원본 분석**:
    - `https://www.pierrickcalvez.com/` 홈 화면 최상단에는 거대 이미지(`.main-visual-image`)가 위치하며, 그 하단 우측에 캡션(`.label.home`)이 놓입니다.
    - 그 아래에 `Series /` 라벨과 monospaced 폰트로 된 시리즈 링크 목록(`.series`)이 배치되고, 마지막으로 3열 작품 그리드(`.wall`)가 나타납니다.
*   **결정 사항**:
    - **히어로 이미지를 원본과 동일하게 유지 및 표현합니다.**
    - 단, 기존의 단순 텍스트 타이포 전용 히어로인 `.hero-type` 및 `.type-hero-link`는 제거하고, 원본과 동일하게 대표작 이미지(`.main-visual-image`) 및 우측 정렬 캡션(`.label.home`) 구조로 완전 대체합니다.

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

## 5. Contact (Collections) 페이지 정밀 스펙

*   **레이아웃 및 구조**:
    - 컨테이너 너비: **`1024px`** (`margin: 0px 128px 40px`, `display: flex;`)
    - 좌우 2열 비대칭 배치:
      - **좌측 열 (`.contact-block` 1)**: `Location` 정보 (너비 `384px`, 마진 `0px 0px 0px 128px`)
      - **우측 열 (`.contact-block` 2)**: `Contact` 정보 (너비 `384px`, 마진 `0px 0px 0px 128px`)
*   **Location 섹션**:
    - 카테고리 제목: `.contact-category` (`font-size: 18px; font-weight: 500; margin-bottom: 20px;`)
    - 주소 링크: `.location-link` (`display: inline-block; font-size: 14px; margin-bottom: 60px; text-decoration: none;`)
      - 영문 주소 및 국문 주소를 한 줄씩 병렬 배치합니다.
*   **Contact 섹션**:
    - 이메일 주소: `.contact-email` (`studio@wangyeul.com`) 및 우측에 인라인 배치된 클립보드 복사 링크 `.email-copy` (텍스트 `copy`).
    - 소셜 및 뉴스레터 링크: `.contact-link` 형태로 Instagram 링크 및 `Newsletter` 링크 제공.
    - **주의**: Contact 페이지 내에는 이미지 배열이나 폼 형태의 뉴스레터 영역이 존재하지 않으며, 단일 `Newsletter` 텍스트 링크가 홈 화면의 뉴스레터 앵커(`#mailing`)로 연결되는 구조입니다.

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
- [ ] **Resume 비대칭 정렬**: Artist 페이지 레이아웃이 너비 `896px` 및 좌측 마진 `256px` 비대칭 구조를 정확히 따르는지 대조합니다.
- [ ] **Contact 2열 배치**: Collections 페이지의 주소 및 메일 정보가 2열 비대칭 블록으로 오차 없이 분할 배치되는지 검증합니다.
- [ ] **모바일 오버레이 드로어**: 햄버거 메뉴 및 X 닫기 전환 and stagger 트랜지션 모션이 부드럽게 돌아가는지 확인합니다.
- [ ] **경로 설계**: 모든 파일 및 앵커의 베이스 경로가 `/Wang_art/` 구조에 맞추어 유기적으로 연동되는지 체크합니다.
