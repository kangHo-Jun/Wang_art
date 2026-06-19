/**
 * artwork magnifier 검증
 * - 돋보기 표시/숨김
 * - 위치별 left/top/background-position 정확도
 * - 렌즈 clamp (이미지 경계 안)
 * - 이미지 비율별 (가로/세로/정방)
 * - nav 클릭존 충돌 없음
 * - 작품 변경 후 재초기화
 * - broken image 스킵
 * - console error 0
 */
import { chromium } from 'playwright'

const BASE = 'http://localhost:4175/Wang_art'
const LENS_SIZE   = 320
const LENS_RADIUS = 160
const ZOOM        = 2

// 샘플 작품 ID (카테고리별)
const WORKS = {
  landscape: '2026-02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011',  // 가로형
  portrait:  '2jung-2-sin-mu-reung-do-won-do-won-do-dong-haeng-45-5x106cm-kaem-peo-seu-e-a-keu-ril-2017',  // 세로형 후보
  square:    'ink-0000001',  // 정방형에 가까운 샘플
}

// background-position 정확도 검증
// cx, cy: 렌즈 center (clamped), imgW, imgH: 이미지 표시 크기
function expectedBgPos(cx, cy, imgW, imgH) {
  return {
    x: LENS_RADIUS - cx * ZOOM,
    y: LENS_RADIUS - cy * ZOOM,
    bgW: imgW * ZOOM,
    bgH: imgH * ZOOM,
  }
}

// 문자열 "123.45px" → 숫자
function parsePx(s) { return parseFloat(s || '0') }

async function run() {
  const browser = await chromium.launch({ headless: true })
  const results = {}

  // ── 1. 데스크톱 기본 (1440px) ──────────────────────────────────
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    const errors = []
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', e => errors.push(e.message))

    await page.goto(`${BASE}/artwork/?id=${WORKS.landscape}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const img  = page.locator('#artworkImg')
    const lens = page.locator('#artworkMagnifier')

    // 초기 숨김
    const initDisplay = await lens.evaluate(el => el.style.display)
    results.lensInitiallyHidden = initDisplay === '' || initDisplay === 'none'

    const box = await img.boundingBox()
    results.imgBox = box ? { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) } : null

    if (box) {
      const imgW = box.width
      const imgH = box.height
      const sy   = Math.min(box.y + 120, 880)  // viewport 내 안전 y

      // ── 위치별 테스트 ──
      const positions = [
        { name: '좌상단',   mx: box.x + 20,              my: box.y + 20    },  // clamp 대상
        { name: '중앙',     mx: box.x + imgW / 2,        my: sy            },
        { name: '우하단',   mx: box.x + imgW - 20,       my: sy            },  // clamp 대상
        { name: '정중앙',   mx: box.x + imgW / 2,        my: box.y + 60    },
      ]

      results.positions = {}

      for (const pos of positions) {
        await page.mouse.move(0, 0)
        await page.waitForTimeout(50)
        await page.mouse.move(pos.mx, pos.my)
        await page.waitForTimeout(100)

        const display  = await lens.evaluate(el => el.style.display)
        const lensLeft = await lens.evaluate(el => parseFloat(el.style.left  || '0'))
        const lensTop  = await lens.evaluate(el => parseFloat(el.style.top   || '0'))
        const bgPos    = await lens.evaluate(el => el.style.backgroundPosition)
        const bgSize   = await lens.evaluate(el => el.style.backgroundSize)

        // 렌즈 실제 center (wrap 기준)
        const actualCX = lensLeft + LENS_RADIUS
        const actualCY = lensTop  + LENS_RADIUS

        // 기대값 (clamped cursor)
        const mouseX = pos.mx - box.x  // img 기준
        const mouseY = pos.my - box.y
        const expCX  = Math.max(LENS_RADIUS, Math.min(mouseX, imgW - LENS_RADIUS))
        const expCY  = Math.max(LENS_RADIUS, Math.min(mouseY, imgH - LENS_RADIUS))
        const exp    = expectedBgPos(expCX, expCY, imgW, imgH)

        // bgPos 파싱 ("123px 456px")
        const bgParts = bgPos.split(' ')
        const bgPosX  = parseFloat(bgParts[0] || '0')
        const bgPosY  = parseFloat(bgParts[1] || '0')
        const bgParts2 = bgSize.split(' ')
        const bgW = parseFloat(bgParts2[0] || '0')
        const bgH = parseFloat(bgParts2[1] || '0')

        const lensOk   = display === 'block'
        const posOk    = Math.abs(actualCX - expCX) < 1.5 && Math.abs(actualCY - expCY) < 1.5
        const bgPosOk  = Math.abs(bgPosX - exp.x) < 1.5 && Math.abs(bgPosY - exp.y) < 1.5
        const bgSizeOk = Math.abs(bgW - exp.bgW) < 2 && Math.abs(bgH - exp.bgH) < 2
        const clampOk  = lensLeft >= 0 && lensTop >= 0 &&
                         lensLeft + LENS_SIZE <= imgW + 1 &&
                         lensTop  + LENS_SIZE <= imgH + 1

        results.positions[pos.name] = {
          lens: lensOk ? '✅' : '❌',
          pos:  posOk  ? '✅' : `❌ cx=${Math.round(actualCX)} exp=${Math.round(expCX)}`,
          bgPos: bgPosOk  ? '✅' : `❌ x=${bgPosX.toFixed(1)} exp=${exp.x.toFixed(1)}, y=${bgPosY.toFixed(1)} exp=${exp.y.toFixed(1)}`,
          bgSize: bgSizeOk ? '✅' : `❌ w=${bgW} exp=${exp.bgW}`,
          clamp:  clampOk  ? '✅' : `❌ l=${Math.round(lensLeft)} t=${Math.round(lensTop)}`,
        }
      }

      // mouseleave 숨김
      await page.mouse.move(0, 0)
      await page.waitForTimeout(100)
      const afterLeave = await lens.evaluate(el => el.style.display)
      results.lensHiddenOnLeave = afterLeave === 'none' || afterLeave === ''
    }

    // nav 클릭존 너비
    const prevW = await page.locator('#artworkPrev').evaluate(el => el.getBoundingClientRect().width)
    results.navPrevWidth   = Math.round(prevW)
    results.navMatchMargin = Math.round(prevW) === 180

    // 키보드 탐색 후 lens 재초기화
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(800)

    const boxNav = await img.boundingBox()
    if (boxNav) {
      await page.mouse.move(0, 0)
      await page.waitForTimeout(50)
      await page.mouse.move(boxNav.x + boxNav.width / 2, Math.min(boxNav.y + 120, 880))
      await page.waitForTimeout(150)
      results.lensAfterNav = await lens.evaluate(el => el.style.display) === 'block'
    }

    results.desktopErrors = errors.slice()
    await ctx.close()
  }

  // ── 2. 세로형 작품 테스트 ───────────────────────────────────────
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()

    // 세로형 작품 (2jung 카테고리에서 세로형 찾기)
    await page.goto(`${BASE}/artwork/?id=2jung-142-after-the-winter-ink-stick-and-acrylic-on-canvas60-5x100cm2004-95p`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const img  = page.locator('#artworkImg')
    const lens = page.locator('#artworkMagnifier')
    const box  = await img.boundingBox()

    if (box) {
      const sy = Math.min(box.y + 150, 880)
      await page.mouse.move(0, 0)
      await page.waitForTimeout(50)
      await page.mouse.move(box.x + box.width / 2, sy)
      await page.waitForTimeout(150)
      const visible = await lens.evaluate(el => el.style.display) === 'block'
      const lensL   = parseFloat(await lens.evaluate(el => el.style.left || '0'))
      const clampOk = lensL >= 0 && lensL + LENS_SIZE <= box.width + 1
      results.portraitLens  = visible ? '✅' : '❌'
      results.portraitClamp = clampOk ? '✅' : `❌ left=${Math.round(lensL)}`
    }

    await ctx.close()
  }

  // ── 3. 모바일 overlay (390px) ─────────────────────────────────
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true, isMobile: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    })
    const page    = await ctx.newPage()
    const errors390 = []
    page.on('console', m => { if (m.type() === 'error') errors390.push(m.text()) })

    await page.goto(`${BASE}/artwork/?id=${WORKS.landscape}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const img     = page.locator('#artworkImg')
    const overlay = page.locator('#artworkZoomOverlay')
    const lens    = page.locator('#artworkMagnifier')

    // 모바일에서 렌즈 숨김 (setupMagnifier 미호출)
    const lensOnMobile = await lens.evaluate(el => el.style.display)
    results.lensHiddenOnMobile = lensOnMobile !== 'block'

    // tap → overlay
    const box390 = await img.boundingBox()
    if (box390) {
      const cx = box390.x + box390.width / 2
      const cy = Math.min(box390.y + 120, 820)
      await page.touchscreen.tap(cx, cy)
      await page.waitForTimeout(400)
    }
    results.mobileOverlayOpen = await overlay.evaluate(el => !el.hasAttribute('hidden'))
    await page.locator('#artworkZoomClose').click()
    await page.waitForTimeout(200)
    results.mobileOverlayClosed = await overlay.evaluate(el => el.hasAttribute('hidden'))

    results.mobile390Errors = errors390.slice()
    await ctx.close()
  }

  // ── 4. broken image ───────────────────────────────────────────
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    await page.route('**/*.jpg', route => route.abort())

    await page.goto(`${BASE}/artwork/?id=${WORKS.landscape}`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    const box = await page.locator('#artworkImg').boundingBox()
    if (box) {
      await page.mouse.move(0, 0)
      await page.waitForTimeout(50)
      await page.mouse.move(box.x + box.width / 2, Math.min(box.y + 120, 880))
      await page.waitForTimeout(150)
    }
    const lensOnBroken = await page.locator('#artworkMagnifier').evaluate(el => el.style.display)
    results.brokenLensHidden = lensOnBroken !== 'block'

    await ctx.close()
  }

  await browser.close()

  // ── 출력 ─────────────────────────────────────────────────────
  const def = (v, fallback = '(skip)') => v !== undefined ? v : fallback

  console.log('\n═══════════════════════════════════════════════')
  console.log('  MAGNIFIER TEST RESULTS (1440px desktop)')
  console.log('═══════════════════════════════════════════════\n')

  console.log('▶ 초기 상태')
  console.log('  렌즈 초기 숨김:       ', results.lensInitiallyHidden ? '✅' : '❌')
  console.log('  이미지 bbox:          ', JSON.stringify(results.imgBox))

  console.log('\n▶ nav 클릭존')
  console.log('  prev 너비:            ', results.navPrevWidth, 'px')
  console.log('  180px(--artwork-lr):  ', results.navMatchMargin ? '✅' : '❌')

  console.log('\n▶ 위치별 돋보기 (가로형 작품)')
  if (results.positions) {
    for (const [name, data] of Object.entries(results.positions)) {
      console.log(`\n  [${name}]`)
      console.log(`    lens 표시:    ${data.lens}`)
      console.log(`    렌즈 center:  ${data.pos}`)
      console.log(`    bg-position:  ${data.bgPos}`)
      console.log(`    bg-size:      ${data.bgSize}`)
      console.log(`    clamp:        ${data.clamp}`)
    }
  }
  console.log('\n  mouseleave 숨김:      ', results.lensHiddenOnLeave ? '✅' : '❌')

  console.log('\n▶ 작품 변경 후 렌즈')
  console.log('  ArrowRight 후 렌즈:   ', results.lensAfterNav ? '✅' : '❌')

  console.log('\n▶ 세로형 작품')
  console.log('  렌즈 표시:            ', def(results.portraitLens))
  console.log('  clamp:                ', def(results.portraitClamp))

  console.log('\n▶ 모바일 (390px)')
  console.log('  렌즈 미활성:          ', results.lensHiddenOnMobile ? '✅' : '❌')
  console.log('  tap → overlay:        ', results.mobileOverlayOpen ? '✅' : '❌')
  console.log('  닫기:                 ', results.mobileOverlayClosed ? '✅' : '❌')

  console.log('\n▶ broken image')
  console.log('  렌즈 미표시:          ', results.brokenLensHidden ? '✅' : '❌')

  const totalErrors = [
    ...(results.desktopErrors || []),
    ...(results.mobile390Errors || []),
  ]
  console.log('\n▶ console errors:       ', totalErrors.length === 0 ? '✅ 0' : `❌ ${totalErrors.length}`)
  if (totalErrors.length > 0) totalErrors.forEach(e => console.log('  ', e))

  console.log('\n═══════════════════════════════════════════════\n')
}

run().catch(e => { console.error(e); process.exit(1) })
