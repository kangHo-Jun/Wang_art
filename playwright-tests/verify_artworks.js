import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:5173/Wang_art';
const OUT = '/tmp/artwork_checks';
mkdirSync(OUT, { recursive: true });

const CANDIDATES = {
  bird: [
    'images/2026/17-gae-tti-sae-a-chim-cheon-e-meok-a-keu-ril-1500man-won.jpg',
    'images/2026/22-gae-tti-sae-a-chim-cheon-e-meok-a-keu-ril-1500man-won.jpg',
    'images/2026/keu-gi-byeon-hwan-23dalk-tti-sae-a-chim-cheon-e-meok-a-keu-ril-1500man-won.jpg',
  ],
  invisible: [
    'images/2jung/2-wang-yeol-utopia-a-meditation-cm-ink-ick-and-acrylic-on-canvas-2018-4500man-won.jpg',
    'images/2jung/sin-mu-reung-do-won-do-myeong-sang-cheon-e-meok-a-keu-ril-182x116-5cm-2017.jpeg',
    'images/2jung/43utopia-a-companion-ink-stick-and-acrylic-on-canvas-194x162-2cm2008-6500man-won.jpg',
    'images/2jung/30-sin-mu-reung-do-won-do-myeong-sang-cheon-e-meok-a-keu-ril-140x280cm-2014.jpg',
    'images/2jung/25-mu-myeong-dok-rip-un-dong-ga-acrylic-on-canvas-90-9x72-7cm-2020-bi-mae.jpg',
    'images/2jung/gyeo-ul-na-gi-i-hu-after-the-winter-ink-stick-and-acrylic-on-canvas248x138cm-2004.jpg',
    'images/2jung/15-out-ink-stick-and-acrylic-on-canvas40x106cm1500man-won.jpg',
    'images/2jung/2-sin-mu-reung-do-won-do-dong-haeng-45-5x106cm-kaem-peo-seu-e-a-keu-ril-2017.jpg',
    'images/2jung/sin-mu-reung-do-won-do-myeong-sang-91x117cm-cheon-e-meok-a-keu-ril-2016.jpg',
  ],
  utopia: [
    'images/2026/2025-utopia-meditation-acrylic-on-canvas-280cmx140cm.jpg',
    'images/2026/09-utopia-a-companion-ink-stick-and-acrylic-on-canvas197x333cm2011.jpg',
    'images/2026/11-utopia-meditation-acrylic-on-canvas-140cmx140cm-2024.jpg',
    'images/2026/10-utopia-meditation-acrylic-on-canvas-280x140cm-2023-7000man-won.jpg',
    'images/2026/1-wang-yeol-utopia-oil-and-acrylic-on-sheet-zinc-91x72cm-2021-1800man-won.jpg',
    'images/2026/16-1-utopia-acompany-acrylic-on-canvas-162cmx130cm-2016-3500man-won.jpg',
    'images/ink/16-utopia-a-companion-ink-stick-and-acrylic-on-canvas411x200cm2006-3eok-won-bi-mae-pum.jpg',
    'images/ink/01-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-224x224cm2012.jpg',
    'images/ink/10-utopia-a-companion-ink-stick-and-acrylic-on-canvas225x225cm2011.jpg',
  ],
  rest: [
    'images/2026/1-bom-nal-ui-myeong-sang-acrylic-on-canvas-90-9x72-7cm-2019.jpg',
    'images/2026/88-thoughts-on-winter-mixed-media-on-korean-paper-66x116cm1998-148p.jpg',
    'images/2026/25-sin-mu-reung-do-won-do-bom-nal-cheon-e-meok-a-keu-ril-116-5x91-0cm-2019.jpg',
    'images/2jung/gyeo-ul-na-gi-i-hu-after-the-winter-ink-stick-and-acrylic-on-canvas248x138cm-2004.jpg',
    'images/2jung/142-after-the-winter-ink-stick-and-acrylic-on-canvas60-5x100cm2004-95p.jpg',
    'images/ink/gyeo-ul-na-gi.jpg',
    'images/ink/gyeo-ul-na-gi-1.jpg',
    'images/ink/gyeo-ul-na-gi-2.jpg',
    'images/ink/gyeo-ul-na-gi-3.jpg',
    'images/ink/2004-after-the-winter-ink-stick-and-acrylic-on-canvas-72x100cm.jpg',
  ],
  red: [
    'images/red/1-utopia-meditation-acrylic-on-canvas-280x280cm-2023.jpg',
    'images/red/2utopia-meditation-acrylic-on-canvas-280x280cm-2023.jpg',
    'images/red/3-utopia-meditation-acrylic-on-canvas-280x280cm-2023.jpg',
    'images/red/ga-eul-nal-ui-yeo-haeng-gyeo-ul-na-gi-i-hu-after-the-winter-ink-stick-and-acrylic-on-canv72x64cm-2004.jpg',
  ],
  blue: [
    'images/blue/12sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-55x71cm-1000ma-won.jpg',
  ],
  ink_mountain: [
    'images/ink/147-origin-mixed-media-on-korean-paper-260x162cm2001-108p.jpg',
    'images/ink/01-wang-yeol-185x135cm.jpg',
    'images/ink/0000001.jpg',
    'images/ink/04-wang-yeol-72-7x90-9cm.jpg',
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
  console.log('\nScreenshots saved to ' + OUT);
})();
