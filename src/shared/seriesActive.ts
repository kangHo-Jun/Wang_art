/**
 * container 안의 [data-series] 요소들에 active 클래스와 aria-current를 적용한다.
 */
export function applySeriesActive(container: Element, slug: string): void {
  container.querySelectorAll<HTMLElement>('[data-series]').forEach(el => {
    const isActive = el.dataset.series === slug
    el.classList.toggle('active', isActive)
    if (isActive) {
      el.setAttribute('aria-current', 'true')
    } else {
      el.removeAttribute('aria-current')
    }
  })
}
