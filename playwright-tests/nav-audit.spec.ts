import { test, expect } from '@playwright/test'

const basePath = '/Wang_art'
const red = 'rgb(200, 68, 46)'

const navPages = [
  { path: '/works/', key: 'works', label: 'Selected Works' },
  { path: '/worlds/', key: 'worlds', label: '작품세계' },
  { path: '/artist/', key: 'artist', label: '작가' },
  { path: '/collections/', key: 'collections', label: '소장처' },
] as const

async function collectConsoleErrors(page: Parameters<typeof test>[0]['page']): Promise<string[]> {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  return errors
}

test.describe('nav audit', () => {
  test('desktop 1440: nav spec and active state across subpages', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page)
    await page.setViewportSize({ width: 1440, height: 900 })

    for (const item of navPages) {
      await page.goto(`${basePath}${item.path}`)
      await page.waitForLoadState('networkidle')

      const activeLink = page.locator(`.navbar-link.big[data-nav="${item.key}"]`)
      await expect(activeLink).toHaveAttribute('aria-current', 'page')
      await expect(activeLink).toHaveClass(/is-active/)
      await expect(activeLink).toHaveCSS('color', red)

      for (const other of navPages.filter((pageItem) => pageItem.key !== item.key)) {
        await expect(page.locator(`.navbar-link.big[data-nav="${other.key}"]`)).not.toHaveCSS('color', red)
      }
    }

    await page.goto(`${basePath}/works/`)
    await page.waitForLoadState('networkidle')

    const logo = page.locator('.navbar-link.logo')
    const navLink = page.locator('.navbar-link.big[data-nav="works"]')
    const secondNavLink = page.locator('.navbar-link.big[data-nav="worlds"]')
    const navbarContainer = page.locator('.navbar-container')

    await expect(logo).toHaveCSS('font-size', '22px')
    await expect(logo).toHaveCSS('font-weight', '200')
    await expect(logo).toHaveCSS('letter-spacing', '0.4px')

    await expect(navLink).toHaveCSS('font-size', '22px')
    await expect(navLink).toHaveCSS('font-weight', '200')
    await expect(navLink).toHaveCSS('letter-spacing', '0.4px')
    await expect(secondNavLink).toHaveCSS('margin-left', '50px')
    await expect(navbarContainer).toHaveCSS('padding-left', '144px')

    expect(consoleErrors).toEqual([])

    await page.screenshot({ path: 'test-results/nav-audit/desktop-1440-works.png', fullPage: false })
  })

  test('tablet 768: drawer keeps 18px nav and active red', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page)
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto(`${basePath}/worlds/`)
    await page.waitForLoadState('networkidle')

    const menuButton = page.locator('#menuBtnMobile')
    await menuButton.click()

    const worldsLink = page.locator('.navbar-link.big[data-nav="worlds"]')

    await expect(worldsLink).toHaveAttribute('aria-current', 'page')
    await expect(worldsLink).toHaveCSS('font-size', '18px')
    await expect(worldsLink).toHaveCSS('font-weight', '200')
    await expect(worldsLink).toHaveCSS('letter-spacing', '0.4px')
    await expect(worldsLink).toHaveCSS('color', red)

    expect(consoleErrors).toEqual([])

    await page.screenshot({ path: 'test-results/nav-audit/tablet-768-worlds.png', fullPage: false })
  })

  test('mobile 390: drawer keeps 18px nav and active red', async ({ page }) => {
    const consoleErrors = await collectConsoleErrors(page)
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${basePath}/artist/`)
    await page.waitForLoadState('networkidle')

    const menuButton = page.locator('#menuBtnMobile')
    await menuButton.click()

    const menu = page.locator('.nav-menu')
    await expect(menu).toHaveClass(/open/)

    const artistLink = page.locator('.navbar-link.big[data-nav="artist"]')
    await expect(artistLink).toHaveAttribute('aria-current', 'page')
    await expect(artistLink).toHaveCSS('font-size', '18px')
    await expect(artistLink).toHaveCSS('font-weight', '200')
    await expect(artistLink).toHaveCSS('letter-spacing', '0.4px')
    await expect(artistLink).toHaveCSS('color', red)

    expect(consoleErrors).toEqual([])

    await page.screenshot({ path: 'test-results/nav-audit/mobile-390-artist-drawer.png', fullPage: false })
  })
})
