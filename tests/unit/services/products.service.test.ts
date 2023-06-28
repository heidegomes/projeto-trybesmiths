import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model'
import productsService from '../../../src/service/productsService'

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('teste camada service', async function () {

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
});

