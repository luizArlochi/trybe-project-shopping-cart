import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('Ao executar a função fetchProduct com o argumento do produto "MLB1405519561" fetch deve ser chamado', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProducts', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "Termo de busca não informado"', async () => {
    await expect(fetchProduct()).rejects.toThrowError('ID não informado');
  });

  it('ao chamar a função fetchProducts com argumento invalido, retorna um erro com a mensagem: "Termo de busca não informado"', async () => {
    await expect(fetchProduct('umdoistres')).rejects.toThrowError('ID não informado');
  });

  it('se o retorno da função fetchProducts com o argumento "MLB1405519561" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const output = await fetchProduct('MLB1405519561');
    expect(output).toEqual(product);
  });


});
