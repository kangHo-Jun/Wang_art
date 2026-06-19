import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 1. Visit Resume page
  console.log('Navigating to https://www.pierrickcalvez.com/resume ...');
  await page.goto('https://www.pierrickcalvez.com/resume', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const resumeInfo = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    
    // Find key blocks inside main (like headers, paragraphs, lists)
    const elements = Array.from(main.querySelectorAll('h1, h2, h3, p, a, ul, li, .resume-section, [class*="resume"]'));
    const structure = elements.slice(0, 15).map(el => ({
      tagName: el.tagName,
      className: el.className,
      text: el.textContent ? el.textContent.trim().substring(0, 100) : ''
    }));

    // Get styles of major container
    const container = main.querySelector('.container') || main.querySelector('[class*="wrapper"]') || main;
    const computed = window.getComputedStyle(container);

    return {
      structure,
      containerStyles: {
        width: computed.width,
        padding: computed.padding,
        margin: computed.margin,
        maxWidth: computed.maxWidth
      }
    };
  });
  console.log('Resume Page Info:\n', JSON.stringify(resumeInfo, null, 2));

  // 2. Visit Contact page
  console.log('\nNavigating to https://www.pierrickcalvez.com/contact ...');
  await page.goto('https://www.pierrickcalvez.com/contact', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const contactInfo = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    
    const elements = Array.from(main.querySelectorAll('h1, h2, h3, p, a, img, form, .contact-section, [class*="contact"]'));
    const structure = elements.slice(0, 15).map(el => ({
      tagName: el.tagName,
      className: el.className,
      text: el.textContent ? el.textContent.trim().substring(0, 100) : '',
      imgSrc: el.tagName === 'IMG' ? el.src : null
    }));

    return {
      structure
    };
  });
  console.log('Contact Page Info:\n', JSON.stringify(contactInfo, null, 2));

  await browser.close();
})();
