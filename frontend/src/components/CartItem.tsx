import { ChevronLeft, Trash } from "lucide-react";

const CartItem = () => {
  return (
    <div className="flex items-center gap-3">
      <img src="/boloChoc.jpg" alt="Product" className="h-25 w-25 rounded-md" />
      <div className="flex-1">
        <p className="font-bold uppercase">Bolo de chocolate</p>
        <p className="font-bold text-[#848484]">R$ 20,00</p>
        <div className="mt-1 flex gap-4">
          <ChevronLeft
            className="cursor-pointer rounded-md bg-[#C92A0F] p-1 text-white"
            size={25}
          />
          <p className="font-bold">1</p>
          <ChevronLeft
            className="rotate-180 cursor-pointer rounded-md bg-[#C92A0F] p-1 text-white"
            size={25}
          />
        </div>
      </div>
      <Trash className="cursor-pointer" size={18} />
    </div>
  );
};

export default CartItem;
