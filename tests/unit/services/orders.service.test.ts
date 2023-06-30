import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ordersService from '../../../src/service/ordersService';


describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('get all /order service', async function () {

    const returnDB = [
      {
        "id": 1,
        "userId": 2,
        "productIds": [1, 2]
      },
      {
        "id": 2,
        "userId": 1,
        "productIds": [3, 4]
      }
    ]

    const mockReturnDB = returnDB.map((e) => OrderModel.build(e));

    sinon.stub(OrderModel, 'findAll').resolves(mockReturnDB);

    const serviceResponse = await ordersService.findAll();

    expect(serviceResponse).to.be.deep.equal(mockReturnDB);
  })
});
