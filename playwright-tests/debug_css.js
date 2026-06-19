import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/Wang_art/');
  await page.waitForTimeout(1000);

  const seriesItemStyles = await page.evaluate(() => {
    const el = document.querySelector('.series-item a');
    if (!el) return 'No element found';
    const computed = window.getComputedStyle(el);
    return {
      fontSize: computed.fontSize,
      fontFamily: computed.fontFamily,
      letterSpacing: computed.letterSpacing,
      lineHeight: computed.lineHeight,
      display: computed.display
    };
  });

  const heroLinkStyles = await page.evaluate(() => {
    const el = document.querySelector('.type-hero-link');
    if (!el) return 'No element found';
    const computed = window.getComputedStyle(el);
    return {
      fontSize: computed.fontSize,
      fontFamily: computed.fontFamily,
      letterSpacing: computed.letterSpacing,
      lineHeight: computed.lineHeight,
      display: computed.display
    };
  });

  console.log('Computed styles for .series-item a:', seriesItemStyles);
  console.log('Computed styles for .type-hero-link:', heroLinkStyles);

  await browser.close();
})();
