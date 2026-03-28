export const refs = {
  categories: document.querySelector('.categories'),
  products: document.querySelector('.products'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loader: document.querySelector('.loader'),
  notFound: document.querySelector('.not-found'),
  modalProduct: document.querySelector('.modal-product'),
  modal: document.querySelector('.modal'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  form: document.querySelector('.search-form'),
  searchCloseButton: document.querySelector('.search-form__btn-clear'),
  cartBtn: document.querySelector('.modal-product__btn--cart'),
  wishlistBtn: document.querySelector('.modal-product__btn--wishlist'),
  cartCount: document.querySelector('[data-cart-count]'),
  wishlistCount: document.querySelector('[data-wishlist-count]'),
  cartNavBtn: document.querySelector('.nav__link[href="./cart.html"]'),
  wishlistNavBtn: document.querySelector('.nav__link[href="./wishlist.html"]'),
  cartOrederInfoItemsCount: document.querySelector(
    '.cart-summary__value[data-count]'
  ),
  cartOrderInfoTotalPrice: document.querySelector(
    '.cart-summary__value[data-price]'
  ),
  modalBtnBuyAll: document.querySelector('.cart-summary__btn'),
};
