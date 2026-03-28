import {
  clearSearch,
  handleCategory,
  handlerBtnBuy,
  handlerCartBtn,
  handlerForm,
  handlerLoadMore,
  handlerModal,
  handlerWishlistBtn,
  initCart,
  initHomePage,
} from './js/handlers';
import { closeModal } from './js/modal';
import { getProductInModal } from './js/products-api';
import { refs } from './js/refs';
import { renderProducts } from './js/render-function';
import {
  addLocalStorageWishlist,
  getLocalStorage,
  getLocalStorageWishlist,
  initStorage,
  initStorageWishlist,
  removeLocalStorageWishlist,
} from './js/storage';

initCart();
refs.products.addEventListener('click', handlerModal);
initStorage();
refs.modal.addEventListener('click', closeModal);
refs.cartBtn.addEventListener('click', handlerCartBtn);
refs.wishlistBtn.addEventListener('click', handlerWishlistBtn);
initStorageWishlist();
refs.modalBtnBuyAll.addEventListener('click', handlerBtnBuy);
