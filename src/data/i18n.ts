import type { I18nMap } from '../types'

export const I18N: I18nMap = {
  // ── 네비게이션 ──
  'nav.home':        { ko: '대표작품', en: 'Selected Works', ja: '代表作品', zh: '代表作品' },
  'nav.works':       { ko: '작품',     en: 'Works',          ja: '作品',     zh: '作品'     },
  'nav.worlds':      { ko: '작품세계', en: 'Work Worlds',    ja: '作品世界', zh: '作品世界' },
  'nav.artist':      { ko: '작가',     en: 'Artist',         ja: '作家',     zh: '艺术家'   },
  'nav.collections': { ko: '소장처',   en: 'Collections',    ja: 'コレクション', zh: '收藏' },

  // ── 히어로 ──
  'hero.scroll':     { ko: 'Scroll', en: 'Scroll', ja: 'スクロール', zh: '滚动' },
  'hero.link':       { ko: 'Selected Works', en: 'Selected Works', ja: '代表作品', zh: '代表作品' },

  // ── 섹션 제목 ──
  'section.works.en':       { ko: 'SELECTED WORKS', en: 'SELECTED WORKS', ja: 'SELECTED WORKS', zh: 'SELECTED WORKS' },
  'section.works.kr':       { ko: '대표작품', en: '대표작품', ja: '代表作品', zh: '代表作品' },
  'section.works.desc':     { ko: '대표작 12점을 통해 왕열의 화면과 리듬을 먼저 감상합니다.', en: "Explore twelve representative works to experience the rhythm of Wang Yeul's surfaces.", ja: '12点の代表作を通じて王烈の画面とリズムを鑑賞します。', zh: '通过12件代表作品，欣赏王烈的画面与节奏。' },
  'section.worlds.en':      { ko: 'WORK WORLDS', en: 'WORK WORLDS', ja: 'WORK WORLDS', zh: 'WORK WORLDS' },
  'section.worlds.kr':      { ko: '작품세계', en: '작품세계', ja: '作品世界', zh: '作品世界' },
  'section.artist.en':      { ko: 'ARTIST', en: 'ARTIST', ja: 'ARTIST', zh: 'ARTIST' },
  'section.artist.kr':      { ko: '작가', en: '작가', ja: '作家', zh: '艺术家' },
  'section.collections.en': { ko: 'COLLECTIONS', en: 'COLLECTIONS', ja: 'COLLECTIONS', zh: 'COLLECTIONS' },
  'section.collections.kr': { ko: '소장처', en: '소장처', ja: 'コレクション', zh: '收藏' },

  // ── Glass 뷰어 ──
  'viewer.kicker':     { ko: 'Wang Yeul · 王烈', en: 'Wang Yeul · 王烈', ja: 'Wang Yeul · 王烈', zh: 'Wang Yeul · 王烈' },
  'viewer.year':       { ko: '연도', en: 'Year',   ja: '年',   zh: '年份' },
  'viewer.medium':     { ko: '재료', en: 'Medium', ja: '素材', zh: '材质' },
  'viewer.size':       { ko: '크기', en: 'Size',   ja: 'サイズ', zh: '尺寸' },
  'viewer.collection': { ko: '소장', en: 'Collection', ja: '所蔵', zh: '收藏' },
  'viewer.prev':       { ko: 'Prev', en: 'Prev', ja: '前', zh: '上一件' },
  'viewer.next':       { ko: 'Next', en: 'Next', ja: '次', zh: '下一件' },
  'viewer.close':      { ko: '닫기', en: 'Close', ja: '閉じる', zh: '关闭' },

  // ── 소장처 ──
  'collections.cta':   { ko: '소장처와 문의 보기', en: 'View Collections & Inquiries', ja: 'コレクションとお問い合わせ', zh: '查看收藏与联系方式' },

  // ── 푸터 ──
  'footer.copy':       { ko: '© 2026 Wang Yeul. All rights reserved.', en: '© 2026 Wang Yeul. All rights reserved.', ja: '© 2026 Wang Yeul. All rights reserved.', zh: '© 2026 Wang Yeul. All rights reserved.' },
  'footer.note':       { ko: '현대 한국화가 · 단국대학교 예술대학 동양화과 교수 역임', en: 'Contemporary Korean Painter · Former Professor, Dankook University', ja: '現代韓国画家 · 檀国大学校芸術学部東洋画科元教授', zh: '当代韩国画家 · 前檀国大学艺术学院东洋画系教授' },

  // ── Newsletter UI ──
  'subscribe.title': {
    ko: '새로운 작품과 전시 소식을 받아보세요',
    en: 'Sign up to receive updates on new works and exhibitions',
    ja: '新作と展示のお知らせを受け取りましょう',
    zh: '订阅以接收新作与展览消息',
  },
  'subscribe.sub': {
    ko: '구독 취소 언제든 가능 · 이메일은 공개되지 않습니다',
    en: 'Unsubscribe anytime · Your email remains private',
    ja: 'いつでも配信停止可能 · メールアドレスは公開されません',
    zh: '可随时取消订阅 · 您的邮箱不会被公开',
  },
  'subscribe.placeholder': {
    ko: '이메일 주소',
    en: 'Enter your email',
    ja: 'メールアドレス',
    zh: '电子邮箱地址',
  },
  'subscribe.aria': {
    ko: '이메일 주소',
    en: 'Enter your email',
    ja: 'メールアドレス',
    zh: '电子邮箱地址',
  },
  'subscribe.btn': {
    ko: '구독',
    en: 'Subscribe',
    ja: '購読',
    zh: '订阅',
  },
  'subscribe.pending': {
    ko: '준비 중입니다.',
    en: 'Coming soon.',
    ja: '準備中です。',
    zh: '正在准备中。',
  },
  'subscribe.invalid': {
    ko: '올바른 이메일 주소를 입력해 주세요.',
    en: 'Please enter a valid email address.',
    ja: '有効なメールアドレスを入力してください。',
    zh: '请输入有效的电子邮箱地址。',
  },
}
