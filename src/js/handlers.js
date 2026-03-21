import { getCategories, getProducts, getProductsByCategory } from './products-api';
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
} from './render-function';

let currentPage = 1;
let category = "";
export async function initHomePage() {
  try {
        currentPage = 1;
    hideNotFound();
    hideLoadMoreBtn();
    showLoader();
    const categories = await getCategories();
    const allCategories = ['all', ...categories];
    renderCategories(allCategories);
    document.querySelector(`.categories__btn`).classList.add(`categories__btn--active`);
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
    if (category === "") {
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
          const {products, skip, total} = await getProductsByCategory(category, currentPage);
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
  
  if (e.target.nodeName !== `BUTTON`) return;
 category = e.target.dataset.category;
 document.querySelectorAll(`.categories__btn`).forEach(item => {
  item.classList.remove('categories__btn--active');
 })
 e.target.classList.add(`categories__btn--active`);
  try{

    currentPage = 1;
        clearProductList();
    hideNotFound();
    hideLoadMoreBtn();
    showLoader();
    if (category === "all") {
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
          const {products, skip, total} = await getProductsByCategory(category, currentPage);
              if (products.length === 0) {
      showNotFound();
      return;
    }
    renderProducts(products);
    if (total - (skip + 12) > 0) {
      showLoadMoreBtn();
    }
    }

   
  }  catch (error) {
    showToast('smth wrong,try again, pls', 'error');
  } finally {
    hideLoader();
  }
} 