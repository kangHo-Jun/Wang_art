export function initCursor(): void {
  // 데스크탑만 적용
  if (window.matchMedia('(pointer: coarse)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // 커서 DOM 생성
  const cursor = document.createElement('div')
  cursor.className = 'custom-cursor'
  cursor.innerHTML = `<span class="custom-cursor-label">VIEW</span>`
  document.body.appendChild(cursor)

  let mouseX = 0, mouseY = 0
  let cursorX = 0, cursorY = 0
  let isVisible = false

  // 마우스 위치 추적
  document.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Lerp 관성 루프
  function lerp(a: number, b: number, n: number): number {
    return a + (b - a) * n
  }

  function loop() {
    cursorX = lerp(cursorX, mouseX, 0.12)
    cursorY = lerp(cursorY, mouseY, 0.12)
    cursor.style.transform =
      `translate(${cursorX - 28}px, ${cursorY - 28}px)`
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)

  // 갤러리 영역 진입 시 커서 표시
  document.addEventListener('mouseover', (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(
      '.asym-card, .selected-work-card, .work-card'
    )
    if (target && !isVisible) {
      cursor.classList.add('visible')
      document.body.classList.add('hide-cursor')
      isVisible = true
    } else if (!target && isVisible) {
      cursor.classList.remove('visible')
      document.body.classList.remove('hide-cursor')
      isVisible = false
    }
  })

  // 클릭 시 커서 축소 효과
  document.addEventListener('mousedown', () => cursor.classList.add('pressed'))
  document.addEventListener('mouseup',   () => cursor.classList.remove('pressed'))
}
