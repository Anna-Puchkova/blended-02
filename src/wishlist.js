import { handlerCartBtn } from './cart';
import {
  clearSearch,
  handleCategory,
  handlerForm,
  handlerLoadMore,
  handlerModal,
  initHomePage,
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

//Логіка сторінки Wishlist
export async function handlerWishlistBtn() {
  const id = refs.modalProduct.dataset.id;

  if (getLocalStorageWishlist().includes(id)) {
    removeLocalStorageWishlist(id);
    refs.wishlistBtn.textContent = 'Add to Wishlist';
  } else {
    addLocalStorageWishlist(id);
    refs.wishlistBtn.textContent = 'Remove from Wishlist';
  }
  refs.wishlistCount.textContent = getLocalStorageWishlist().length;
}

export async function initWishlist() {
  if (!refs.wishlistNavBtn.classList.contains('nav__link--active')) {
    return;
  }
  const ids = getLocalStorageWishlist();
  const products = await Promise.all(ids.map(id => getProductInModal(id)));
  renderProducts(products);
}
initWishlist();

refs.products.addEventListener('click', handlerModal);
initStorage();
refs.modal.addEventListener('click', closeModal);
refs.cartBtn.addEventListener('click', handlerCartBtn);
refs.wishlistBtn.addEventListener('click', handlerWishlistBtn);
initStorageWishlist();
