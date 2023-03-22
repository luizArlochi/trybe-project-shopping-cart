import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsList = async (element) => {
  const productsSection = document.querySelector('.products');
  const products = await fetchProductsList(element);
  products.forEach((product) => {
    const productElement = createProductElement(product);
    productsSection.appendChild(productElement);
  });
};

window.onload = () => {
  productsList('computador');
};
