export const fetchProduct = () => {
  // seu código aqui
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
