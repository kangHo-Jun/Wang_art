import{i as e,t}from"./works-DlmClJgI.js";import{n,t as r}from"./viewer-DSijXQes.js";function i(e){let t=e.imageSrc.split(`/`);return t[t.length-2]??``}var a={all:`all`,ink:`ink`,gold:`2026`,red:`red`,blue:`blue`},o=[[1,6,1,3],[6,9,1,2],[9,13,1,2],[6,10,2,4],[10,13,2,3],[1,4,3,4],[4,6,3,4],[10,13,3,4]];function s(){t(),r(n),c(n),u(),l()}function c(t){let n=document.getElementById(`worksGrid`);if(!n)return;n.innerHTML=``,n.className=`works-asym-grid`;let r=`/Wang_art/`.replace(/\/$/,``);t.forEach((e,t)=>{let a=o[t%o.length],s=Math.floor(t/o.length)*3,c=document.createElement(`div`);c.className=`asym-card`,c.setAttribute(`role`,`listitem`),c.setAttribute(`tabindex`,`0`),c.setAttribute(`aria-label`,`${e.titleKr}, ${e.year}`),c.dataset.artworkId=e.id,c.dataset.folder=i(e),c.style.gridColumn=`${a[0]} / ${a[1]}`,c.style.gridRow=`${a[2]+s} / ${a[3]+s}`,c.innerHTML=`
      <div class="asym-img-wrap">
        <img
          class="asym-img"
          src="${r}/${e.imageSrc}"
          alt="${e.titleEn}, ${e.year}, ${e.mediumKr}, ${e.size}"
          loading="${t<4?`eager`:`lazy`}"
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
    `,c.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&c.click()}),n.appendChild(c)}),e.fromTo(`.asym-card`,{opacity:0,y:20},{opacity:1,y:0,duration:.7,ease:`power3.out`,stagger:.06})}function l(){let t=document.getElementById(`worksGrid`);t&&(t.addEventListener(`mouseenter`,()=>{}),t.addEventListener(`mouseleave`,()=>{e.to(`.asym-card`,{opacity:1,duration:.35,ease:`power2.out`})}),document.addEventListener(`mouseover`,t=>{let n=t.target.closest(`.asym-card`);n&&(e.to(`.asym-card`,{opacity:.15,duration:.3,ease:`power2.out`}),e.to(n,{opacity:1,duration:.3,ease:`power2.out`}))}))}function u(){let t=document.getElementById(`colorFilter`);t&&t.addEventListener(`click`,n=>{let r=n.target.closest(`.color-btn`);if(!r)return;t.querySelectorAll(`.color-btn`).forEach(e=>e.classList.remove(`active`)),r.classList.add(`active`);let i=a[r.dataset.filter??`all`]??`all`;document.querySelectorAll(`.asym-card`).forEach(t=>{let n=i===`all`||t.dataset.folder===i;e.to(t,{opacity:n?1:.08,duration:.4,ease:`power2.out`,pointerEvents:n?`auto`:`none`})})})}export{s as initWorks};