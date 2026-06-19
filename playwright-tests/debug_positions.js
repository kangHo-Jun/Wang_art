import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/Wang_art/');
  await page.waitForTimeout(2000);

  const wallItemsInfo = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.wall-item'));
    return items.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const img = el.querySelector('img');
      const imgRect = img ? img.getBoundingClientRect() : null;
      const style = window.getComputedStyle(el);
      const imgStyle = img ? window.getComputedStyle(img) : null;
      return {
        index: i,
        className: el.className,
        display: style.display,
        opacity: style.opacity,
        visibility: style.visibility,
        rect: {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        },
        imgRect: imgRect ? {
          top: imgRect.top + window.scrollY,
          left: imgRect.left + window.scrollX,
          width: imgRect.width,
          height: imgRect.height
        } : null,
        imgOpacity: imgStyle ? imgStyle.opacity : null
      };
    });
  });

  console.log('Wall items positions and styles:\n', JSON.stringify(wallItemsInfo, null, 2));

  await browser.close();
})();
