import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../src/app';

chai.use(chaiHttp);

describe('Route POST /login', function () {
  beforeEach(function () { sinon.restore(); });

  it('ao não receber um password, retorne um erro', async function () {

    const httpRequestBody = {
      'username': 'aaa',
      'password': ''
    }

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
  });


  it('ao enviar um usuário ou password errado, retorne um erro', async function () {

    const httpRequestBody = {
      'username': 'qualquerusuario',
      'password': 'qualquersenha'
    }

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
  });
});

