import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:5173/Wang_art';
const OUT = '/tmp/artwork_checks';
mkdirSync(OUT, { recursive: true });

const CANDIDATES = {
  flower_bird: [
    'images/ink/2019-flower-in-utopia-80-0x300-0cm-acrylic-on-canvas.jpg',
    'images/ink/wang-yeol-flower-in-utopia-116-8x91-0cm-acrylic-on-canvas-2019.jpg',
    'images/2026/keu-gi-byeon-hwan-23dalk-tti-sae-a-chim-cheon-e-meok-a-keu-ril-1500man-won.jpg',
  ],
  inv_more: [
    'images/2jung/gyeo-ul-na-gi-i-hu-3-utopia-a-companion-ink-stick-and-acrylic-on-canvas.jpg',
    'images/2jung/gyeo-ul-na-gi-i-hu-3-62cmx62cm-han-ji-e-su-muk-dam-chae-2004.jpg',
  ],
  red_more: [
    'images/red/4-utopia-meditation-acrylic-on-canvas-140x140cm-2023.jpg',
    'images/red/5-utopia-meditation-acrylic-on-canvas-140x140cm-2023.jpg',
    'images/red/6-utopia-meditation-acrylic-on-canvas-90x72cm-2023.jpg',
    'images/red/11-utopia-meditation-acrylic-on-canvas-90x72cm-2023.jpg',
  ],
  blue_more: [
    'images/blue/1-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-55x71cm-2011.jpg',
    'images/blue/2-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-162x130cm-2011.jpg',
    'images/blue/3-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-162x130cm-2011.jpg',
    'images/blue/utopia-a-meditation-60-6x72-7cm-ink-stick-and-acrylic-on-canvas-2014.jpg',
  ],
  ink_large: [
    'images/ink/16-utopia-a-companion-ink-stick-and-acrylic-on-canvas411x200cm2006-3eok-won-bi-mae-pum.jpg',
    'images/ink/147-origin-mixed-media-on-korean-paper-260x162cm2001-108p.jpg',
    'images/ink/14-utopia-meditation-acrylic-on-canvas-280x140cm-2023.jpg',
  ],
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 900, height: 700 });

  for (const [section, imgs] of Object.entries(CANDIDATES)) {
    console.log('\n=== ' + section.toUpperCase() + ' ===');
    for (const imgPath of imgs) {
      const url = BASE + '/' + imgPath;
      try {
        const resp = await page.goto(url, { waitUntil: 'load', timeout: 10000 });
        const status = resp?.status();
        const fname = imgPath.split('/').pop().replace(/\.[^.]+$/, '').slice(0, 55);
        if (status === 200) {
          const outPath = OUT + '/' + section + '__' + fname + '.jpg';
          await page.screenshot({ path: outPath });
          const dims = await page.evaluate(() => {
            const img = document.querySelector('img');
            return img ? img.naturalWidth + 'x' + img.naturalHeight : 'no-img';
          });
          console.log('OK [' + dims + '] ' + fname);
        } else {
          console.log('FAIL HTTP ' + status + ': ' + imgPath.split('/').pop());
        }
      } catch(e) {
        console.log('ERR: ' + imgPath.split('/').pop().slice(0,50));
      }
    }
  }
  await browser.close();
  console.log('\nDone.');
})();
