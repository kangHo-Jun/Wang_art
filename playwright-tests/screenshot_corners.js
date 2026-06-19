import { chromium } from 'playwright'
const BASE     = 'http://localhost:4175/Wang_art'
const FIRST_ID = '2026-02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011'
const PORTRAIT = '2jung-142-after-the-winter-ink-stick-and-acrylic-on-canvas60-5x100cm2004-95p'

async function shoot(page, pos, filename) {
  await page.mouse.move(0, 0)
  await page.waitForTimeout(60)
  await page.mouse.move(pos.x, pos.y)
  await page.waitForTimeout(200)
  await page.screenshot({ path: `playwright-tests/shots/${filename}` })
}

async function run() {
  const browser = await chromium.launch({ headless: true })

  // 가로형 작품 — 4개 모서리 + 중앙
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=${FIRST_ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const box = await page.locator('#artworkImg').boundingBox()
    if (box) {
      const R = 1  // nav 경계 1px 안쪽
      await shoot(page, { x: box.x,              y: box.y           }, 'corner_topleft.png')
      await shoot(page, { x: box.x + box.width-R, y: box.y          }, 'corner_topright.png')
      await shoot(page, { x: box.x,              y: Math.min(box.y + box.height-R, 880) }, 'corner_botleft.png')
      await shoot(page, { x: box.x + box.width-R, y: Math.min(box.y + box.height-R, 880) }, 'corner_botright.png')
      await shoot(page, { x: box.x + box.width/2, y: Math.min(box.y + box.height/2, 880) }, 'corner_center.png')
    }
    await ctx.close()
  }

  // 세로형 작품 — 좌상단
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/artwork/?id=${PORTRAIT}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)

    const box = await page.locator('#artworkImg').boundingBox()
    if (box) {
      await shoot(page, { x: box.x, y: Math.min(box.y + 120, 880) }, 'corner_portrait_center.png')
      await shoot(page, { x: box.x, y: box.y }, 'corner_portrait_topleft.png')
    }
    await ctx.close()
  }

  await browser.close()
  console.log('모서리 스크린샷 완료')
}
run().catch(e => { console.error(e); process.exit(1) })
