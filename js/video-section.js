'use strict';

(function initVideoSection() {
  const section = document.getElementById('video');
  const grid = document.getElementById('video-grid');
  const lightbox = document.getElementById('videoLightbox');
  const frame = document.getElementById('videoLightboxFrame');
  const close = document.getElementById('videoLightboxClose');
  const title = document.getElementById('videoLightboxTitle');
  const note = document.getElementById('videoLightboxNote');
  const link = document.getElementById('videoLightboxLink');
  if (!section || !grid) return;

  const assetBase = (document.body?.dataset?.assetBase || '.').replace(/\/$/, '');

  function assetPath(path) {
    const value = String(path || '').trim();
    if (!value) return '';
    if (/^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('#')) {
      return value;
    }
    const normalized = value.replace(/^\.?\//, '');
    if (!assetBase || assetBase === '.') return normalized;
    return `${assetBase}/${normalized}`;
  }

  function hideVideoSection() {
    section.hidden = true;
  }

  function showVideoSection() {
    section.hidden = false;
  }

  function getYoutubeThumbById(id) {
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
  }

  function getYoutubeWatchUrl(id) {
    return id ? `https://youtu.be/${id}` : '';
  }

  function getYoutubeEmbedUrl(id) {
    return id ? `https://www.youtube.com/embed/${id}` : '';
  }

  function esc(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function buildVideoCard(v) {
    const thumb = getYoutubeThumbById(v.youtubeId);
    const titleKo = v.title_ko || '작업 과정 영상';
    const titleEn = v.title_en || 'Process Film';
    const desc = v.description || '';

    return `
      <div class="video-card fade-up visible">
        <button class="video-thumb-wrap" type="button"
          data-video-id="${esc(v.youtubeId || '')}"
          data-video-title="${esc(titleKo)}"
          data-video-desc="${esc(desc)}">
          <img src="${esc(thumb)}" alt="${esc(titleKo)}" loading="lazy">
          <div class="video-play-btn" aria-hidden="true">
            <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M66.52 7.74C65.7 4.62 63.27 2.2 60.15 1.38 54.9 0 34 0 34 0S13.1 0 7.85 1.38C4.73 2.2 2.3 4.62 1.48 7.74 0 13 0 24 0 24s0 11 1.48 16.26c.82 3.12 3.25 5.54 6.37 6.36C13.1 48 34 48 34 48s20.9 0 26.15-1.38c3.12-.82 5.55-3.24 6.37-6.36C68 35 68 24 68 24s0-11-1.48-16.26z" fill="rgba(0,0,0,0.7)"/>
              <path d="M45 24L27 14v20z" fill="#fff"/>
            </svg>
          </div>
        </button>
        <div class="video-card-body">
          <p class="video-card-kicker">${esc(titleEn)}</p>
          <p class="video-card-title">${esc(titleKo)}</p>
          <p class="video-card-desc">${esc(desc)}</p>
          <a class="video-card-link" href="${esc(getYoutubeWatchUrl(v.youtubeId))}" target="_blank" rel="noopener noreferrer">YouTube에서 보기</a>
        </div>
      </div>`;
  }

  function attachVideoLightbox() {
    if (!lightbox || !frame || !close || !title || !note || !link) return;

    function closeVideoLightbox() {
      lightbox.hidden = true;
      frame.src = '';
      document.body.style.overflow = '';
    }

    grid.querySelectorAll('.video-thumb-wrap[data-video-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const youtubeId = btn.getAttribute('data-video-id');
        if (!youtubeId) return;
        title.textContent = btn.getAttribute('data-video-title') || '작업 과정 영상';
        note.textContent = btn.getAttribute('data-video-desc') || '';
        frame.src = getYoutubeEmbedUrl(youtubeId);
        link.href = getYoutubeWatchUrl(youtubeId);
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });

    close.addEventListener('click', closeVideoLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeVideoLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) closeVideoLightbox();
    });
  }

  async function loadVideos() {
    try {
      const res = await fetch(assetPath('data/videos.json') + '?_t=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error('video response ' + res.status);
      const json = await res.json();
      const data = Array.isArray(json) ? json : [];
      const featured = data.find((item) => item.display === 'featured') || data[0];
      if (!featured) throw new Error('no featured video');
      showVideoSection();
      grid.innerHTML = buildVideoCard(featured);
      attachVideoLightbox();
    } catch (error) {
      hideVideoSection();
      console.warn('[video-section] 로드 실패', error);
    }
  }

  loadVideos();
})();
