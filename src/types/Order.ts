export type Order = {
  id: number;
  userId: number;
  productIds?: ProductId[];
};

export type ListOrder = {
  id: number;
  userId: number;
  productIds: number[] | undefined;
};

export type ProductId = {
  id: number;
}; 