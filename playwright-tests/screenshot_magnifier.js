import { chromium } from 'playwright'
const BASE = 'http://localhost:4175/Wang_art'

async function run() {
  const browser = await chromium.launch({ headless: true })

  // 1. 가로형 작품 — 좌상단 / 중앙 / 우하단 렌즈 위치
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=2026-02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const img = page.locator('#artworkImg')
    const box = await img.boundingBox()
    if (box) {
      const sy = Math.min(box.y + 120, 880)

      // 좌상단 (clamp)
      await page.mouse.move(0, 0); await page.waitForTimeout(50)
      await page.mouse.move(box.x + 20, box.y + 20); await page.waitForTimeout(200)
      await page.screenshot({ path: 'playwright-tests/shots/mag_landscape_topleft.png' })

      // 중앙
      await page.mouse.move(0, 0); await page.waitForTimeout(50)
      await page.mouse.move(box.x + box.width / 2, sy); await page.waitForTimeout(200)
      await page.screenshot({ path: 'playwright-tests/shots/mag_landscape_center.png' })

      // 우하단 (clamp)
      await page.mouse.move(0, 0); await page.waitForTimeout(50)
      await page.mouse.move(box.x + box.width - 20, sy); await page.waitForTimeout(200)
      await page.screenshot({ path: 'playwright-tests/shots/mag_landscape_bottomright.png' })
    }
    await ctx.close()
  }

  // 2. 세로형 작품
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=2jung-142-after-the-winter-ink-stick-and-acrylic-on-canvas60-5x100cm2004-95p`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const img = page.locator('#artworkImg')
    const box = await img.boundingBox()
    if (box) {
      await page.mouse.move(0, 0); await page.waitForTimeout(50)
      await page.mouse.move(box.x + box.width / 2, Math.min(box.y + 150, 880)); await page.waitForTimeout(200)
      await page.screenshot({ path: 'playwright-tests/shots/mag_portrait_center.png' })
    }
    await ctx.close()
  }

  // 3. 모바일 overlay (390px)
  {
    const ctx  = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true, isMobile: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=2026-02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    await page.screenshot({ path: 'playwright-tests/shots/mag_mob390_normal.png' })

    const img = page.locator('#artworkImg')
    const box = await img.boundingBox()
    if (box) {
      await page.touchscreen.tap(box.x + box.width / 2, Math.min(box.y + 120, 820))
      await page.waitForTimeout(400)
      await page.screenshot({ path: 'playwright-tests/shots/mag_mob390_overlay.png' })
    }
    await ctx.close()
  }

  await browser.close()
  console.log('스크린샷 완료')
}
run().catch(e => { console.error(e); process.exit(1) })
