import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import LoginPayload from '../types/LoginPayload';
import jwtUtils from '../utils/jwtUtils';

async function verifyLogin(login: LoginPayload):
Promise<ServiceResponse> {
  if (!login.username || !login.password) {
    return { 
      status: 'INVALID_DATA', 
      message: '"username" and "password" are required', 
      statusCode: 400, 
    };
  }
  const host = await UserModel.findOne({ 
    where: { username: login.username },
  });

  if (!host || !bcrypt.compareSync(login.password, host.dataValues.password)) {
    return { status: 'UNAUTHORIZED', message: 'Username or password invalid', statusCode: 401 };
  }
  const { id, username } = host.dataValues;
  const token = jwtUtils.sign({ id, username }); 

  return { status: 'OK', message: { token }, statusCode: 200 };
}
export default {
  verifyLogin,
};