import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Taking screenshot of local site...');
  try {
    await page.goto('http://localhost:5173/Wang_art/', { waitUntil: 'domcontentloaded', timeout: 5000 });
    await page.waitForTimeout(3000);
  } catch (e) {
    console.log('Timeout waiting for local site, capturing anyway...');
  }
  await page.screenshot({ path: '/Users/zart/.gemini/antigravity-ide/brain/931af0f9-ee5d-47c3-b984-8cd356e2dfb1/local_home.png', fullPage: true });

  console.log('Taking screenshot of original Pierrick site...');
  try {
    await page.goto('https://www.pierrickcalvez.com/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000); // let animations load
  } catch (e) {
    console.log('Timeout on original site, capturing anyway...');
  }
  await page.screenshot({ path: '/Users/zart/.gemini/antigravity-ide/brain/931af0f9-ee5d-47c3-b984-8cd356e2dfb1/pierrick_home.png', fullPage: true });

  await browser.close();
  console.log('Done taking screenshots!');
})();
