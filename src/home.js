//Логіка сторінки Home
import {
  handleCategory,
  handlerLoadMore,
  handlerModal,
  initHomePage,
} from './js/handlers';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.loadMoreBtn.addEventListener('click', handlerLoadMore);
refs.categories.addEventListener(`click`, handleCategory);
refs.products.addEventListener('click', handlerModal);
