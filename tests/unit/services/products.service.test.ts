import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model'
import productsService from '../../../src/service/productsService'

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('post /products service', async function () {

    const bodyRequest = {
      "name": "Martelo de Thor",
      "price": "30 peças de ouro",
      "orderId": 4
    }

    const returnDB = {
      "id": 6,
      "name": "Martelo de Thor",
      "price": "30 peças de ouro"
    }
    const mockReturnDB = ProductModel.build(returnDB);

    sinon.stub(ProductModel, 'create').resolves(mockReturnDB);

    const serviceResponse = await productsService.create(bodyRequest);

    expect(serviceResponse).to.deep.eq(returnDB);
  })

  it('get all /products service', async function () {

    const returnDB = [
      {
        "id": 1,
        "name": "Pedra Filosofal",
        "price": "20 gold",
        "orderId": 5
      },
      {
        "id": 2,
        "name": "Lança do Destino",
        "price": "100 diamond",
        "orderId": 1
      }
    ]

    const mockReturnDB = returnDB.map((e) => ProductModel.build(e));

    sinon.stub(ProductModel, 'findAll').resolves(mockReturnDB);

    const serviceResponse = await productsService.findAll();

    expect(serviceResponse).to.be.deep.equal(mockReturnDB);
  })
});

