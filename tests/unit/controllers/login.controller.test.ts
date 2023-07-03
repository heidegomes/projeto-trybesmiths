import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/service/loginService';
import loginController from '../../../src/controller/loginController';
import { ServiceResponseError, ServiceResponseSuccess } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('post /login controller', async function () {

    req.body = {
      "username": "aaa",
      "password": "bbb"
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJhYWEiLCJpYXQiOjE2ODgzNDYxNDQsImV4cCI6MTY4ODk1MDk0NH0.AfIXjib9IiZgr0Y5bJcv1SudyfxZyOxiXd2O5u1yVn8";
    const serviceResponseSuccessMock: ServiceResponseSuccess<Token> = {
      "status": 'OK',
      "message": {
        'token': token
      },
      "statusCode": 200
    }

    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponseSuccessMock);

    const controllerResponse = await loginController.verifyLogin(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.be.calledWithExactly({ 'token': token });
  })

  it('post /login controller unauthorized response', async function () {

    req.body = {
      "username": "qualquer username",
      "password": "qualquer senha"
    }

    const errorMessage = 'Username or password invalid';
    const serviceResponseErrorMock: ServiceResponseError = {
      "status": 'UNAUTHORIZED',
      "message": errorMessage,
      "statusCode": 401
    }

    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponseErrorMock);

    const controllerResponse = await loginController.verifyLogin(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.be.calledWithExactly({ 'message': errorMessage });
  })
});
