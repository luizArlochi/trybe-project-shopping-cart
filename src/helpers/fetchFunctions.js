export const fetchProduct = async (element) => {
  if (!element) {
    throw new Error('ID não informado');
  }
  try {
    const apiRequest = `https://api.mercadolibre.com/items/${element}`;
    const response = await fetch(apiRequest);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchProductsList = async (element) => {
  if (!element) {
    throw new Error('Termo de busca não informado');
  }
  try {
    const apiRequest = `https://api.mercadolibre.com/sites/MLB/search?q=${element}`;
    const response = await fetch(apiRequest);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};
