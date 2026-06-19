export function initHeader(): void {
  const page = document.body.dataset.page
  if (!page) return

  document.querySelectorAll<HTMLAnchorElement>('.navbar-link[data-nav]').forEach(a => {
    if (a.dataset.nav === page) {
      a.classList.add('is-active')
      a.setAttribute('aria-current', 'page')
    }
  })
}
