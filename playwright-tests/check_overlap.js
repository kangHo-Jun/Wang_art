import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/Wang_art/');
  await page.waitForTimeout(2000);

  const overlapInfo = await page.evaluate(() => {
    const wall = document.querySelector('.wall');
    const subscribe = document.querySelector('.subscribe');
    const footer = document.querySelector('.footer');
    
    return {
      wall: wall ? wall.getBoundingClientRect().toJSON() : null,
      subscribe: subscribe ? subscribe.getBoundingClientRect().toJSON() : null,
      footer: footer ? footer.getBoundingClientRect().toJSON() : null
    };
  });

  console.log('Layout elements bounds:\n', JSON.stringify(overlapInfo, null, 2));

  await browser.close();
})();
