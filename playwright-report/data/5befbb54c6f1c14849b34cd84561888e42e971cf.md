# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site-analysis.spec.ts >> Full site analysis - mobile >> Artwork page mobile screenshot
- Location: playwright-tests/site-analysis.spec.ts:193:3

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#wallGrid img').first()

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
> 198 |     await firstImg.click();
      |                    ^ Error: locator.click: Test timeout of 60000ms exceeded.
  199 |     await expect(page).toHaveURL(/\/artwork\/\?id=/);
  200 |     await verifyCommon(page, { consoleErrors, notFound });
  201 |     await page.screenshot({ path: 'playwright-report/artwork-mobile.png', fullPage: true });
  202 |   });
  203 | });
  204 | 
```