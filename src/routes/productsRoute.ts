import { Router } from 'express';
import productsController from '../controller/productsController';

const productsRoute = Router();

productsRoute.post('/products', productsController.create);
productsRoute.get('/products', productsController.findAll);

export default productsRoute;