import { getCategories, getProducts } from './products-api';
import { refs } from './refs';
import {
  hideLoader,
  hideLoadMoreBtn,
  hideNotFound,
  renderCategories,
  renderProducts,
  showLoader,
  showLoadMoreBtn,
  showNotFound,
} from './render-function';

let currentPage = 1;

export async function initHomePage() {
  try {
    hideNotFound();
    hideLoadMoreBtn();
    showLoader();
    const categories = await getCategories();
    const allCategories = ['all', ...categories];
    renderCategories(allCategories);
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
