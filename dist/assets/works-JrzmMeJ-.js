import{i as e,r as t,t as n}from"./animation-BcWoOSwW.js";function r(e){let t=e.imageSrc.split(`/`);return t[t.length-2]??``}var i={all:`all`,ink:`ink`,gold:`2026`,red:`red`,blue:`blue`},a=[[1,6,1,3],[6,9,1,2],[9,13,1,2],[6,10,2,4],[10,13,2,3],[1,4,3,4],[4,6,3,4],[10,13,3,4]];function o(){n();let r=(document.body.dataset.assetBase??`.`).replace(/\/$/,``);t(e),s(e,r),c(),l(`all`)}function s(e,t){let n=document.getElementById(`worksGrid`);n&&(n.innerHTML=``,n.className=`works-asym-grid`,e.forEach((e,i)=>{let o=a[i%a.length],s=document.createElement(`div`);s.className=`asym-card`,s.setAttribute(`role`,`listitem`),s.setAttribute(`tabindex`,`0`),s.setAttribute(`aria-label`,`${e.titleKr}, ${e.year}`),s.dataset.artworkId=e.id,s.dataset.folder=r(e),s.style.gridColumn=`${o[0]} / ${o[1]}`,s.style.animationDelay=`${i*.07}s`,s.innerHTML=`
      <div class="asym-img-wrap">
        <img
          class="asym-img"
          src="${t}/${e.imageSrc}"
          alt="${e.titleEn}, ${e.year}, ${e.mediumKr}, ${e.size}"
          loading="${i<4?`eager`:`lazy`}"
          decoding="async"
        />
      </div>
      <div class="asym-card-body">
        <div class="asym-card-left">
          <p class="asym-title">${e.titleEn}</p>
          <p class="asym-title-kr">${e.titleKr}</p>
        </div>
        <div class="asym-card-right">
          <span class="asym-tag">${e.year}</span>
          <span class="asym-tag">${e.series}</span>
        </div>
      </div>
    `,s.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&s.click()}),n.appendChild(s)}))}function c(){let e=document.getElementById(`colorFilter`);e&&e.addEventListener(`click`,t=>{let n=t.target.closest(`.color-btn`);n&&(e.querySelectorAll(`.color-btn`).forEach(e=>{e.classList.remove(`active`),e.setAttribute(`aria-pressed`,`false`)}),n.classList.add(`active`),n.setAttribute(`aria-pressed`,`true`),l(n.dataset.filter??`all`))})}function l(e){let t=i[e]??`all`;document.querySelectorAll(`.asym-card`).forEach(e=>{let n=e.dataset.folder??``,r=t===`all`||n===t;e.classList.remove(`dimmed`,`visible`),e.classList.add(r?`visible`:`dimmed`)})}export{o as initWorks};