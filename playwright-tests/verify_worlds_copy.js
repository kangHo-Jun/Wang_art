import { chromium } from '@playwright/test'

const targetUrl = process.env.WORLDS_URL ?? 'http://127.0.0.1:3000/Wang_art/worlds/'
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await chromium.launch()
const findings = []

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
  await page.waitForTimeout(4500)
  await page.mouse.wheel(0, 1200)
  await page.waitForTimeout(1200)

  await page.screenshot({
    path: `playwright-tests/shots/worlds_copy_${viewport.name}.png`,
    fullPage: true,
  })

  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute('src') ?? '')
  )

  const overflow = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    bodyWidth: document.body.scrollWidth,
    hasOverflow:
      document.documentElement.scrollWidth > document.documentElement.clientWidth ||
      document.body.scrollWidth > document.documentElement.clientWidth,
  }))

  if (brokenImages.length) {
    throw new Error(`[${viewport.name}] broken images: ${brokenImages.join(', ')}`)
  }

  if (overflow.hasOverflow) {
    throw new Error(
      `[${viewport.name}] horizontal overflow detected: document=${overflow.documentWidth}, body=${overflow.bodyWidth}, viewport=${overflow.viewportWidth}`
    )
  }

  if (consoleErrors.length) {
    throw new Error(consoleErrors.join('\n'))
  }

  findings.push({
    viewport: viewport.name,
    overflow,
  })

  await page.close()
}

await browser.close()

console.log(JSON.stringify({ targetUrl, findings }, null, 2))
