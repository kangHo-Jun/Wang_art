import { chromium } from '@playwright/test'

const targetUrl = process.env.WORLDS_URL ?? 'http://127.0.0.1:3000/Wang_art/worlds/'
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

const browser = await chromium.launch()
const findings = []

async function verifyViewport(viewport) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
  })

  const consoleErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(`[${viewport.name}] ${message.text()}`)
    }
  })

  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(100)
  await page.screenshot({
    path: `playwright-tests/shots/worlds_intro_${viewport.name}_start.png`,
  })

  await page.waitForTimeout(2100)
  await page.screenshot({
    path: `playwright-tests/shots/worlds_intro_${viewport.name}_mid.png`,
  })

  await page.waitForTimeout(2200)
  await page.screenshot({
    path: `playwright-tests/shots/worlds_intro_${viewport.name}_end.png`,
  })

  const releaseState = await page.evaluate(() => ({
    locked:
      document.documentElement.classList.contains('worlds-lock') ||
      document.body.classList.contains('worlds-lock'),
    cueVisible: !!document.querySelector('.worlds-origin-cue.is-visible'),
    summaryVisible: !!document.querySelector('.worlds-origin-summary.is-visible'),
  }))

  await page.mouse.wheel(0, 180)
  await page.waitForTimeout(1200)

  const postScrollState = await page.evaluate(() => ({
    introGone: !!document.querySelector('.worlds-origin.is-gone'),
    scrollY: window.scrollY,
  }))

  await page.screenshot({
    path: `playwright-tests/shots/worlds_intro_${viewport.name}_scrolled.png`,
    fullPage: true,
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

  findings.push({
    viewport: viewport.name,
    releaseState,
    postScrollState,
  })

  await page.close()
}

for (const viewport of viewports) {
  await verifyViewport(viewport)
}

const reducedPage = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
})

const reducedConsoleErrors = []
reducedPage.on('console', (message) => {
  if (message.type() === 'error') {
    reducedConsoleErrors.push(`[reduced] ${message.text()}`)
  }
})

await reducedPage.goto(targetUrl, { waitUntil: 'networkidle' })
await reducedPage.screenshot({
  path: 'playwright-tests/shots/worlds_intro_reduced_desktop.png',
})

const reducedState = await reducedPage.evaluate(() => ({
  locked:
    document.documentElement.classList.contains('worlds-lock') ||
    document.body.classList.contains('worlds-lock'),
  dotVisible: getComputedStyle(document.querySelector('.worlds-origin-dot')).display !== 'none',
  summaryVisible: !!document.querySelector('.worlds-origin-summary.is-visible'),
  artworkVisible: !!document.querySelector('.worlds-origin-artwork-shell.is-visible'),
}))

const reducedBrokenImages = await reducedPage.evaluate(() =>
  Array.from(document.images)
    .filter((img) => img.complete && img.naturalWidth === 0)
    .map((img) => img.getAttribute('src') ?? '')
)

if (reducedBrokenImages.length) {
  throw new Error(`[reduced] broken images: ${reducedBrokenImages.join(', ')}`)
}

if (reducedConsoleErrors.length) {
  throw new Error(reducedConsoleErrors.join('\n'))
}

await reducedPage.close()
await browser.close()

console.log(JSON.stringify({ targetUrl, findings, reducedState }, null, 2))
