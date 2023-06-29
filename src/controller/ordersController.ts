import { Request, Response } from 'express';
import ordersService from '../service/ordersService';
// import { Order } from '../types/Order';

async function findAll(req: Request, res: Response): Promise<Response> {
  const result = await ordersService.findAll();
  return res.status(200).json(result);
}

export default {
  findAll,
};