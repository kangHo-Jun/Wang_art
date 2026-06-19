import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to https://www.pierrickcalvez.com/ ...');
  await page.goto('https://www.pierrickcalvez.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Get outer HTML of elements inside main or body before .series
  const structure = await page.evaluate(() => {
    // Find navbar and everything before .series
    const main = document.querySelector('main') || document.body;
    const children = Array.from(main.children);
    return children.map(c => {
      return {
        tagName: c.tagName,
        className: c.className,
        id: c.id,
        htmlSummary: c.outerHTML.substring(0, 300)
      };
    });
  });

  console.log('Main children structure:', JSON.stringify(structure, null, 2));

  // Let's also get the specific HTML structure of the top section (usually the slideshow or featured image)
  const heroHtml = await page.evaluate(() => {
    const el = document.querySelector('.navbar + *') || document.querySelector('[class*="hero"]') || document.querySelector('[class*="slide"]');
    return el ? el.outerHTML : 'Not found';
  });
  console.log('Hero outer HTML (first 2000 chars):', heroHtml.substring(0, 2000));

  await browser.close();
})();
