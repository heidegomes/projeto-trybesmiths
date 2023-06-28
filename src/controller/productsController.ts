import { Request, Response } from 'express';
import productsService from '../service/productsService';
import { Product } from '../types/Product';

async function create(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const newProduct: Product = await productsService.create({ name, price, orderId });
  return res.status(201).json(newProduct);
}

async function findAll(req: Request, res: Response): Promise<Response> {
  const result = await productsService.findAll();
  console.log('controller', result);
  return res.status(200).json(result);
}

export default {
  create,
  findAll,
};