(function injectFloatNav() {
  const html = `
  <nav class="g-float-nav" id="gFloatNav" aria-label="플로팅 네비게이션">
    <a href="../" class="g-float-link" data-nav="home">대표작품</a>
    <div class="g-float-divider"></div>
    <a href="../works/" class="g-float-link" data-nav="works">작품</a>
    <div class="g-float-divider"></div>
    <a href="../worlds/" class="g-float-link" data-nav="worlds">작품세계</a>
    <div class="g-float-divider"></div>
    <a href="../artist/" class="g-float-link" data-nav="artist">작가</a>
    <div class="g-float-divider"></div>
    <a href="../collections/" class="g-float-link" data-nav="collections">소장처</a>
  </nav>`;

  document.body.insertAdjacentHTML('beforeend', html);

  const nav = document.getElementById('gFloatNav');

  // 루트(index.html)에서는 ../ → ./로 교정
  const isRoot = !location.pathname.includes('/works/')
              && !location.pathname.includes('/worlds/')
              && !location.pathname.includes('/artist/')
              && !location.pathname.includes('/collections/');
  if (isRoot) {
    nav.querySelectorAll('.g-float-link').forEach(a => {
      a.href = a.href.replace(/\.\.\/([^/]*)$/, './$1').replace(/\.\.\/$/, './');
    });
  }

  // 현재 페이지 active 표시
  const page = document.body.dataset.page;
  nav.querySelectorAll('.g-float-link').forEach(a => {
    if (a.dataset.nav === page) a.classList.add('active');
  });

  // 스크롤 방향 감지 — 아래로 스크롤 시 숨김
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY + 10)      nav.classList.add('hidden');
    else if (y < lastY - 10) nav.classList.remove('hidden');
    lastY = y;
  }, { passive: true });
})();
