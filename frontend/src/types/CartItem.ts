import type { ProductType } from "./Product";

export type CartItemType = {
  id: string;
  userId: string;
  productId: string;
  product: ProductType;
};
