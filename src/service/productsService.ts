import ProductModel, { ProductInputtableTypes,
  ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';

async function create(
  product: ProductInputtableTypes,
): Promise<Product> {
  const newProduct = await ProductModel.create(product);
  // return { id: newProduct.dataValues.id,
  //   name: newProduct.dataValues.name,
  //   price: newProduct.dataValues.price };
  return newProduct.dataValues;
}

async function findAll(): Promise<ProductSequelizeModel[]> {
  const result = await ProductModel.findAll();
  // console.log('service', result);
  return result;
}

export default {
  create,
  findAll,
};