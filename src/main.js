import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement,
  updateTotalPrice } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsSection = document.querySelector('.products');
const cartList = document.querySelector('.cart__products');

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

const loadCart = async () => {
  const cartIds = getSavedCartIDs();

  const cartProducts = await Promise.all(cartIds.map((id) => fetchProduct(id)));
  cartProducts.forEach((element) => {
    const cartProductElement = createCartProductElement(element);
    cartList.appendChild(cartProductElement);
  });
  updateTotalPrice();
};

const productsList = async (element) => {
  const removeLoadingMessage = displayLoadingMessage();
  try {
    const products = await fetchProductsList(element);
    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsSection.appendChild(productElement);

      // o objetivo inicial era separar essa parte em uma outra função, porém comecei a perder muito tempo nisso, no fim fiz na mesma função
      productElement.querySelector('.product__add').addEventListener(
        'click',
        async () => {
          try {
            const productDetails = await fetchProduct(product.id);
            const cartProductElement = createCartProductElement(productDetails);
            cartList.appendChild(cartProductElement);
            updateTotalPrice(productDetails.price, 'add');
            saveCartID(product.id);
          } catch (error) {
            console.log(error);
          }
        },
      );
      productsSection.appendChild(productElement);
    });
  } catch (error) {
    displayErrorMessage('Algum erro ocorreu, recarregue a página e tente novamente');
  } finally {
    removeLoadingMessage();
    await loadCart();
  }
};
// descobri o finally e estou feliz por ele existir, se o conhecesse antes pouparia uns 30min.

window.onload = () => {
  productsList('computador');
};
