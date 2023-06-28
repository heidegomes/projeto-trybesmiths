import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/service/productsService';
import productsController from '../../../src/controller/productsController';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('post /products controller', async function () {

    req.body = {
      "name": "Martelo de Thor",
      "price": "30 peças de ouro",
      "orderId": 4
    }

    const returnDB = {
      "id": 6,
      "name": "Martelo de Thor",
      "price": "30 peças de ouro"
    }

    sinon.stub(productsService, 'create').resolves(returnDB);

    const controllerResponse = await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.be.calledWithExactly(returnDB);
  })

  it('get /products controller', async function () {

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

    sinon.stub(productsService, 'findAll').resolves(mockReturnDB);

    const controllerResponse = await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.be.calledWithExactly(mockReturnDB);
  })

});
