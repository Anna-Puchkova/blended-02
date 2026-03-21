import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from './constants';
axios.defaults.baseURL = API_BASE_URL;
export async function getCategories() {
  const { data } = await axios(`${API_ENDPOINTS.CATEGORIES}`);
  return data;
}

export async function getProducts(currentPage) {
  const skip = (currentPage - 1) * 12;

  const { data } = await axios(
    `${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
}

// https://dummyjson.com/products/category/smartphones
export async function getProductsByCategory(category, currentPage) {
  const skip = (currentPage - 1) * 12;
  const { data } = await axios(
    `${API_ENDPOINTS.BYECATEGORY}${category}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
}

// https://dummyjson.com/products/1
export async function getProductInModal(id) {
  const { data } = await axios(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  return data;
}
