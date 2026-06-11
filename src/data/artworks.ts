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
  const m = text.match(
    /Ink[\s-]+stick\s+and\s+Acrylic\s+on\s+(?:Canvas|Korean\s+paper|canvas|paper)|Acrylic\s+on\s+canvas|Oil\s+and\s+Acrylic\s+on\s+[^,._\d]+/i
  )
  return m ? m[0].trim() : undefined
}

function parseSize(text: string): string | undefined {
  const m = text.match(/(\d+(?:\.\d+)?)\s*[xX×]\s*(\d+(?:\.\d+)?)\s*cm/i)
  return m ? `${m[1]} × ${m[2]} cm` : undefined
}

function toId(imgPath: string): string {
  return imgPath
    .replace(/^images\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[/\s]+/g, '-')
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
    const rawYear = feat?.year ? parseInt(feat.year, 10) : parseYear(item.title)
    const year = rawYear && !Number.isNaN(rawYear) ? rawYear : undefined
    return {
      id:          toId(item.image),
      titleEn:     feat?.title_en ?? item.title,
      titleKr:     feat?.title_ko ?? item.title,
      year,
      medium:      feat?.medium   || parseMedium(item.title),
      size:        feat?.size     || parseSize(item.title),
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
