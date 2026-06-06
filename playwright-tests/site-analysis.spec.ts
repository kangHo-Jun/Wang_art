import { test, expect, Page } from '@playwright/test';

// Helper to collect console errors and 404 responses
interface ConsoleError {
  type: string;
  text: string;
}
interface NotFoundResource {
  url: string;
  status: number;
}

async function collectPageData(page: Page) {
  const consoleErrors: ConsoleError[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push({ type: msg.type(), text: msg.text() });
    }
  });
  const notFound: NotFoundResource[] = [];
  page.on('response', response => {
    if (response.status() === 404) {
      notFound.push({ url: response.url(), status: response.status() });
    }
  });
  return { consoleErrors, notFound };
}

// Common selectors (based on existing markup)
const SELECTORS = {
  loadingIntro: '#gLoading',
  logo: '.navbar-logo',
  hamburger: '#navHamburger',
  heroSlides: '#mainVisualSlides',
  seriesList: '#seriesList',
  wallGrid: '#wallGrid',
  newsletterForm: '#subscribeForm',
  footerLinks: 'footer a.footer-link',
  menuOverlay: '#menuOverlay',
  menuLinks: '#menuOverlay .menu-main a',
  viewCursor: '#customCursor',
  // Assume Lenis attaches to body[data-lenis]
  lenisWrapper: 'body',
  floatingNav: '.floating-nav', // placeholder – will be checked for existence
};

async function verifyCommon(page: Page, data: { consoleErrors: any[]; notFound: any[] }) {
  // Loading intro should disappear
  await expect(page.locator(SELECTORS.loadingIntro)).toBeHidden({ timeout: 15000 });

  // No console errors
  expect(data.consoleErrors).toHaveLength(0);

  // No 404 resources
  expect(data.notFound).toHaveLength(0);

  // Hamburger exists
  await expect(page.locator(SELECTORS.hamburger)).toBeVisible();

  // MENU overlay functionality is checked in dedicated test
}

// Desktop tests
test.describe('Full site analysis - desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Home page validation', async ({ page }) => {
    const { consoleErrors, notFound } = await collectPageData(page);

    // Hero slideshow – check that at least one slide exists and that the slideshow auto‑advances after 5 s
    const slides = page.locator(SELECTORS.heroSlides).locator('> *');
    const slideCount = await slides.count();
    expect(slideCount).toBeGreaterThan(0);
    // take initial snapshot of first slide's visibility
    const firstSlide = slides.nth(0);
    await expect(firstSlide).toBeVisible();
    // wait ~6 s and expect slide index to change (simple check: second slide becomes visible)
    await page.waitForTimeout(6000);
    if (slideCount > 1) {
      const secondSlide = slides.nth(1);
      await expect(secondSlide).toBeVisible();
    }

    // Series list populated
    await expect(page.locator(SELECTORS.seriesList)).toBeVisible();
    const seriesItems = page.locator(SELECTORS.seriesList).locator('> *');
    const seriesCount = await seriesItems.count();
    expect(seriesCount).toBeGreaterThan(0);

    // Wall grid images
    const wallImages = page.locator(SELECTORS.wallGrid).locator('img');
    const imgCount = await wallImages.count();
    expect(imgCount).toBeGreaterThan(0);
    await expect(wallImages.first()).toBeVisible();

    // Newsletter form
    await expect(page.locator(SELECTORS.newsletterForm)).toBeVisible();

    // Footer links
    await expect(page.locator(SELECTORS.footerLinks)).toHaveCount(4);

    // Common checks
    await verifyCommon(page, { consoleErrors, notFound });

    // Screenshot of full home page
    await page.screenshot({ path: 'playwright-report/home-desktop.png', fullPage: true });
  });

  test('Works page validation and artwork navigation', async ({ page }) => {
    const { consoleErrors, notFound } = await collectPageData(page);
    await page.goto('/works/');

    const wallImages = page.locator(SELECTORS.wallGrid).locator('img');
    await expect(wallImages).toBeVisible();
    const count = await wallImages.count();
    expect(count).toBeGreaterThan(0);

    // Click the first artwork and verify navigation to artwork page with query param
    await wallImages.nth(0).click();
    await expect(page).toHaveURL(/\/artwork\/\?id=/);
    await page.waitForLoadState('networkidle');
    // Capture screenshot of artwork page
    await page.screenshot({ path: 'playwright-report/artwork-from-works-desktop.png', fullPage: true });

    await verifyCommon(page, { consoleErrors, notFound });
  });

  test('Worlds, Artist, Collections pages', async ({ page }) => {
    const pages = ['/worlds/', '/artist/', '/collections/'];
    for (const p of pages) {
      const { consoleErrors, notFound } = await collectPageData(page);
      await page.goto(p);
      // Basic presence check – ensure body is loaded
      await expect(page.locator('body')).toBeVisible();
      // For collections, verify 6 items exist (assuming .collection-item)
      if (p === '/collections/') {
        const items = page.locator('.collection-item');
        const count = await items.count();
        expect(count).toBe(6);
      }
      await verifyCommon(page, { consoleErrors, notFound });
      await page.screenshot({ path: `playwright-report${p.replace(/\//g, '-')}-desktop.png`, fullPage: true });
    }
  });

  test('Hamburger menu interaction', async ({ page }) => {
    const { consoleErrors, notFound } = await collectPageData(page);
    const hamburger = page.locator(SELECTORS.hamburger);
    const overlay = page.locator(SELECTORS.menuOverlay);
    await expect(overlay).not.toHaveClass(/open/);
    await hamburger.click();
    await expect(overlay).toHaveClass(/open/);
    // Staggered menu items visibility
    const links = page.locator(SELECTORS.menuLinks);
    await expect(links.first()).toBeVisible();
    // Click each link and verify navigation
    const hrefs = await links.allInnerTexts();
    for (let i = 0; i < hrefs.length; i++) {
      await hamburger.click(); // re‑open for each iteration
      await links.nth(i).click();
      const expected = links.nth(i).getAttribute('href');
      // Simple check – URL contains expected path
      await expect(page).toHaveURL(new RegExp(expected));
    }
    // ESC closes
    await hamburger.click();
    await page.keyboard.press('Escape');
    await expect(overlay).not.toHaveClass(/open/);
    await verifyCommon(page, { consoleErrors, notFound });
  });
});

// Mobile tests (viewport 375px) – reuse same checks but limited to key pages
test.describe('Full site analysis - mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Home page mobile screenshot', async ({ page }) => {
    const { consoleErrors, notFound } = await collectPageData(page);
    await page.goto('/');
    await verifyCommon(page, { consoleErrors, notFound });
    await page.screenshot({ path: 'playwright-report/home-mobile.png', fullPage: true });
  });

  test('Works page mobile screenshot', async ({ page }) => {
    const { consoleErrors, notFound } = await collectPageData(page);
    await page.goto('/works/');
    await verifyCommon(page, { consoleErrors, notFound });
    await page.screenshot({ path: 'playwright-report/works-mobile.png', fullPage: true });
  });

  test('Artwork page mobile screenshot', async ({ page }) => {
    const { consoleErrors, notFound } = await collectPageData(page);
    // Open first artwork from works page to get a valid id
    await page.goto('/works/');
    const firstImg = page.locator('#wallGrid img').first();
    await firstImg.click();
    await expect(page).toHaveURL(/\/artwork\/\?id=/);
    await verifyCommon(page, { consoleErrors, notFound });
    await page.screenshot({ path: 'playwright-report/artwork-mobile.png', fullPage: true });
  });
});
