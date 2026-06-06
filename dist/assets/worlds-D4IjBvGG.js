import{t as e}from"./main-CQo44_OJ.js";var t=[{id:`utopia-meditation`,titleEn:`Utopia Meditation`,titleKr:`유토피아 명상`,descKr:`왕열의 화면은 언제나 이상향을 향한 조용한 몸짓이다. 먹과 아크릴이 교차하는 화면 위에서 산수는 현실을 넘어 정신의 풍경으로 확장된다.`,descEn:`Wang Yeul's surfaces are always a quiet gesture toward an ideal world. On canvas where ink and acrylic intersect, landscape expands beyond reality into a scenery of the mind.`,imageSrc:`images/2026/2025-utopia-meditation-acrylic-on-canvas-280cmx140cm.jpg`,keywords:[`유토피아`,`명상`,`이상향`,`Utopia`,`Meditation`]},{id:`color-landscape`,titleEn:`Landscape of Color`,titleKr:`색의 풍경`,descKr:`붉고 푸른 산수의 화면은 전통 오방색의 현대적 재해석이다. 색은 감정의 온도이며, 왕열의 캔버스에서 색채는 곧 정신의 언어가 된다.`,descEn:`The red and blue landscapes are a contemporary reinterpretation of traditional Korean five colors. Color is the temperature of emotion; on Wang Yeul's canvas, color becomes the language of the spirit.`,imageSrc:`images/red/1-utopia-meditation-acrylic-on-canvas-280x280cm-2023.jpg`,keywords:[`색채`,`오방색`,`산수`,`Color`,`Landscape`]},{id:`ink-mountain`,titleEn:`Ink and Mountain`,titleKr:`먹과 산수`,descKr:`전통 한국화의 근간인 먹과 산수. 왕열은 이 오래된 언어를 현대의 감각으로 해체하고 재구성하며, 화면 속 여백은 침묵이 아닌 또 다른 말이 된다.`,descEn:`Ink and mountain — the foundation of traditional Korean painting. Wang Yeul deconstructs and reconstructs this ancient language with a contemporary sensibility, where the void in the picture becomes not silence, but another kind of speech.`,imageSrc:`images/ink/16-utopia-a-companion-ink-stick-and-acrylic-on-canvas411x200cm2006-3eok-won-bi-mae-pum.jpg`,keywords:[`먹`,`산수`,`여백`,`Ink`,`Mountain`]}];function n(){e(),r()}function r(){let e=document.getElementById(`worldsGrid`);e&&(e.innerHTML=``,t.forEach((t,n)=>{let r=document.createElement(`div`);r.className=`world-item fade-up`,r.style.transitionDelay=`${n*.1}s`,r.innerHTML=`
      <div class="world-img-wrap">
        <img
          src="${t.imageSrc}"
          alt="${t.titleKr}"
          loading="${n===0?`eager`:`lazy`}"
          decoding="async"
        />
      </div>
      <div class="world-info">
        <p class="world-kicker">World ${String(n+1).padStart(2,`0`)}</p>
        <h3 class="world-title-en">${t.titleEn}</h3>
        <p class="world-title-kr">${t.titleKr}</p>
        <div class="world-divider"></div>
        <p class="world-desc">${t.descKr}</p>
        <div class="world-keywords">
          ${t.keywords.map(e=>`<span class="world-keyword">${e}</span>`).join(``)}
        </div>
      </div>
    `,e.appendChild(r)}))}export{n as initWorlds};