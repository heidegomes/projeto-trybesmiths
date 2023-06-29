import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ListOrder } from '../types/Order';

async function findAll(): Promise<ListOrder[]> {
  const result = await OrderModel.findAll({
    include: [
      { 
        model: ProductModel, 
        as: 'productIds',
        attributes: ['id'], 
      },
    ],
  });
  console.info('####### service', result);

  const arrOrders = result.map((o) => ({
    id: o.dataValues.id,
    userId: o.dataValues.userId,
    productIds: o.dataValues.productIds.map((p) => p.id),
  }));

  return arrOrders;
}

export default {
  findAll,
};