//Логіка сторінки Home
import {
  clearSearch,
  handleCategory,
  handlerCartBtn,
  handlerForm,
  handlerLoadMore,
  handlerModal,
  handlerWishlistBtn,
  initHomePage,
  handlerBtnBuy,
} from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';
import { initStorage, initStorageWishlist } from './js/storage';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.loadMoreBtn.addEventListener('click', handlerLoadMore);
refs.categories.addEventListener(`click`, handleCategory);
refs.products.addEventListener('click', handlerModal);
refs.form.addEventListener('submit', handlerForm);
refs.searchCloseButton.addEventListener('click', clearSearch);
initStorage();
refs.modal.addEventListener('click', closeModal);
refs.cartBtn.addEventListener('click', handlerCartBtn);
refs.wishlistBtn.addEventListener('click', handlerWishlistBtn);
initStorageWishlist();
