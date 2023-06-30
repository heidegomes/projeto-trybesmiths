import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import OrderModel from '../../../src/database/models/order.model';
import ordersService from '../../../src/service/ordersService';
import ordersController from '../../../src/controller/ordersController';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('get /orders controller', async function () {

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

    // sinon.stub(ordersService, 'findAll').resolves(mockReturnDB);

    const controllerResponse = await ordersController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockReturnDB);
  })
});
