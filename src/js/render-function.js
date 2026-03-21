import { refs } from './refs';

export function renderCategories(array) {
  const markup = array
    .map(
      category => `<li class="categories__item">
   <button class="categories__btn" type="button" data-category="${category}">${category}</button>
 </li>`
    )
    .join('');
  refs.categories.innerHTML = markup;
}

export function renderProducts(arr) {
  const markup = arr
    .map(
      ({
        thumbnail,
        title,
        id,
        brand,
        category,
        price,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}</p>
 </li>`
    )
    .join('');
  refs.products.insertAdjacentHTML('beforeend', markup);
}

export function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

export function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

export function hideLoader() {
  refs.loader.classList.add('is-hidden');
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}

export function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}
