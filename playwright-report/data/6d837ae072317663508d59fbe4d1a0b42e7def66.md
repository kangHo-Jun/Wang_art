# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site-analysis.spec.ts >> Full site analysis - desktop >> Hamburger menu interaction
- Location: playwright-tests/site-analysis.spec.ts:148:3

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#navHamburger')
    - locator resolved to <button id="navHamburger" aria-label="메뉴 닫기" aria-expanded="true" class="navbar-hamburger">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="dialog" id="menuOverlay" aria-modal="true" aria-label="내비게이션 메뉴" class="menu-overlay open">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="dialog" id="menuOverlay" aria-modal="true" aria-label="내비게이션 메뉴" class="menu-overlay open">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is visible, enabled and stable
        - scrolling into view if needed
        - done scrolling
        - <div role="dialog" id="menuOverlay" aria-modal="true" aria-label="내비게이션 메뉴" class="menu-overlay open">…</div> intercepts pointer events
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - link "왕열 Wang Yeul 홈" [ref=e3] [cursor=pointer]:
      - /url: /Wang_art/
      - generic [ref=e4]: 王烈
      - generic [ref=e5]: Wang Yeul
    - button "메뉴 닫기" [expanded] [ref=e6] [cursor=pointer]:
      - img [ref=e7]
  - dialog "내비게이션 메뉴" [ref=e10]:
    - navigation "주요 메뉴" [ref=e11]:
      - link "대표작품" [active] [ref=e12] [cursor=pointer]:
        - /url: /Wang_art/
      - link "작품" [ref=e13] [cursor=pointer]:
        - /url: /Wang_art/works/
      - link "작품세계" [ref=e14] [cursor=pointer]:
        - /url: /Wang_art/worlds/
      - link "작가" [ref=e15] [cursor=pointer]:
        - /url: /Wang_art/artist/
      - link "소장처" [ref=e16] [cursor=pointer]:
        - /url: /Wang_art/collections/
    - navigation "언어 선택" [ref=e18]:
      - button "한국어" [ref=e19] [cursor=pointer]
      - button "English" [ref=e20] [cursor=pointer]
      - button "日本語" [ref=e21] [cursor=pointer]
      - button "中文" [ref=e22] [cursor=pointer]
  - main [ref=e23]:
    - region "대표 작품" [ref=e24]:
      - generic:
        - img "Utopia Meditation" [ref=e26]
        - img "Utopia — A Meditation" [ref=e28]
        - img "Utopia — A Companion" [ref=e30]
        - img "Utopia — A Companion" [ref=e32]
        - img "Utopia — A Companion" [ref=e34]
        - img "Utopia Meditation" [ref=e36]
        - img "Utopia Meditation" [ref=e38]
      - generic [ref=e39]:
        - paragraph [ref=e40]: Utopia Meditation
        - paragraph [ref=e41]: 2023 · Acrylic on canvas · 280 × 280 cm
      - generic "슬라이드 인디케이터" [ref=e42]:
        - button "1번 슬라이드" [ref=e43] [cursor=pointer]
        - button "2번 슬라이드" [ref=e44] [cursor=pointer]
        - button "3번 슬라이드" [ref=e45] [cursor=pointer]
        - button "4번 슬라이드" [ref=e46] [cursor=pointer]
        - button "5번 슬라이드" [ref=e47] [cursor=pointer]
        - button "6번 슬라이드" [ref=e48] [cursor=pointer]
        - button "7번 슬라이드" [ref=e49] [cursor=pointer]
    - region "시리즈" [ref=e50]:
      - generic [ref=e51]: Series /
      - generic [ref=e52]:
        - generic [ref=e53]:
          - link "유토피아" [ref=e54] [cursor=pointer]:
            - /url: /Wang_art/works/?series=utopia
          - generic [ref=e55]: ·
        - generic [ref=e56]:
          - link "먹과 산수" [ref=e57] [cursor=pointer]:
            - /url: /Wang_art/works/?series=ink
          - generic [ref=e58]: ·
        - generic [ref=e59]:
          - link "아크릴 산수" [ref=e60] [cursor=pointer]:
            - /url: /Wang_art/works/?series=acrylic
          - generic [ref=e61]: ·
        - generic [ref=e62]:
          - link "풍경" [ref=e63] [cursor=pointer]:
            - /url: /Wang_art/works/?series=landscape
          - generic [ref=e64]: ·
        - link "말 시리즈" [ref=e66] [cursor=pointer]:
          - /url: /Wang_art/works/?series=horse
    - list "작품 목록" [ref=e67]:
      - listitem "유토피아 명상, 2025" [ref=e68] [cursor=pointer]:
        - img "Utopia Meditation" [ref=e69]
      - listitem "유토피아 — 명상, 2025" [ref=e70] [cursor=pointer]:
        - img "Utopia — A Meditation" [ref=e71]
      - listitem "유토피아 — 동행, 2006" [ref=e72] [cursor=pointer]:
        - img "Utopia — A Companion" [ref=e73]
      - listitem "유토피아 — 동행, 2015" [ref=e74] [cursor=pointer]:
        - img "Utopia — A Companion" [ref=e75]
      - listitem "유토피아 — 동행, 2008" [ref=e76] [cursor=pointer]:
        - img "Utopia — A Companion" [ref=e77]
      - listitem "유토피아 명상, 2023" [ref=e78] [cursor=pointer]:
        - img "Utopia Meditation" [ref=e79]
      - listitem "유토피아 명상, 2025" [ref=e80] [cursor=pointer]:
        - img "Utopia Meditation" [ref=e81]
    - region "뉴스레터 구독" [ref=e82]:
      - paragraph [ref=e83]: 새로운 작품과 전시 소식을 받아보세요
      - paragraph [ref=e84]: 구독 취소 언제든 가능 · 이메일은 공개되지 않습니다
      - generic [ref=e85]:
        - textbox "이메일 주소" [ref=e86]
        - button "구독" [ref=e87] [cursor=pointer]
      - paragraph
    - contentinfo [ref=e88]:
      - link "왕열 Wang Yeul" [ref=e89] [cursor=pointer]:
        - /url: /Wang_art/
      - link "Instagram" [ref=e90] [cursor=pointer]:
        - /url: https://instagram.com
      - link "Email" [ref=e91] [cursor=pointer]:
        - /url: mailto:studio@wangyeul.com
      - generic [ref=e92]: © 2026 Wang Yeul
  - generic:
    - generic: VIEW
  - navigation "플로팅 네비게이션" [ref=e93]:
    - link "대표작품" [ref=e94] [cursor=pointer]:
      - /url: ./
    - link "작품" [ref=e96] [cursor=pointer]:
      - /url: ./works/
    - link "작품세계" [ref=e98] [cursor=pointer]:
      - /url: ./worlds/
    - link "작가" [ref=e100] [cursor=pointer]:
      - /url: ./artist/
    - link "소장처" [ref=e102] [cursor=pointer]:
      - /url: ./collections/
  - generic:
    - generic: VIEW
```

# Test source

```ts
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
  102 |     await expect(page.locator(SELECTORS.footerLinks)).toHaveCount(4);
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
> 161 |       await hamburger.click(); // re‑open for each iteration
      |                       ^ Error: locator.click: Test timeout of 60000ms exceeded.
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
  203 | });
  204 | 
```