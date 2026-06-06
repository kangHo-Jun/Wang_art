import{t as e}from"./works-DlmClJgI.js";var t=[{id:`mmca`,nameKr:`국립현대미술관`,nameEn:`National Museum of Modern and Contemporary Art`,city:`서울 / 과천`,country:`Korea`,type:`museum`},{id:`gmoma`,nameKr:`경기도미술관`,nameEn:`Gyeonggi Museum of Modern Art`,city:`안산`,country:`Korea`,type:`museum`},{id:`daejeon`,nameKr:`대전시립미술관`,nameEn:`Daejeon Museum of Art`,city:`대전`,country:`Korea`,type:`museum`},{id:`art-bank`,nameKr:`미술은행`,nameEn:`Art Bank Korea`,city:`서울`,country:`Korea`,type:`government`},{id:`seongnam`,nameKr:`성남아트센터`,nameEn:`Seongnam Arts Center`,city:`성남`,country:`Korea`,type:`gallery`},{id:`hongik`,nameKr:`홍익대학교 현대미술관`,nameEn:`Hongik University Museum of Modern Art`,city:`서울`,country:`Korea`,type:`university`}];function n(){e(),r()}function r(){let e=document.querySelector(`.collections-grid`);if(!e)return;e.innerHTML=``;let n={museum:`미술관`,gallery:`갤러리`,university:`대학교`,government:`정부기관`};t.forEach((t,r)=>{let i=document.createElement(`div`);i.className=`collection-item fade-up`,i.style.transitionDelay=`${r*.08}s`,i.innerHTML=`
      <div class="collection-item-inner">
        <span class="collection-type">${n[t.type]??t.type}</span>
        <p class="collection-name-kr">${t.nameKr}</p>
        <p class="collection-name-en">${t.nameEn}</p>
        <p class="collection-location">${t.city} · ${t.country}</p>
      </div>
    `,e.appendChild(i)})}export{n as initCollections};