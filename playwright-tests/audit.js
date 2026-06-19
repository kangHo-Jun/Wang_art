import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const PAGES = [
  { name: 'home', url: 'http://localhost:5173/Wang_art/' },
  { name: 'works', url: 'http://localhost:5173/Wang_art/works/' },
  { name: 'artist', url: 'http://localhost:5173/Wang_art/artist/' },
  { name: 'collections', url: 'http://localhost:5173/Wang_art/collections/' },
  { name: 'worlds', url: 'http://localhost:5173/Wang_art/worlds/' },
  { name: 'artwork', url: 'http://localhost:5173/Wang_art/artwork/?id=utopia-meditation-2025-acrylic-280x140' }
];

const ARTIFACT_DIR = '/Users/zart/.gemini/antigravity-ide/brain/931af0f9-ee5d-47c3-b984-8cd356e2dfb1';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const auditResults = [];

  // Capture console errors
  const consoleErrors = [];
  page.on('pageerror', err => {
    consoleErrors.push(`[JS Error] ${err.message}`);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });

  for (const p of PAGES) {
    console.log(`Auditing ${p.name} on Desktop...`);
    await page.setViewportSize({ width: 1440, height: 900 });
    
    let status = 200;
    try {
      const response = await page.goto(p.url, { waitUntil: 'load', timeout: 10000 });
      status = response.status();
    } catch (e) {
      status = 'FAILED TO LOAD: ' + e.message;
    }

    await page.waitForTimeout(1000); // Wait for transition animations

    // 1. Get computed styles and structures
    const evaluation = await page.evaluate(() => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? window.getComputedStyle(navbar).height : 'none';
      const main = document.querySelector('main');
      const mainPaddingTop = main ? window.getComputedStyle(main).paddingTop : 'none';
      
      // Page specific checks
      const checks = {};
      
      const pageType = document.body.dataset.page;
      checks.pageType = pageType;

      if (pageType === 'home') {
        const mv = document.querySelector('.main-visual-image, .main-visual img');
        checks.mainVisualExists = !!mv;
        checks.seriesExists = !!document.querySelector('.series');
        checks.wallExists = !!document.querySelector('.wall');
        if (checks.wallExists) {
          checks.wallColumns = window.getComputedStyle(document.querySelector('.wall')).columns;
        }
      } else if (pageType === 'works') {
        checks.directoryMenuExists = !!document.querySelector('.directory-menu');
        if (checks.directoryMenuExists) {
          checks.directoryLinksCount = document.querySelectorAll('.directory-link').length;
          checks.activeLinkText = document.querySelector('.directory-link.active')?.textContent || 'none';
        }
        checks.wallExists = !!document.querySelector('.wall');
      } else if (pageType === 'artist') {
        const resume = document.querySelector('.resume');
        checks.resumeExists = !!resume;
        if (resume) {
          const style = window.getComputedStyle(resume);
          checks.resumeWidth = style.width;
          checks.resumeMarginLeft = style.marginLeft;
        }
        checks.downloadFloat = document.querySelector('.download') ? window.getComputedStyle(document.querySelector('.download')).float : 'none';
      } else if (pageType === 'collections') {
        const container = document.querySelector('.contact-container');
        checks.contactContainerExists = !!container;
        if (container) {
          checks.contactBlocksCount = container.querySelectorAll('.contact-block').length;
          checks.categories = Array.from(container.querySelectorAll('.contact-category')).map(el => el.textContent);
        }
      } else if (pageType === 'worlds') {
        checks.worldsContentExists = document.body.innerText.includes('작품세계') || document.body.innerText.includes('Worlds');
      } else if (pageType === 'artwork') {
        checks.artworkImgExists = !!document.querySelector('.artwork-image, #artworkImg');
        checks.artworkLabelExists = !!document.querySelector('.label.artwork, #artworkLabel');
      }

      return {
        bodyBg,
        navbarHeight,
        mainPaddingTop,
        checks
      };
    });

    // Save screenshot
    const screenshotPath = path.join(ARTIFACT_DIR, `audit_${p.name}_desktop.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    auditResults.push({
      name: p.name,
      url: p.url,
      status,
      viewport: 'desktop',
      styles: evaluation,
      screenshot: screenshotPath
    });

    // Mobile check for Home and Works
    if (p.name === 'home' || p.name === 'works') {
      console.log(`Auditing ${p.name} on Mobile (375px)...`);
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      const mobEvaluation = await page.evaluate(() => {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? window.getComputedStyle(navbar).height : 'none';
        const menuBtn = document.querySelector('.menu-btn-mobile, #menuBtnMobile');
        const menuBtnDisplay = menuBtn ? window.getComputedStyle(menuBtn).display : 'none';
        
        let wallCols = 'none';
        const wall = document.querySelector('.wall');
        if (wall) {
          wallCols = window.getComputedStyle(wall).columns;
        }

        return {
          navbarHeight,
          menuBtnDisplay,
          wallCols
        };
      });

      const mobScreenshotPath = path.join(ARTIFACT_DIR, `audit_${p.name}_mobile.png`);
      await page.screenshot({ path: mobScreenshotPath, fullPage: true });

      auditResults.push({
        name: p.name + '_mobile',
        url: p.url,
        status,
        viewport: 'mobile',
        styles: mobEvaluation,
        screenshot: mobScreenshotPath
      });
    }
  }

  await browser.close();

  console.log('\n--- AUDIT COMPLETED ---');
  console.log(JSON.stringify({ auditResults, consoleErrors }, null, 2));

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'audit_report.json'), JSON.stringify({ auditResults, consoleErrors }, null, 2));
})();
