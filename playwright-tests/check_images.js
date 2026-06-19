import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Intercept network requests to log image loading errors
  page.on('requestfailed', request => {
    console.log(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
  });
  
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`HTTP Error ${response.status()} for ${response.url()}`);
    }
  });

  console.log('Navigating to local site...');
  await page.goto('http://localhost:5173/Wang_art/');
  await page.waitForTimeout(2000);

  const imagesInfo = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('.wall-item img'));
    return images.map(img => {
      return {
        src: img.src,
        alt: img.alt,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      };
    });
  });

  console.log('Wall images loading info:', JSON.stringify(imagesInfo, null, 2));

  await browser.close();
})();
