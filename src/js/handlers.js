import {
  getCategories,
  getProductBySearch,
  getProductInModal,
  getProducts,
  getProductsByCategory,
} from './products-api';
import { showToast } from './helpers';
import {
  hideLoader,
  hideLoadMoreBtn,
  hideNotFound,
  renderCategories,
  renderProducts,
  showLoader,
  showLoadMoreBtn,
  showNotFound,
  clearProductList,
  renderModal,
  showModal,
} from './render-function';
import { refs } from './refs';
import { closeModal, closeModalEsc } from './modal';
import {
  addLocalStorage,
  addLocalStorageWishlist,
  getLocalStorage,
  getLocalStorageWishlist,
  removeLocalStorage,
  removeLocalStorageWishlist,
} from './storage';

let currentPage = 1;
let category = '';
let searchValue = '';
export async function initHomePage() {
  try {
    currentPage = 1;
    hideNotFound();
    hideLoadMoreBtn();
    showLoader();
    const categories = await getCategories();
    const allCategories = ['all', ...categories];
    renderCategories(allCategories);
    document
      .querySelector(`.categories__btn`)
      .classList.add(`categories__btn--active`);
    const { products, skip, total } = await getProducts(currentPage);
    if (products.length === 0) {
      showNotFound();
      return;
    }
    renderProducts(products);
    if (total - (skip + 12) > 0) {
      showLoadMoreBtn();
    }
  } catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
}
export async function handlerLoadMore() {
  currentPage += 1;
  try {
    hideNotFound();
    hideLoadMoreBtn();
    showLoader();
    if (searchValue !== '') {
      const { products, skip, total } = await getProductBySearch(
        searchValue,
        currentPage
      );
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showLoadMoreBtn();
      }
    } else if (category === '') {
      const { products, skip, total } = await getProducts(currentPage);
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showLoadMoreBtn();
      }
    } else {
      const { products, skip, total } = await getProductsByCategory(
        category,
        currentPage
      );
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
}

export async function handleCategory(e) {
  searchValue = '';
  if (e.target.nodeName !== `BUTTON`) return;
  category = e.target.dataset.category;
  document.querySelectorAll(`.categories__btn`).forEach(item => {
    item.classList.remove('categories__btn--active');
  });
  e.target.classList.add(`categories__btn--active`);
  try {
    currentPage = 1;
    clearProductList();
    hideNotFound();
    hideLoadMoreBtn();
    showLoader();
    if (category === 'all') {
      const { products, skip, total } = await getProducts(currentPage);
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showLoadMoreBtn();
      }
    } else {
      const { products, skip, total } = await getProductsByCategory(
        category,
        currentPage
      );
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showLoadMoreBtn();
      }
    }
  } catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
}

export async function handlerModal(e) {
  const id = e.target.closest('li').dataset.id;
  try {
    const modal = await getProductInModal(id);
    renderModal(modal);
    showModal();

    document.addEventListener('keydown', closeModalEsc);

    if (getLocalStorage().includes(id)) {
      refs.cartBtn.textContent = 'Remove from Cart';
    } else {
      refs.cartBtn.textContent = 'Add to Cart';
    }

    if (getLocalStorageWishlist().includes(id)) {
      refs.wishlistBtn.textContent = 'Remove from Wishlist';
    } else {
      refs.wishlistBtn.textContent = 'Add to Wishlist';
    }
  } catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
}

export async function handlerForm(e) {
  e.preventDefault();
  if (
    e.target.elements.searchValue.value.trim() === '' ||
    e.target.elements.searchValue.value === undefined
  ) {
    return;
  }
  try {
    const formData = new FormData(e.target);
    const value = formData.get('searchValue').trim();
    searchValue = value;
    currentPage = 1;
    clearProductList();
    hideNotFound();
    hideLoadMoreBtn();
    showLoader();
    if (value !== '') {
      const { products, skip, total } = await getProductBySearch(
        value,
        currentPage
      );
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showLoadMoreBtn();
      }
      e.target.reset();
    }
  } catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
}

export async function clearSearch(e) {
  refs.form.reset();
  refs.products.innerHTML = '';
  document.querySelectorAll(`.categories__btn`).forEach(item => {
    item.classList.remove('categories__btn--active');
  });
  document
    .querySelector(`.categories__btn`)
    .classList.add(`categories__btn--active`);
  currentPage = 1;
  hideNotFound();
  hideLoadMoreBtn();
  showLoader();
  try {
    const { products, skip, total } = await getProducts(currentPage);
    if (products.length === 0) {
      showNotFound();
      return;
    }
    renderProducts(products);
    if (total - (skip + 12) > 0) {
      showLoadMoreBtn();
    }
  } catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
}

//Логіка сторінки Cart
export async function handlerCartBtn() {
  const id = refs.modalProduct.dataset.id;

  if (getLocalStorage().includes(id)) {
    removeLocalStorage(id);
    refs.cartBtn.textContent = 'Add to Cart';
  } else {
    addLocalStorage(id);
    refs.cartBtn.textContent = 'Remove from Cart';
  }
  refs.cartCount.textContent = getLocalStorage().length;
  reTextOrederItemsCount();
  reTextTotalPrice();
}

export async function initCart() {
  if (!refs.cartNavBtn.classList.contains('nav__link--active')) {
    return;
  }
  const ids = getLocalStorage();

  const products = await Promise.all(ids.map(id => getProductInModal(id)));
  renderProducts(products);
  reTextOrederItemsCount();
  reTextTotalPrice();
}

function reTextOrederItemsCount() {
  if (!refs.cartOrederInfoItemsCount) {
    return;
  }
  refs.cartOrederInfoItemsCount.textContent = getLocalStorage().length;
}

function reTextTotalPrice() {
  if (!refs.cartOrderInfoTotalPrice) {
    return;
  }
  const cart = getLocalStorage();

  let sum = 0;
  const products = document.querySelectorAll('.products__item');
  for (let product of products) {
    if (cart.includes(product.dataset.id)) {
      const sumToAdd =
        product.querySelector('.products__price').textContent.split(' ')[1] *
        100;
      sum = (sum * 100 + sumToAdd) / 100;
    }
  }

  refs.cartOrderInfoTotalPrice.textContent = `$${sum}`;
}

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

export function handlerBtnBuy() {
  showToast('Ви придбали товари', 'success');
}
