import { chromium } from '@playwright/test';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const requests = [];
  page.on('request', request => {
    requests.push(`${request.method()} ${request.url()}`);
  });

  console.log('Navigating to local dev server...');
  await page.goto('http://localhost:5173/Wang_art/', { waitUntil: 'networkidle' });

  console.log('--- Requested URLs ---');
  requests.forEach(r => console.log(r));

  await browser.close();
}

run().catch(console.error);
