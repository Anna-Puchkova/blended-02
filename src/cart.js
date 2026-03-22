import { refs } from './js/refs';
import {
  addLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from './js/storage';

//Логіка сторінки Cart
export async function handlerCartBtn() {
  const id = refs.modalProduct.dataset.id;

  if (getLocalStorage().includes(id)) {
    removeLocalStorage(id);
    refs.cartBtn.textContent = 'Add to cart';
  } else {
    addLocalStorage(id);
    refs.cartBtn.textContent = 'Remove from Cart';
  }
  refs.cartCount.textContent = getLocalStorage().length;
}
