import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel, { OrderSequelizeModel } from '../../../src/database/models/order.model';
import ordersService from '../../../src/service/ordersService';


describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('get all /order service', async function () {

    const returnDB = [{
      dataValues: {
        "id": 1,
        "userId": 2,
        "productIds": [{ id: 1 }, { id: 2 }]
      },
    },
    {
      dataValues: {
        "id": 2,
        "userId": 1,
        "productIds": [{ id: 3 }, { id: 4 }]
      },
    }
    ]

    const serviceReturn = [
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

    // const mockReturnDB = returnDB.map((o) => OrderModel.build(o));

    sinon.stub(OrderModel, 'findAll').resolves(returnDB as unknown as OrderSequelizeModel[]);

    const serviceResponse = await ordersService.findAll();

    expect(serviceResponse).to.be.deep.equal(serviceReturn);
  })
});
