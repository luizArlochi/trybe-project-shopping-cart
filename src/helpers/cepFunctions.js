export const getAddress = async (element) => {
  const apiRequest = [
    `https://cep.awesomeapi.com.br/json/${element}`,
    `https://brasilapi.com.br/api/cep/v2/${element}`,
  ];
  let fullAddress = 'CEP não encontrado';
  try {
    const response = await Promise.any(apiRequest.map((request) => fetch(request)));
    const data = await response.json();
    console.log(data);
    fullAddress = data.address && data.district && data.city && data.state
      ? `${data.address} - ${data.district} - ${data.city} - ${data.state}`
      : `${data.street} - ${data.neighborhood} - ${data.city} - ${data.state}`;
  } catch (error) {
    console.log(error.message);
  }
  return fullAddress;
};

export const searchCep = async () => {
  const cepInput = document.querySelector('.cep-input');
  const cartAddress = document.querySelector('.cart__address');
  const cep = cepInput.value;
  try {
    const fullAddress = await getAddress(cep);
    cartAddress.innerHTML = fullAddress;
  } catch (error) {
    console.log(error.message);
  }
};
