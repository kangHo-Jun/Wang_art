# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site-analysis.spec.ts >> Full site analysis - desktop >> Home page validation
- Location: playwright-tests/site-analysis.spec.ts:69:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('footer a.footer-link')
Expected: 4
Received: 3
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('footer a.footer-link')
    14 × locator resolved to 3 elements
       - unexpected value "3"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "왕열 Wang Yeul 홈" [ref=e3] [cursor=pointer]:
      - /url: /Wang_art/
      - generic [ref=e4]: 王烈
      - generic [ref=e5]: Wang Yeul
    - button "메뉴 열기" [ref=e6] [cursor=pointer]:
      - img [ref=e7]
  - dialog "내비게이션 메뉴":
    - navigation "주요 메뉴":
      - link "대표작품":
        - /url: /Wang_art/
      - link "작품":
        - /url: /Wang_art/works/
      - link "작품세계":
        - /url: /Wang_art/worlds/
      - link "작가":
        - /url: /Wang_art/artist/
      - link "소장처":
        - /url: /Wang_art/collections/
    - navigation "언어 선택":
      - button "한국어"
      - button "English"
      - button "日本語"
      - button "中文"
  - main [ref=e8]:
    - region "대표 작품" [ref=e9]:
      - generic:
        - img "Utopia Meditation" [ref=e11]
        - img "Utopia — A Meditation" [ref=e13]
        - img "Utopia — A Companion" [ref=e15]
        - img "Utopia — A Companion" [ref=e17]
        - img "Utopia — A Companion" [ref=e19]
        - img "Utopia Meditation" [ref=e21]
        - img "Utopia Meditation" [ref=e23]
      - generic [ref=e24]:
        - paragraph [ref=e25]: Utopia — A Companion
        - paragraph [ref=e26]: 2006 · Ink stick and acrylic on canvas · 411 × 200 cm
      - generic "슬라이드 인디케이터" [ref=e27]:
        - button "1번 슬라이드" [ref=e28] [cursor=pointer]
        - button "2번 슬라이드" [ref=e29] [cursor=pointer]
        - button "3번 슬라이드" [ref=e30] [cursor=pointer]
        - button "4번 슬라이드" [ref=e31] [cursor=pointer]
        - button "5번 슬라이드" [ref=e32] [cursor=pointer]
        - button "6번 슬라이드" [ref=e33] [cursor=pointer]
        - button "7번 슬라이드" [ref=e34] [cursor=pointer]
    - region "시리즈" [ref=e35]:
      - generic [ref=e36]: Series /
      - generic [ref=e37]:
        - generic [ref=e38]:
          - link "유토피아" [ref=e39] [cursor=pointer]:
            - /url: /Wang_art/works/?series=utopia
          - generic [ref=e40]: ·
        - generic [ref=e41]:
          - link "먹과 산수" [ref=e42] [cursor=pointer]:
            - /url: /Wang_art/works/?series=ink
          - generic [ref=e43]: ·
        - generic [ref=e44]:
          - link "아크릴 산수" [ref=e45] [cursor=pointer]:
            - /url: /Wang_art/works/?series=acrylic
          - generic [ref=e46]: ·
        - generic [ref=e47]:
          - link "풍경" [ref=e48] [cursor=pointer]:
            - /url: /Wang_art/works/?series=landscape
          - generic [ref=e49]: ·
        - link "말 시리즈" [ref=e51] [cursor=pointer]:
          - /url: /Wang_art/works/?series=horse
    - list "작품 목록" [ref=e52]:
      - listitem "유토피아 명상, 2025" [ref=e53] [cursor=pointer]:
        - img "Utopia Meditation" [ref=e54]
      - listitem "유토피아 — 명상, 2025" [ref=e55] [cursor=pointer]:
        - img "Utopia — A Meditation" [ref=e56]
      - listitem "유토피아 — 동행, 2006" [ref=e57] [cursor=pointer]:
        - img "Utopia — A Companion" [ref=e58]
      - listitem "유토피아 — 동행, 2015" [ref=e59] [cursor=pointer]:
        - img "Utopia — A Companion" [ref=e60]
      - listitem "유토피아 — 동행, 2008" [ref=e61] [cursor=pointer]:
        - img "Utopia — A Companion" [ref=e62]
      - listitem "유토피아 명상, 2023" [ref=e63] [cursor=pointer]:
        - img "Utopia Meditation" [ref=e64]
      - listitem "유토피아 명상, 2025" [ref=e65] [cursor=pointer]:
        - img "Utopia Meditation" [ref=e66]
    - region "뉴스레터 구독" [ref=e67]:
      - paragraph [ref=e68]: 새로운 작품과 전시 소식을 받아보세요
      - paragraph [ref=e69]: 구독 취소 언제든 가능 · 이메일은 공개되지 않습니다
      - generic [ref=e70]:
        - textbox "이메일 주소" [ref=e71]
        - button "구독" [ref=e72] [cursor=pointer]
      - paragraph
    - contentinfo [ref=e73]:
      - link "왕열 Wang Yeul" [ref=e74] [cursor=pointer]:
        - /url: /Wang_art/
      - link "Instagram" [ref=e75] [cursor=pointer]:
        - /url: https://instagram.com
      - link "Email" [ref=e76] [cursor=pointer]:
        - /url: mailto:studio@wangyeul.com
      - generic [ref=e77]: © 2026 Wang Yeul
  - generic:
    - generic: VIEW
  - navigation "플로팅 네비게이션" [ref=e78]:
    - link "대표작품" [ref=e79] [cursor=pointer]:
      - /url: ./
    - link "작품" [ref=e81] [cursor=pointer]:
      - /url: ./works/
    - link "작품세계" [ref=e83] [cursor=pointer]:
      - /url: ./worlds/
    - link "작가" [ref=e85] [cursor=pointer]:
      - /url: ./artist/
    - link "소장처" [ref=e87] [cursor=pointer]:
      - /url: ./collections/
  - generic:
    - generic: VIEW
```

# Test source

```ts
  2   | 
  3   | // Helper to collect console errors and 404 responses
  4   | interface ConsoleError {
  5   |   type: string;
  6   |   text: string;
  7   | }
  8   | interface NotFoundResource {
  9   |   url: string;
  10  |   status: number;
  11  | }
  12  | 
  13  | async function collectPageData(page: Page) {
  14  |   const consoleErrors: ConsoleError[] = [];
  15  |   page.on('console', msg => {
  16  |     if (msg.type() === 'error') {
  17  |       consoleErrors.push({ type: msg.type(), text: msg.text() });
  18  |     }
  19  |   });
  20  |   const notFound: NotFoundResource[] = [];
  21  |   page.on('response', response => {
  22  |     if (response.status() === 404) {
  23  |       notFound.push({ url: response.url(), status: response.status() });
  24  |     }
  25  |   });
  26  |   return { consoleErrors, notFound };
  27  | }
  28  | 
  29  | // Common selectors (based on existing markup)
  30  | const SELECTORS = {
  31  |   loadingIntro: '#gLoading',
  32  |   logo: '.navbar-logo',
  33  |   hamburger: '#navHamburger',
  34  |   heroSlides: '#mainVisualSlides',
  35  |   seriesList: '#seriesList',
  36  |   wallGrid: '#wallGrid',
  37  |   newsletterForm: '#subscribeForm',
  38  |   footerLinks: 'footer a.footer-link',
  39  |   menuOverlay: '#menuOverlay',
  40  |   menuLinks: '#menuOverlay .menu-main a',
  41  |   viewCursor: '#customCursor',
  42  |   // Assume Lenis attaches to body[data-lenis]
  43  |   lenisWrapper: 'body',
  44  |   floatingNav: '.floating-nav', // placeholder – will be checked for existence
  45  | };
  46  | 
  47  | async function verifyCommon(page: Page, data: { consoleErrors: any[]; notFound: any[] }) {
  48  |   // Loading intro should disappear
  49  |   await expect(page.locator(SELECTORS.loadingIntro)).toBeHidden({ timeout: 15000 });
  50  | 
  51  |   // No console errors
  52  |   expect(data.consoleErrors).toHaveLength(0);
  53  | 
  54  |   // No 404 resources
  55  |   expect(data.notFound).toHaveLength(0);
  56  | 
  57  |   // Hamburger exists
  58  |   await expect(page.locator(SELECTORS.hamburger)).toBeVisible();
  59  | 
  60  |   // MENU overlay functionality is checked in dedicated test
  61  | }
  62  | 
  63  | // Desktop tests
  64  | test.describe('Full site analysis - desktop', () => {
  65  |   test.beforeEach(async ({ page }) => {
  66  |     await page.goto('/');
  67  |   });
  68  | 
  69  |   test('Home page validation', async ({ page }) => {
  70  |     const { consoleErrors, notFound } = await collectPageData(page);
  71  | 
  72  |     // Hero slideshow – check that at least one slide exists and that the slideshow auto‑advances after 5 s
  73  |     const slides = page.locator(SELECTORS.heroSlides).locator('> *');
  74  |     const slideCount = await slides.count();
  75  |     expect(slideCount).toBeGreaterThan(0);
  76  |     // take initial snapshot of first slide's visibility
  77  |     const firstSlide = slides.nth(0);
  78  |     await expect(firstSlide).toBeVisible();
  79  |     // wait ~6 s and expect slide index to change (simple check: second slide becomes visible)
  80  |     await page.waitForTimeout(6000);
  81  |     if (slideCount > 1) {
  82  |       const secondSlide = slides.nth(1);
  83  |       await expect(secondSlide).toBeVisible();
  84  |     }
  85  | 
  86  |     // Series list populated
  87  |     await expect(page.locator(SELECTORS.seriesList)).toBeVisible();
  88  |     const seriesItems = page.locator(SELECTORS.seriesList).locator('> *');
  89  |     const seriesCount = await seriesItems.count();
  90  |     expect(seriesCount).toBeGreaterThan(0);
  91  | 
  92  |     // Wall grid images
  93  |     const wallImages = page.locator(SELECTORS.wallGrid).locator('img');
  94  |     const imgCount = await wallImages.count();
  95  |     expect(imgCount).toBeGreaterThan(0);
  96  |     await expect(wallImages.first()).toBeVisible();
  97  | 
  98  |     // Newsletter form
  99  |     await expect(page.locator(SELECTORS.newsletterForm)).toBeVisible();
  100 | 
  101 |     // Footer links
> 102 |     await expect(page.locator(SELECTORS.footerLinks)).toHaveCount(4);
      |                                                       ^ Error: expect(locator).toHaveCount(expected) failed
  103 | 
  104 |     // Common checks
  105 |     await verifyCommon(page, { consoleErrors, notFound });
  106 | 
  107 |     // Screenshot of full home page
  108 |     await page.screenshot({ path: 'playwright-report/home-desktop.png', fullPage: true });
  109 |   });
  110 | 
  111 |   test('Works page validation and artwork navigation', async ({ page }) => {
  112 |     const { consoleErrors, notFound } = await collectPageData(page);
  113 |     await page.goto('/works/');
  114 | 
  115 |     const wallImages = page.locator(SELECTORS.wallGrid).locator('img');
  116 |     await expect(wallImages).toBeVisible();
  117 |     const count = await wallImages.count();
  118 |     expect(count).toBeGreaterThan(0);
  119 | 
  120 |     // Click the first artwork and verify navigation to artwork page with query param
  121 |     await wallImages.nth(0).click();
  122 |     await expect(page).toHaveURL(/\/artwork\/\?id=/);
  123 |     await page.waitForLoadState('networkidle');
  124 |     // Capture screenshot of artwork page
  125 |     await page.screenshot({ path: 'playwright-report/artwork-from-works-desktop.png', fullPage: true });
  126 | 
  127 |     await verifyCommon(page, { consoleErrors, notFound });
  128 |   });
  129 | 
  130 |   test('Worlds, Artist, Collections pages', async ({ page }) => {
  131 |     const pages = ['/worlds/', '/artist/', '/collections/'];
  132 |     for (const p of pages) {
  133 |       const { consoleErrors, notFound } = await collectPageData(page);
  134 |       await page.goto(p);
  135 |       // Basic presence check – ensure body is loaded
  136 |       await expect(page.locator('body')).toBeVisible();
  137 |       // For collections, verify 6 items exist (assuming .collection-item)
  138 |       if (p === '/collections/') {
  139 |         const items = page.locator('.collection-item');
  140 |         const count = await items.count();
  141 |         expect(count).toBe(6);
  142 |       }
  143 |       await verifyCommon(page, { consoleErrors, notFound });
  144 |       await page.screenshot({ path: `playwright-report${p.replace(/\//g, '-')}-desktop.png`, fullPage: true });
  145 |     }
  146 |   });
  147 | 
  148 |   test('Hamburger menu interaction', async ({ page }) => {
  149 |     const { consoleErrors, notFound } = await collectPageData(page);
  150 |     const hamburger = page.locator(SELECTORS.hamburger);
  151 |     const overlay = page.locator(SELECTORS.menuOverlay);
  152 |     await expect(overlay).not.toHaveClass(/open/);
  153 |     await hamburger.click();
  154 |     await expect(overlay).toHaveClass(/open/);
  155 |     // Staggered menu items visibility
  156 |     const links = page.locator(SELECTORS.menuLinks);
  157 |     await expect(links.first()).toBeVisible();
  158 |     // Click each link and verify navigation
  159 |     const hrefs = await links.allInnerTexts();
  160 |     for (let i = 0; i < hrefs.length; i++) {
  161 |       await hamburger.click(); // re‑open for each iteration
  162 |       await links.nth(i).click();
  163 |       const expected = links.nth(i).getAttribute('href');
  164 |       // Simple check – URL contains expected path
  165 |       await expect(page).toHaveURL(new RegExp(expected));
  166 |     }
  167 |     // ESC closes
  168 |     await hamburger.click();
  169 |     await page.keyboard.press('Escape');
  170 |     await expect(overlay).not.toHaveClass(/open/);
  171 |     await verifyCommon(page, { consoleErrors, notFound });
  172 |   });
  173 | });
  174 | 
  175 | // Mobile tests (viewport 375px) – reuse same checks but limited to key pages
  176 | test.describe('Full site analysis - mobile', () => {
  177 |   test.use({ viewport: { width: 375, height: 667 } });
  178 | 
  179 |   test('Home page mobile screenshot', async ({ page }) => {
  180 |     const { consoleErrors, notFound } = await collectPageData(page);
  181 |     await page.goto('/');
  182 |     await verifyCommon(page, { consoleErrors, notFound });
  183 |     await page.screenshot({ path: 'playwright-report/home-mobile.png', fullPage: true });
  184 |   });
  185 | 
  186 |   test('Works page mobile screenshot', async ({ page }) => {
  187 |     const { consoleErrors, notFound } = await collectPageData(page);
  188 |     await page.goto('/works/');
  189 |     await verifyCommon(page, { consoleErrors, notFound });
  190 |     await page.screenshot({ path: 'playwright-report/works-mobile.png', fullPage: true });
  191 |   });
  192 | 
  193 |   test('Artwork page mobile screenshot', async ({ page }) => {
  194 |     const { consoleErrors, notFound } = await collectPageData(page);
  195 |     // Open first artwork from works page to get a valid id
  196 |     await page.goto('/works/');
  197 |     const firstImg = page.locator('#wallGrid img').first();
  198 |     await firstImg.click();
  199 |     await expect(page).toHaveURL(/\/artwork\/\?id=/);
  200 |     await verifyCommon(page, { consoleErrors, notFound });
  201 |     await page.screenshot({ path: 'playwright-report/artwork-mobile.png', fullPage: true });
  202 |   });
```