//Логіка сторінки Home
import {
  clearSearch,
  handleCategory,
  handlerForm,
  handlerLoadMore,
  handlerModal,
  initHomePage,
} from './js/handlers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.loadMoreBtn.addEventListener('click', handlerLoadMore);
refs.categories.addEventListener(`click`, handleCategory);
refs.products.addEventListener('click', handlerModal);
refs.form.addEventListener('submit', handlerForm);
refs.searchCloseButton.addEventListener('click', clearSearch);