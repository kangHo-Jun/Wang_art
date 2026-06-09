import{t as e}from"./main-DsOHw1C_.js";import{t}from"./gsap-D_956-p2.js";var n=[{id:`mmca`,nameKr:`국립현대미술관`,nameEn:`National Museum of Modern and Contemporary Art`,city:`서울 / 과천`,country:`Korea`,type:`museum`},{id:`gmoma`,nameKr:`경기도미술관`,nameEn:`Gyeonggi Museum of Modern Art`,city:`안산`,country:`Korea`,type:`museum`},{id:`daejeon`,nameKr:`대전시립미술관`,nameEn:`Daejeon Museum of Art`,city:`대전`,country:`Korea`,type:`museum`},{id:`art-bank`,nameKr:`미술은행`,nameEn:`Art Bank Korea`,city:`서울`,country:`Korea`,type:`government`},{id:`seongnam`,nameKr:`성남아트센터`,nameEn:`Seongnam Arts Center`,city:`성남`,country:`Korea`,type:`gallery`},{id:`hongik`,nameKr:`홍익대학교 현대미술관`,nameEn:`Hongik University Museum of Modern Art`,city:`서울`,country:`Korea`,type:`university`}];function r(){e(),i()}function i(){let e=document.getElementById(`collectionsList`);if(!e)return;e.innerHTML=``;let r={museum:`미술관`,gallery:`갤러리`,university:`대학교`,government:`정부기관`};n.forEach((n,i)=>{let a=document.createElement(`div`);a.style.cssText=`
      padding: 24px 0;
      border-bottom: 0.5px solid var(--color-ink-faint);
      display: grid;
      grid-template-columns: 120px 1fr 1fr;
      gap: 24px;
      align-items: baseline;
      opacity: 0;
      transform: translateY(16px);
    `,a.innerHTML=`
      <span style="font-family:var(--font-sans);font-size:var(--text-xs);
        letter-spacing:var(--ls-label);color:var(--color-gold);
        text-transform:uppercase;">${r[n.type]}</span>
      <span style="font-family:var(--font-serif);font-weight:var(--fw-light);
        font-size:var(--text-lg);letter-spacing:var(--ls-title);
        color:var(--color-ink);">${n.nameKr}</span>
      <span style="font-family:var(--font-sans);font-weight:var(--fw-light);
        font-size:var(--text-xs);letter-spacing:var(--ls-label);
        color:var(--color-ink-muted);text-transform:uppercase;">
        ${n.city} · ${n.country}</span>
    `,e.appendChild(a),t.to(a,{opacity:1,y:0,duration:.6,ease:`power3.out`,delay:i*.08})})}export{r as initCollections};