import { expect, test } from '@playwright/test'

const CONTACT_URL = 'http://127.0.0.1:4174/Wang_art/contact/'

test('collect contact metrics', async ({ page }) => {
  await page.setViewportSize({ width: 1114, height: 963 })
  await page.goto(CONTACT_URL, { waitUntil: 'networkidle' })

  const metrics = await page.evaluate(() => {
    const navMenu = document.querySelector('.nav-menu') as HTMLElement | null
    const contactContainer = document.querySelector('.contact-container') as HTMLElement | null
    const blocks = Array.from(document.querySelectorAll('.contact-block')) as HTMLElement[]
    const studio = document.querySelector('.contact-studio') as HTMLElement | null
    const studioImage = document.querySelector('.contact-slide.is-active img') as HTMLElement | null
    if (!navMenu || !contactContainer || blocks.length < 2 || !studio || !studioImage) return null

    const navRect = navMenu.getBoundingClientRect()
    const contactRect = contactContainer.getBoundingClientRect()
    const locationRect = blocks[0].getBoundingClientRect()
    const contactBlockRect = blocks[1].getBoundingClientRect()
    const imageRect = studioImage.getBoundingClientRect()
    const studioRect = studio.getBoundingClientRect()

    return {
      viewportWidth: window.innerWidth,
      navBottom: Math.round(navRect.bottom),
      contactContainerX: Math.round(contactRect.x),
      contactContainerY: Math.round(contactRect.y),
      contactContainerWidth: Math.round(contactRect.width),
      contactContainerHeight: Math.round(contactRect.height),
      locationBlockX: Math.round(locationRect.x),
      locationBlockWidth: Math.round(locationRect.width),
      contactBlockX: Math.round(contactBlockRect.x),
      contactBlockWidth: Math.round(contactBlockRect.width),
      studioImageX: Math.round(imageRect.x),
      studioImageY: Math.round(imageRect.y),
      studioImageWidth: Math.round(imageRect.width),
      studioImageHeight: Math.round(imageRect.height),
      navToContactGap: Math.round(contactRect.y - navRect.bottom),
      contactToImageGap: Math.round(studioRect.y - contactRect.bottom),
      contactImageWidthDiff: Math.round(imageRect.width - contactRect.width),
      contactImageXDiff: Math.round(imageRect.x - contactRect.x),
    }
  })

  expect(metrics).not.toBeNull()
  console.log(JSON.stringify(metrics, null, 2))
})
