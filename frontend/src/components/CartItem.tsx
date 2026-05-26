import { ChevronLeft, Trash } from "lucide-react";
import { formatter } from "../utils/formatter";

type CartItemType = {
  title: string;
  price: number;
  image: string;
  id: string;
};

const CartItem = ({ title, price, image, id }: CartItemType) => {
  return (
    <div className="flex items-center gap-3">
      <img src={`./${image}`} alt="Product" className="h-25 w-25 rounded-md" />
      <div className="flex-1">
        <p className="text-sm font-bold uppercase">{title}</p>
        <p className="text-sm font-bold text-[#848484]">
          {formatter(Number(price))}
        </p>
        <div className="mt-1 flex items-center gap-4">
          <ChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0F] p-1 text-white"
            size={25}
          />
          <p className="text-sm font-bold">1</p>
          <ChevronLeft
            className="rotate-180 cursor-pointer rounded-md bg-[#C92A0F] p-1 text-white"
            size={25}
          />
        </div>
      </div>
      <Trash className="cursor-pointer" size={18} onClick={() => alert(id)} />
    </div>
  );
};

export default CartItem;
