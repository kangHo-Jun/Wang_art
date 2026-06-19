/**
 * magnifier clamp 제거 + fixed overlay 검증
 * - 렌즈 중심이 마우스 위치와 일치 (clamp 없음)
 * - 이미지 4개 모서리에서 렌즈 돌출 허용
 * - background-position 정확도
 * - overflow:hidden에 의한 잘림 없음
 */
import { chromium } from 'playwright'

const BASE        = 'http://localhost:4175/Wang_art'
const FIRST_ID    = '2026-02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011'
const LENS_RADIUS = 160
const ZOOM        = 2

async function run() {
  const browser = await chromium.launch({ headless: true })
  const results  = {}

  // ── 데스크톱 1440px ──────────────────────────────────────────
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    const errors = []
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', e => errors.push(e.message))

    await page.goto(`${BASE}/artwork/?id=${FIRST_ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const img  = page.locator('#artworkImg')
    const lens = page.locator('#artworkMagnifier')
    const box  = await img.boundingBox()

    results.imgBox = box
      ? { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) }
      : null

    // magnifier가 position:fixed인지 확인
    const lensPosition = await lens.evaluate(el => getComputedStyle(el).position)
    results.lensIsFixed = lensPosition === 'fixed'

    // magnifier가 .artwork-zoom-wrap 밖에 있는지 확인
    const lensParentId = await lens.evaluate(el => el.parentElement?.id || el.parentElement?.tagName)
    results.lensParent = lensParentId  // 'body' or 'BODY'이어야 함

    if (box) {
      /*
       * nav-right 클릭존이 x=(1440-180)=1260에서 시작.
       * 이미지 우측 끝 = box.x+box.width = 1260 → 경계 픽셀은 nav가 가로챔.
       * x-1: 이미지의 hover 가능한 마지막 픽셀 (1259)로 테스트.
       */
      const corners = [
        { name: '좌상단', cx: box.x,                      cy: Math.min(box.y, 880) },
        { name: '우상단', cx: box.x + box.width - 1,      cy: Math.min(box.y, 880) },
        { name: '좌하단', cx: box.x,                      cy: Math.min(box.y + box.height - 1, 880) },
        { name: '우하단', cx: box.x + box.width - 1,      cy: Math.min(box.y + box.height - 1, 880) },
        { name: '중앙',   cx: box.x + box.width / 2,     cy: Math.min(box.y + box.height / 2, 880) },
      ]

      results.corners = {}

      for (const corner of corners) {
        await page.mouse.move(0, 0)
        await page.waitForTimeout(50)
        await page.mouse.move(corner.cx, corner.cy)
        await page.waitForTimeout(120)

        const display  = await lens.evaluate(el => el.style.display)
        const lensLeft = parseFloat(await lens.evaluate(el => el.style.left || '0'))
        const lensTop  = parseFloat(await lens.evaluate(el => el.style.top  || '0'))
        const bgPosRaw = await lens.evaluate(el => el.style.backgroundPosition)
        const bgSizeRaw = await lens.evaluate(el => el.style.backgroundSize)

        // 기대값 (clamp 없음)
        const expLeft  = corner.cx - LENS_RADIUS
        const expTop   = corner.cy - LENS_RADIUS
        const mouseX   = corner.cx - box.x
        const mouseY   = corner.cy - box.y
        const expBgX   = LENS_RADIUS - mouseX * ZOOM
        const expBgY   = LENS_RADIUS - mouseY * ZOOM
        const expBgW   = box.width  * ZOOM
        const expBgH   = box.height * ZOOM

        const bgParts  = bgPosRaw.split(' ')
        const bgPosX   = parseFloat(bgParts[0] || '0')
        const bgPosY   = parseFloat(bgParts[1] || '0')
        const bgSzParts = bgSizeRaw.split(' ')
        const bgW      = parseFloat(bgSzParts[0] || '0')
        const bgH      = parseFloat(bgSzParts[1] || '0')

        // 렌즈 중심 = 마우스 위치 (clamp 없이 정확히 일치해야 함)
        const actualCX = lensLeft + LENS_RADIUS
        const actualCY = lensTop  + LENS_RADIUS
        const centerOk = Math.abs(actualCX - corner.cx) < 1.5
                      && Math.abs(actualCY - corner.cy) < 1.5

        // bg-position 정확도
        const bgPosOk  = Math.abs(bgPosX - expBgX) < 1.5
                      && Math.abs(bgPosY - expBgY) < 1.5
        const bgSizeOk = Math.abs(bgW - expBgW) < 2
                      && Math.abs(bgH - expBgH) < 2

        // 렌즈가 이미지 밖으로 돌출 가능한지 (left < 0 또는 right > viewportW 등)
        const canOverhang = lensLeft < box.x || (lensLeft + 320) > (box.x + box.width)
                         || lensTop  < box.y || (lensTop  + 320) > (box.y + box.height)

        results.corners[corner.name] = {
          display: display === 'block' ? '✅' : '❌',
          center:  centerOk ? '✅' : `❌ actual=(${Math.round(actualCX)},${Math.round(actualCY)}) exp=(${corner.cx},${corner.cy})`,
          bgPos:   bgPosOk  ? '✅' : `❌ x=${bgPosX.toFixed(0)} exp=${expBgX.toFixed(0)}, y=${bgPosY.toFixed(0)} exp=${expBgY.toFixed(0)}`,
          bgSize:  bgSizeOk ? '✅' : `❌ w=${bgW} exp=${expBgW}`,
          overhang: canOverhang ? '✅ 돌출됨' : '(이미지 내부)',
          lensLeft: Math.round(lensLeft),
          lensTop:  Math.round(lensTop),
        }

        await page.mouse.move(0, 0)
        await page.waitForTimeout(50)
      }

      // mouseleave
      const afterLeave = await lens.evaluate(el => el.style.display)
      results.lensHiddenOnLeave = afterLeave === 'none' || afterLeave === ''
    }

    results.desktopErrors = errors.slice()
    await ctx.close()
  }

  // ── 세로형 작품 ───────────────────────────────────────────────
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()

    await page.goto(
      `${BASE}/artwork/?id=2jung-142-after-the-winter-ink-stick-and-acrylic-on-canvas60-5x100cm2004-95p`,
      { waitUntil: 'networkidle' }
    )
    await page.waitForTimeout(400)

    const img  = page.locator('#artworkImg')
    const lens = page.locator('#artworkMagnifier')
    const box  = await img.boundingBox()

    results.portraitBox = box
      ? { w: Math.round(box.width), h: Math.round(box.height) }
      : null

    if (box) {
      // 좌상단
      await page.mouse.move(0, 0)
      await page.waitForTimeout(50)
      await page.mouse.move(box.x, Math.min(box.y, 880))
      await page.waitForTimeout(120)

      const lensLeft = parseFloat(await lens.evaluate(el => el.style.left || '0'))
      const lensTop  = parseFloat(await lens.evaluate(el => el.style.top  || '0'))
      const expLeft  = box.x - LENS_RADIUS
      const expTop   = Math.min(box.y, 880) - LENS_RADIUS
      results.portraitCornerOk = Math.abs(lensLeft - expLeft) < 1.5
                               && Math.abs(lensTop  - expTop)  < 1.5
    }

    await ctx.close()
  }

  await browser.close()

  // ── 출력 ─────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════')
  console.log('  UNCLAMPED MAGNIFIER TEST RESULTS')
  console.log('═══════════════════════════════════════════════\n')

  console.log('▶ 렌즈 렌더링 구조')
  console.log('  position:fixed:     ', results.lensIsFixed ? '✅' : '❌')
  console.log('  부모 요소:          ', results.lensParent, '(body/BODY이어야 함)')
  console.log('  이미지 bbox:        ', JSON.stringify(results.imgBox))

  console.log('\n▶ 모서리별 테스트 (clamp 없음)')
  if (results.corners) {
    for (const [name, d] of Object.entries(results.corners)) {
      console.log(`\n  [${name}]`)
      console.log(`    렌즈 표시:    ${d.display}`)
      console.log(`    중심=마우스:  ${d.center}`)
      console.log(`    bg-position: ${d.bgPos}`)
      console.log(`    bg-size:     ${d.bgSize}`)
      console.log(`    돌출:        ${d.overhang}  (left=${d.lensLeft}, top=${d.lensTop})`)
    }
  }
  console.log('\n  mouseleave 숨김:    ', results.lensHiddenOnLeave ? '✅' : '❌')

  console.log('\n▶ 세로형 작품')
  console.log('  bbox:               ', JSON.stringify(results.portraitBox))
  console.log('  좌상단 중심 정확도: ', results.portraitCornerOk ? '✅' : '❌')

  const totalErrors = results.desktopErrors || []
  console.log('\n▶ console errors:    ', totalErrors.length === 0 ? '✅ 0' : `❌ ${totalErrors.length}`)
  if (totalErrors.length > 0) totalErrors.forEach(e => console.log('  ', e))

  console.log('\n═══════════════════════════════════════════════\n')
}

run().catch(e => { console.error(e); process.exit(1) })
