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
export function clearProductList() {
  refs.products.innerHTML = '';
}

export function renderModal({
  thumbnail,
  title,
  tags,
  description,
  shippingInformation,
  returnPolicy,
  price,
}) {
  const markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping:${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy:${returnPolicy}</p>
        <p class="modal-product__price">Price:${price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;
  refs.modalProduct.insertAdjacentHTML('beforeend', markup);
}

export function showModal() {
  refs.modal.classList.add('modal--is-open');
}

export function hideModal() {
  refs.modal.classList.remove('modal--is-open');
}
