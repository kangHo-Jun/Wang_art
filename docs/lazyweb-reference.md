# Lazyweb Reference Research — Wang Yeul Website

## 1. 조사 목적

왕열 작가 홈페이지를 홍보형 랜딩페이지가 아니라 온라인 미술관, 작품 아카이브, 전시 기록 사이트로 재정의하기 위한 디자인 레퍼런스를 조사한다.

최종 판단 기준은 다음 두 문서다.

- `docs/방안.md`
- `docs/DESIGN.md`

이번 조사의 목적은 코드를 바꾸는 것이 아니라, 어떤 시각 언어와 정보 구조를 따라야 하는지 명확히 정리하는 것이다.

---

## 2. 현재 사이트의 디자인 문제

현재 사이트 `https://xangonxj.gensparkspace.com/#hero` 와 내부 기준 문서를 함께 보면 문제는 명확하다.

- Hero 이후 바로 작가 이력과 소개가 강하게 전면에 나온다.
- 작품 감상보다 정보 전달이 먼저라 온라인 전시장보다는 소개형 랜딩페이지에 가깝다.
- 공개 화면에 `로딩 중...`, `작품을 불러오는 중...`, `등록된 영상이 없습니다`, `관리자 페이지에서 영상을 추가해 주세요` 같은 운영 문구가 그대로 노출된다.
- 갤러리가 사이트의 중심 경험이 아니라 여러 섹션 중 하나처럼 취급된다.
- 화면 톤이 작품 아카이브라기보다 범용 CMS/홍보 페이지에 가깝다.
- 전시 이력과 소장처는 정보는 있으나 편집적 위계와 기록물 같은 구조가 약하다.
- 모바일에서 작품 중심 감상 흐름보다는 긴 소개문과 섹션 나열이 먼저 느껴진다.

핵심 결론:

- 첫 설득은 작가 소개가 아니라 작품이어야 한다.
- UI는 조용해야 하고, 작품과 기록의 밀도를 높여야 한다.

---

## 3. 참고할 레퍼런스 패턴

### A. 미술관/갤러리형 탐색 패턴

- `Artsy`
  - `https://www.artsy.net/shows`
  - `https://www.artsy.net/collection/understated`
  - 배울 점: 작품 썸네일이 곧 탐색의 기본 단위가 되고, 작품이 먼저 보이며, 필터는 시각을 방해하지 않게 뒤로 빠진다.

- `Peggy`
  - `https://peggy.com/galleries`
  - 배울 점: 갤러리 탐색을 “목록”이 아니라 “공간 탐험”처럼 보이게 만드는 카드 편성.

### B. 아카이브/컬렉션 패턴

- `Are.na`
  - `https://www.are.na/art-369-spring-2024/navigation-_z_3fgrb7jg`
  - `https://www.are.na/search`
  - `https://www.are.na/bruno-szenk/channels`
  - 배울 점: 긴 스크롤, 조용한 타이포, 채널/아카이브 중심 구조, 과도한 장식 없이 자료를 쌓아가는 느낌.

- `Glass`
  - `https://glass.photo/en-us/explore/categories`
  - 배울 점: 이미지 그리드가 주인공이고, 텍스트와 조작은 최소화된다.

### C. 작가/프로젝트 상세 패턴

- `Josh Sender`
  - `https://www.joshsender.com/projects/`
  - 배울 점: 전시나 프로젝트를 기사처럼 읽게 하는 편집형 상세 레이아웃.

- `Disney Gallery`
  - `https://disneyland.disney.go.com/attractions/disneyland/disney-gallery/`
  - `https://disneyland.disney.go.com/shops/disney-california-adventure/off-the-page/`
  - 배울 점: 장소/작품/전시 성격을 큰 이미지, 짧은 설명, 필수 메타데이터로 정리하는 방식.

### D. 에디토리얼 레이아웃 패턴

- `WSJ Magazine`
  - `https://www.dowjones.com/business-news/wsj-magazine/`
  - 배울 점: 고급 잡지 같은 여백, 사진 비중, 절제된 타이포 위계.

- `CNN Style Luxury`
  - `https://www.cnn.com/style/luxury`
  - 배울 점: 큰 대표 이미지와 편집 기사형 모듈을 섞는 방법.

- `Forbes Luxury Travel`
  - `https://www.forbes.com/topics/luxury-travel/`
  - 배울 점: 목록형 정보도 고급스럽게 편집할 수 있다는 점.

---

## 4. 따라 하면 안 되는 패턴

이번 조사 기준과 `DESIGN.md`의 금지 항목을 종합하면 아래 방향은 제외해야 한다.

- SaaS 랜딩페이지식 거대한 마케팅 Hero
- 스타트업 스타일의 문제 해결 문구와 강한 CTA 버튼
- 대형 그라디언트 배경, 특히 blue/purple 계열
- glassmorphism
- 과도한 둥근 카드 UI
- ecommerce 상품 카드처럼 가격/버튼/배지가 먼저 보이는 그리드
- 대시보드형 UI
- 스크롤마다 움직이는 과한 애니메이션
- “앱 다운로드”, “지금 시작”, “가입” 같은 서비스형 행동 유도 구조

특히 `Artsy`의 경우 작품 그리드 구조는 참고할 수 있지만, 판매형 가격 노출과 구매 중심 톤은 그대로 가져오면 안 된다.

---

## 5. Hero 개선 방향

- Hero는 “작가 소개”보다 “작품 세계의 문턱”이어야 한다.
- 첫 화면에는 짧은 문장 1개와 강한 대표 이미지 1개만 두는 편이 낫다.
- 문구는 설명형이 아니라 세계관 선언형이 적합하다.
- 언어 전환, 메뉴, 스크롤 유도는 남길 수 있지만 시각 우선순위는 작품 이미지가 가져야 한다.
- Hero 아래에 바로 `Selected Works` 또는 `대표 작품 3~6점`으로 이어져야 한다.

권장 톤:

- 따뜻한 아이보리 바탕
- 검은 먹색 텍스트
- 절제된 붉은 포인트
- 큰 사진, 적은 장식, 넓은 여백

피해야 할 Hero:

- 작가 이력 수치가 첫 화면에서 강조되는 구성
- 두 개 이상의 강한 버튼
- 장식용 배경 패턴이나 과한 애니메이션

---

## 6. Works 갤러리 개선 방향

- 갤러리는 사이트의 부속 섹션이 아니라 핵심 경험이 되어야 한다.
- 필터는 유지하되, 시각적으로는 조용한 탭 또는 텍스트 네비게이션 수준이 적절하다.
- 썸네일은 masonry처럼 자유롭게 두되, 정보 라벨은 최소화한다.
- 썸네일 아래에 작품명과 연도 정도만 짧게 보이고, 재료/크기는 상세에서 보는 흐름이 낫다.
- `Artsy`, `Glass`, `Are.na`처럼 이미지가 먼저 나오고 조작은 뒤로 숨는 구조가 적합하다.
- “작품 더 보기” 버튼보다 처음부터 충분한 작품 밀도를 보여주는 편이 낫다.

작품 카드 원칙:

- 카드처럼 보이지 않게
- 그림자 최소화
- 둥근 모서리 최소화
- 썸네일 간 간격은 좁되 답답하지 않게
- 가격, 배지, CTA 금지

---

## 7. 작품 상세 페이지 개선 방향

- 작품 상세는 쇼핑몰 상품 상세가 아니라 전시 도록 한 페이지처럼 보여야 한다.
- 큰 대표 이미지 1장과 보조 이미지, 그리고 메타데이터를 분리한다.
- 메타데이터는 제목, 연도, 재료, 크기, 시리즈, 전시 이력 정도로 제한한다.
- 작품 설명이 있다면 길지 않게 두고, 관련 전시 또는 같은 시리즈 작품으로 연결한다.
- 문의 유도는 하단의 조용한 링크 또는 작은 버튼 1개 정도면 충분하다.

권장 구조:

1. 큰 작품 이미지
2. 작품명 / 연도
3. 재료 / 크기 / 시리즈
4. 짧은 설명 또는 작품 맥락
5. 관련 작품 / 관련 전시

좋은 기준:

- `Disney Gallery`의 정보 정리 방식
- `Josh Sender`의 기사형 프로젝트 상세 흐름

---

## 8. Artist / Exhibitions / Contact 개선 방향

### Artist

- 작가 소개는 Hero 직후가 아니라 작품 감상 뒤에 오는 것이 맞다.
- 긴 약력보다 작가의 핵심 문장, 대표 약력, 학력/수상/경력 요약 순이 낫다.
- “작가의 말”과 “프로필”은 나누되 서로 다른 역할을 가져야 한다.
  - 작가의 말: 세계관
  - 프로필: 이력

### Exhibitions

- 전시 이력은 단순 나열보다 연도별 아카이브 구조가 적합하다.
- 각 전시는 제목, 연도, 장소, 도시, 짧은 설명 정도로 정리한다.
- 가능하면 대표 이미지 1장 또는 전시 포스터 1장 연결이 좋다.
- `Are.na`와 `Josh Sender`처럼 기록물이 쌓이는 느낌이 필요하다.

### Contact

- 문의는 상업적 폼이 아니라 공식 연락 창구처럼 보여야 한다.
- 항목 수를 줄이고, 이메일/인스타그램/전시 문의를 명확히 분리한다.
- 강한 CTA보다 조용한 정보 제공 방식이 더 적합하다.

---

## 9. 모바일 개선 방향

- 모바일에서는 소개문보다 작품 이미지를 먼저 보여야 한다.
- Hero 문구는 2~3줄 이내로 줄여야 한다.
- 갤러리 필터는 가로 스크롤 탭 형태가 적합하다.
- 작품 그리드는 모바일에서 1열 또는 느슨한 2열 중 택해야 한다.
- 전시 이력은 아코디언보다 연도 블록 스택이 더 안정적이다.
- Contact 폼은 최소 입력만 남기고 길이를 줄여야 한다.

모바일에서 특히 피해야 할 점:

- 작은 화면에서 과도한 텍스트 밀도
- 여러 버튼이 동시에 경쟁하는 Hero
- 이미지보다 설명이 먼저 보이는 섹션 순서

---

## 10. DESIGN.md에 반영할 항목

현재 `DESIGN.md`에 아래 항목을 추가하면 구현 기준이 더 분명해진다.

- `Role`
  - online museum / artwork archive / exhibition record

- `Content Priority`
  - artwork first
  - artist statement second
  - biography and credentials later

- `Hero Rules`
  - one strong image
  - one short line of copy
  - no stats in hero
  - no dual CTA hero

- `Gallery Rules`
  - masonry or quiet grid
  - no card shadows
  - no ecommerce styling
  - title/year only in listing

- `Detail Page Rules`
  - catalog-like layout
  - large image first
  - metadata in a narrow block
  - contact link must stay quiet

- `Archive Tone`
  - feels like exhibition catalog, not campaign landing page

- `Mobile Rules`
  - image first
  - shorter copy
  - horizontal filter tabs

---

## 11. 구현 우선순위

### 1순위

- Hero를 작품 중심으로 재구성
- Hero 다음에 `Selected Works` 배치
- 운영 문구와 관리자 문구 제거

### 2순위

- 갤러리 그리드 시각 언어 재정비
- 작품 상세 페이지 또는 상세 모달을 도록형으로 재구성
- 작가 소개 위치를 뒤로 이동

### 3순위

- 전시 이력을 연도별 아카이브형으로 재편
- Contact를 더 조용한 공식 연락 구조로 정리
- 모바일에서 텍스트 밀도와 이미지 우선순위 재조정

---

## Lazyweb 조사 메모

### 사용한 범주 확인

`lazyweb_list_categories`에서 직접 확인한 관련 범주 예시:

- `Art & Culture Magazine`
- `Art Collection Platform`
- `Art Magazine`
- `Artist / Creative Social Network`
- `Stock Photo & Editorial`
- `Wax Museum Chain`
- `Wine Museum & Tourism`

### 사용한 컬렉션 확인

`lazyweb_list_collections` 응답:

- `best-pricing-pages`

이 컬렉션은 이번 과업과 직접 관련이 없으므로 참고 대상으로 사용하지 않았다.
