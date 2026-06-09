import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger, Flip)

export { gsap, Flip }

// ── Lenis ──────────────────────────────────────────
let lenisInstance: Lenis | null = null

export function initLenis(): void {
  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  // Lenis + GSAP ScrollTrigger 연동
  lenisInstance.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

export function getLenis(): Lenis | null {
  return lenisInstance
}

// ── GSAP ScrollTrigger fade-up (IntersectionObserver 대체) ──
export function initFadeUp(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced) {
    document.querySelectorAll<HTMLElement>('.fade-up').forEach(el => {
      el.style.opacity   = '1'
      el.style.transform = 'none'
    })
    return
  }

  gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
}

// ── Ken Burns ──────────────────────────────────────
export function kenBurns(el: HTMLElement, duration = 12): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.fromTo(el,
    { scale: 1 },
    { scale: 1.04, duration, ease: 'none' }
  )
}

// ── countUp ───────────────────────────────────────
export function countUp(el: HTMLElement, target: number, duration = 1.5): void {
  gsap.to({ val: 0 }, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = String(Math.round((this as any).targets()[0].val))
    }
  })
}

// 페이지 진입 fade-in
export function initPageTransition(): void {
  gsap.fromTo(document.body,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: 'power2.out' }
  )
}

// 페이지 이탈 fade-out
export function navigateTo(url: string): void {
  gsap.to(document.body, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => { window.location.href = url }
  })
}
