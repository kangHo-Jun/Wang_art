import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.pierrickcalvez.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const cssDetails = await page.evaluate(() => {
    const getStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        position: computed.position,
        width: computed.width,
        height: computed.height,
        padding: computed.padding,
        margin: computed.margin,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        letterSpacing: computed.letterSpacing,
        lineHeight: computed.lineHeight,
        color: computed.color,
        textAlign: computed.textAlign,
        flexDirection: computed.flexDirection,
        alignItems: computed.alignItems,
        justifyContent: computed.justifyContent,
        columnCount: computed.columnCount || computed.columns
      };
    };

    return {
      mainVisualWrapper: getStyles('.main-visual-wrapper'),
      mainVisualImage: getStyles('.main-visual-image'),
      labelHome: getStyles('.label.home'),
      series: getStyles('.series'),
      seriesLabel: getStyles('.series-label'),
      seriesList: getStyles('.series-list'),
      seriesItem: getStyles('.series-item'),
      typeHeroLink: getStyles('.type-hero-link')
    };
  });

  console.log('Computed CSS from original site:\n', JSON.stringify(cssDetails, null, 2));

  // Let's also see the HTML structure of .series-list and .series-item to see how dots are added
  const seriesListHtml = await page.evaluate(() => {
    const el = document.querySelector('.series-list');
    return el ? el.innerHTML : 'Not found';
  });
  console.log('\nSeries list inner HTML:\n', seriesListHtml);

  await browser.close();
})();
