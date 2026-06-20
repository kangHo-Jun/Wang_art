import rawData from './artworks.json'
import featuredData from './featured-works.json'
import type { Artwork, ArtworkCategory } from '../types'

// ── 제외 규칙 ──────────────────────────────────────────────────
// gallery-front.jpg: 갤러리 커버 이미지 (작품 아님)
// .tif/.tiff: 브라우저 미지원 포맷 (jpg 대체본 없음)
const EXCLUDE_IMAGES = new Set([
  'images/2026/gallery-front.jpg',
])

function isExcluded(imgPath: string): boolean {
  return EXCLUDE_IMAGES.has(imgPath) || /\.tiff?$/i.test(imgPath)
}

const PRICE_PATTERNS = [
  /(?:₩\s*)?\d[\d,]*(?:\.\d+)?\s*(?:만원|원|KRW)\b/gi,
  /\b(?:price|판매가|가격문의)\b/gi,
]

const MEDIUM_PATTERNS = [
  /Ink[\s-]*stick\s+and\s+Acrylic\s+on\s+(?:Canvas|Korean\s+paper|canvas|paper)/i,
  /Acrylic\s+on\s+canvas/i,
  /Oil\s+and\s+Acrylic\s+on\s+[^,._\d]+/i,
  /천에\s*먹,?\s*아크릴/i,
  /천에먹,?\s*아크릴/i,
  /캔버스에\s*아크릴/i,
  /종이에\s*먹(?:,?\s*아크릴)?/i,
  /한지에\s*먹(?:,?\s*아크릴)?/i,
  /화선지에\s*먹(?:,?\s*아크릴)?/i,
  /장지에\s*먹(?:,?\s*아크릴)?/i,
]

function stripPriceInfo(text: string): string {
  return PRICE_PATTERNS.reduce((acc, pattern) => acc.replace(pattern, ''), text)
}

function stripLeadingSequence(text: string): string {
  return text.replace(/^\s*\d+(?:[._-]+|\s)*/u, '')
}

function stripDuplicatedMetaTail(text: string): string {
  const duplicateTail = text.match(/\s*,\s*((?:19|20)\d{2}\b[\s\S]*)$/u)
  if (!duplicateTail) return text

  const beforeTail = text.slice(0, duplicateTail.index)
  const hasEarlierYear = /(?:19|20)\d{2}/u.test(beforeTail)
  return hasEarlierYear ? beforeTail : text
}

function collapseWhitespace(text: string): string {
  return text
    .replace(/\s+/gu, ' ')
    .replace(/\s+,/gu, ',')
    .replace(/\s+\./gu, '.')
    .trim()
}

function cleanupRawTitle(text: string): string {
  return collapseWhitespace(
    stripDuplicatedMetaTail(
      stripLeadingSequence(
        stripPriceInfo(text),
      ),
    ),
  )
}

// ── 카테고리별 colorTags ──────────────────────────────────────
const CAT_COLORS: Record<string, string[]> = {
  '2026':  ['ink', 'gold'],
  '2jung': ['ink'],
  'blue':  ['blue', 'ink'],
  'ink':   ['ink'],
  'red':   ['red'],
}

// ── 메타데이터 파싱 (보수적) ─────────────────────────────────
function parseYear(text: string): number | undefined {
  const m = text.match(/(?:19|20)\d{2}/)
  const y = m ? parseInt(m[0]) : 0
  return y >= 1980 && y <= 2030 ? y : undefined
}

function parseMedium(text: string): string | undefined {
  for (const pattern of MEDIUM_PATTERNS) {
    const match = text.match(pattern)
    if (match) return match[0].trim()
  }
  return undefined
}

function parseSize(text: string): string | undefined {
  const m = text.match(/(\d+(?:\.\d+)?)\s*(?:cm)?\s*[xX×]\s*(\d+(?:\.\d+)?)\s*(?:cm)?/i)
  return m ? `${m[1]} × ${m[2]} cm` : undefined
}

function toId(imgPath: string): string {
  return imgPath
    .replace(/^images\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[/\s]+/g, '-')
}

function findSegmentStart(text: string, segment?: string): number {
  if (!segment) return -1
  return text.toLowerCase().indexOf(segment.toLowerCase())
}

function extractDisplayTitle(rawTitle: string, medium?: string, size?: string, year?: number): string {
  const cleaned = cleanupRawTitle(rawTitle)
  let cutIndex = cleaned.length

  const mediumIndex = findSegmentStart(cleaned, medium)
  if (mediumIndex >= 0) cutIndex = Math.min(cutIndex, mediumIndex)

  if (size) {
    const sizeParts = size.match(/[\d.]+/gu)
    if (sizeParts && sizeParts.length >= 2) {
      const sizeRegex = new RegExp(
        `${sizeParts[0]}\\s*(?:cm)?\\s*[xX×]\\s*${sizeParts[1]}\\s*(?:cm)?`,
        'i',
      )
      const sizeMatch = cleaned.match(sizeRegex)
      if (sizeMatch?.index != null) cutIndex = Math.min(cutIndex, sizeMatch.index)
    }
  }

  if (year) {
    const yearRegex = new RegExp(String(year))
    const yearMatch = cleaned.match(yearRegex)
    if (yearMatch?.index != null) cutIndex = Math.min(cutIndex, yearMatch.index)
  }

  let title = cleaned.slice(0, cutIndex)
  title = title
    .replace(/(?:,?\s*(?:천에\s*먹|천에먹|아크릴|캔버스에\s*아크릴|종이에\s*먹|한지에\s*먹|화선지에\s*먹|장지에\s*먹))+$/iu, '')
    .replace(/[\s,._-]+$/u, '')
    .replace(/\.+$/u, '')
    .trim()

  return title || cleaned
}

// ── featured-works.json 매핑 ─────────────────────────────────
interface FeaturedItem {
  id: string; title_ko: string; title_en: string
  year: string; medium: string; size: string; image: string
}
interface FeaturedData {
  hero: FeaturedItem
  selected_works: FeaturedItem[]
}

const fd = featuredData as FeaturedData
const featuredMap = new Map<string, FeaturedItem>()
featuredMap.set(fd.hero.image, fd.hero)
fd.selected_works.forEach(sw => featuredMap.set(sw.image, sw))

// ── 정규화 ───────────────────────────────────────────────────
interface RawItem { title: string; image: string; category: string }

const normalized: Artwork[] = (rawData as RawItem[])
  .filter(item => !isExcluded(item.image))
  .map(item => {
    const feat = featuredMap.get(item.image)
    const cat  = item.category as ArtworkCategory
    const cleanedRaw = cleanupRawTitle(item.title)
    const rawYear = feat?.year ? parseInt(feat.year, 10) : parseYear(cleanedRaw)
    const year = rawYear && !Number.isNaN(rawYear) ? rawYear : undefined
    const medium = feat?.medium || parseMedium(cleanedRaw)
    const size = feat?.size || parseSize(cleanedRaw)
    const displayTitle = feat?.title_en || extractDisplayTitle(item.title, medium, size, year)

    return {
      id:          toId(item.image),
      titleEn:     displayTitle,
      titleKr:     feat?.title_ko ?? displayTitle,
      year,
      medium,
      size,
      imageSrc:    item.image,
      category:    cat,
      featured:    featuredMap.has(item.image),
      colorTags:   CAT_COLORS[cat] ?? [],
      series:      cat,   // deprecated compat
      sourceTitle: item.title,
    }
  })

// hero 이미지를 ARTWORKS / FEATURED 최앞으로 정렬
const heroImg = fd.hero.image
export const ARTWORKS: Artwork[] = [
  ...normalized.filter(a => a.imageSrc === heroImg),
  ...normalized.filter(a => a.imageSrc !== heroImg),
]

export const FEATURED = ARTWORKS.filter(a => a.featured)

export const BY_CATEGORY = (cat: ArtworkCategory): Artwork[] =>
  ARTWORKS.filter(a => a.category === cat)

// deprecated — use BY_CATEGORY
export const BY_SERIES = (series: string): Artwork[] =>
  ARTWORKS.filter(a => a.series === series)
