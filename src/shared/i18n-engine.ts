import { I18N } from '../data/i18n'
import type { Lang } from '../types'

export function getLang(): Lang {
  return (localStorage.getItem('lang') as Lang) || 'ko'
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
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!
    const text = I18N[key]?.[lang]
    if (text) el.textContent = text
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
