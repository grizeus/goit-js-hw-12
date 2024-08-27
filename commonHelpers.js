import{a as m,s as P,i as p}from"./assets/vendor-CFcQplSW.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const M="34523545-f21683fd59bfc3e4e2549fe07",O="https://pixabay.com/api";m.defaults.baseURL=O;let u=1;async function v(l,t){const a={key:M,q:String(l),image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:t,page:u};return m.get("/",{params:a}).then(r=>[r.data,u++]).catch(r=>console.error(r))}function $(){u=1}const g=document.querySelector("ul.gallery-list");function y(){g.innerHTML=""}function L(l){l[1]===1&&(g.innerHTML="");const t=l[0].hits.map(a=>{const{webformatURL:r,largeImageURL:e,tags:s,likes:o,views:S,comments:q,downloads:x}=a;return`
        <li class="gallery-item">
            <a href="${e}" target="_blank">
                <div class="img-wrapper">
                  <img class="gallery-image" src="${r}" alt="${s}" />
                </div>
            </a>
            <ul class="gallery-item-info">
                <li class="gallery-item-likes"><b>Likes</b> ${o}</li>
                <li class="gallery-item-views"><b>Views</b> ${S}</li>
                <li class="gallery-item-comments"><b>Comments</b> ${q}</li>
                <li class="gallery-item-downloads"><b>Downloads</b> ${x}</li>
            </ul>
        </li>
        `}).join("");g.insertAdjacentHTML("beforeend",t),new P(".gallery-list a",{captionsData:"alt",captionDelay:250})}const z="data:image/svg+xml,%3csvg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%3e%3cpath%20fill='%23fff'%20d='M9.080%200.292c0.187-0.187%200.441-0.292%200.706-0.292h12.428c0.265%200%200.519%200.105%200.706%200.292l8.788%208.788c0.187%200.187%200.292%200.441%200.292%200.706v12.428c0%200.265-0.105%200.519-0.292%200.706l-8.788%208.788c-0.187%200.187-0.441%200.292-0.706%200.292h-12.428c-0.265%200-0.519-0.105-0.706-0.292l-8.788-8.788c-0.187-0.187-0.292-0.441-0.292-0.706v-12.428c0-0.265%200.105-0.519%200.292-0.706l8.788-8.788zM10.2%202l-8.2%208.2v11.6l8.2%208.2h11.6l8.2-8.2v-11.6l-8.2-8.2h-11.6z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M9.292%209.292c0.093-0.093%200.203-0.167%200.325-0.217s0.252-0.076%200.383-0.076c0.132%200%200.262%200.026%200.383%200.076s0.232%200.124%200.325%200.217l5.292%205.294%205.292-5.294c0.093-0.093%200.203-0.167%200.325-0.217s0.252-0.076%200.383-0.076c0.131%200%200.262%200.026%200.383%200.076s0.232%200.124%200.325%200.217c0.093%200.093%200.167%200.203%200.217%200.325s0.076%200.252%200.076%200.383-0.026%200.262-0.076%200.383c-0.050%200.121-0.124%200.232-0.217%200.325l-5.294%205.292%205.294%205.292c0.093%200.093%200.167%200.203%200.217%200.325s0.076%200.252%200.076%200.383-0.026%200.262-0.076%200.383c-0.050%200.121-0.124%200.232-0.217%200.325s-0.203%200.167-0.325%200.217c-0.121%200.050-0.252%200.076-0.383%200.076s-0.262-0.026-0.383-0.076c-0.121-0.050-0.232-0.124-0.325-0.217l-5.292-5.294-5.292%205.294c-0.093%200.093-0.203%200.167-0.325%200.217s-0.252%200.076-0.383%200.076-0.262-0.026-0.383-0.076c-0.121-0.050-0.232-0.124-0.325-0.217s-0.167-0.203-0.217-0.325c-0.050-0.121-0.076-0.252-0.076-0.383s0.026-0.262%200.076-0.383c0.050-0.121%200.124-0.232%200.217-0.325l5.294-5.292-5.294-5.292c-0.093-0.093-0.167-0.203-0.217-0.325s-0.076-0.252-0.076-0.383c0-0.132%200.026-0.262%200.076-0.383s0.124-0.232%200.217-0.325z'%3e%3c/path%3e%3c/svg%3e",B=document.querySelector(".search-input"),E=document.querySelector(".search-btn"),i=document.querySelector(".load-btn"),c=document.querySelector(".in-loader"),f=document.querySelector(".more-loader");let d=0,b=0;const h=15;let n="";const w={titleSize:"16px",maxWidth:"432px",position:"topRight",closeOnEscape:!0,icon:"error",iconUrl:z,theme:"dark"};E.addEventListener("click",async l=>{if(l.preventDefault(),$(),c.classList.toggle("visually-hidden"),n=B.value.trim(),n===""){c.classList.contains("visually-hidden")||c.classList.toggle("visually-hidden"),i.classList.contains("visually-hidden")||i.classList.toggle("visually-hidden"),y();return}const t=await v(n,h);c.classList.toggle("visually-hidden"),i.classList.toggle("visually-hidden"),d=parseInt(t[0].totalHits),b=Math.ceil(d/h),d>0?L(t):(y(),i.classList.contains("visually-hidden")||i.classList.toggle("visually-hidden"),p.error({...w,message:"Sorry, there are no images matching your search query. Please try again!"}))});i.addEventListener("click",async l=>{l.preventDefault(),f.classList.toggle("visually-hidden"),i.classList.toggle("visually-hidden");const t=await v(n,h);if(f.classList.toggle("visually-hidden"),b>t[1]){const a=document.querySelector(".gallery-item").getBoundingClientRect().height;L(t),window.scrollBy({top:a*2,left:0,behavior:"smooth"}),i.classList.toggle("visually-hidden")}else p.error({...w,message:"We're sorry, but you've reached the end of search results."})});
//# sourceMappingURL=commonHelpers.js.map
