import{n as e,t}from"./works-DlmClJgI.js";import{r as n,t as r}from"./viewer-DSijXQes.js";function i(){t(),a(),r(n),o()}function a(){let e=document.getElementById(`selectedWorksGrid`);if(!e)return;let t=(document.body.dataset.assetBase??`.`).replace(/\/$/,``);e.innerHTML=``,e.removeAttribute(`aria-busy`),n.forEach(n=>{let r=document.createElement(`article`);r.className=`selected-work-card`,r.setAttribute(`role`,`listitem`),r.dataset.artworkId=n.id,r.innerHTML=`
      <div class="selected-work-media">
        <img
          src="${t}/${n.imageSrc}"
          alt="${n.titleEn}"
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="selected-work-label">
        <p class="selected-work-title">${n.titleKr}</p>
        <p class="selected-work-meta">${n.year} · ${n.mediumKr}</p>
      </div>
    `,e.appendChild(r)})}function o(){if(!n.length)return;let t=(document.body.dataset.assetBase??`.`).replace(/\/$/,``),r=document.getElementById(`heroFeatureImage`),i=document.getElementById(`heroTitleEn`),a=document.getElementById(`heroYear`),o=document.getElementById(`heroMedium`),s=document.getElementById(`heroSize`);if(!r)return;let c=0,l;function u(l){c=(l+n.length)%n.length;let u=n[c];r.style.opacity=`0`,setTimeout(()=>{r.src=`${t}/${u.imageSrc}`,r.alt=`${u.titleEn}, ${u.year}, ${u.mediumKr}, ${u.size}`,i&&(i.textContent=u.titleEn),a&&(a.textContent=String(u.year)),o&&(o.textContent=u.medium),s&&(s.textContent=u.size),r.style.opacity=`1`,e(r),d()},600)}function d(){document.querySelectorAll(`.hero-slide-dot`).forEach((e,t)=>{e.classList.toggle(`active`,t===c)})}function f(){clearTimeout(l),l=setTimeout(()=>{u(c+1),f()},5e3)}u(0),f();let p=document.getElementById(`hero`);p?.addEventListener(`mouseenter`,()=>clearTimeout(l)),p?.addEventListener(`mouseleave`,f)}export{i as initHome};