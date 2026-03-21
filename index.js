import"./assets/styles-JE8YjOlG.js";import{a}from"./assets/vendor-N5iQpiFS.js";const s="https://dummyjson.com/products",n={CATEGORIES:"/category-list"};a.defaults.baseURL=s;async function c(){const{data:t}=await a(`${n.CATEGORIES}`);return t}const r={categories:document.querySelector(".categories")};function i(t){const e=t.map(o=>`<li class="categories__item">
   <button class="categories__btn" type="button" data-category="${o}">${o}</button>
 </li>`).join("");r.categories.innerHTML=e}async function g(){try{const e=["all",...await c()];i(e)}catch(t){console.log(t)}}document.addEventListener("DOMContentLoaded",g);
//# sourceMappingURL=index.js.map
