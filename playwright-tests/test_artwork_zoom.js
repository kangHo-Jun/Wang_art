/**
 * artwork zoom 기능 검증
 */
import { chromium } from 'playwright'

const BASE = 'http://localhost:4175/Wang_art'
const FIRST_ID = '2026-02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011'

// viewport 내부 안전 y 좌표 반환 (이미지가 길어도 viewport 상단 부근 사용)
function safeY(box, viewportH = 900) {
  return Math.min(box.y + 120, viewportH - 20)
}

async function run() {
  const browser = await chromium.launch({ headless: true })
  const results = {}

  // ── 1. 데스크톱 zoom (1440px) ──────────────────────────────────
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()
    const errors = []
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', e => errors.push(e.message))

    await page.goto(`${BASE}/artwork/?id=${FIRST_ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const img  = page.locator('#artworkImg')
    const wrap = page.locator('#artworkZoomWrap')

    const naturalW = await img.evaluate(el => el.naturalWidth)
    results.imgLoaded = naturalW > 0

    const box = await img.boundingBox()
    results.imgBoundingBox = box ? { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) } : null

    // nav 클릭존 너비 = --artwork-lr(180px) 확인
    const prevW = await page.locator('#artworkPrev').evaluate(el => el.getBoundingClientRect().width)
    const nextW = await page.locator('#artworkNext').evaluate(el => el.getBoundingClientRect().width)
    results.navPrevWidth   = Math.round(prevW)
    results.navNextWidth   = Math.round(nextW)
    results.navMatchMargin = Math.round(prevW) === 180

    // ── zoom 위치별 테스트 ──
    if (box) {
      const sy = safeY(box)  // viewport 내 안전 y
      const positions = [
        { name: 'left',   x: box.x + 5,              y: sy },
        { name: 'center', x: box.x + box.width / 2,  y: sy },
        { name: 'right',  x: box.x + box.width - 5,  y: sy },
      ]

      results.zoomPositions = {}
      // 먼저 이미지 바깥에서 출발
      await page.mouse.move(0, 0)
      await page.waitForTimeout(80)

      for (const pos of positions) {
        // 이미지 밖으로 이동 후 각 위치 진입
        await page.mouse.move(0, 0)
        await page.waitForTimeout(60)
        await page.mouse.move(pos.x, pos.y)
        await page.waitForTimeout(150)
        const active = await wrap.evaluate(el => el.classList.contains('zoom-active'))
        const origin = await img.evaluate(el => el.style.transformOrigin)
        results.zoomPositions[pos.name] = { active, origin }
        // mouseleave
        await page.mouse.move(0, 0)
        await page.waitForTimeout(80)
      }

      // mouseleave 원복 확인
      await page.mouse.move(0, 0)
      await page.waitForTimeout(150)
      const afterLeave = await wrap.evaluate(el => el.classList.contains('zoom-active'))
      results.mouseLeaveRestored = !afterLeave

      // cursor
      const wrapCursor = await wrap.evaluate(el => getComputedStyle(el).cursor)
      results.desktopCursor = wrapCursor

      // nav 영역(x=90, 이미지 시작 180px 밖)에서 zoom 비활성
      await page.mouse.move(0, 0)
      await page.waitForTimeout(60)
      await page.mouse.move(90, sy)
      await page.waitForTimeout(150)
      const navAreaZoom = await wrap.evaluate(el => el.classList.contains('zoom-active'))
      results.navAreaNoZoom = !navAreaZoom
    }

    // ── 키보드 탐색 ──
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(700)
    const urlAfterRight = page.url()
    results.keyboardNextWorks = urlAfterRight.includes('id=') && !urlAfterRight.includes(FIRST_ID)

    await page.keyboard.press('ArrowLeft')
    await page.waitForTimeout(700)
    const urlAfterLeft = page.url()
    results.keyboardPrevWorks = urlAfterLeft.includes(FIRST_ID)

    // ── 작품 변경 후 zoom 재초기화 ──
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(900)  // GSAP + image load
    const boxAfterNav = await page.locator('#artworkImg').boundingBox()
    if (boxAfterNav) {
      const sy2 = safeY(boxAfterNav)
      await page.mouse.move(0, 0)
      await page.waitForTimeout(60)
      await page.mouse.move(boxAfterNav.x + boxAfterNav.width / 2, sy2)
      await page.waitForTimeout(200)
      results.zoomAfterNavChange = await page.locator('#artworkZoomWrap').evaluate(el => el.classList.contains('zoom-active'))
    }

    results.desktopErrors = errors.slice()
    await ctx.close()
  }

  // ── 2. 모바일 390px overlay ────────────────────────────────────
  {
    const ctx  = await browser.newContext({
      viewport:  { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      hasTouch:  true,
      isMobile:  true,
    })
    const page = await ctx.newPage()
    const errors390 = []
    page.on('console', m => { if (m.type() === 'error') errors390.push(m.text()) })

    await page.goto(`${BASE}/artwork/?id=${FIRST_ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const img     = page.locator('#artworkImg')
    const overlay = page.locator('#artworkZoomOverlay')

    results.overlayInitiallyHidden = await overlay.evaluate(el => el.hasAttribute('hidden'))

    const box390 = await img.boundingBox()
    if (box390) {
      const cx = box390.x + box390.width / 2
      const cy = Math.min(box390.y + 120, 820)
      // touchstart + touchend (tap: 이동 없음)
      await page.touchscreen.tap(cx, cy)
      await page.waitForTimeout(400)
    }

    results.overlayOpensOnTap = await overlay.evaluate(el => !el.hasAttribute('hidden'))

    if (results.overlayOpensOnTap) {
      const zoomImgSrc = await page.locator('#artworkZoomImg').getAttribute('src')
      results.zoomImgSrcSet = zoomImgSrc !== null && zoomImgSrc.length > 0

      // 닫기 버튼
      await page.locator('#artworkZoomClose').click()
      await page.waitForTimeout(200)
      results.overlayClosedByBtn = await overlay.evaluate(el => el.hasAttribute('hidden'))
    }

    // scroll lock 확인: overlay 열릴 때 body position:fixed
    if (box390) {
      const cx = box390.x + box390.width / 2
      const cy = Math.min(box390.y + 120, 820)
      await page.touchscreen.tap(cx, cy)
      await page.waitForTimeout(300)
    }
    const bodyFixed = await page.evaluate(() => document.body.style.position === 'fixed')
    results.scrollLocked = bodyFixed
    // 닫기 후 unlock
    await page.locator('#artworkZoomClose').click()
    await page.waitForTimeout(200)
    const bodyUnlocked = await page.evaluate(() => document.body.style.position === '')
    results.scrollUnlocked = bodyUnlocked

    results.mobile390Errors = errors390.slice()
    await ctx.close()
  }

  // ── 3. 모바일 609px — ESC + swipe 탐색 병행 ──────────────────
  {
    const ctx  = await browser.newContext({
      viewport:  { width: 609, height: 900 },
      hasTouch:  true,
      isMobile:  true,
    })
    const page = await ctx.newPage()
    const errors609 = []
    page.on('console', m => { if (m.type() === 'error') errors609.push(m.text()) })

    await page.goto(`${BASE}/artwork/?id=${FIRST_ID}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const img609 = page.locator('#artworkImg')
    const overlay609 = page.locator('#artworkZoomOverlay')
    const box609 = await img609.boundingBox()

    if (box609) {
      const cx = box609.x + box609.width / 2
      const cy = Math.min(box609.y + 120, 880)
      await page.touchscreen.tap(cx, cy)
      await page.waitForTimeout(300)
      const open609 = await overlay609.evaluate(el => !el.hasAttribute('hidden'))
      results.overlay609Opens = open609

      if (open609) {
        await page.keyboard.press('Escape')
        await page.waitForTimeout(200)
        results.escClosesOverlay = await overlay609.evaluate(el => el.hasAttribute('hidden'))
      }
    }

    // overlay 닫힌 상태에서 swipe 탐색 작동 확인
    const urlBefore = page.url()
    if (box609) {
      // swipe left (다음 작품): touchstart at cx+60, touchend at cx-60
      const startX = box609.x + box609.width / 2 + 60
      const endX   = box609.x + box609.width / 2 - 60
      const cy = Math.min(box609.y + 120, 880)
      await page.touchscreen.tap(startX, cy)  // touchstart
      await page.evaluate(({ sx, sy, ex, ey }) => {
        const ts = new TouchEvent('touchstart', { touches: [new Touch({ identifier: 1, target: document.body, clientX: sx, clientY: sy })], cancelable: true, bubbles: true })
        const te = new TouchEvent('touchend',   { changedTouches: [new Touch({ identifier: 1, target: document.body, clientX: ex, clientY: ey })], cancelable: true, bubbles: true })
        document.dispatchEvent(ts)
        document.dispatchEvent(te)
      }, { sx: startX, sy: cy, ex: endX, ey: cy })
      await page.waitForTimeout(700)
    }
    const urlAfterSwipe = page.url()
    results.swipeNavWorks = urlAfterSwipe !== urlBefore && urlAfterSwipe.includes('id=')

    results.mobile609Errors = errors609.slice()
    await ctx.close()
  }

  // ── 4. broken image: 요청 인터셉트 ───────────────────────────
  {
    const ctx  = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await ctx.newPage()

    // 이미지 요청을 abort 처리하여 broken image 시뮬레이션
    await page.route('**/*.jpg', route => route.abort())

    await page.goto(`${BASE}/artwork/?id=${FIRST_ID}`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(600)

    const imgBroken = page.locator('#artworkImg')
    const boxBroken = await imgBroken.boundingBox()
    results.brokenNaturalW = await imgBroken.evaluate(el => el.naturalWidth)

    if (boxBroken) {
      await page.mouse.move(0, 0)
      await page.waitForTimeout(60)
      await page.mouse.move(boxBroken.x + boxBroken.width / 2, safeY(boxBroken))
      await page.waitForTimeout(150)
    }
    const zoomOnBroken = await page.locator('#artworkZoomWrap').evaluate(el => el.classList.contains('zoom-active'))
    results.noBrokenZoom = !zoomOnBroken

    await ctx.close()
  }

  await browser.close()

  // ── 결과 출력 ────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════')
  console.log('  ARTWORK ZOOM — PLAYWRIGHT TEST RESULTS')
  console.log('═══════════════════════════════════════════\n')

  console.log('▶ 데스크톱 기본 (1440px)')
  console.log('  이미지 로드:         ', results.imgLoaded          ? '✅' : '❌')
  console.log('  이미지 bbox:         ', JSON.stringify(results.imgBoundingBox))
  console.log('  nav prev 너비:       ', results.navPrevWidth, 'px')
  console.log('  nav next 너비:       ', results.navNextWidth, 'px')
  console.log('  nav = 180px 일치:    ', results.navMatchMargin     ? '✅' : '❌')

  console.log('\n▶ 데스크톱 zoom 위치별')
  if (results.zoomPositions) {
    for (const [pos, data] of Object.entries(results.zoomPositions)) {
      console.log(`  ${pos.padEnd(8)}: active=${data.active ? '✅' : '❌'}, origin="${data.origin}"`)
    }
  }
  console.log('  mouseleave 원복:     ', results.mouseLeaveRestored ? '✅' : '❌')
  console.log('  cursor:              ', results.desktopCursor)

  console.log('\n▶ nav/zoom 충돌')
  console.log('  nav 영역 zoom 없음:  ', results.navAreaNoZoom      ? '✅' : '❌')

  console.log('\n▶ 키보드 탐색')
  console.log('  ArrowRight 작동:     ', results.keyboardNextWorks  ? '✅' : '❌')
  console.log('  ArrowLeft 복귀:      ', results.keyboardPrevWorks  ? '✅' : '❌')
  console.log('  작품 변경 후 zoom:   ', results.zoomAfterNavChange ? '✅' : '❌')

  console.log('\n▶ 모바일 overlay (390px)')
  console.log('  초기 hidden:         ', results.overlayInitiallyHidden ? '✅' : '❌')
  console.log('  tap → open:          ', results.overlayOpensOnTap  ? '✅' : '❌')
  console.log('  zoomImg src 설정:    ', results.zoomImgSrcSet      ? '✅' : '❌')
  console.log('  닫기 버튼:           ', results.overlayClosedByBtn ? '✅' : '❌')
  console.log('  scroll lock:         ', results.scrollLocked       ? '✅' : '❌')
  console.log('  scroll unlock:       ', results.scrollUnlocked     ? '✅' : '❌')

  console.log('\n▶ 모바일 (609px)')
  console.log('  overlay open:        ', results.overlay609Opens    ? '✅' : '❌')
  console.log('  ESC 닫기:            ', results.escClosesOverlay   ? '✅' : '❌')
  console.log('  swipe 탐색:          ', results.swipeNavWorks      ? '✅' : '❌')

  console.log('\n▶ broken image (요청 차단)')
  console.log('  naturalWidth=0:      ', results.brokenNaturalW === 0 ? '✅' : `❌ (${results.brokenNaturalW})`)
  console.log('  zoom 비활성:         ', results.noBrokenZoom       ? '✅' : '❌')

  const totalErrors = [
    ...(results.desktopErrors || []),
    ...(results.mobile390Errors || []),
    ...(results.mobile609Errors || []),
  ]
  console.log('\n▶ console errors:      ', totalErrors.length === 0 ? '✅ 0' : `❌ ${totalErrors.length}`)
  if (totalErrors.length > 0) totalErrors.forEach(e => console.log('   ', e))

  console.log('\n═══════════════════════════════════════════\n')
}

run().catch(e => { console.error(e); process.exit(1) })
