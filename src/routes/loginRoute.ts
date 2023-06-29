import { Router } from 'express';
import loginController from '../controller/loginController';

const loginRoute = Router();

loginRoute.post('/login', loginController.login);

export default loginRoute;