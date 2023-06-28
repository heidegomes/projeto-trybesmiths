import { Request, Response } from 'express';
import productsService from '../service/productsService';
import { ProductResponse } from '../types/Product';

async function create(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const newProduct: ProductResponse = await productsService.create({ name, price, orderId });
  return res.status(201).json(newProduct);
}

export default {
  create,
};