import { chromium } from 'playwright'
const BASE = 'http://localhost:4175/Wang_art'
const ID   = '2026-02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011'

async function run() {
  const browser = await chromium.launch({ headless: true })

  // 1. 데스크톱 기본 상태
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=${ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path: 'playwright-tests/shots/desk_artwork_normal.png' })

    // zoom 활성 상태
    const img = page.locator('#artworkImg')
    const box = await img.boundingBox()
    if (box) {
      await page.mouse.move(0, 0)
      await page.waitForTimeout(50)
      await page.mouse.move(box.x + box.width / 2, box.y + 120)
      await page.waitForTimeout(200)
      await page.screenshot({ path: 'playwright-tests/shots/desk_artwork_zoom_active.png' })
    }
    await ctx.close()
  }

  // 2. 모바일 390px 기본
  {
    const ctx  = await browser.newContext({
      viewport:  { width: 390, height: 844 },
      hasTouch:  true,
      isMobile:  true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=${ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path: 'playwright-tests/shots/mob390_artwork_normal.png' })

    // overlay 열기
    const img = page.locator('#artworkImg')
    const box = await img.boundingBox()
    if (box) {
      const cx = box.x + box.width / 2
      const cy = Math.min(box.y + 120, 820)
      await page.touchscreen.tap(cx, cy)
      await page.waitForTimeout(400)
      await page.screenshot({ path: 'playwright-tests/shots/mob390_artwork_overlay.png' })
    }
    await ctx.close()
  }

  // 3. 모바일 609px
  {
    const ctx  = await browser.newContext({
      viewport:  { width: 609, height: 900 },
      hasTouch:  true,
      isMobile:  true,
    })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=${ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path: 'playwright-tests/shots/mob609_artwork_normal.png' })
    await ctx.close()
  }

  await browser.close()
  console.log('스크린샷 저장 완료')
}
run().catch(e => { console.error(e); process.exit(1) })
