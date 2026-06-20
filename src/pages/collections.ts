export function initCollections(): void {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const artistHref = `${base}/artist/`
  const container = document.getElementById('collectionsContainer')

  if (container) {
    container.innerHTML = `
      <div class="resume-shell">
        <div class="resume-text resume-text--intro">
          소장처 페이지는 작가 페이지로 통합되었습니다.
        </div>
        <a class="download" href="${artistHref}">작가 페이지로 이동</a>
      </div>
    `
  }

  window.location.replace(artistHref)
}
