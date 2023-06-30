import { Router } from 'express';
import productsController from '../controller/productsController';
import productValidation from '../middlewares/productValidation';

const productsRoute = Router();

productsRoute.post('/products', productValidation, productsController.create);
productsRoute.get('/products', productsController.findAll);

export default productsRoute;