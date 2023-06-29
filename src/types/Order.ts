export type Order = {
  id: number;
  userId: number;
  productId?: number;
};

export type ListOrder = {
  id: number;
  userId: number;
  productIds?: number[];
};