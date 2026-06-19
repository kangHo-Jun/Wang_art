import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1. Inspect Resume page styling
  await page.goto('https://www.pierrickcalvez.com/resume');
  await page.waitForTimeout(2000);

  const resumeCss = await page.evaluate(() => {
    const getStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        width: computed.width,
        maxWidth: computed.maxWidth,
        margin: computed.margin,
        padding: computed.padding,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        letterSpacing: computed.letterSpacing,
        lineHeight: computed.lineHeight,
        color: computed.color,
        float: computed.float
      };
    };

    return {
      resume: getStyles('.resume'),
      download: getStyles('.download'),
      resumeCategory: getStyles('.resume-category'),
      resumeText: getStyles('.resume-text')
    };
  });
  console.log('Resume Page CSS:\n', JSON.stringify(resumeCss, null, 2));

  // Let's dump the HTML structure of the resume text to see how categories and entries are structured
  const resumeHtml = await page.evaluate(() => {
    const el = document.querySelector('.resume');
    return el ? el.outerHTML.substring(0, 2000) : 'Not found';
  });
  console.log('\nResume outerHTML (first 2000 chars):\n', resumeHtml);

  // 2. Inspect Contact page styling
  await page.goto('https://www.pierrickcalvez.com/contact');
  await page.waitForTimeout(2000);

  const contactCss = await page.evaluate(() => {
    const getStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        width: computed.width,
        maxWidth: computed.maxWidth,
        margin: computed.margin,
        padding: computed.padding,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        letterSpacing: computed.letterSpacing,
        lineHeight: computed.lineHeight,
        color: computed.color
      };
    };

    return {
      contactContainer: getStyles('.contact-container'),
      contactBlock: getStyles('.contact-block'),
      contactCategory: getStyles('.contact-category'),
      locationLink: getStyles('.location-link')
    };
  });
  console.log('\nContact Page CSS:\n', JSON.stringify(contactCss, null, 2));

  const contactHtml = await page.evaluate(() => {
    const el = document.querySelector('.contact-container');
    return el ? el.outerHTML : 'Not found';
  });
  console.log('\nContact Container outerHTML:\n', contactHtml);

  await browser.close();
})();
