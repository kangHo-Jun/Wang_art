import{a as e,n as t,r as n,t as r}from"./animation-BcWoOSwW.js";function i(){r(),a(),n(e),o()}function a(){let t=document.getElementById(`selectedWorksGrid`);if(!t)return;let n=(document.body.dataset.assetBase??`.`).replace(/\/$/,``);t.innerHTML=``,t.removeAttribute(`aria-busy`),e.forEach(e=>{let r=document.createElement(`article`);r.className=`selected-work-card`,r.setAttribute(`role`,`listitem`),r.dataset.artworkId=e.id,r.innerHTML=`
      <div class="selected-work-media">
        <img
          src="${n}/${e.imageSrc}"
          alt="${e.titleEn}"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="selected-work-label">
        <p class="selected-work-title">${e.titleKr}</p>
        <p class="selected-work-meta">${e.year} · ${e.mediumKr}</p>
      </div>
    `,t.appendChild(r)})}function o(){if(!e.length)return;let n=(document.body.dataset.assetBase??`.`).replace(/\/$/,``),r=document.getElementById(`heroFeatureImage`),i=document.getElementById(`heroTitleEn`),a=document.getElementById(`heroYear`),o=document.getElementById(`heroMedium`),s=document.getElementById(`heroSize`);if(!r)return;let c=0,l;function u(l){c=(l+e.length)%e.length;let u=e[c];r.style.opacity=`0`,setTimeout(()=>{r.src=`${n}/${u.imageSrc}`,r.alt=`${u.titleEn}, ${u.year}, ${u.mediumKr}, ${u.size}`,i&&(i.textContent=u.titleEn),a&&(a.textContent=String(u.year)),o&&(o.textContent=u.medium),s&&(s.textContent=u.size),r.style.opacity=`1`,t(r),d()},600)}function d(){document.querySelectorAll(`.hero-slide-dot`).forEach((e,t)=>{e.classList.toggle(`active`,t===c)})}function f(){clearTimeout(l),l=setTimeout(()=>{u(c+1),f()},5e3)}u(0),f();let p=document.getElementById(`hero`);p?.addEventListener(`mouseenter`,()=>clearTimeout(l)),p?.addEventListener(`mouseleave`,f)}export{i as initHome};