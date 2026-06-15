import { chromium } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mid', width: 609, height: 900 },
]
const targetUrl = process.env.WORLDS_URL ?? 'http://127.0.0.1:3000/Wang_art/worlds/'

const browser = await chromium.launch()

for (const viewport of viewports) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
  })

  const consoleErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(`[${viewport.name}] ${message.text()}`)
    }
  })

  await page.goto(targetUrl, { waitUntil: 'networkidle' })
  await page.locator('#worldsRoot').screenshot({
    path: `playwright-tests/shots/worlds_${viewport.name}_full.png`,
  })

  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute('src') ?? '')
  )

  if (brokenImages.length) {
    throw new Error(`[${viewport.name}] broken images: ${brokenImages.join(', ')}`)
  }

  if (consoleErrors.length) {
    throw new Error(consoleErrors.join('\n'))
  }

  await page.close()
}

await browser.close()
