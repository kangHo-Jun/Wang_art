import{r as e,t}from"./main-LfjI2Djb.js";var n=`왕열 Wang Yeul`,r=`b. 1960 · 한국화 Korean Painting · 미술 교과서 등재`,i=`
  1960년 출생. <span class="text-span-bold">단국대학교 예술대학 교수 역임(1994–2020)</span>했으며, 서울을 기반으로 작업하고 있다.
  그의 작품은 <span class="text-span-bold">중·고등학교 미술 교과서에 등재</span>되어 한국 현대미술의 한 위치를 점하고 있다.
`,a=`
  전통 수묵의 정신을 현대 회화의 언어로 확장하며, 무릉도원이라는 역설을 평생의 주제로 그려왔다.
  그의 화면에서 산수와 말, 새와 색은 단순한 소재가 아니라 인간이 머물고자 하는 내면의 장소를 향한 상징으로 작동한다.
`,o=`ARTIST FILM`,s=`작업과 작품세계를 말하는 왕열 작가`,c=`https://www.youtube.com/watch?v=n0ndsSXbIDg`,l=`https://www.youtube.com/embed/n0ndsSXbIDg?autoplay=1&rel=0`,u=`/images/artist/wang-yeul-film-thumb.jpg`,d=[`홍익대학교 미술대학 및 대학원 동양화과 졸업`,`홍익대학교 대학원 미술학 박사`,`남대전고등학교 졸업`],f=[`<span class="resume-year">2026</span><span class="resume-detail"><span class="text-span-bold">개인전 87회</span> — 한국·중국·일본·독일·미국·프랑스 등</span>`,`<span class="resume-year"></span><span class="resume-detail">단체전 600여 회 참여</span>`,`<span class="resume-year">1994–2020</span><span class="resume-detail"><span class="text-span-bold">단국대학교 예술대학 교수 역임</span></span>`,`<span class="resume-year"></span><span class="resume-detail">대한민국미술대전 심사위원 역임</span>`],p=[`한국미술평론가협회 작가상 — 한국미술평론가협회`,`동아미술제 동아미술상 — 동아일보사`,`한국미술작가대상 — 한국미술작가대상 운영위원회`,`대한민국미술대전 특선 3회`],m=[`국립현대미술관`,`경기도미술관`,`대전시립미술관`,`천안시립미술관`,`성곡미술관`,`성남아트센터`,`워커힐 미술관`],h=[`청와대`,`홍익대학교 현대미술관`,`고려대학교 박물관`,`한국은행 · 한국해외홍보처`,`한국종합예술학교`,`갤러리 상 · 호텔프리마`,`천안시청 · 한남더힐 등`];function g(){t(),_(),v(),x()}function _(){let e=document.getElementById(`artistBody`);if(!e)return;let t=`/Wang_art/`.replace(/\/$/,``);e.innerHTML=`
    <section class="resume-shell">
      <section class="resume-top">
        <div class="resume-top-copy">
          <div class="resume-text resume-text--name">${n}</div>
          <div class="resume-text resume-text--meta">${r}</div>
          <div class="resume-category resume-category--intro">작가</div>
          <div class="resume-text resume-text--lead">${i}</div>
          <div class="resume-text resume-text--lead resume-text--lead-secondary">${a}</div>
        </div>
        <figure class="resume-photo">
          <img
            src="${t}/images/artist/wang-yeul-studio.jpg"
            alt="작업실에서 붓을 들고 있는 왕열 작가"
            class="resume-photo-image"
            loading="eager"
            decoding="async"
          />
          <figcaption class="resume-photo-caption">작업실의 왕열</figcaption>
        </figure>
      </section>

      <section class="resume-section artist-film-section">
        <h2 class="resume-category">${o}</h2>
        <div class="artist-film-card">
          <button
            type="button"
            class="artist-film-trigger"
            id="artistFilmTrigger"
            aria-label="왕열 작가 소개 영상 재생"
            aria-haspopup="dialog"
            aria-controls="artistFilmOverlay"
          >
            <span class="artist-film-thumb">
              <img
                src="${t}${u}"
                alt=""
                class="artist-film-thumb-image"
                loading="lazy"
                decoding="async"
              />
              <span class="artist-film-play" aria-hidden="true"></span>
            </span>
          </button>
          <div class="artist-film-copy">
            <p class="resume-text artist-film-description">${s}</p>
            <a
              href="${c}"
              target="_blank"
              rel="noreferrer"
              class="artist-film-link"
            >
              YouTube에서 보기 ↗
            </a>
          </div>
        </div>
      </section>

      ${y(`Education`,d)}
      ${y(`Exhibitions & Career`,f,!0)}
      ${y(`Awards`,p)}

      <section class="collections-section">
        <h2 class="resume-category">Public & Institutional Collections</h2>
        <div class="collections-grid">
          ${b(`Public Museums`,m)}
          ${b(`Institutional & Corporate`,h)}
        </div>
      </section>
    </section>

    <div
      class="artist-film-overlay"
      id="artistFilmOverlay"
      hidden
      role="dialog"
      aria-modal="true"
      aria-labelledby="artistFilmOverlayTitle"
    >
      <div class="artist-film-backdrop" data-film-close="true"></div>
      <div class="artist-film-dialog" tabindex="-1">
        <button type="button" class="artist-film-close" id="artistFilmClose">
          Close
        </button>
        <div class="artist-film-frame-wrap">
          <div class="artist-film-frame" id="artistFilmFrame"></div>
        </div>
        <p class="resume-text artist-film-caption" id="artistFilmOverlayTitle">
          ${s}
        </p>
      </div>
    </div>
  `}function v(){let e=document.getElementById(`artistFilmOverlay`),t=document.getElementById(`artistFilmTrigger`),n=document.getElementById(`artistFilmClose`),r=document.getElementById(`artistFilmFrame`);if(!e||!t||!n||!r)return;let i=e,a=t,o=n,s=r,c=null;function u(){s.innerHTML=`
      <iframe
        src="${l}"
        title="왕열 작가 소개 영상"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    `}function d(){s.innerHTML=``}function f(){return Array.from(i.querySelectorAll(`button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])`))}function p(){c=document.activeElement instanceof HTMLElement?document.activeElement:a,i.hidden=!1,i.classList.add(`is-open`),document.body.classList.add(`artist-film-open`),u(),o.focus()}function m(){i.classList.remove(`is-open`),i.hidden=!0,document.body.classList.remove(`artist-film-open`),d(),c?.focus()}a.addEventListener(`click`,p),o.addEventListener(`click`,m),i.addEventListener(`click`,e=>{e.target.dataset.filmClose===`true`&&m()}),i.addEventListener(`keydown`,e=>{if(e.key===`Escape`){e.preventDefault(),m();return}if(e.key!==`Tab`)return;let t=f();if(t.length===0)return;let n=t[0],r=t[t.length-1],i=document.activeElement;if(e.shiftKey&&i===n){e.preventDefault(),r.focus();return}!e.shiftKey&&i===r&&(e.preventDefault(),n.focus())})}function y(e,t,n=!1){return`
    <section class="resume-section">
      <h2 class="resume-category">${e}</h2>
      <div class="resume-stack${n?` resume-stack--timeline`:``}">
        ${t.map(e=>`<div class="resume-text">${e}</div>`).join(``)}
      </div>
    </section>
  `}function b(e,t){return`
    <section class="collection-block">
      <h3 class="collection-category">${e}</h3>
      <div class="collection-list">
        ${t.map(e=>`<div class="collection-item">${e}</div>`).join(``)}
      </div>
    </section>
  `}function x(){e.fromTo(`.resume-shell > *`,{opacity:0,y:16},{opacity:1,y:0,duration:.6,ease:`power3.out`,stagger:.06,delay:.2})}export{g as initArtist};