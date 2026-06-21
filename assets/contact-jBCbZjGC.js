var e=`LOCATION`,t=`CONTACT`,n=[`경기도 평택시 진위면 진위2산단로 140`,`더퍼스트타워평택 830호`],r=[`Room 830, The First Tower Pyeongtaek,`,`140 Jinwi 2 Sandan-ro, Jinwi-myeon,`,`Pyeongtaek-si, Gyeonggi-do, Korea`],i=`https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%ED%8F%89%ED%83%9D%EC%8B%9C%20%EC%A7%84%EC%9C%84%EB%A9%B4%20%EC%A7%84%EC%9C%842%EC%82%B0%EB%8B%A8%EB%A1%9C%20140%20%EB%8D%94%ED%8D%BC%EC%8A%A4%ED%8A%B8%ED%83%80%EC%9B%8C%ED%8F%89%ED%83%9D%20830%ED%98%B8`,a=`https://mail.google.com/mail/?view=cm&to=wangyeul2963296@gmail.com&su=Wang%20Yeul%20Inquiry`,o=`Email`,s=`Instagram @wang_yeul`,c=`https://www.instagram.com/wang_yeul/`,l=`Newsletter`,u=`${`/Wang_art/`.replace(/\/$/,``)}/#newsletter`,d=[{id:`horse`,className:`contact-slide--horse`,src:`/images/contact/studio-horse.jpg`,alt:`흰 말 조형물이 놓인 왕열 작업실`},{id:`studio`,className:`contact-slide--studio`,src:`/images/contact/studio-view.jpg`,alt:`밝은 창가가 보이는 왕열 작업실 전경`}];function f(){p(),m(),h()}function p(){let f=document.getElementById(`contactContainer`);if(!f)return;let p=`/Wang_art/`.replace(/\/$/,``);f.innerHTML=`
    <section class="contact-page">
      <section class="contact-container contact-info">
        <div class="contact-block contact-block--location">
          <p class="contact-label">${e}</p>
          <a
            href="${i}"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-address"
          >
            <span class="contact-address-block contact-address-ko">
              <span class="contact-address-ko-line">${n[0].replace(` 진위2산단로 140`,``)}</span>
              <span class="contact-address-ko-line">진위2산단로 140</span>
              <span class="contact-address-ko-line">${n[1]}</span>
            </span>
            <span class="contact-address-block contact-address-en">
              <span>${r[0]}</span>
              <span>${r[1]}</span>
              <span>${r[2]}</span>
            </span>
          </a>
        </div>

        <div class="contact-block contact-block--contact">
          <p class="contact-label">${t}</p>
          <div class="contact-lines">
            <a href="${a}" target="_blank" class="contact-row contact-email-link">${o}</a>
            <a
              href="${c}"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-row contact-link"
            >${s}</a>
            <a
              href="${u}"
              class="contact-row contact-link"
            >${l}</a>
          </div>
        </div>
      </section>

      <section
        class="contact-studio"
        id="contactSlider"
        aria-label="작업실 이미지"
      >
        <div class="contact-studio-slider">
        ${d.map((e,t)=>`
          <figure class="contact-studio-slide contact-slide ${e.className}${t===0?` is-active`:``}" data-slide="${t}">
            <img
              src="${p}${e.src}"
              alt="${e.alt}"
              class="contact-slide-image"
              loading="${t===0?`eager`:`lazy`}"
              decoding="async"
            />
          </figure>
        `).join(``)}
        </div>
      </section>
    </section>
  `}function m(){let e=document.querySelector(`.contact-address`);e&&(e.addEventListener(`pointerenter`,()=>e.classList.add(`is-hovered`)),e.addEventListener(`pointerleave`,()=>e.classList.remove(`is-hovered`)),e.addEventListener(`focus`,()=>e.classList.add(`is-hovered`)),e.addEventListener(`blur`,()=>e.classList.remove(`is-hovered`)))}function h(){let e=document.getElementById(`contactSlider`);if(!e)return;let t=Array.from(e.querySelectorAll(`.contact-slide`));if(t.length<2)return;let n=window.matchMedia(`(prefers-reduced-motion: reduce)`),r=0,i=null,a=!1;function o(e){t[r]?.classList.remove(`is-active`),r=e,t[r]?.classList.add(`is-active`)}function s(){o((r+1)%t.length)}function c(){i!=null&&(window.clearInterval(i),i=null)}function l(){n.matches||a||(c(),i=window.setInterval(s,6e3))}e.addEventListener(`mouseenter`,()=>{a=!0,c()}),e.addEventListener(`mouseleave`,()=>{a=!1,l()}),n.addEventListener(`change`,()=>{if(n.matches){c();return}l()}),l()}export{f as initContact};