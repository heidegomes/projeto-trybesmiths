import { expect } from 'chai';
import sinon from 'sinon';
import loginService from '../../../src/service/loginService';
import UserModel from '../../../src/database/models/user.model';
import jwtUtils from '../../../src/utils/jwtUtils';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('post /login service', async function () {

    const bodyRequest = {
      "username": "aaa",
      "password": "bbb"
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJhYWEiLCJpYXQiOjE2ODgzMDgzMzUsImV4cCI6MTY4ODkxMzEzNX0.n47Cu-hW3vrIQKufg9_vBE3MauMwnYfecaLFd-ZmoiE";
    const messageToken = {
      "message": {
        "token": token
      },
      "status": "OK",
      "statusCode": 200
    }
    const mockReturnDB = UserModel.build();
    mockReturnDB.dataValues = {
      id: 4,
      username: 'aaa',
      vocation: 'Esposa',
      level: 10,
      password: '$2a$12$/p9yKdYP4/Rr0JJ3mLFmSeEK3zQm5BtDaZWiQVx7aMFZHPp3WgB62'
    }

    sinon.stub(UserModel, 'findOne').resolves(mockReturnDB);

    sinon.stub(jwtUtils, 'sign').returns(token);

    const serviceResponse = await loginService.verifyLogin(bodyRequest);

    expect(serviceResponse).to.deep.eq(messageToken);
  })

  it('post /login service invalid data', async function () {

    const bodyRequest = {
      "username": "aaa",
      "password": ""
    }

    const errorResponse = {
      "status": "INVALID_DATA",
      "message": '"username" and "password" are required',
      "statusCode": 400
    }

    const serviceResponse = await loginService.verifyLogin(bodyRequest);

    expect(serviceResponse).to.deep.eq(errorResponse);
  })

  it('post /login service unauthorized', async function () {

    const bodyRequest = {
      "username": "aaa",
      "password": "bbb"
    }

    const errorResponse = {
      "status": "UNAUTHORIZED",
      "message": 'Username or password invalid',
      "statusCode": 401
    }

    sinon.stub(UserModel, 'findOne').resolves(null);

    const serviceResponse = await loginService.verifyLogin(bodyRequest);

    expect(serviceResponse).to.deep.eq(errorResponse);
  })

  it('post /login service unauthorized wrong password', async function () {

    const bodyRequest = {
      "username": "qualquer nome",
      "password": "bbb"
    }

    const errorResponse = {
      "status": "UNAUTHORIZED",
      "message": 'Username or password invalid',
      "statusCode": 401
    }
    const mockReturnDB = UserModel.build();
    mockReturnDB.dataValues = {
      id: 4,
      username: 'aaa',
      vocation: 'Esposa',
      level: 10,
      password: '$2a$12$/p9yKCCCCCCRr0JJ3mLFmSeEK3zQm5BtDaZWiQVx7aMFZHPp3WgB62'
    }

    sinon.stub(UserModel, 'findOne').resolves(mockReturnDB);

    const serviceResponse = await loginService.verifyLogin(bodyRequest);

    expect(serviceResponse).to.deep.eq(errorResponse);
  })
});
