import { refs } from './refs';

export function addLocalStorage(id) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart.includes(id)) {
    return;
  }
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function removeLocalStorage(id) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart.includes(id)) {
    return;
  }
  cart.splice(cart.indexOf(id), 1);
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('cart'));
}
export function setLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function initStorage() {
  if (getLocalStorage() === null) {
    localStorage.setItem('cart', '[]');
  }
  refs.cartCount.textContent = getLocalStorage().length;
}

export function addLocalStorageWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist'));
  if (wishlist.includes(id)) {
    return;
  }
  wishlist.push(id);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
export function removeLocalStorageWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist'));
  if (!wishlist.includes(id)) {
    return;
  }
  wishlist.splice(wishlist.indexOf(id), 1);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
export function getLocalStorageWishlist() {
  return JSON.parse(localStorage.getItem('wishlist'));
}
export function setLocalStorageWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
export function initStorageWishlist() {
  if (getLocalStorageWishlist() === null) {
    localStorage.setItem('wishlist', '[]');
  }
  refs.wishlistCount.textContent = getLocalStorageWishlist().length;
}
