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
      const { products, skip, total } = await getProductBySearch(searchValue, currentPage);
      if (products.length === 0) {
        showNotFound();
        return;
      }
      renderProducts(products);
      if (total - (skip + 12) > 0) {
        showLoadMoreBtn();
      }
    } else 
    if (category === '') {
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
    refs.modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModalEsc);
  } catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
}
export async function handlerForm(e) {
  e.preventDefault();
  if (e.target.value === ''|| e.target.value === undefined) {
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
      const { products, skip, total } = await getProductBySearch(value,currentPage);
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
  document.querySelector(`.categories__btn`).classList.add(`categories__btn--active`);
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