import { ShoppingBag } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatter } from "../utils/formatter";

const Product = ({
  id, // eslint-disable-line
  name,
  description,
  price,
  image,
  category, // eslint-disable-line
}: ProductType) => {
  return (
    <div>
      <div className="flex gap-2">
        <img
          src={`./${image}`}
          alt={name}
          className="h-25 w-25 md:h-50 md:w-50"
        />
        <div className="flex w-full flex-col">
          <p className="text-sm font-bold uppercase md:text-lg">{name}</p>
          <p className="flex-1 text-xs text-[#848484] md:text-lg">
            {description}
          </p>
          <div className="flex items-center justify-end gap-2">
            <p className="text-sm text-[#F2DAAC] md:text-lg">
              {formatter(Number(price))}
            </p>
            <ShoppingBag size={20} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
