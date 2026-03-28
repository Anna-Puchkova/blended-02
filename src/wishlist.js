import {
  clearSearch,
  handleCategory,
  handlerCartBtn,
  handlerForm,
  handlerLoadMore,
  handlerModal,
  initHomePage,
  initWishlist,
  handlerWishlistBtn,
  handlerBtnBuy,
} from './js/handlers';
import { closeModal } from './js/modal';
import { getProductInModal } from './js/products-api';
import { refs } from './js/refs';
import { renderProducts } from './js/render-function';
import {
  addLocalStorageWishlist,
  getLocalStorageWishlist,
  initStorage,
  initStorageWishlist,
  removeLocalStorageWishlist,
} from './js/storage';

initWishlist();
refs.products.addEventListener('click', handlerModal);
initStorage();
refs.modal.addEventListener('click', closeModal);
refs.cartBtn.addEventListener('click', handlerCartBtn);
refs.wishlistBtn.addEventListener('click', handlerWishlistBtn);
initStorageWishlist();
