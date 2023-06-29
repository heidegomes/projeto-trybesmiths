import { Request, Response } from 'express';
import loginService from '../service/loginService';

async function verifyLogin(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;
  const response = await loginService.verifyLogin({ email, password });
  if (response.status === 'OK') {
    return res.status(response.statusCode).json({ token: response.message.token });
  }
  return res.status(response.statusCode).json({ message: response.message });
}

export default {
  verifyLogin,
};