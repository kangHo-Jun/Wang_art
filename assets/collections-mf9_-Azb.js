function e(){let e=`${`/`.replace(/\/$/,``)}/artist/`,t=document.getElementById(`collectionsContainer`);t&&(t.innerHTML=`
      <div class="resume-shell">
        <div class="resume-text resume-text--intro">
          소장처 페이지는 작가 페이지로 통합되었습니다.
        </div>
        <a class="download" href="${e}">작가 페이지로 이동</a>
      </div>
    `),window.location.replace(e)}export{e as initCollections};