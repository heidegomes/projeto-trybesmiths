import { Router } from 'express';
import ordersController from '../controller/ordersController';

const ordersRoute = Router();

ordersRoute.get('/orders', ordersController.findAll);

export default ordersRoute;