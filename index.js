import{a as S,S as q,i}from"./assets/vendor-Cu43xbyG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const M="55467714-b30f475b74465712765c76d28",P="https://pixabay.com/api/";async function u(o,t=1){const a={key:M,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await S.get(P,{params:a})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more");let B=new q(".gallery a",{captionsData:"alt",captionDelay:250});function g(o){const t=o.map(({webformatURL:a,largeImageURL:s,tags:e,likes:r,views:n,comments:v,downloads:w})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img class="gallery-image" src="${a}" alt="${e}" />
          </a>
          <div class="info">
            <div class="info-item">
              <b>Likes</b>
              <span>${r}</span>
            </div>
            <div class="info-item">
              <b>Views</b>
              <span>${n}</span>
            </div>
            <div class="info-item">
              <b>Comments</b>
              <span>${v}</span>
            </div>
            <div class="info-item">
              <b>Downloads</b>
              <span>${w}</span>
            </div>
          </div>
        </li>`).join("");f.insertAdjacentHTML("beforeend",t),B.refresh()}function $(){f.innerHTML=""}function p(){m.classList.remove("hidden")}function y(){m.classList.add("hidden")}function L(){h.classList.remove("hidden")}function d(){h.classList.add("hidden")}const E=document.querySelector(".form"),O=document.querySelector(".load-more");let l="",c=1;const b=15;E.addEventListener("submit",x);O.addEventListener("click",H);async function x(o){if(o.preventDefault(),l=o.currentTarget.elements["search-text"].value.trim(),c=1,l===""){i.error({message:"Please enter a search query!"});return}$(),d(),p();try{const t=await u(l,c);if(t.hits.length===0){i.warning({message:"No images found!"});return}g(t.hits),t.totalHits>b&&L()}catch{i.error({message:"Error fetching images!"})}finally{y(),o.target.reset()}}async function H(){c+=1,p(),d();try{const o=await u(l,c);g(o.hits);const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"});const a=Math.ceil(o.totalHits/b);c>=a?(d(),i.info({message:"We're sorry, but you've reached the end of search results."})):L()}catch{i.error({message:"Error loading more images!"})}finally{y()}}
//# sourceMappingURL=index.js.map
