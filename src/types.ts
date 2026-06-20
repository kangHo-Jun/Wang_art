// ─── 작품 카테고리 ────────────────────────────────
export type ArtworkCategory = '2jung' | '2026' | 'blue' | 'ink' | 'red'

// deprecated aliases
export type ArtworkSeries = ArtworkCategory
export type ColorTag = 'ink' | 'gold' | 'red' | 'blue' | 'cream'

// ─── 작품 ───────────────────────────────────────
export interface Artwork {
  id:            string
  titleEn:       string
  titleKr:       string
  year?:         number
  medium?:       string
  mediumKr?:     string
  size?:         string
  collection?:   string
  collectionKr?: string
  note?:         string
  noteKr?:       string
  imageSrc:      string
  category:      ArtworkCategory
  featured:      boolean
  colorTags:     string[]
  series?:       string   // deprecated compat: equals category
  sourceTitle:   string
}

// ─── 작품세계 (레거시) ────────────────────────────────
export interface WorldItem {
  id: string
  titleEn: string
  titleKr: string
  descKr: string
  descEn: string
  imageSrc: string
  keywords: string[]
}

// ─── 작품세계 8-Scene ──────────────────────────────
export type WorldLayout =
  | 'full'
  | 'side-img-text'
  | 'side-text-img'
  | 'centered'
  | 'pair'
  | 'video'

export interface WorldPanelItem {
  imageSrc:  string
  artworkId: string
  titleKr:   string
  size:      string
  year:      number
}

export interface WorldScene {
  id:          string
  scene:       number
  layout:      WorldLayout
  themeKr:     string
  titleKr?:    string
  imageSrc?:   string
  artworkId?:  string
  medium?:     string
  size?:       string
  year?:       number
  body?:       string
  cta:         boolean
  textRight?:  boolean
  imgMaxWidth?: number
  pair?:       { left: WorldPanelItem; right: WorldPanelItem }
  youtubeId?:  string
  anchorId?:   string
}

// ─── 다국어 ───────────────────────────────────────
export type Lang = 'ko' | 'en' | 'ja' | 'zh'
export type I18nMap = Record<string, Record<Lang, string>>

// ─── 페이지 ───────────────────────────────────────
export type PageId = 'home' | 'works' | 'worlds' | 'artist' | 'collections' | 'contact'
