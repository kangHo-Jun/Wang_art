import { chromium } from '@playwright/test'

const shots = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

const annotations = ['horse', 'mist', 'ink']

const browser = await chromium.launch()

for (const shot of shots) {
  const variant = shot.width <= 1100 ? 'compact' : 'desktop'
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
  })
  const consoleErrors = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(`[${shot.name}] ${message.text()}`)
    }
  })

  await page.goto('http://127.0.0.1:3000/Wang_art/worlds/', { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    sessionStorage.setItem('wang-art-worlds-preloader-seen', '1')
  })
  await page.reload({ waitUntil: 'networkidle' })

  const hero = page.locator('.worlds-hero')
  await hero.scrollIntoViewIfNeeded()

  for (const id of annotations) {
    const button = page.locator(`[data-annotation-button="${id}"][data-annotation-variant="${variant}"]`)
    await button.click()
    await page.waitForTimeout(400)
    await hero.screenshot({
      path: `playwright-tests/shots/worlds_${shot.name}_${id}.png`,
    })
  }

  await page.close()

  if (consoleErrors.length) {
    throw new Error(consoleErrors.join('\n'))
  }
}

await browser.close()
