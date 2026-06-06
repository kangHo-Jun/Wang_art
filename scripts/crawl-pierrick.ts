import { chromium } from '@playwright/test'
import * as fs from 'fs'

const PAGES = [
  { name: 'home',    url: 'https://www.pierrickcalvez.com/' },
  { name: 'works',   url: 'https://www.pierrickcalvez.com/selected-works' },
  { name: 'artwork', url: 'https://www.pierrickcalvez.com/artwork/attakullakulla' },
  { name: 'series',  url: 'https://www.pierrickcalvez.com/series/pastorales' },
]

async function crawlPage(page: any, url: string, name: string) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(2000)

  // 1. 폰트
  const fonts = await page.evaluate(() =>
    [...new Set(Array.from(document.querySelectorAll('*')).map(el =>
      window.getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/['"]/g,'')
    ))].filter(Boolean).slice(0, 15)
  )

  // 2. 배경/텍스트 색상
  const colors = await page.evaluate(() => {
    const bg = new Set<string>()
    const tx = new Set<string>()
    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el)
      if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') bg.add(cs.backgroundColor)
    })
    document.querySelectorAll('p,a,h1,h2,h3,span').forEach(el => {
      tx.add(window.getComputedStyle(el).color)
    })
    return { bg: [...bg].slice(0, 8), tx: [...tx].slice(0, 8) }
  })

  // 3. 상단 nav 분석
  const nav = await page.evaluate(() => {
    const header = document.querySelector('header, nav, [class*="nav"], [class*="header"]')
    if (!header) return null
    const cs = window.getComputedStyle(header)
    return {
      tag: header.tagName,
      classes: header.className.substring(0, 100),
      html: header.innerHTML.substring(0, 600),
      position: cs.position,
      height: cs.height,
      bg: cs.backgroundColor,
      font: cs.fontFamily,
      fontSize: cs.fontSize,
      zIndex: cs.zIndex,
    }
  })

  // 4. 메인 콘텐츠 구조 (최상위 2단계)
  const structure = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body
    return Array.from(main.children).slice(0, 10).map(child => {
      const cs = window.getComputedStyle(child)
      const rect = child.getBoundingClientRect()
      return {
        tag: child.tagName,
        id: child.id || null,
        classes: child.className.substring(0, 120),
        rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
        display: cs.display,
        position: cs.position,
        padding: cs.padding,
        margin: cs.margin,
        gap: cs.gap,
        gridCols: cs.gridTemplateColumns,
        columns: cs.columns,
        columnGap: cs.columnGap,
        bg: cs.backgroundColor,
        children: Array.from(child.children).slice(0, 6).map(gc => {
          const gcs = window.getComputedStyle(gc)
          const gr  = gc.getBoundingClientRect()
          return {
            tag: gc.tagName,
            classes: gc.className.substring(0, 80),
            rect: { w: Math.round(gr.width), h: Math.round(gr.height) },
            display: gcs.display,
            fontSize: gcs.fontSize,
            fontFamily: gcs.fontFamily.split(',')[0].replace(/['"]/g,'').trim(),
            fontWeight: gcs.fontWeight,
            letterSpacing: gcs.letterSpacing,
            color: gcs.color,
            bg: gcs.backgroundColor,
            padding: gcs.padding,
            objectFit: gcs.objectFit,
            text: gc.children.length === 0 ? gc.textContent?.trim().substring(0, 60) : '',
          }
        })
      }
    })
  })

  // 5. 이미지 분석
  const images = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img')).slice(0, 12).map(img => {
      const cs  = window.getComputedStyle(img)
      const pcs = img.parentElement ? window.getComputedStyle(img.parentElement) : null
      const rect = img.getBoundingClientRect()
      return {
        src:       img.src.substring(0, 100),
        alt:       img.alt.substring(0, 60),
        dispW:     Math.round(rect.width),
        dispH:     Math.round(rect.height),
        objectFit: cs.objectFit,
        display:   cs.display,
        parentClass: img.parentElement?.className.substring(0, 60),
        parentDisplay: pcs?.display,
        parentW: img.parentElement ? Math.round(img.parentElement.getBoundingClientRect().width) : 0,
      }
    })
  )

  // 6. 내비 링크
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a')).slice(0, 30).map(a => ({
      text: a.textContent?.trim().substring(0, 50),
      href: a.getAttribute('href'),
      classes: a.className.substring(0, 60),
      fontSize: window.getComputedStyle(a).fontSize,
      fontFamily: window.getComputedStyle(a).fontFamily.split(',')[0].replace(/['"]/g,'').trim(),
      letterSpacing: window.getComputedStyle(a).letterSpacing,
      color: window.getComputedStyle(a).color,
      textTransform: window.getComputedStyle(a).textTransform,
    }))
  )

  // 7. CSS 변수 (:root)
  const cssVars = await page.evaluate(() => {
    let text = ''
    try {
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          Array.from(sheet.cssRules || []).forEach(rule => {
            if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
              text += rule.cssText.substring(0, 3000)
            }
          })
        } catch {}
      })
    } catch {}
    return text
  })

  // 8. 그리드/wall 특정 분석
  const grid = await page.evaluate(() => {
    const candidates = [
      ...document.querySelectorAll('[class*="grid"],[class*="wall"],[class*="work"],[class*="gallery"],[class*="list"],[class*="collection"]')
    ].filter(el => el.children.length > 2)
    if (!candidates.length) return null
    const el = candidates[0]
    const cs = window.getComputedStyle(el)
    const rect = el.getBoundingClientRect()
    const firstChild = el.children[0]
    const fcs = firstChild ? window.getComputedStyle(firstChild) : null
    return {
      tag: el.tagName,
      classes: el.className.substring(0, 100),
      childCount: el.children.length,
      rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
      display: cs.display,
      columns: cs.columns,
      columnGap: cs.columnGap,
      gridCols: cs.gridTemplateColumns,
      gap: cs.gap,
      firstChild: firstChild ? {
        tag: firstChild.tagName,
        classes: firstChild.className.substring(0, 80),
        rect: { w: Math.round(firstChild.getBoundingClientRect().width), h: Math.round(firstChild.getBoundingClientRect().height) },
        display: fcs?.display,
        position: fcs?.position,
        overflow: fcs?.overflow,
        cursor: fcs?.cursor,
      } : null
    }
  })

  // 9. 푸터
  const footer = await page.evaluate(() => {
    const el = document.querySelector('footer, [class*="footer"]')
    if (!el) return null
    return {
      classes: el.className.substring(0, 80),
      html: el.innerHTML.substring(0, 500),
      bg: window.getComputedStyle(el).backgroundColor,
      padding: window.getComputedStyle(el).padding,
    }
  })

  // 10. hover 테스트 (이미지)
  let hoverData = ''
  try {
    const imgs = page.locator('img')
    const cnt  = await imgs.count()
    if (cnt > 0) {
      const box = await imgs.nth(0).boundingBox()
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
        await page.waitForTimeout(600)
        hoverData = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('img')).slice(0, 4).map((img, i) => {
            const cs = window.getComputedStyle(img)
            return `[${i}] opacity:${cs.opacity} filter:${cs.filter.substring(0,30)} transition:${cs.transition.substring(0,60)}`
          }).join('\n')
        })
      }
    }
  } catch {}

  // 11. 애니메이션/트랜지션
  const transitions = await page.evaluate(() => {
    const result: string[] = []
    document.querySelectorAll('*').forEach(el => {
      const cs = window.getComputedStyle(el)
      if (cs.transition && cs.transition !== 'all 0s ease 0s' && cs.transition !== 'none') {
        const classes = el.className?.toString().substring(0, 40) || el.tagName
        result.push(`${classes}: ${cs.transition.substring(0, 80)}`)
      }
    })
    return [...new Set(result)].slice(0, 20)
  })

  await page.screenshot({ path: `scripts/screenshots/${name}-desktop.jpg`, fullPage: false, type: 'jpeg', quality: 90 })

  return { name, url, fonts, colors, nav, structure, images, links, cssVars, grid, footer, hoverData, transitions }
}

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' })
  const page    = await context.newPage()

  fs.mkdirSync('scripts/screenshots', { recursive: true })

  const results: any[] = []
  for (const p of PAGES) {
    console.log(`크롤링: ${p.name}`)
    try {
      const data = await crawlPage(page, p.url, p.name)
      results.push(data)
      console.log(`  ✓ fonts: ${data.fonts.slice(0,3).join(', ')}`)
    } catch (e) {
      console.error(`  ✗`, e)
      results.push({ name: p.name, url: p.url, error: String(e) })
    }
  }

  await browser.close()
  fs.writeFileSync('scripts/pierrick-analysis.json', JSON.stringify(results, null, 2))
  console.log('\n완료: scripts/pierrick-analysis.json')
})()
