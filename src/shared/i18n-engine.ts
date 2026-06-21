import { I18N } from '../data/i18n'
import type { Lang } from '../types'

const SUPPORTED_LANGS: Lang[] = ['ko', 'en', 'ja', 'zh']

function isSupportedLang(value: string | null): value is Lang {
  return !!value && SUPPORTED_LANGS.includes(value as Lang)
}

function normalizeLang(locale?: string | null): Lang {
  const base = locale?.toLowerCase().split(/[-_]/u)[0] ?? ''
  if (base === 'ko') return 'ko'
  if (base === 'ja') return 'ja'
  if (base === 'zh') return 'zh'
  return 'en'
}

function detectBrowserLang(): Lang {
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const locale of languages) {
    const normalized = normalizeLang(locale)
    if (SUPPORTED_LANGS.includes(normalized)) return normalized
  }
  return 'en'
}

export function getLang(): Lang {
  const stored = localStorage.getItem('lang')
  if (isSupportedLang(stored)) return stored
  return detectBrowserLang()
}

export function setLang(lang: Lang): void {
  localStorage.setItem('lang', lang)
  applyLang(lang)
}

export function t(key: string): string {
  const lang = getLang()
  return I18N[key]?.[lang] ?? key
}

export function applyLang(lang: Lang): void {
  document.documentElement.lang = lang

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!
    const text = I18N[key]?.[lang]
    if (text) el.textContent = text
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder!
    const text = I18N[key]?.[lang]
    if (text && 'placeholder' in el) {
      ;(el as HTMLInputElement).placeholder = text
    }
  })

  document.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach(el => {
    const key = el.dataset.i18nAriaLabel!
    const text = I18N[key]?.[lang]
    if (text) el.setAttribute('aria-label', text)
  })

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang)
  })
}

export function initI18n(): void {
  const lang = getLang()
  applyLang(lang)

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const l = btn.dataset.lang as Lang
      if (l) setLang(l)
    })
  })
}
