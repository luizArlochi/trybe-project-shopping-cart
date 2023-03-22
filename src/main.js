import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsSection = document.querySelector('.products');

const displayLoadingMessage = () => {
  productsSection.innerHTML = '';
  const loadingMsg = document.createElement('p');
  loadingMsg.textContent = 'carregando...';
  loadingMsg.classList.add('loading');
  productsSection.appendChild(loadingMsg);

  const removeMessage = () => {
    loadingMsg.remove();
  };
  return removeMessage;
};

const displayErrorMessage = (message) => {
  productsSection.innerHTML = '';
  const errorMsg = document.createElement('p');
  errorMsg.innerHTML = message;
  errorMsg.classList.add('error');
  productsSection.appendChild(errorMsg);
  return errorMsg;
};

const productsList = async (element) => {
  const removeLoadingMessage = displayLoadingMessage();
  try {
    const products = await fetchProductsList(element);
    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsSection.appendChild(productElement);
    });
  } catch (error) {
    displayErrorMessage('Algum erro ocorreu, recarregue a página e tente novamente');
  } finally {
    removeLoadingMessage();
  }
};
// descobri o finally e estou feliz por ele existir, se o conhecesse antes pouparia uns 30min.

window.onload = () => {
  productsList('computador');
};
