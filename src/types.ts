// ─── 작품 ───────────────────────────────────────
export interface Artwork {
  id: string
  titleEn: string
  titleKr: string
  year: number
  medium: string
  mediumKr: string
  size: string
  collection: string
  collectionKr: string
  note: string
  noteKr: string
  imageSrc: string
  featured: boolean
  series: ArtworkSeries
  colorTags: ColorTag[]
}

export type ArtworkSeries = 'utopia' | 'ink' | 'acrylic' | 'horse' | 'landscape'
export type ColorTag = 'ink' | 'gold' | 'red' | 'blue' | 'cream'

// ─── 작품세계 ─────────────────────────────────────
export interface WorldItem {
  id: string
  titleEn: string
  titleKr: string
  descKr: string
  descEn: string
  imageSrc: string
  keywords: string[]
}

// ─── 소장처 ───────────────────────────────────────
export interface Collection {
  id: string
  nameKr: string
  nameEn: string
  city: string
  country: string
  type: 'museum' | 'gallery' | 'university' | 'government'
}

// ─── 다국어 ───────────────────────────────────────
export type Lang = 'ko' | 'en' | 'ja' | 'zh'
export type I18nMap = Record<string, Record<Lang, string>>

// ─── 페이지 ───────────────────────────────────────
export type PageId = 'home' | 'works' | 'worlds' | 'artist' | 'collections'
