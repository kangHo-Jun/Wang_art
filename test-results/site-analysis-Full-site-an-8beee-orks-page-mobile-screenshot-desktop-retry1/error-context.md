# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site-analysis.spec.ts >> Full site analysis - mobile >> Works page mobile screenshot
- Location: playwright-tests/site-analysis.spec.ts:186:3

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"text": "Failed to load resource: the server responded with a status of 404 (Not Found)", "type": "error"}]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text: The server is configured with a public base URL of /Wang_art/ - did you mean to visit
  - link /Wang_art/works/ [ref=e2] [cursor=pointer]:
    - /url: /Wang_art/works/
  - text: instead?
```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
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
> 52  |   expect(data.consoleErrors).toHaveLength(0);
      |                              ^ Error: expect(received).toHaveLength(expected)
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
```