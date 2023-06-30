// import UserModel from '../database/models/user.model';
// import { ServiceResponse } from '../types/ServiceResponse';
// import LoginPayload from '../types/LoginPayload';
// import jwtUtils from '../utils/jwtUtils';
// import bcrypt from 'bcryptjs';

// async function verifyLogin( login: LoginPayload):
// Promise<ServiceResponse> {
//   if (!login.email || !login.password) {
//     return { status: 'INVALID_DATA', message: '"username" and "password" are required', statusCode: 400 };
//   }
//   const host = await UserModel.findOne({ where: { login.password } });
//   if (!host || !bcrypt.compareSync(login.password, host.dataValues.password)) {
//     return { status: 'UNAUTHORIZED', message: 'Username or password invalid', statusCode: 401 };
//   }

//   const {id, email} = host.dataValues;
//   const token = jwtUtils.sign({id, email})
//   return { status: 'OK', message: { token }, statusCode: 200 };
// }

// export default {
//   verifyLogin,
// };